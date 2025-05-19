import { useState } from "react";

export default function InterestForm() {
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/insertInterested", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, amount: quantity }),
    });
    if (res.ok) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={{ marginTop: "32px", fontSize: "1.2rem" }}>
        Danke für ihr Interesse!
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginTop: "32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <input
        type="email"
        placeholder="Ihre E-Mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{
          padding: "8px",
          fontSize: "1rem",
          marginBottom: "12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          width: "240px",
        }}
      />
      <input
        type="number"
        min={1}
        max={5}
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
        required
        style={{
          padding: "8px",
          fontSize: "1rem",
          marginBottom: "12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          width: "240px",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 24px",
          fontSize: "1rem",
          borderRadius: "6px",
          border: "none",
          background: "#222",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Absenden
      </button>
    </form>
  );
}