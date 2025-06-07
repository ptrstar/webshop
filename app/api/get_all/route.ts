import { db } from "@/util/supabase/drizzle";
import { interest } from "@/util/supabase/schema";

export async function GET() {
  try {
    const data = await db.select().from(interest);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Database error" }), { status: 500 });
  }
}

