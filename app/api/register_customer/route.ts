import { db } from "@/util/supabase/drizzle";
import { customers } from "@/util/supabase/schema";

export async function POST(req: Request) {
  const {
    name,
    street,
    number,
    postalcode,
    city,
    country,
    email,
    amount,
  } = await req.json();

  try {
    const [inserted] = await db
      .insert(customers)
      .values({
        name,
        streetName: street,
        streetNr: number,
        postalCode: postalcode,
        city,
        country,
        email,
        amount: parseInt(amount, 10),
        stripeCheckoutId: null,
        isPayed: false,
        isShipped: false,
        createdAt: new Date(),
      })
      .returning({ id: customers.id });

    return new Response(JSON.stringify({ success: true, id: inserted.id, amount: amount, email: email }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Database error: " + (err instanceof Error ? err.message : "") }),
      { status: 500 }
    );
  }
}

