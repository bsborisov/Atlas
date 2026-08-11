import { ExecutionsDto, LiveLogsDto, RunStepsDto, WorkflowNodesDto } from "../types/executions.dto";

export async function getExecutions(): Promise<ExecutionsDto[]> {
  // Later this becomes Prisma queries

  await new Promise((resolve) => setTimeout(resolve, 130));

  return [
    { id: "run_01HZAQ7", workflow: "incident_intelligence", status: "failed", started: "2m ago", duration: "1.89s", steps: 9, trigger: "webhook", env: "prod" },
    { id: "run_01HZAQ6", workflow: "customer_onboarding", status: "success", started: "8m ago", duration: "3.21s", steps: 12, trigger: "schedule", env: "prod" },
    { id: "run_01HZAQ5", workflow: "churn_detection", status: "success", started: "15m ago", duration: "4.07s", steps: 7, trigger: "webhook", env: "prod" },
    { id: "run_01HZAQ4", workflow: "invoice_sync", status: "success", started: "22m ago", duration: "880ms", steps: 5, trigger: "schedule", env: "prod" },
    { id: "run_01HZAQ3", workflow: "incident_intelligence", status: "success", started: "41m ago", duration: "2.14s", steps: 9, trigger: "webhook", env: "prod" },
    { id: "run_01HZAQ2", workflow: "lead_enrichment", status: "failed", started: "1h ago", duration: "1.33s", steps: 8, trigger: "webhook", env: "staging" },
    { id: "run_01HZAQ1", workflow: "customer_onboarding", status: "success", started: "1h ago", duration: "3.55s", steps: 12, trigger: "schedule", env: "prod" },
    { id: "run_01HZAP9", workflow: "churn_detection", status: "running", started: "2h ago", duration: "—", steps: 4, trigger: "api", env: "prod" },
    { id: "run_01HZAP8", workflow: "slack_digest", status: "success", started: "3h ago", duration: "220ms", steps: 3, trigger: "schedule", env: "prod" },
    { id: "run_01HZAP7", workflow: "invoice_sync", status: "success", started: "4h ago", duration: "910ms", steps: 5, trigger: "schedule", env: "prod" },
    { id: "run_01HZAP6", workflow: "lead_enrichment", status: "success", started: "5h ago", duration: "1.20s", steps: 8, trigger: "webhook", env: "staging" },
    { id: "run_01HZAP5", workflow: "incident_intelligence", status: "failed", started: "6h ago", duration: "440ms", steps: 3, trigger: "webhook", env: "prod" },
    { id: "run_01HZAP4", workflow: "customer_onboarding", status: "success", started: "7h ago", duration: "2.98s", steps: 12, trigger: "schedule", env: "prod" },
    { id: "run_01HZAP3", workflow: "churn_detection", status: "success", started: "8h ago", duration: "3.88s", steps: 7, trigger: "webhook", env: "prod" },
    { id: "run_01HZAP2", workflow: "slack_digest", status: "success", started: "9h ago", duration: "190ms", steps: 3, trigger: "schedule", env: "prod" },
    { id: "run_01HZAP1", workflow: "invoice_sync", status: "success", started: "10h ago", duration: "1.04s", steps: 5, trigger: "schedule", env: "prod" },
  ]

}

export async function getLiveLogs(): Promise<LiveLogsDto[]> {
  // Later this becomes Prisma queries

  await new Promise((resolve) => setTimeout(resolve, 170));

  return [
    { id: 1, time: "14:32:00.012", level: "INFO", msg: "Test run started · run_01JAZ9" },
    { id: 2, time: "14:32:00.018", level: "INFO", msg: "Webhook received · POST /webhooks/intake · 218 bytes" },
    { id: 3, time: "14:32:00.022", level: "DEBUG", msg: "Payload validated · schema: incident_v2" },
    { id: 4, time: "14:32:00.060", level: "INFO", msg: "Normalize payload complete · 42ms" },
    { id: 5, time: "14:32:00.062", level: "INFO", msg: "Calling claude-sonnet-4-6 · risk_scoring_v3" },
    { id: 6, time: "14:32:00.065", level: "DEBUG", msg: "Tool: fetch_cmdb_context · host=api.acme.com" },
    { id: 7, time: "14:32:00.210", level: "DEBUG", msg: "Streaming tokens… severity=P1, confidence=0.92" },
  ]

}

export async function getWorkflowNodes(): Promise<WorkflowNodesDto[]> {
  // Later this becomes Prisma queries

  await new Promise((resolve) => setTimeout(resolve, 170));

  return [
    { id: "n1", label: "Webhook received", type: "trigger", x: 60, y: 160 },
    { id: "n2", label: "Normalize payload", type: "data", x: 280, y: 160 },
    { id: "n3", label: "Risk scoring", type: "ai", x: 500, y: 160 },
    { id: "n4", label: "Severity ≥ P1", type: "logic", x: 720, y: 160 },
    { id: "n5", label: "Create incident", type: "action", x: 940, y: 100 },
    { id: "n6", label: "Notify on-call", type: "human", x: 1160, y: 100 },
  ]

}

export async function getRunSteps(): Promise<RunStepsDto[]> {
  // Later this becomes Prisma queries

  await new Promise((resolve) => setTimeout(resolve, 110));

  return [
    { nodeId: "n1", label: "Webhook received", duration: "18ms", status: "success" },
    { nodeId: "n2", label: "Normalize payload", duration: "42ms", status: "success" },
    { nodeId: "n3", label: "Risk scoring", duration: "—", status: "running" },
    { nodeId: "n4", label: "Severity ≥ P1", duration: "—", status: "queued" },
    { nodeId: "n5", label: "Create incident", duration: "—", status: "queued" },
    { nodeId: "n6", label: "Notify on-call", duration: "—", status: "queued" },
  ]

}