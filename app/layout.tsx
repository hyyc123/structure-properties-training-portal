export const metadata = {
  title: "Structure Properties Training Portal",
  description: "Coming soon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background:
            "radial-gradient(1200px 700px at 10% 10%, rgba(96,165,250,0.18), transparent 55%), radial-gradient(1000px 600px at 90% 20%, rgba(110,231,183,0.12), transparent 60%), #0b0f19",
          color: "#e9eefc",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        }}
      >
        {children}
      </body>
    </html>
  );
}
