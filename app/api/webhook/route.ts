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
            console.log("Async payment failed:", { metadata });
            break;
        }
        case "checkout.session.async_payment_succeeded": {
            const session = event.data.object;
            const metadata = session.metadata;
            if (metadata?.app_customer_id) {
                try {
                    await db
                        .update(customers)
                        .set({ isPayed: true, payedAt: new Date(), stripeCheckoutId: session.id })
                        .where(eq(customers.id, Number(metadata.app_customer_id)));

                    const emailPayload = {
                        recipientEmail: metadata.app_customer_email,
                        subject: `Richi Kartenspiel Bestellungsbestätigung`,
                        body: `
                            <!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                            </head>
                            <body>
                                <h3>Vielen Dank ${metadata.app_customer_name}</h3>
                                <p>Ihre Bestellung ist eingegangen und bezahlt. Sie können den Status unter folgendem Link einsehen.</p>
                                <a href="https://www.kartenspielrichi.ch/success?session_id=${session.id}">Bestellung</a>
                                <p>Melden Sie sich mit Fragen an <a href="mailto:info@kartenspielrichi.ch">Info</a>.</p>
                                <br>
                                <p>Mit freundlichen Grüssen, Richi-team</p>
                            </body>
                            </html>
                        `,
                    };
                    try {
                        const targetUrl = `${process.env.NEXTAUTH_URL}/api/send-mail-via-infoaccount`;
                        await fetch(targetUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(emailPayload), 
                        });
                    } catch {
                        console.log("could not send email:", metadata);
                    }

                } catch (err) {
                    console.error("❌ DB update failed:", {
                        customerId: metadata.app_customer_id,
                        error: err instanceof Error ? err.message : err,
                    });
                }
            }
            break;
        }
        case "checkout.session.completed": {
            const session = event.data.object;
            const metadata = session.metadata;
            //const metadata = {app_customer_id: 29, amount: 1};
            if (metadata?.app_customer_id) {
                try {
                    await db
                        .update(customers)
                        .set({ isPayed: true, payedAt: new Date(), stripeCheckoutId: session.id })
                        .where(eq(customers.id, Number(metadata.app_customer_id)));


                    const emailPayload = {
                        recipientEmail: metadata.app_customer_email,
                        subject: `Richi Kartenspiel Bestellungsbestätigung`,
                        body: `
                            <!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                            </head>
                            <body>
                                <h3>Vielen Dank ${metadata.app_customer_name}</h3>
                                <p>Ihre Bestellung ist eingegangen und bezahlt. Sie können den Status unter folgendem Link einsehen.</p>
                                <a href="https://www.kartenspielrichi.ch/success?session_id=${session.id}">Bestellung</a>
                                <p>Melden Sie sich mit Fragen an <a href="mailto:info@kartenspielrichi.ch">Info</a>.</p>
                                <br>
                                <p>Mit freundlichen Grüssen, Richi-team</p>
                            </body>
                            </html>
                        `,
                    };
                    try {
                        const targetUrl = `${process.env.NEXTAUTH_URL}/api/send-mail-via-infoaccount`;
                        await fetch(targetUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(emailPayload), 
                        });
                    } catch {
                        console.log("could not send email:", metadata);
                    }
                } catch (err) {
                    console.error("❌ DB update failed:", {
                        customerId: metadata.app_customer_id,
                        error: err instanceof Error ? err.message : err,
                    });
                }
            }
            break;
        }
        case "checkout.session.expired": {
            const session = event.data.object;
            const metadata = session.metadata;
            console.log("Session expired:", { metadata });
            break;
        }
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return new NextResponse(null, { status: 200 });
}