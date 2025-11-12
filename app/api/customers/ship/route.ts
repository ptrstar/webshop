import { NextRequest, NextResponse } from "next/server";
import { db } from "@/util/supabase/drizzle";
import { customers } from "@/util/supabase/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const id = Number(body?.id);
        if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

        await db
            .update(customers)
            .set({ isShipped: true, shippedAt: new Date() })
            .where(eq(customers.id, id));

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
    }
}
