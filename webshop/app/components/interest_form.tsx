import { useState } from "react";
import { db } from "@/util/supabase/drizzle";
import { interest } from "@/util/supabase/schema";

export default function InterestForm() {
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //await db.insert(interest).values({ email, amount: quantity, createdAt: new Date() });
    setSubmitted(true);
  };

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