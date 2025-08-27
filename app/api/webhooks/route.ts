import { NextRequest, NextResponse } from "next/server";
import stripe from "@/util/stripe/stripe";

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

    try {
        const event = stripe.webhooks.constructEvent(
            buf,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            console.log("Payment successful:", session);
        }

        return new NextResponse(null, { status: 200 });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }
}