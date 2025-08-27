import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

type OrderFormProps = {
  onSuccess?: (data: any) => void;
};

export default function OrderForm({ onSuccess }: OrderFormProps) {
  const [form, setForm] = useState({
    name: "",
    street: "",
    number: "",
    postalcode: "",
    city: "",
    country: "Schweiz",
    email: "",
    amount: "",
  });
  const [status, setStatus] = useState<null | { success: true; id: string } | { success: false; reason: string }>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: name === "amount" ? value.replace(/\D/, "") : value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await fetch("/api/register_customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus({ success: false, reason: data?.reason || "Unbekannter Fehler" });
        return;
      }
      const data = await res.json();
      setStatus({ success: true, id: data.id });
      if (onSuccess) onSuccess(data);
    } catch (err: any) {
      setStatus({ success: false, reason: err?.message || "Netzwerkfehler" });
    }
  }

  if (status?.success) {
    // Don't render anything if onSuccess is provided (parent handles thank you)
    if (onSuccess) return null;
    return (
      <div style={{ marginTop: 32, textAlign: "center" }}>
        <div style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: 12 }}>
          Vielen Dank für Ihre Bestellung!
        </div>
        <div>
          Ihre Bestellnummer: <span style={{ fontWeight: 600 }}>{status.id}</span>
        </div>
      </div>
    );
  }

  if (status && !status.success) {
    return (
      <div style={{ marginTop: 32, textAlign: "center" }}>
        <div style={{ color: "#c00", fontWeight: 700, marginBottom: 8 }}>
          Fehler: {status.reason}
        </div>
        <Button color="primary" onClick={() => setStatus(null)}>
          Erneut versuchen
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginTop: "32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        width: "100%",
      }}
      autoComplete="off"
    >
      <Input
        name="name"
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
        fullWidth
      />
      <div style={{ display: "flex", gap: 8, width: "100%" }}>
        <Input
          name="street"
          type="text"
          placeholder="Strasse"
          value={form.street}
          onChange={handleChange}
          required
          style={{ width: "70%", minWidth: 0 }}
        />
        <Input
          name="number"
          type="text"
          placeholder="Nr."
          value={form.number || ""}
          onChange={handleChange}
          required
          style={{ width: "30%", minWidth: 0 }}
        />
      </div>
      <div style={{ display: "flex", gap: 8, width: "100%" }}>
        <Input
          name="postalcode"
          type="text"
          placeholder="PLZ"
          value={form.postalcode}
          onChange={handleChange}
          required
          style={{ width: "40%", minWidth: 0 }}
        />
        <Input
          name="city"
          type="text"
          placeholder="Ort"
          value={form.city}
          onChange={handleChange}
          required
          style={{ width: "60%", minWidth: 0 }}
        />
      </div>
      <Input
        name="country"
        type="text"
        placeholder="Land"
        value={form.country}
        onChange={handleChange}
        required
        fullWidth
      />
      <div style={{ display: "flex", gap: 8, width: "100%" }}>
        <Input
          name="email"
          type="email"
          placeholder="E-Mail"
          value={form.email}
          onChange={handleChange}
          required
          fullWidth
        />
        <Input
          name="amount"
          type="number"
          min={1}
          step={1}
          placeholder="Anzahl Spiele"
          color="warning"
          variant="underlined"
          value={form.amount}
          onChange={handleChange}
          required
          fullWidth
          inputMode="numeric"
          pattern="[0-9]*"
        />
      </div>
      <Button color="primary" type="submit" style={{ marginTop: 8, width: "100%" }}>
        Weiter
      </Button>
    </form>
  );
}