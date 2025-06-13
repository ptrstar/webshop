"use client";

import { Progress } from "@heroui/progress";
import { Tooltip } from "@heroui/tooltip";
import InterestForm from "@/app/components/interest_form";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Preorder() {
  const target_amt = 500;
  const [amount, setAmount] = useState<number | null>(null);
  const [interested, setInterested] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/get_progress")
      .then((res) => res.json())
      .then((data) => {
        setAmount(parseInt(data?.sum) + 300);
      });
  }, []);

  // Show 0 until loaded, then clamp to target_amt
  const progressValue = amount !== null ? Math.min(amount, target_amt) : 0;
  const percent = amount !== null ? Math.round((progressValue / target_amt) * 100) : 0;

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
        <Image
          src="/richi-product-zoom.png"
          alt="Richi das Kartenspiel"
          width={500}
          height={350}
          className="preorder-hero-img"
          priority
          style={{
            width: "100%",
            height: "auto",
            borderRadius: 16,
            objectFit: "cover",
            display: "block",
            marginBottom: "1em"
          }}
        />

      {/* Title */}
      <h2
        style={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: 700,
          marginBottom: "24px",
        }}
      >
        Richi - das Kartenspiel
      </h2>

      {/* Progress bar and text */}
      <div style={{ width: "100%", marginBottom: "16px" }}>
        <Tooltip
        content={
          <div className="px-1 py-2">
            <div className="text-small font-bold">Zur Vorbestellung</div>
            <div className="text-tiny">Das Spiel wird produziert, sobald das Ziel von 500 erreicht ist. Danach kann das Spiel gekauft werden und die Lieferung dauert ca. 3 Wochen.</div>
          </div>
        }
        color="default"
        >
          <Progress
            aria-label="Vorbestellungen"
            value={percent}
            color="success"
          />

        </Tooltip>
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
      {!interested ? (
        <button
          style={{
        width: "100%",
        marginBottom: "24px",
        padding: "16px",
        background: "linear-gradient(90deg, #ff9800 0%, #ff5722 100%)",
        color: "#fff",
        fontWeight: 700,
        fontSize: "1.2rem",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        boxShadow: "0 4px 16px rgba(255,87,34,0.15)",
        transition: "background 0.3s, transform 0.2s",
          }}
          onClick={() => setInterested(true)}
        >
          Bin interessiert!
        </button>
      ) : (
        <div style={{ width: "100%", marginBottom: "24px" }}>
          <InterestForm />
        </div>
      )}

      {/* Info Text always visible below Interest Form */}
      <div
        style={{
          width: "100%",
          background: "rgba(0,0,0,0.04)",
          borderRadius: 12,
          padding: "24px 18px",
          marginBottom: 24,
          color: "#222",
          textAlign: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <p style={{
          fontWeight: 700,
          fontSize: "1.15rem",
          marginBottom: 8,
          letterSpacing: "0.01em",
        }}>
          CHF 14.90 pro Spiel
        </p>
        <p style={{
          fontSize: "1rem",
          marginBottom: 8,
          lineHeight: 1.5,
        }}>
          Rette Richi, denn er fällt jeden Moment vom Bagger auf den Boden! Verhindere dies, indem du geschickt spielst und gleichzeitig  den anderen das Leben schwer machst. Wer als Erstes keine Leben mehr hat, verliert - der mit den meisten, gewinnt.
        </p>
        <p style={{
          fontStyle: "italic",
          fontSize: "0.95rem",
          opacity: 0.85,
        }}>
          Geeignet für Memeliebhaber
        </p>
      </div>
    </div>
  );
}