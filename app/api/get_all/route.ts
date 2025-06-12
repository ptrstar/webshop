import { db } from "@/util/supabase/drizzle";
import { interest } from "@/util/supabase/schema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      const data = await db.select().from(interest);
      return new Response(JSON.stringify(data), { status: 200 });
    } catch {
      return new Response(JSON.stringify({ error: "Database error" }), { status: 500 });
    }
  } else {
    return new Response(JSON.stringify({ error: "Access denied" }), { status: 401 });    
  }
  
}

