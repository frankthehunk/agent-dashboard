import { NextResponse } from "next/server";
import { getLogs } from "@/lib/agent-logger";

export async function GET() {
  const logs = getLogs();
  
  // Serialize dates
  const serializedLogs = logs.map(log => ({
    ...log,
    timestamp: log.timestamp.toISOString(),
  }));
  
  return NextResponse.json({ logs: serializedLogs });
}
