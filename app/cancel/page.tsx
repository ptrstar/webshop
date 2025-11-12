import React from "react";
import Logo from "../components/Logo";
import Link from "next/link";

export default function CancelPage() {
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
                style={{
                    marginTop: "30px",
                    padding: "32px",
                    borderRadius: "12px",
                    background: "#ffebee",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    maxWidth: "400px",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        background: "#f44336",
                        color: "#fff",
                        padding: "12px",
                        borderRadius: "8px",
                        marginBottom: "20px",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                    }}
                >
                    Zahlung fehlgeschlagen
                </div>
                <p style={{ marginBottom: "16px" }}>
                    Es gab leider ein Problem mit Ihrer Zahlungsabwicklung.
                </p>
                <p style={{ marginBottom: "20px" }}>
                    Bitte überprüfen Sie Ihre Zahlungsinformationen und versuchen Sie es erneut.
                </p>
                <Link
                    href="/"
                    style={{
                        display: "inline-block",
                        padding: "10px 20px",
                        background: "#2196F3",
                        color: "#fff",
                        textDecoration: "none",
                        borderRadius: "6px",
                        fontWeight: "bold",
                    }}
                >
                    Zurück zur Startseite
                </Link>
            </div>
        </div>
    );
}
