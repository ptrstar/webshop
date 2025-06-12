"use client";

import { useEffect, useState } from "react";
import { Progress } from "@heroui/progress";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableColumn, Button } from "@heroui/react";
import { TrashIcon } from "@heroicons/react/24/outline";

type InterestUser = {
  email: string;
  amount: number;
  createdAt?: string;
};

export default function Page() {
  const [userData, setUserData] = useState<InterestUser[]>([]);
  const [state, setState] = useState("Laden");

  useEffect(() => {
    fetch("/api/get_all")
      .then(async res => {
        const data = await res.json();
        if (res.status !== 200) {
          setState("Folgender Fehler aufgetreten: " + (data.error || "Unbekannter Fehler"));
        } else {
          setUserData(data);
          setState("");
        }
      })
      .catch(() => {
        setState("Unangenehmer Fehler");
      });
  }, []);

  const target_amt = 200;

  const totalUsers = userData.length;
  const totalAmount = userData.reduce((sum, user) => sum + (user.amount || 0), 0);
  const progressValue = Math.min((totalAmount / target_amt) * 100, target_amt);

  async function handleDelete(email: string) {
    const res = await fetch("/api/delete_interested", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      setUserData(users => users.filter(u => u.email !== email));
    } else {
      alert("Fehler beim Löschen");
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 24 }}>Admin</h1>
      {/* Summary Boxes */}
      <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>
        <div style={{ flex: 1, background: "#f3f4f6", borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Total Users</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{totalUsers}</div>
        </div>
        <div style={{ flex: 1, background: "#f3f4f6", borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Total Amount</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{totalAmount}/{target_amt}</div>
        </div>
        <div style={{ flex: 2, background: "#f3f4f6", borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Progress</div>
          <Progress aria-label="Progress" value={progressValue} color="success" />
          <div style={{ fontSize: 14, marginTop: 8 }}>{progressValue}% of goal</div>
        </div>
      </div>
      {/* User Table */}
      <Table aria-label="User Data Table">
        <TableHeader>
          <TableColumn>Email</TableColumn>
          <TableColumn>Amount</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {state != "" ? (
            <TableRow>
              <TableCell colSpan={4}>{state}...</TableCell>
            </TableRow>
          ) : (
            userData.map((user, idx) => (
              <TableRow key={idx}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.amount}</TableCell>
                <TableCell>{user.createdAt ? new Date(user.createdAt).toLocaleString() : ""}</TableCell>
                <TableCell>
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    aria-label="Löschen"
                    onClick={() => handleDelete(user.email)}
                    style={{
                      color: "#9ca3af",
                      transition: "color 0.2s",
                      padding: 0,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#dc2626")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#9ca3af")}
                  >
                    <TrashIcon width={18} height={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}