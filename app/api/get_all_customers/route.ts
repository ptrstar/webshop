import { NextRequest, NextResponse } from "next/server";
import { db } from "@/util/supabase/drizzle";
import { customers } from "@/util/supabase/schema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/authOptions";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (session) {
        try {
            const allCustomers = await db.select().from(customers);
            return NextResponse.json(allCustomers);
        } catch (err: any) {
            console.error(err);
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
    } else {
        return new Response(JSON.stringify({ error: "Access denied" }), { status: 401 });    
    }


}
