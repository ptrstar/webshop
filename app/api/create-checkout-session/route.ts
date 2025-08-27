import { NextResponse } from "next/server";
import stripe from '@/util/stripe/stripe';

export async function POST(req: Request) {
  try {
    const { customerId, amount } = await req.json();

    if (!customerId || !amount) {
      return NextResponse.json({ error: "Missing customerId or amount" }, { status: 400 });
    }

    const baseUrl = process.env.NEXTAUTH_URL;
    if (!baseUrl || !/^https?:\/\//.test(baseUrl)) {
      throw new Error("NEXT_PUBLIC_BASE_URL must be set and start with http(s)://");
    }

    // Only include customer if it's a valid Stripe customer ID
    const sessionParams: any = {
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            product: "prod_SemJSFhp7IXx3T",
            currency: "chf",
            unit_amount: 1450,
          },
          quantity: amount,
        },
      ],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
      metadata: {
        app_customer_id: customerId,
      },
    };

    if (customerId && typeof customerId === "string" && customerId.startsWith("cus_")) {
      sessionParams.customer = customerId;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err: any) {
    console.error("Stripe Checkout Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
