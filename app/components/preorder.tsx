"use client";

import { Progress } from "@heroui/progress";
import InterestForm from "@/app/components/interest_form";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Preorder() {
  const target_amt = 500;
  const [amount, setAmount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/get_progress")
      .then((res) => res.json())
      .then((data) => {
        console.log("updateeeeee set amount to ", parseInt(data?.sum) + 300)
        setAmount(parseInt(data?.sum) + 300);
      });
  }, []);

  // Show 0 until loaded, then clamp to target_amt
  const progressValue = amount !== null ? Math.min(amount, target_amt) : 0;
  const percent = amount !== null ? Math.round((progressValue / target_amt) * 100) : 0;
  console.log(progressValue, percent)

  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "33vw",
        minWidth: "300px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Hero Image */}
      <div style={{ width: "100%", marginBottom: "24px" }}>
        <Image
          src="/speedup-product.png"
          alt="Richi das Kartenspiel"
          width={500}
          height={350}
          style={{ width: "100%", borderRadius: 16, objectFit: "cover" }}
          priority
        />
      </div>

      {/* Title */}
      <h2
        style={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: 700,
          marginBottom: "24px",
        }}
      >
        Richi das Kartenspiel
      </h2>

      {/* Progress bar and text */}
      <div style={{ width: "100%", marginBottom: "16px" }}>
        <Progress
          aria-label="Vorbestellungen"
          value={percent}
          color="success"
        />
        <div
          style={{
            textAlign: "center",
            marginTop: "8px",
            fontSize: "1rem",
          }}
        >
          {amount === null
            ? "Lade Fortschritt..."
            : `${percent}% der Vorbestellungsziele erreicht! (${progressValue} von ${target_amt})`}
        </div>
      </div>

      {/* Interest Form */}
      <div style={{ width: "100%", marginBottom: "24px" }}>
        <InterestForm />
      </div>

      {/* Lorem Ipsum Text */}
      <div
        style={{
          textAlign: "center",
          fontSize: "1rem",
          color: "#666",
        }}
      >
        <p>CHF 14.90 pro Spiel</p>
        <p>Rette Richi, den er fallt jede Moment auf den Boden. Spiele geschickt und versuche, dass Richi sich am Bagger festhalten kann. Stürtz er zu Boden, erhältst du einen Minuspunkt.
Das Spiel kann in 2 verschiedenen Varianten und in einem Teammodus gespielt werden.</p>
        <p>Geeignet für Memeliebhaber</p>

      </div>
    </div>
  );
}