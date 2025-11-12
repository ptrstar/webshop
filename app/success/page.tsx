import React from "react";
import Logo from "../components/Logo";
import { db } from "@/util/supabase/drizzle";
import { customers } from "@/util/supabase/schema";
import { eq } from "drizzle-orm";
import CustomerInfo from "../components/CustomerInfo";

export default async function SuccessPage(props: { searchParams: { session_id?: string } }) {
    const { searchParams } = props;
    const sessionId = searchParams?.session_id;
    let customer = null;

    if (sessionId) {
        const result = await db
            .select()
            .from(customers)
            .where(eq(customers.stripeCheckoutId, sessionId));
        customer = result[0] || null;
    }

    return (
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginTop: "50px",
        }}
        >
            <Logo />
            {customer ? (
                <CustomerInfo customer={customer} />
            ) : (
                <div>Auftrag konnte nicht gefunden werden.</div>
            )}
        </div>
    );
}