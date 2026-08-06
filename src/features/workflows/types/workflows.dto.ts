export interface WorkflowDto {
  id: string;
  name: string;
  status: "draft" | "active" | "paused" | "failed";
  successRate: number;
  executions: number;
  lastRun: string;
  owner: string;
  version: string;
  services: string[];
  sparkline: number[];
  description: string;
  tags: string[];
};