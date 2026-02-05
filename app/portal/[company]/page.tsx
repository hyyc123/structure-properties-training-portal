"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "../../../lib/supabaseClient";

export default function CompanyPortalPage({
  params,
}: {
  params: { company: string };
}) {
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("Loading…");

  useEffect(() => {
    (async () => {
      const supabase = getSupabaseClient();
      if (!supabase) {
        setMsg("Supabase not configured (missing env vars).");
        setLoading(false);
        return;
      }

      // Must be signed in
      const { data: userRes } = await supabase.auth.getUser();
      const user = userRes.user;

      if (!user) {
        window.location.href = "/login";
        return;
      }

      // Get their profile (RLS ensures only their own row is visible)
      const { data: profile, error: profileErr } = await supabase
        .from("profiles")
        .select("company_id, full_name, email")
        .eq("user_id", user.id)
        .single();

      if (profileErr || !profile) {
        setMsg("No profile found. Please contact an admin.");
        setLoading(false);
        return;
      }

      // Resolve company slug from company_id
      const { data: companyRow, error: companyErr } = await supabase
        .from("companies")
        .select("slug, name")
        .eq("id", profile.company_id)
        .single();

      if (companyErr || !companyRow) {
        setMsg("Company not found.");
        setLoading(false);
        return;
      }

      // Enforce: user can ONLY view their own portal
      if (companyRow.slug !== params.company) {
        window.location.href = `/portal/${companyRow.slug}`;
        return;
      }

      setMsg(
        `Coming soon — ${companyRow.name} portal. Signed in as ${profile.full_name} (${profile.email}).`
      );
      setLoading(false);
    })();
  }, [params.company]);

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900 }}>
        Portal: {params.company}
      </h1>

      <div
        style={{
          marginTop: 12,
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          background: "rgba(0,0,0,0.18)",
          padding: 16,
          color: loading ? "#a7b4d6" : "#e9eefc",
          lineHeight: 1.5,
          fontSize: 14,
        }}
      >
        {msg}
      </div>

      <div style={{ marginTop: 14 }}>
        <a
          href="/login"
          style={{ color: "#a7b4d6", textDecoration: "none", fontWeight: 800 }}
        >
          ← Back to login
        </a>
      </div>
    </main>
  );
}
