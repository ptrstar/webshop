import { NextRequest, NextResponse } from "next/server";
import stripe from "@/util/stripe/stripe";
import { db } from "@/util/supabase/drizzle";
import { customers } from "@/util/supabase/schema";
import { eq } from "drizzle-orm"; // Import Drizzle's eq helper

export const config = {
    api: {
        bodyParser: false, // Stripe needs raw body
    },
};

// Helper to read the raw body from the request
async function getRawBody(req: Request): Promise<Buffer> {
    const reader = req.body?.getReader();
    const chunks: Uint8Array[] = [];
    if (!reader) return Buffer.alloc(0);

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) chunks.push(value);
    }
    return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
    const sig = req.headers.get("stripe-signature");
    if (!sig) {
        return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
    }

    const buf = await getRawBody(req);

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            buf,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: unknown) {
        console.error(err);
        const message = err instanceof Error ? err.message : String(err);
        return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
        case "checkout.session.async_payment_failed": {
            const session = event.data.object;
            const metadata = session.metadata; // Your custom metadata
            // TODO: Use metadata.app_customer_id and customer as needed
            console.log("Async payment failed:", { metadata });
            break;
        }
        case "checkout.session.async_payment_succeeded": {
            const session = event.data.object;
            const metadata = session.metadata;
            if (metadata?.app_customer_id) {
                try {
                    const result = await db
                        .update(customers)
                        .set({ isPayed: true, payedAt: new Date(), stripeCheckoutId: session.id })
                        .where(eq(customers.id, Number(metadata.app_customer_id)));

                    console.log("✅ DB update success:", {
                        customerId: metadata.app_customer_id,
                        result,
                    });
                } catch (err) {
                    console.error("❌ DB update failed:", {
                        customerId: metadata.app_customer_id,
                        error: err instanceof Error ? err.message : err,
                    });
                }
            }
            console.log("Async payment succeeded:", { metadata });
            break;
        }
        case "checkout.session.completed": {
            const session = event.data.object;
            const metadata = session.metadata;
            //const metadata = {app_customer_id: 29, amount: 1};
            if (metadata?.app_customer_id) {
                try {
                    const result = await db
                        .update(customers)
                        .set({ isPayed: true, payedAt: new Date(), stripeCheckoutId: session.id })
                        .where(eq(customers.id, Number(metadata.app_customer_id)));


                    const emailPayload = {
                        recipientEmail: metadata.customerEmail,
                        subject: `Richi Kartenspiel Bestellungsbestätigung`,
                        body: `
                            <!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                            </head>
                            <body>
                                <h3>Vielen Dank ${metadata.customerName}</h3>
                                <p>Ihre Bestellung ist eingegangen und bezahlt. Sie können den Status unter folgendem Link einsehen.</p>
                                <a href="https://www.kartenspielrichi.ch/success?session_id=${session.id}">Bestellung</a>
                                <p>Melden Sie sich mit Fragen an diesen Absender.</p>
                                <br>
                                <p>Mit freundlichen Grüssen, Richi-team</p>
                            </body>
                            </html>
                        `,
                    };

                    try {
                        const targetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/send-confirmation-email`;

                        const emailResponse = await fetch(targetUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            // Optional: include your internal secret check here if you still want it
                            // 'X-Internal-Secret': process.env.INTERNAL_API_SECRET as string,
                        },
                        // *** THIS IS THE PACKAGING STEP ***
                        body: JSON.stringify(emailPayload), 
                        });
                        console.log(emailResponse)
                    } catch {
                        console.log("could not send email")
                    }

                    console.log("✅ DB update success:", {
                        customerId: metadata.app_customer_id,
                        result,
                    });
                } catch (err) {
                    console.error("❌ DB update failed:", {
                        customerId: metadata.app_customer_id,
                        error: err instanceof Error ? err.message : err,
                    });
                }

            } else {
                console.log("ERROR;;;; NO METADATA");
            }
            console.log("Payment successful:", { metadata });
            break;
        }
        case "checkout.session.expired": {
            const session = event.data.object;
            const metadata = session.metadata;
            // TODO: Use metadata.app_customer_id and customer as needed
            console.log("Session expired:", { metadata });
            break;
        }
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return new NextResponse(null, { status: 200 });
}