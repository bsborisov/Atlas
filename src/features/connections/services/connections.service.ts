import { ConnectionsDto } from "../types/connections.dto";

export async function getConnections(): Promise<ConnectionsDto[]> {

  // Simulate API/DB latency
  await new Promise((resolve) => setTimeout(resolve, 127));

  return [
    { id: "c_001", name: "PagerDuty EU", type: "incident", status: "degraded", latency: "1.2s", checked: "2m ago", workflows: 3, env: "production" },
    { id: "c_002", name: "OpenAI Platform", type: "ai", status: "healthy", latency: "312ms", checked: "1m ago", workflows: 4, env: "production" },
    { id: "c_003", name: "Salesforce RevOps", type: "crm", status: "healthy", latency: "488ms", checked: "5m ago", workflows: 3, env: "production" },
    { id: "c_004", name: "Slack Alerts", type: "messaging", status: "expired", latency: "—", checked: "1h ago", workflows: 5, env: "production" },
    { id: "c_005", name: "Webhook Intake", type: "trigger", status: "healthy", latency: "18ms", checked: "30s ago", workflows: 2, env: "production" },
    { id: "c_006", name: "Stripe Billing", type: "payments", status: "healthy", latency: "220ms", checked: "3m ago", workflows: 1, env: "production" },
  ];
}