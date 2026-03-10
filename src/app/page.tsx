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
  const [uptime, setUptime] = useState<string>("");

  // Calculate actual uptime (since March 7, 2026)
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
        if (data?.commits) {
          setCommits(data.commits);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const now = new Date();
  const today = now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  // Calculate commits today from real data
  const todayStr = now.toISOString().split("T")[0];
  const commitsToday = commits.filter((c) => c.date && c.date.startsWith(todayStr)).length;

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
          <StatCard label="Status" value={loading ? "Loading..." : "Active"} color={COLORS.teal} />
          <StatCard label="Uptime" value={uptime || "Calculating..."} color={COLORS.orange} />
          <StatCard label="Commits Today" value={commitsToday} color={COLORS.yellow} />
          <StatCard label="Total Commits" value={commits.length} color={COLORS.teal} />
        </div>

        {/* Recent Commits from GitHub */}
        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "16px" }}>Recent Commits</h2>
          <div style={{ backgroundColor: "#18181b", borderRadius: "12px", border: "1px solid rgba(245, 241, 230, 0.1)", overflow: "hidden" }}>
            {loading ? (
              <div style={{ padding: "24px", textAlign: "center", color: "#9ca3af" }}>Loading...</div>
            ) : commits.length > 0 ? (
              commits.slice(0, 10).map((commit, i) => (
                <a 
                  key={commit.sha} 
                  href={commit.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "16px", 
                    padding: "12px 16px", 
                    borderBottom: i < 9 ? "1px solid rgba(245, 241, 230, 0.1)" : "none",
                    textDecoration: "none",
                    color: "inherit"
                  }}
                >
                  <span style={{ fontFamily: "monospace", fontSize: "0.875rem", color: COLORS.teal, background: "rgba(45, 138, 139, 0.2)", padding: "4px 8px", borderRadius: "4px", minWidth: "80px" }}>
                    {commit.sha.slice(0, 7)}
                  </span>
                  <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {commit.message}
                  </span>
                  <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#6b7280" }}>
                    {commit.date ? new Date(commit.date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : ""}
                  </span>
                </a>
              ))
            ) : (
              <div style={{ padding: "24px", textAlign: "center", color: "#9ca3af" }}>No commits found</div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ padding: "32px", borderTop: "1px solid rgba(245, 241, 230, 0.1)", textAlign: "center" }}>
        <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
          🤖 Agent Dashboard — Running on Mac Mini — Data from GitHub API
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
