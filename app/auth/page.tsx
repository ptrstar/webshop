"use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Input, Button, Card, CardBody, CardHeader, CardFooter } from "@heroui/react";

export default function AuthPage() {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (status === "loading") return <div>Loading...</div>;

  if (session) {
    return (
      <Card style={{ maxWidth: 400, margin: "40px auto" }}>
        <CardHeader>
          <h5 style={{ margin: 0 }}>Admin Panel</h5>
        </CardHeader>
        <CardBody>
          <p>Signed in as <b>{session.user?.name}</b></p>
        </CardBody>
        <CardFooter>
          <Button color="primary" onClick={() => signOut()} fullWidth>
            Sign out
          </Button>
        </CardFooter>
      </Card>
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
    <Card style={{ maxWidth: 400, margin: "40px auto" }}>
      <CardHeader>
        <h5 style={{ margin: 0 }}>Admin Login</h5>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardBody>
          <Input
            label="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            fullWidth
            required
            autoFocus
            style={{ marginBottom: 16 }}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            required
            style={{ marginBottom: 8 }}
          />
          {error && (
            <p style={{ color: "red", marginTop: 8 }}>
              {error}
            </p>
          )}
        </CardBody>
        <CardFooter>
          <Button color="primary" type="submit" fullWidth>
            Sign in
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
