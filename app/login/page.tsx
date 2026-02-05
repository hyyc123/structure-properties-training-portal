"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const ALLOWED_DOMAIN = "@structureproperties.com";

export default function LoginPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInOrSignUp() {
    setStatus("");

    const name = fullName.trim();
    const emailClean = email.trim().toLowerCase();

    if (!name) {
      setStatus("Please enter your full name.");
      return;
    }

    if (!emailClean || !password) {
      setStatus("Email and password are required.");
      return;
    }

    if (!emailClean.endsWith(ALLOWED_DOMAIN)) {
      setStatus(`Only ${ALLOWED_DOMAIN} emails are allowed.`);
      return;
    }

    setLoading(true);

    try {
      // Try sign-in first
      let { error } = await supabase.auth.signInWithPassword({
        email: emailClean,
        password,
      });

      // If user doesn't exist, sign them up
      if (error) {
        const signUp = await supabase.auth.signUp({
          email: emailClean,
          password,
        });

        if (signUp.error) {
          throw signUp.error;
        }
      }

      // Save name + email for later exports
      localStorage.setItem("sp_full_name", name);
      localStorage.setItem("sp_email", emailClean);

      // Redirect to portal
      window.location.href = "/";
    } catch (err: any) {
      setStatus(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 18,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
          boxShadow: "0 14px 50px rgba(0,0,0,0.55)",
          padding: 22,
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src="/logo.png"
            alt="Structure Properties"
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.08)",
              objectFit: "cover",
            }}
          />
          <div>
            <div style={{ fontSize: 18, fontWeight: 900 }}>
              Structure Properties Training Portal
            </div>
            <div style={{ fontSize: 13, color: "#a7b4d6", marginTop: 2 }}>
              Sign in (Structure Properties only)
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
          <input
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(0,0,0,0.18)",
              color: "#e9eefc",
            }}
          />

          <input
            placeholder={`name${ALLOWED_DOMAIN}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(0,0,0,0.18)",
              color: "#e9eefc",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(0,0,0,0.18)",
              color: "#e9eefc",
            }}
          />

          <button
            onClick={signInOrSignUp}
            disabled={loading}
            style={{
              padding: "12px",
              borderRadius: 14,
              border: "1px solid rgba(110,231,183,0.35)",
              background:
                "linear-gradient(180deg, rgba(110,231,183,0.22), rgba(110,231,183,0.12))",
              fontWeight: 900,
              color: "#e9eefc",
              cursor: "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing in..." : "Sign in / Create account"}
          </button>

          {status && (
            <div style={{ fontSize: 13, color: "#fb7185" }}>{status}</div>
          )}
        </div>
      </div>
    </main>
  );
}
