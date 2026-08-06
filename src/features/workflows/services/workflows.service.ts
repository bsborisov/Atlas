import { WorkflowDto } from "../types/workflows.dto";

export async function getWorkflows(options?: {
  limit?: number;
}): Promise<WorkflowDto[]> {
  // Later this becomes Prisma queries

  await new Promise((resolve) => setTimeout(resolve, 100));

  const workflows: WorkflowDto[] = [
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
  ]

  return options?.limit
    ? workflows.slice(0, options.limit)
    : workflows

}

// export async function getWorkflows(options?: {
//   limit?: number;
// }): Promise<WorkflowDto[]> {
//   return prisma.workflow.findMany({
//     take: options?.limit,
//   });
// } //todo from DB