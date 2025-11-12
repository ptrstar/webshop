import { NextRequest, NextResponse } from "next/server";
import { db } from "@/util/supabase/drizzle";
import { customers } from "@/util/supabase/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/authOptions";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (session) {
        try {
            const body = await req.json();
            const id = Number(body?.id);
            if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

            await db.delete(customers).where(eq(customers.id, id));

            return NextResponse.json({ success: true });
        } catch (err: unknown) {
            console.error(err);
            const message = err instanceof Error ? err.message : String(err);
            return NextResponse.json({ error: message || "Server error" }, { status: 500 });
        }
    } else {
        return new Response(JSON.stringify({ error: "Access denied" }), { status: 401 });    
    }
    
}
