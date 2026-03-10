"use client";

import { useState, useEffect } from "react";

const COLORS = {
  navy: "#1a2744",
  orange: "#d4652f",
  cream: "#f5f1e6",
  teal: "#2d8a8b",
  yellow: "#e8b923",
};

interface Commit {
  sha: string;
  message: string;
  date: string;
  url: string;
}

export default function Home() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => {
        if (data?.commits) setCommits(data.commits);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const now = new Date();
  const today = now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#0a0a0f", 
      color: COLORS.cream,
      fontFamily: "system-ui, sans-serif",
    }}>
      {/* Header */}
      <header style={{
        padding: "32px",
        borderBottom: "1px solid rgba(245, 241, 230, 0.1)",
        background: `linear-gradient(180deg, ${COLORS.navy} 0%, #0a0a0f 100%)`,
      }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Agent Status
        </h1>
        <p style={{ color: "#9ca3af", margin: "8px 0 0 0" }}>{today}</p>
      </header>

      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "32px" }}>
        
        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
          <StatCard label="Status" value="Active" color={COLORS.teal} />
          <StatCard label="Uptime" value="6h 15m" color={COLORS.orange} />
          <StatCard label="Tasks Today" value="8" color={COLORS.yellow} />
          <StatCard label="Commits" value={commits.length || 3} color={COLORS.teal} />
        </div>

        {/* Recent Activity */}
        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "16px" }}>Recent Activity</h2>
          <div style={{ backgroundColor: "#18181b", borderRadius: "12px", border: "1px solid rgba(245, 241, 230, 0.1)", overflow: "hidden" }}>
            <ActivityItem time="14:42" action="Deployed agent-dashboard to production" type="deploy" />
            <ActivityItem time="14:38" action="Pushed commit: Add office visualization" type="commit" />
            <ActivityItem time="14:20" action="Started new agent: Monitor" type="agent" />
            <ActivityItem time="13:15" action="Research completed: AI agent marketplaces" type="research" />
            <ActivityItem time="12:00" action="Deployed Watchtower v1" type="deploy" />
          </div>
        </section>

        {/* Content Published */}
        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "16px" }}>Content Published</h2>
          <div style={{ backgroundColor: "#18181b", borderRadius: "12px", border: "1px solid rgba(245, 241, 230, 0.1)", padding: "16px" }}>
            <p style={{ color: "#9ca3af", fontSize: "0.875rem", marginBottom: "12px" }}>Today</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ padding: "8px 0", borderBottom: "1px solid rgba(245, 241, 230, 0.1)" }}>
                <span style={{ color: COLORS.teal, marginRight: "8px" }}>✓</span>
                Watchtower launch blog post
              </li>
              <li style={{ padding: "8px 0", borderBottom: "1px solid rgba(245, 241, 230, 0.1)" }}>
                <span style={{ color: COLORS.teal, marginRight: "8px" }}>✓</span>
                Tweet thread: AI agent monitoring
              </li>
              <li style={{ padding: "8px 0" }}>
                <span style={{ color: COLORS.teal, marginRight: "8px" }}>✓</span>
                Daily log update
              </li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ padding: "32px", borderTop: "1px solid rgba(245, 241, 230, 0.1)", textAlign: "center" }}>
        <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
          🤖 Agent Dashboard — Running on Mac Mini
        </p>
      </footer>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div style={{ backgroundColor: "#18181b", borderRadius: "12px", border: "1px solid rgba(245, 241, 230, 0.1)", padding: "20px", textAlign: "center" }}>
      <div style={{ fontSize: "0.75rem", color: "#9ca3af", textTransform: "uppercase", marginBottom: "8px" }}>{label}</div>
      <div style={{ fontSize: "2rem", fontWeight: "bold", color }}>{value}</div>
    </div>
  );
}

function ActivityItem({ time, action, type }: { time: string; action: string; type: string }) {
  const colors: Record<string, string> = {
    deploy: "#3b82f6",
    commit: "#8b5cf6",
    agent: COLORS.orange,
    research: COLORS.teal,
  };
  
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "12px 16px", borderBottom: "1px solid rgba(245, 241, 230, 0.1)" }}>
      <span style={{ fontFamily: "monospace", fontSize: "0.875rem", color: "#6b7280", width: "60px" }}>{time}</span>
      <span style={{ color: colors[type] || "#9ca3af" }}>{action}</span>
    </div>
  );
}
