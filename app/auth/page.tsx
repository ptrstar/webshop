"use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthPage() {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (status === "loading") return <div>Loading...</div>;

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user?.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (res?.error) setError("Invalid credentials");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input value={username} onChange={e => setUsername(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
      </div>
      <button type="submit">Sign in</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
