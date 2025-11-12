import { NextRequest, NextResponse } from "next/server";
import { db } from "@/util/supabase/drizzle";
import { customers } from "@/util/supabase/schema";

export async function GET(req: NextRequest) {
    try {
        const allCustomers = await db.select().from(customers);
        return NextResponse.json(allCustomers);
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
