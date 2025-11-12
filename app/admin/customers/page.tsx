import React from "react";
import Customer from "@/app/components/Customer";
import { db } from "@/util/supabase/drizzle";
import { customers } from "@/util/supabase/schema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/authOptions";

export default async function AdminCustomersPage() {
    const allCustomers = await db.select().from(customers);

    const session = await getServerSession(authOptions);
    if (!session) {
        return (
            "ACCESS DENIED"
        )
    }

    return (
        <div style={{ padding: "24px", background: "#f7f8fa", minHeight: "100vh" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>Kundenverwaltung</h1>

                <div
                    style={{
                        marginTop: "20px",
                        borderRadius: "12px",
                        background: "#ffffff",
                        boxShadow: "0 6px 18px rgba(17,24,39,0.06)",
                        border: "1px solid #eef2f6",
                        overflow: "hidden",
                    }}
                >
                    <div style={{ overflowX: "auto", width: "100%" }}>
                        <table
                            style={{
                                borderCollapse: "separate",
                                borderSpacing: 0,
                                width: "100%",
                                minWidth: 1100,
                            }}
                        >
                            <thead>
                                <tr
                                    style={{
                                        background: "#fbfdff",
                                        borderBottom: "1px solid #eef2f6",
                                    }}
                                >
                                    <th style={{ textAlign: "left", padding: "14px 16px", minWidth: 80, fontSize: 13, color: "#111827" }}>ID</th>
                                    <th style={{ textAlign: "left", padding: "14px 16px", minWidth: 140, fontSize: 13, color: "#111827" }}>Name</th>
                                    <th style={{ textAlign: "left", padding: "14px 16px", minWidth: 220, fontSize: 13, color: "#111827" }}>Adresse</th>
                                    <th style={{ textAlign: "left", padding: "14px 16px", minWidth: 140, fontSize: 13, color: "#111827" }}>PLZ Stadt</th>
                                    <th style={{ textAlign: "left", padding: "14px 16px", minWidth: 120, fontSize: 13, color: "#111827" }}>Land</th>
                                    <th style={{ textAlign: "left", padding: "14px 16px", minWidth: 200, fontSize: 13, color: "#111827" }}>Email</th>
                                    <th style={{ textAlign: "right", padding: "14px 16px", minWidth: 80, fontSize: 13, color: "#111827" }}>Menge</th>
                                    <th style={{ textAlign: "left", padding: "14px 16px", minWidth: 100, fontSize: 13, color: "#111827" }}>Bezahlt</th>
                                    <th style={{ textAlign: "left", padding: "14px 16px", minWidth: 140, fontSize: 13, color: "#111827" }}>Versand</th>
                                    <th style={{ textAlign: "left", padding: "14px 16px", minWidth: 260, fontSize: 13, color: "#111827" }}>Aktionen</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allCustomers.map((customer) => (
                                    <Customer key={customer.id} customer={customer} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
