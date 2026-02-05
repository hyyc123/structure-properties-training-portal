"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { getSupabaseClient } from "../../lib/supabaseClient";

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

    if (!name) return setStatus("Please enter your full name.");
    if (!emailClean || !password) return setStatus("Email and password are required.");
    if (!emailClean.endsWith(ALLOWED_DOMAIN))
      return setStatus(`Only ${ALLOWED_DOMAIN} emails are allowed.`);

    const supabase = getSupabaseClient();
    if (!supabase) {
      setStatus("Supabase is not configured (missing env vars in Vercel).");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: emailClean,
        password,
      });

      if (error) {
        const signUp = await supabase.auth.signUp({
          email: emailClean,
          password,
        });
        if (signUp.error) throw signUp.error;
      }

      localStorage.setItem("sp_full_name", name);
      localStorage.setItem("sp_email", emailClean);

      window.location.href = "/";
    } catch (err: any) {
      setStatus(err?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  const domainValid = !email || email.trim().toLowerCase().endsWith(ALLOWED_DOMAIN);

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
          borderRadius: 22,
          border: "1px solid rgba(255,255,255,0.08)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
          boxShadow: "0 18px 70px rgba(0,0,0,0.6)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: 6,
            background:
              "linear-gradient(90deg, rgba(96,165,250,0.85), rgba(110,231,183,0.85))",
          }}
        />

        <div style={{ padding: 26 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 26,
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(0,0,0,0.28)",
                boxShadow: "0 14px 40px rgba(0,0,0,0.55)",
                overflow: "hidden",
              }}
            >
              <img
                src="/logo.png"
                alt="QuarterSmart"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div style={{ marginTop: 14, textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 950 }}>QuarterSmart Sign In</div>
              <div style={{ marginTop: 6, fontSize: 13, color: "#a7b4d6", lineHeight: 1.5 }}>
                Structure Properties Training Portal
                <br />
                <span>
                  Access restricted to <b>{ALLOWED_DOMAIN}</b>
                </span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
            <Field label="Full name">
              <input
                placeholder="e.g., Hyrum Hurst"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={inputStyle}
              />
            </Field>

            <Field label="Work email">
              <input
                placeholder={`name${ALLOWED_DOMAIN}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  ...inputStyle,
                  borderColor: domainValid ? "rgba(255,255,255,0.08)" : "rgba(251,113,133,0.55)",
                }}
              />
              <div
                style={{
                  marginTop: 6,
                  fontSize: 12,
                  color: domainValid ? "#a7b4d6" : "#fb7185",
                }}
              >
                {domainValid
                  ? `Only ${ALLOWED_DOMAIN} emails can sign in.`
                  : `Use your ${ALLOWED_DOMAIN} email.`}
              </div>
            </Field>

            <Field label="Password">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />
            </Field>

            <button
              onClick={signInOrSignUp}
              disabled={loading}
              style={{
                padding: "12px 14px",
                borderRadius: 14,
                border: "1px solid rgba(110,231,183,0.35)",
                background:
                  "linear-gradient(180deg, rgba(110,231,183,0.22), rgba(110,231,183,0.12))",
                fontWeight: 950,
                color: "#e9eefc",
                cursor: "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Signing in..." : "Sign in / Create account"}
            </button>

            {status ? (
              <div style={{ fontSize: 13, color: "#fb7185", lineHeight: 1.4 }}>{status}</div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: "#a7b4d6", fontWeight: 850 }}>{label}</div>
      <div style={{ marginTop: 6 }}>{children}</div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(0,0,0,0.18)",
  color: "#e9eefc",
  outline: "none",
};
