"use client";

import React from "react";
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

  // Group users by period (day, month, year) for interleaved display
  function groupUsersByPeriod(users: InterestUser[]) {
    const now = new Date();
    const groups: {
      key: string;
      label: string;
      users: InterestUser[];
      count: number;
      order: number;
    }[] = [];
    const byDay: Record<string, InterestUser[]> = {};
    const byMonth: Record<string, InterestUser[]> = {};
    const byYear: Record<string, InterestUser[]> = {};

    users.forEach(u => {
      if (!u.createdAt) return;
      const d = new Date(u.createdAt);
      const dayKey = d.toISOString().slice(0, 10); // YYYY-MM-DD
      const monthKey = d.toISOString().slice(0, 7); // YYYY-MM
      const yearKey = d.getFullYear().toString();
      const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays <= 6) {
        byDay[dayKey] = byDay[dayKey] || [];
        byDay[dayKey].push(u);
      } else if (diffDays <= 31) {
        byMonth[monthKey] = byMonth[monthKey] || [];
        byMonth[monthKey].push(u);
      } else {
        byYear[yearKey] = byYear[yearKey] || [];
        byYear[yearKey].push(u);
      }
    });

    // Days (last 7 days)
    Object.entries(byDay)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .forEach(([day, users]) => {
        const date = new Date(day);
        const label = `${date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}`;
        groups.push({
          key: `day-${day}`,
          label: label,
          users,
          count: users.length,
          order: new Date(day).getTime(),
        });
      });

    // Months (last month, excluding days already shown)
    Object.entries(byMonth)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .forEach(([month, users]) => {
        const [y, m] = month.split("-");
        const label = `${new Date(Number(y), Number(m) - 1).toLocaleString(undefined, { month: "long", year: "numeric" })}`;
        groups.push({
          key: `month-${month}`,
          label: `Im letzten Monat (${label})`,
          users,
          count: users.length,
          order: new Date(Number(y), Number(m) - 1).getTime(),
        });
      });

    // Years (older)
    Object.entries(byYear)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .forEach(([year, users]) => {
        groups.push({
          key: `year-${year}`,
          label: `Im Jahr ${year}`,
          users,
          count: users.length,
          order: new Date(Number(year), 0).getTime(),
        });
      });

    // Sort groups by order descending (most recent first)
    groups.sort((a, b) => b.order - a.order);

    return groups;
  }

  const groupedUserStats = groupUsersByPeriod(userData);

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
            <div style={{ fontSize: 14, marginTop: 8 }}>
            {progressValue.toFixed(2)}% of goal
            </div>
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
            <>
              {groupedUserStats.map(group => (
                <React.Fragment key={group.key}>
                  <TableRow>
                    <TableCell colSpan={4} style={{ background: "#f9fafb", fontStyle: "italic", color: "#6b7280" }}>
                      {group.label}: <b>{group.count}</b> neue Einträge
                    </TableCell>
                  </TableRow>
                  {group.users.map((user, idx) => (
                    <TableRow key={user.email + user.createdAt}>
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
                  ))}
                </React.Fragment>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
}