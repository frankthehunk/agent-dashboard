import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const GITHUB_API = "https://api.github.com";
const OWNER = "frankthehunk";
const REPO = "agent-dashboard";

interface CommitData {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

export async function GET() {
  try {
    // Fetch recent commits
    const commitsRes = await fetch(
      `${GITHUB_API}/repos/${OWNER}/${REPO}/commits?per_page=10`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          // Note: Unauthenticated requests are rate-limited
          // For production, add Authorization header with token
        },
      }
    );

    if (!commitsRes.ok) {
      const error = await commitsRes.text();
      return NextResponse.json(
        { error: `GitHub API error: ${commitsRes.status}`, details: error },
        { status: commitsRes.status }
      );
    }

    const commits: CommitData[] = await commitsRes.json();

    // Format commits for display
    const formattedCommits = commits.map((commit) => ({
      sha: commit.sha.substring(0, 7),
      message: commit.commit.message.split("\n")[0], // First line only
      date: new Date(commit.commit.author.date).toISOString(),
      url: commit.html_url,
    }));

    // Calculate stats
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const commitsToday = formattedCommits.filter(
      (c) => new Date(c.date) >= todayStart
    ).length;

    return NextResponse.json({
      commits: formattedCommits,
      stats: {
        totalCommits: formattedCommits.length,
        commitsToday,
      },
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
