import React from "react";

// Adjust fields as needed based on your customer schema
export default function CustomerInfo({ customer }: { customer: any }) {
    return (
        <div
            style={{
                marginTop: "30px",
                padding: "32px",
                borderRadius: "12px",
                background: "#f8f8f8",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                maxWidth: "400px",
                width: "100%",
            }}
        >
            <div
                style={{
                    background: "#4caf50",
                    color: "#fff",
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    textAlign: "center",
                }}
            >
                Vielen Dank für Ihren Einkauf!
            </div>
            <h2 style={{ marginBottom: "18px" }}>Kundendaten</h2>
            <div style={{ marginBottom: "10px" }}>
                <strong>Name:</strong> {customer.name}
            </div>
            <div style={{ marginBottom: "10px" }}>
                <strong>Email:</strong> {customer.email}
            </div>
            <div style={{ marginBottom: "10px" }}>
                <strong>Lieferadresse:</strong>
                <div>
                    {customer.streetName} {customer.streetNr}<br />
                    {customer.postalCode} {customer.city}<br />
                    {customer.country}
                </div>
            </div>
            <div style={{ marginBottom: "10px" }}>
                <strong>Status:</strong>{" "}
                {customer.isPayed ? (
                    <span style={{ color: "green" }}>Bezahlt</span>
                ) : (
                    <span style={{ color: "red" }}>Offen</span>
                )}
            </div>
            <div style={{ marginBottom: "10px" }}>
                <strong>Bezahlt am:</strong>{" "}
                {customer.payed_at ? new Date(customer.payed_at).toLocaleString("de-DE") : "Noch nicht bezahlt"}
            </div>
            <div style={{ marginTop: "18px", fontWeight: "bold" }}>
                {!customer.isShipped ? (
                    <span>Versand läuft – Ihr Paket wird in Kürze verschickt.</span>
                ) : (
                    <span>Ihr Paket wurde versendet und sollte in den nächsten Tagen ankommen.</span>
                )}
            </div>
        </div>
    );
}
