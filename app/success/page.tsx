import React from "react";
import Logo from "../components/Logo";
import { db } from "@/util/supabase/drizzle";
import { customers } from "@/util/supabase/schema";
import { eq } from "drizzle-orm";
import CustomerInfo from "../components/CustomerInfo";

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string | string[] }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const rawSession = params?.session_id;
  const sessionId = Array.isArray(rawSession) ? rawSession[0] : rawSession;

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
