import {
  DashboardMainDataDto,
  DashboardExecutionsDto,
  DashboardActivityFeedDto
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