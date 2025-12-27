import { NextResponse } from "next/server";
import stripe from '@/util/stripe/stripe';
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const { customerId, amount, customerName, customerEmail } = await req.json();

    if (!customerId || !amount) {
      return NextResponse.json({ error: "Missing customerId or amount" }, { status: 400 });
    }

    const baseUrl = process.env.NEXTAUTH_URL;
    if (!baseUrl || !/^https?:\/\//.test(baseUrl)) {
      throw new Error("NEXT_PUBLIC_BASE_URL must be set and start with http(s)://");
    }

    // Only include customer if it's a valid Stripe customer ID
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["twint", "card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            product: "prod_TbTYuJPli0e5Jz",
            currency: "chf",
            unit_amount: 1490,
          },
          quantity: amount,
        },
      ],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
      allow_promotion_codes: true,
      metadata: {
        app_customer_id: customerId,
        app_customer_email: customerEmail,
        app_customer_name: customerName
      },
    };

    if (customerId && typeof customerId === "string" && customerId.startsWith("cus_")) {
      sessionParams.customer = customerId;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : String(err);
      return NextResponse.json({ error: message || "Server error" }, { status: 500 });
    }
}
