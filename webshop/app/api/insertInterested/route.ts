import { db } from "@/util/supabase/drizzle";
import { interest } from "@/util/supabase/schema";

export async function POST(req: Request) {
  const { email, amount } = await req.json();
  try {
    await db.insert(interest).values({ email, amount, createdAt: new Date() });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Database error" }), { status: 500 });
  }
}