"use client";
import { useState } from "react";

export default function CheckoutButton({ amount, customerId, customerEmail, customerName }: { amount: number; customerId?: string, customerEmail:string, customerName:string }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, customerId, customerEmail, customerName }),
    });

    const { url } = await res.json();
    if (url) window.location.href = url;
  };

  return (
    <div>
      <p style={{ marginBottom: "12px", fontSize: "0.9rem", color: "#666" }}>
        Sie werden zu Stripe weitergeleitet, um die Zahlung zu verarbeiten.
      </p>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Weiterleitung..." : "Bezahlen"}
      </button>
    </div>
  );
}





