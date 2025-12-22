import { NextResponse } from "next/server";
import { db } from "@/util/supabase/drizzle";
import { customers } from "@/util/supabase/schema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/authOptions";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (session) {
        try {
            const allCustomers = (await db.select().from(customers));
            return NextResponse.json(allCustomers);
        } catch (err: unknown) {
            console.error(err);
            const message = err instanceof Error ? err.message : String(err);
            return NextResponse.json({ error: message || "Server error" }, { status: 500 });
        }
    } else {
        return new Response(JSON.stringify({ error: "Access denied" }), { status: 401 });    
    }


}
