"use client";
import { useEffect, useState } from "react";

export default function CheckoutButton({ amount, customerId }: { amount: number; customerId?: string }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, customerId }),
    });

    const { url } = await res.json();
    if (url) window.location.href = url;
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? "Redirecting..." : "Bezahlen"}
    </button>
  );
}





