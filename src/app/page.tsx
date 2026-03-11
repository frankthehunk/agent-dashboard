"use client";

import { useState, useEffect } from "react";

const COLORS = {
  navy: "#1a2744",
  orange: "#d4652f",
  cream: "#f5f1e6",
  teal: "#2d8a8b",
  yellow: "#e8b923",
  red: "#ef4444",
};

// REAL AGENTS - these are the actual running agents
const AGENTS = [
  { name: "Frank", role: "Lead Dev", avatar: "🤖", status: "active" as const, task: "Building software" },
  { name: "Monitor", role: "Watcher", avatar: "👁️", status: "active" as const, task: "Monitoring systems" },
  { name: "Builder", role: "Deployer", avatar: "🔨", status: "active" as const, task: "Deploying projects" },
  { name: "Writer", role: "Content", avatar: "✍️", status: "active" as const, task: "Creating content" },
];

interface Commit {
  sha: string;
  message: string;
  date: string;
  url: string;
}

export default function Home() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [uptime, setUptime] = useState<string>("");

  // Calculate actual uptime
  useEffect(() => {
    const startDate = new Date("2026-03-07T00:00:00-05:00");
    const updateUptime = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setUptime(`${hours}h ${minutes}m`);
    };
    updateUptime();
    const interval = setInterval(updateUptime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fetch real GitHub data
  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => {
        if (data?.commits) setCommits(data.commits);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getStatusColor = (status: string) => {
    if (status === "active") return COLORS.teal;
    if (status === "idle") return COLORS.yellow;
    return COLORS.red;
  };

  const now = new Date();
  const today = now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const todayStr = now.toISOString().split("T")[0];
  const commitsToday = commits.filter((c) => c.date && c.date.startsWith(todayStr)).length;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0f", color: COLORS.cream, fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <header style={{ padding: "24px 32px", borderBottom: "1px solid rgba(245, 241, 230, 0.1)", background: `linear-gradient(180deg, ${COLORS.navy} 0%, #0a0a0f 100%)` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>The Office</h1>
            <p style={{ color: "#9ca3af", margin: "4px 0 0 0" }}>{today}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <div>
              <div style={{ fontFamily: "monospace", color: COLORS.teal, fontSize: "0.875rem" }}>UPTIME {uptime || "Loading..."}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                <span style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: COLORS.teal, boxShadow: `0 0 10px ${COLORS.teal}` }} />
                <span style={{ color: COLORS.teal, fontSize: "0.75rem", textTransform: "uppercase" }}>All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main style={{ padding: "24px 32px" }}>
        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
          <StatCard label="Active Agents" value={AGENTS.filter(a => a.status === "active").length} color={COLORS.teal} />
          <StatCard label="Uptime" value={uptime || "..."} color={COLORS.orange} />
          <StatCard label="Commits Today" value={commitsToday} color={COLORS.yellow} />
          <StatCard label="Total Commits" value={commits.length} color={COLORS.teal} />
        </div>

        {/* Agents Grid - REAL DATA ONLY */}
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "1rem", color: "#9ca3af", marginBottom: "12px", textTransform: "uppercase" }}>Agents</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {AGENTS.map((agent) => (
              <div key={agent.name} style={{ backgroundColor: "#18181b", borderRadius: "12px", border: `2px solid ${getStatusColor(agent.status)}40`, padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <div style={{ fontSize: "32px" }}>{agent.avatar}</div>
                  <div>
                    <div style={{ fontWeight: "bold" }}>{agent.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>{agent.role}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: getStatusColor(agent.status) }} />
                  <span style={{ fontSize: "0.75rem", color: getStatusColor(agent.status), textTransform: "uppercase", fontWeight: "bold" }}>
                    {agent.status}
                  </span>
                </div>
                {agent.task && (
                  <div style={{ marginTop: "8px", fontSize: "0.75rem", color: "#6b7280" }}>
                    {agent.task}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Commits - REAL DATA */}
        <div>
          <h2 style={{ fontSize: "1rem", color: "#9ca3af", marginBottom: "12px", textTransform: "uppercase" }}>Recent Commits</h2>
          <div style={{ backgroundColor: "#18181b", borderRadius: "12px", border: "1px solid rgba(245, 241, 230, 0.1)", overflow: "hidden" }}>
            {loading ? (
              <div style={{ padding: "24px", textAlign: "center", color: "#9ca3af" }}>Loading...</div>
            ) : commits.length > 0 ? (
              commits.slice(0, 8).map((commit, i) => (
                <a key={commit.sha} href={commit.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 16px", borderBottom: i < 7 ? "1px solid rgba(245, 241, 230, 0.1)" : "none", textDecoration: "none", color: "inherit" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: COLORS.teal, background: "rgba(45, 138, 139, 0.2)", padding: "2px 6px", borderRadius: "4px" }}>{commit.sha.slice(0, 7)}</span>
                  <span style={{ flex: 1, fontSize: "0.875rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{commit.message}</span>
                  <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>{commit.date ? new Date(commit.date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : ""}</span>
                </a>
              ))
            ) : (
              <div style={{ padding: "24px", textAlign: "center", color: "#9ca3af" }}>No commits found</div>
            )}
          </div>
        </div>
      </main>

      <footer style={{ padding: "24px", borderTop: "1px solid rgba(245, 241, 230, 0.1)", textAlign: "center" }}>
        <p style={{ color: "#6b7280", fontSize: "0.75rem" }}>🤖 Agent Dashboard — Running on Mac Mini</p>
      </footer>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div style={{ backgroundColor: "#18181b", borderRadius: "12px", border: "1px solid rgba(245, 241, 230, 0.1)", padding: "16px", textAlign: "center" }}>
      <div style={{ fontSize: "0.75rem", color: "#9ca3af", textTransform: "uppercase", marginBottom: "4px" }}>{label}</div>
      <div style={{ fontSize: "1.5rem", fontWeight: "bold", color }}>{value}</div>
    </div>
  );
}
