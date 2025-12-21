"use client";

import { Progress } from "@heroui/progress";
import { Tooltip } from "@heroui/tooltip";
//import InterestForm from "@/app/components/interest_form";
import Image from "next/image";
import { useEffect, useState } from "react";
import EmblaCarousel from "./carousel";
import Shop from "./shop";
// import InterestForm from "./interest_form";

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
  const progressValue = amount !== null ?  amount : 0;
  const percent = amount !== null ? Math.floor((progressValue / target_amt) * 100) : 0;

  // Images for the carousel
  const carouselSlides = [
    {
      src: "/richi-tuckbox.jpeg",
      alt: "Richi das Kartenspiel Tuckbox",
    },
    {
      src: "/richi-setup.jpeg",
      alt: "Richi das Kartenspiel Setup",
    },
    {
      src: "/richi-cards-in-hand.jpeg",
      alt: "Richi das Kartenspiel Karten in Hand",
    },
    {
      src: "/richi-many-cards.jpeg",
      alt: "Richi das Kartenspiel viele Karten",
    },
  ];

  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "33vw",
        minWidth: "500px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Embla Carousel */}
      <EmblaCarousel
        options={{}}
        slides={carouselSlides.map((img, idx) => (
          <Image
            key={idx}
            src={img.src}
            alt={img.alt}
            width={500}
            height={350}
            className="preorder-hero-img"
            priority={idx === 0}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 16,
              objectFit: "cover",
              display: "block",
              marginBottom: "1em"
            }}
          />
        ))}
      />

      

      
      {/* {!interested ? (
        <button
          style={{
        width: "100%",
        marginBottom: "24px",
        padding: "16px",
        background: "linear-gradient(90deg, #fdba51 0%, #f1a01e 100%)",
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
      )} */}
      <Shop />
      {/* <InterestForm></InterestForm> */}

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
          Rette Richi, denn er fällt jeden Moment vom Bagger auf den Boden! Verhindere dies, indem du geschickt spielst und gleichzeitig  den anderen das Leben schwer machst. Wer als Erstes keine Leben mehr hat, verliert - die Person mit den meisten gewinnt.
        </p>
        <p style={{
          fontStyle: "italic",
          fontSize: "0.95rem",
          opacity: 0.85,
        }}>
          Geeignet für Meme-liebende
        </p>
      </div>

      {/* Symbols */}
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            gap: 12,
          }}
          className="richi-symbols-row"
        >
          <div style={{ flex: 1, textAlign: "left", paddingRight: "0.4rem"}}>
            Familienspiel<br />Partyspiel
          </div>
          <div style={{ flex: 1, textAlign: "center" }}>
            <Image
              src="/richi-symbols.png"
              alt="Spiel Symbole"
              width={80}
              height={48}
              style={{ display: "inline-block", maxWidth: "100%", height: "auto" }}
            />
          </div>
          <div style={{ flex: 1, textAlign: "right", paddingLeft: "0.4rem"}}>
            50 Spielkarten<br />mit Anleitung
          </div>
        </div>
        <style jsx>{`
          @media (max-width: 1000px) {
            .richi-symbols-row {
              flex-direction: column !important;
              gap: 0.5em;
            }
            .richi-symbols-row > div {
              text-align: center !important;
            }
          }
        `}</style>
      </div>

    </div>
  );
}