"use client";

import { useState } from "react";
import Logo from "@/app/components/Logo";
import Preorder from "@/app/components/preorder";
import Social_Media from "@/app/components/social_media";
import Contact from "@/app/components/contact";
import { primary_font } from "@/util/fonts";
import { Tabs, Tab } from "@heroui/react";

const tabs = [
  { label: "Interesse Melden", component: <Preorder /> },
  { label: "Social Media", component: <Social_Media /> },
  { label: "Kontakt", component: <Contact /> },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState(0);

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
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.5rem 1rem",
                  
                  fontWeight: activeTab === idx ? "bold" : "normal",
                  outline: "none",
                }}
                aria-current={activeTab === idx ? "page" : undefined}
              >
                {tab.label}
              </button>
              {idx < tabs.length - 1 && (
                <span style={{ color: "#aaa", userSelect: "none" }}>|</span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: "40px", width: "100%", display: "flex", justifyContent: "center" }}>
        {tabs[activeTab].component}
      </div>
    </div>
  );
}