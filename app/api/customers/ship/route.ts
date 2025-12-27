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

            const customer = (await db
                .update(customers)
                .set({ isShipped: true, shippedAt: new Date() })
                .where(eq(customers.id, id)).returning())[0];

            const emailPayload = {
                recipientEmail: customer.email,
                subject: `Richi Kartenspiel Versandsbestätigung`,
                body: `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                    </head>
                    <body>
                        <h3>Ihre Bestellung ist auf dem Weg</h3>
                        <p>Die Post wird ihre Bestellung in den kommenden Tagen zustellen. Sie können den Status weiterhin unter folgendem Link einsehen.</p>
                        <a href="https://www.kartenspielrichi.ch/success?session_id=${customer.stripeCheckoutId}">Bestellung</a>
                        <p>Melden Sie sich mit Fragen an <a href="mailto:info@kartenspielrichi.ch">Info</a>.</p>
                        <br>
                        <p>Mit freundlichen Grüssen, Richi-team</p>
                    </body>
                    </html>
                `,
            };
            
            const targetUrl = `${process.env.NEXTAUTH_URL}/api/send-mail-via-infoaccount`;
            fetch(targetUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailPayload), 
            });
            
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
