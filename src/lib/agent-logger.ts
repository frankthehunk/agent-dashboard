// Agent Logging System
// Logs are stored in memory and can be read by the dashboard

export type AgentName = "Frank" | "Monitor" | "Builder" | "Writer";

export type LogLevel = "info" | "success" | "warning" | "error";

export interface AgentLog {
  id: string;
  agent: AgentName;
  message: string;
  level: LogLevel;
  timestamp: Date;
}

// In-memory logs (would be replaced with file/DB in production)
let logs: AgentLog[] = [
  { id: "1", agent: "Frank", message: "System started", level: "info", timestamp: new Date() },
  { id: "2", agent: "Monitor", message: "Monitoring active", level: "info", timestamp: new Date() },
  { id: "3", agent: "Builder", message: "Ready to build", level: "info", timestamp: new Date() },
  { id: "4", agent: "Writer", message: "Ready to create content", level: "info", timestamp: new Date() },
];

let logIdCounter = 5;

export function log(agent: AgentName, message: string, level: LogLevel = "info") {
  const newLog: AgentLog = {
    id: String(logIdCounter++),
    agent,
    message,
    level,
    timestamp: new Date(),
  };
  logs.unshift(newLog); // Add to beginning (most recent first)
  
  // Keep only last 50 logs
  if (logs.length > 50) {
    logs = logs.slice(0, 50);
  }
  
  return newLog;
}

export function getLogs(): AgentLog[] {
  return logs;
}

export function clearLogs() {
  logs = [];
}

// Helper functions for different agents
export const Frank = {
  log: (message: string, level: LogLevel = "info") => log("Frank", message, level),
};

export const Monitor = {
  log: (message: string, level: LogLevel = "info") => log("Monitor", message, level),
};

export const Builder = {
  log: (message: string, level: LogLevel = "info") => log("Builder", message, level),
};

export const Writer = {
  log: (message: string, level: LogLevel = "info") => log("Writer", message, level),
};
