import { db } from "@/util/supabase/drizzle";
import { interest } from "@/util/supabase/schema";
import { sum } from "drizzle-orm";

export async function GET() {
  try {
    const result = await db.select({ sum: sum(interest.amount) }).from(interest);
    const sumValue = result[0]?.sum ?? 0;
    return new Response(JSON.stringify({ sum: sumValue }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Database error" }), { status: 500 });
  }
}

