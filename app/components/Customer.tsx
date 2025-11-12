"use client";
import React, { useState } from "react";

export default function Customer({ customer }: { customer: any }) {
    const [loading, setLoading] = useState(false);

    const canDelete = !customer.isPayed || customer.isShipped; // delete allowed when not paid OR already shipped
    const canSend = customer.isPayed && !customer.isShipped; // send allowed when paid but not yet shipped

    async function handleShip() {
        if (!confirm("Versand als gesendet markieren?")) return;
        setLoading(true);
        try {
            const res = await fetch("/api/customers/ship", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: customer.id }),
            });
            if (!res.ok) throw new Error("Ship request failed");
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Fehler beim Setzen des Versandstatus.");
            setLoading(false);
        }
    }

    async function handleDelete() {
        if (!confirm("Datensatz wirklich löschen?")) return;
        setLoading(true);
        try {
            const res = await fetch("/api/customers/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: customer.id }),
            });
            if (!res.ok) throw new Error("Delete request failed");
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Fehler beim Löschen des Datensatzes.");
            setLoading(false);
        }
    }

    return (
        <tr style={{ background: "#fff" }}>
            <td style={{ padding: "12px", borderBottom: "1px solid #e0e0e0", minWidth: 80 }}>
                <strong>{customer.id}</strong>
            </td>
            <td style={{ padding: "12px", borderBottom: "1px solid #e0e0e0", minWidth: 140 }}>
                {customer.name}
            </td>
            <td style={{ padding: "12px", borderBottom: "1px solid #e0e0e0", minWidth: 220 }}>
                {customer.streetName} {customer.streetNr}
            </td>
            <td style={{ padding: "12px", borderBottom: "1px solid #e0e0e0", minWidth: 140 }}>
                {customer.postalCode} {customer.city}
            </td>
            <td style={{ padding: "12px", borderBottom: "1px solid #e0e0e0", minWidth: 120 }}>
                {customer.country}
            </td>
            <td style={{ padding: "12px", borderBottom: "1px solid #e0e0e0", minWidth: 200 }}>
                {customer.email}
            </td>
            <td style={{ padding: "12px", borderBottom: "1px solid #e0e0e0", minWidth: 80, textAlign: "right" }}>
                {customer.amount}
            </td>
            <td style={{ padding: "12px", borderBottom: "1px solid #e0e0e0", minWidth: 100 }}>
                <span style={{ color: customer.isPayed ? "green" : "red" }}>
                    {customer.isPayed ? "Bezahlt" : "Offen"}
                </span>
            </td>
            <td style={{ padding: "12px", borderBottom: "1px solid #e0e0e0", minWidth: 140 }}>
                <span style={{ color: customer.isShipped ? "green" : "orange" }}>
                    {customer.isShipped ? "Versendet" : "Ausstehend"}
                </span>
            </td>
            <td style={{ padding: "12px", borderBottom: "1px solid #e0e0e0", minWidth: 260 }}>
                <div style={{ display: "flex", gap: 8 }}>
                    {/* Versenden button: only when paid but not shipped */}
                    {canSend && (
                        <button
                            onClick={handleShip}
                            disabled={loading}
                            style={{
                                padding: "6px 12px",
                                background: "#FF9800",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "0.9rem",
                            }}
                            aria-label={`Versenden ${customer.id}`}
                        >
                            {loading ? "..." : "Versenden"}
                        </button>
                    )}

                    {/* Löschen button: only enabled when not paid OR already shipped */}
                    <button
                        onClick={handleDelete}
                        disabled={loading || !canDelete}
                        style={{
                            padding: "6px 12px",
                            background: canDelete ? "#f44336" : "#ddd",
                            color: canDelete ? "#fff" : "#666",
                            border: "none",
                            borderRadius: "4px",
                            cursor: canDelete ? "pointer" : "not-allowed",
                            fontSize: "0.9rem",
                        }}
                        aria-label={`Löschen ${customer.id}`}
                    >
                        {loading ? "..." : "Löschen"}
                    </button>
                </div>
            </td>
        </tr>
    );
}
