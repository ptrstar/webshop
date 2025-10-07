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
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
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
                await db
                    .update(customers)
                    .set({ isPayed: true, payedAt: new Date() })
                    .where(eq(customers.id, Number(metadata.app_customer_id)));
            }
            console.log("Async payment succeeded:", { metadata });
            break;
        }
        case "checkout.session.completed": {
            const session = event.data.object;
            const metadata = session.metadata;
            if (metadata?.app_customer_id) {
                await db
                    .update(customers)
                    .set({ isPayed: true, payedAt: new Date() })
                    .where(eq(customers.id, Number(metadata.app_customer_id)));
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