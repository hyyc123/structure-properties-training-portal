export default function LoginPage() {
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
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(0,0,0,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* Logo will load once we upload /public/logo.png */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="QuarterSmart Logo"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                // If logo isn't uploaded yet, show simple initials
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <span style={{ fontWeight: 900, fontSize: 14 }}>QS</span>
          </div>

          <div>
            <div style={{ fontSize: 18, fontWeight: 900 }}>
              Structure Properties Training Portal
            </div>
            <div style={{ fontSize: 13, color: "#a7b4d6", marginTop: 2 }}>
              Sign in (restricted to @structureproperties.com)
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
          <div>
            <div style={{ fontSize: 12, color: "#a7b4d6" }}>Full name</div>
            <input
              placeholder="e.g., Jane Doe"
              style={{
                marginTop: 6,
                width: "100%",
                padding: "12px 12px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(0,0,0,0.18)",
                color: "#e9eefc",
                outline: "none",
              }}
            />
          </div>

          <div>
            <div style={{ fontSize: 12, color: "#a7b4d6" }}>Work email</div>
            <input
              placeholder="name@structureproperties.com"
              style={{
                marginTop: 6,
                width: "100%",
                padding: "12px 12px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(0,0,0,0.18)",
                color: "#e9eefc",
                outline: "none",
              }}
            />
            <div style={{ fontSize: 12, color: "#a7b4d6", marginTop: 8 }}>
              (Next step: this will send a Supabase magic link and block non-Structure Properties emails.)
            </div>
          </div>

          <button
            type="button"
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 14,
              border: "1px solid rgba(110,231,183,0.35)",
              background:
                "linear-gradient(180deg, rgba(110,231,183,0.22), rgba(110,231,183,0.12))",
              color: "#e9eefc",
              fontWeight: 900,
              cursor: "pointer",
            }}
            onClick={() => {
              alert("Coming soon — next step we wire this to Supabase login.");
            }}
          >
            Send Magic Link (Coming Soon)
          </button>

          <a
            href="/"
            style={{
              display: "inline-block",
              textAlign: "center",
              padding: "10px 14px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.06)",
              color: "#e9eefc",
              fontWeight: 800,
              textDecoration: "none",
              fontSize: 13,
            }}
          >
            Back to Portal
          </a>
        </div>
      </div>
    </main>
  );
}
