"use client";

import { useState } from "react";
import Logo from "@/app/components/Logo";
import Preorder from "@/app/components/preorder";
import Social_Media from "@/app/components/social_media";
import Contact from "@/app/components/contact";
import { primary_font } from "@/util/fonts";
import Image from "next/image";
import InterestForm from "@/app/components/interest_form";

const tabs = [
  { label: "Shop", component: <Preorder /> },
  { label: "Social Media", component: <Social_Media /> },
  { label: "Kontakt", component: <Contact /> },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Logo />
      <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(idx)}
            className={primary_font.className}
            style={{
              background: "none",
              border: "none",
              margin: "0 18px",
              padding: 0,
              fontSize: "1.2rem",
              fontWeight: idx === activeTab ? "bold" : "normal",
              color: idx === activeTab ? "#000" : "#888",
              cursor: "pointer",
              outline: "none",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ marginTop: "40px" }}>
        {tabs[activeTab].component}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
        <Image
          src="/speedup-product.png"
          alt="Speedup Product"
          width={500}
          height={350}
          style={{
            display: "block",
            maxWidth: "500px",
            width: "100%",
            height: "auto",
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)"
          }}
        />
      </div>

      <InterestForm />


    </div>
  );
}