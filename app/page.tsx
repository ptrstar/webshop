"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/app/components/Logo";
import Preorder from "@/app/components/preorder";
import Social_Media from "@/app/components/social_media";
import Contact from "@/app/components/contact";
import { primary_font } from "@/util/fonts";
import Videocontent from "./components/videocontent";

const tabs = [
  { label: "Shop", component: <Preorder /> },
  { label: "Erklärvideo", component: <Videocontent /> },
  { label: "Kontakt", component: <Contact /> },
  { label: "Social Media", component: <Social_Media /> },
];

const partners = [
  {label: "Bider&Tanner", src: "/partner-bider.jpeg"},
  {label: "Orell Füssli", src: "/partner-orell.jpeg"},
]

export default function Page() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab === "erklaervideo") {
      setActiveTab(1);
    }
  }, []);

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
      <div
        className={primary_font.className}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {tabs.map((tab, idx) => (
            <div key={idx}>
                <button
                onClick={() => setActiveTab(idx)}
                style={{
                  background: "rgb(243,243,243)",
                  borderRadius: "1em",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: activeTab === idx ? "bolder" : "normal",
                  outline: "none",
                  fontSize: "clamp(0.75rem, 2vw, 1rem)",
                  padding: "clamp(0.25rem, 1.5vw, 0.5rem) clamp(0.5rem, 2vw, 1rem)",
                }}
                aria-current={activeTab === idx ? "page" : undefined}
                >
                {tab.label}
                </button>
              {/* {idx < tabs.length - 1 && (
                <>
                  <span className="tab-separator" style={{ color: "#aaa", userSelect: "none" }}>|</span>
                  <style jsx>{`
                  @media (max-width: 700px) {
                  .tab-separator {
                    display: none;
                  }
                  }
                `}</style>
                </>
              )} */}
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: "40px", width: "100%", display: "flex", justifyContent: "center", padding: "0 1rem" }}>
        <div style={{ width: "100%", maxWidth: "33vw", minWidth: "80vw" }}>
          {tabs[activeTab].component}
        </div>
      </div>

      <div style={{margin: "0 auto",maxWidth: "33vw",minWidth: "80vw", width: "100%", display: "flex", flexDirection: "column", alignItems:"center"}}>
          <p style={{
          fontWeight: 700,
          fontSize: "1.15rem",
          marginBottom: 8,
          marginTop: "2em",
          letterSpacing: "0.01em",
        }}>
          Auch erhältlich bei
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            justifyContent: "center",
            width: "100%",
            maxWidth: "720px",
          }}
        >
          {partners.map((partner, idx) => (
            // <div
            //   key={idx}
            //   style={{
            //     flex: "0 0 calc(50% - 0.5rem)",
            //     display: "flex",
            //     justifyContent: "center",
            //   }}
            // >
              <Image
                src={partner.src}
                alt={partner.label}
                key={idx}
                width={240}
                height={120}
                
                style={{display: "flex", flex: "0 0 calc(50% - 0.5rem)", borderRadius: "1em", border: "none" }}
              />
            // </div>
          ))}
        </div>

      </div>


      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "2em", width: "100%", maxWidth: "500px" }}>
        <a
          href="/agb"
          style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "0.5rem 1rem",
        outline: "none",
        textDecoration: "none",
        color: "inherit",
        display: "inline-block",
          }}
        >
          AGB
        </a>
        <a
          href="/privacy"
          style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "0.5rem 1rem",
        outline: "none",
        textDecoration: "none",
        color: "inherit",
        display: "inline-block",
          }}
        >
          Datenschutzerklärung
        </a>
      </div>


      <div style={{display: "flex", alignItems: "center", marginBottom: "4em", marginTop: "2em"}}>
        Richi - Das Kartenspiel | ©{new Date().getFullYear()}
      </div>

    </div>
  );
}