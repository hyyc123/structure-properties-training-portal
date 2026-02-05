export default function HomePage() {
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
          maxWidth: 760,
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 18,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
          boxShadow: "0 14px 50px rgba(0,0,0,0.55)",
          padding: 22,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>
          Structure Properties Training Portal
        </h1>
        <p style={{ marginTop: 8, marginBottom: 0, color: "#a7b4d6" }}>
          Coming soon
        </p>

        <div
          style={{
            marginTop: 18,
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            background: "rgba(0,0,0,0.18)",
            padding: 16,
            color: "#a7b4d6",
            lineHeight: 1.5,
            fontSize: 14,
          }}
        >
          This portal is under construction. Training modules will appear here
          soon.
        </div>

        <div style={{ marginTop: 18 }}>
          <a
            href="/login"
            style={{
              display: "inline-block",
              padding: "10px 14px",
              borderRadius: 14,
              border: "1px solid rgba(110,231,183,0.35)",
              background:
                "linear-gradient(180deg, rgba(110,231,183,0.22), rgba(110,231,183,0.12))",
              color: "#e9eefc",
              fontWeight: 800,
              textDecoration: "none",
              fontSize: 13,
            }}
          >
            Go to Login
          </a>
        </div>
      </div>
    </main>
  );
}
