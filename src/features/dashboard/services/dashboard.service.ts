import {
  DashboardMainDataDto,
  DashboardExecutionsDto,
  DashboardActivityFeedDto,
  DashboardWorkflowsDto,
} from "../types/dashboard.dto";

export async function getDashboardMainData(): Promise<DashboardMainDataDto> {
  // Simulate API/DB latency
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      label: "Executions",
      value: 12483,
      sub: "last 24h",
      color: "text-atlas-foreground",
      separator: ",",
    },
    {
      label: "Success Rate",
      value: 98.7,
      sub: "↑ 0.3% vs yesterday",
      color: "text-app-light-green",
      decimals: 1,
      suffix: "%",
    },
    {
      label: "Avg Duration",
      value: 842,
      sub: "↓ 12ms vs yesterday",
      color: "text-app-cyan",
      suffix: "ms",
    },
    {
      label: "Active Workflows",
      value: 18,
      sub: "2 paused",
      color: "text-app-purple",
    },
  ];
}

export async function getDashboardExecutions(): Promise<DashboardExecutionsDto> {
  // Later this becomes Prisma queries

  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    { id: "01JAZ9", workflow: "Incident intelligence", status: "failed", duration: "1.2s", steps: "3/6", time: "14:32:01", env: "production" },
    { id: "01JAZ8", workflow: "Customer risk routing", status: "success", duration: "842ms", steps: "5/5", time: "14:31:44", env: "production" },
    { id: "01JAZ7", workflow: "Lead enrichment", status: "success", duration: "1.1s", steps: "7/7", time: "14:31:22", env: "production" },
    { id: "01JAZ6", workflow: "P1 escalation", status: "success", duration: "320ms", steps: "4/4", time: "14:30:58", env: "production" },
    { id: "01JAZ5", workflow: "Churn recovery playbook", status: "success", duration: "1.8s", steps: "8/8", time: "14:30:31", env: "production" },
    { id: "01JAZ4", workflow: "Incident intelligence", status: "success", duration: "910ms", steps: "6/6", time: "14:29:55", env: "production" },
  ]
}

export async function getDashboardActivityFeed(): Promise<DashboardActivityFeedDto> {
  // Later this becomes Prisma queries

  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    { time: "14:32:01", msg: "Run run_01JAZ9 failed at Create incident — PagerDuty 502", type: "error" },
    { time: "14:31:44", msg: "Customer risk routing completed in 842ms", type: "success" },
    { time: "14:31:22", msg: "Lead enrichment enriched 12 leads via Clearbit", type: "success" },
    { time: "14:30:58", msg: "P1 escalation triggered for INC-4821", type: "warning" },
    { time: "14:30:31", msg: "Churn recovery playbook triggered for acme.com", type: "success" },
    { time: "14:29:55", msg: "Incident intelligence completed — 5 incidents triaged", type: "success" },
    { time: "14:28:40", msg: "PagerDuty EU showing elevated response times", type: "warning" },
  ]
}

export async function getWorkflows(): Promise<DashboardWorkflowsDto> {
  // Later this becomes Prisma queries

  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    {
      id: "wf_001", name: "Incident intelligence", status: "active", successRate: 98.7,
      executions: 12483, lastRun: "2m ago", owner: "Maya Brooks", version: "v12",
      services: ["PagerDuty", "OpenAI", "Slack"], sparkline: [88, 92, 95, 91, 98, 96, 99, 97, 98],
      description: "Triages incoming incidents using AI and routes to on-call engineers.",
      tags: ["incident", "ai", "oncall"],
    },
    {
      id: "wf_002", name: "Customer risk routing", status: "active", successRate: 94.2,
      executions: 8341, lastRun: "12m ago", owner: "James Liu", version: "v7",
      services: ["Salesforce", "OpenAI", "Slack"], sparkline: [82, 88, 90, 85, 91, 89, 88, 92, 94],
      description: "Scores customer risk and routes high-value accounts to CSM team.",
      tags: ["crm", "risk", "ai"],
    },
    {
      id: "wf_003", name: "P1 escalation", status: "active", successRate: 99.1,
      executions: 3201, lastRun: "1h ago", owner: "Maya Brooks", version: "v5",
      services: ["PagerDuty", "Slack", "Jira"], sparkline: [95, 97, 99, 98, 99, 100, 99, 99, 99],
      description: "Escalates P1 incidents to leadership and opens war room channels.",
      tags: ["incident", "escalation"],
    },
    {
      id: "wf_004", name: "Lead enrichment", status: "active", successRate: 96.8,
      executions: 22041, lastRun: "4m ago", owner: "Priya Nair", version: "v14",
      services: ["Salesforce", "Clearbit", "HubSpot"], sparkline: [90, 93, 95, 94, 96, 97, 95, 97, 96],
      description: "Enriches inbound leads with firmographic data before routing to CRM.",
      tags: ["sales", "enrichment"],
    },
    {
      id: "wf_005", name: "Invoice exception triage", status: "draft", successRate: 88.3,
      executions: 1102, lastRun: "3d ago", owner: "Tomás Rivera", version: "v3",
      services: ["Stripe", "OpenAI", "Notion"], sparkline: [75, 80, 82, 78, 85, 84, 88, 86, 88],
      description: "Detects anomalous invoices and queues them for finance review.",
      tags: ["finance", "ai"],
    },
    {
      id: "wf_006", name: "Churn recovery playbook", status: "active", successRate: 91.5,
      executions: 4892, lastRun: "30m ago", owner: "Priya Nair", version: "v9",
      services: ["Salesforce", "Slack", "Intercom"], sparkline: [80, 85, 87, 88, 90, 89, 91, 92, 91],
      description: "Triggers recovery sequences for at-risk accounts based on health scores.",
      tags: ["retention", "crm"],
    },
  ];
}