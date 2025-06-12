import { db } from "@/util/supabase/drizzle";
import { interest } from "@/util/supabase/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/authOptions";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      const { email } = await req.json();
      await db.delete(interest).where(eq(interest.email, email));
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: `Database error: ${err instanceof Error ? err.message : String(err)}` }),
        { status: 500 }
      );
    }
  } else {
    return new Response(JSON.stringify({ error: "Access denied" }), { status: 401 });
  }
}

