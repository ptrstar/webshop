import React from "react";
import Customer from "@/app/components/Customer";
import { db } from "@/util/supabase/drizzle";
import { customers } from "@/util/supabase/schema";

export default async function AdminCustomersPage() {
    const allCustomers = await db.select().from(customers);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Kundenverwaltung</h1>
            <div
                style={{
                    overflowX: "auto",
                    borderRadius: "8px",
                    border: "1px solid #e0e0e0",
                    marginTop: "20px",
                }}
            >
                <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 1100 }}>
                    <thead>
                        <tr style={{ background: "#f5f5f5", borderBottom: "2px solid #e0e0e0" }}>
                            <th style={{ textAlign: "left", padding: "12px", minWidth: 80 }}>ID</th>
                            <th style={{ textAlign: "left", padding: "12px", minWidth: 140 }}>Name</th>
                            <th style={{ textAlign: "left", padding: "12px", minWidth: 220 }}>Adresse</th>
                            <th style={{ textAlign: "left", padding: "12px", minWidth: 140 }}>PLZ Stadt</th>
                            <th style={{ textAlign: "left", padding: "12px", minWidth: 120 }}>Land</th>
                            <th style={{ textAlign: "left", padding: "12px", minWidth: 200 }}>Email</th>
                            <th style={{ textAlign: "right", padding: "12px", minWidth: 80 }}>Menge</th>
                            <th style={{ textAlign: "left", padding: "12px", minWidth: 100 }}>Bezahlt</th>
                            <th style={{ textAlign: "left", padding: "12px", minWidth: 140 }}>Versand</th>
                            <th style={{ textAlign: "left", padding: "12px", minWidth: 260 }}>Aktionen</th>
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
    );
}
