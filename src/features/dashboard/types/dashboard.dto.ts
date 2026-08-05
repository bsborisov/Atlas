
//MainData
export type DashboardMainDataDto = {
  label: string;
  value: number;
  sub: string;
  color: string;
  decimals?: number;
  suffix?: string;
  separator?: string;
}[];

//Executions
export type DashboardExecutionsDto = {
  id: string;
  workflow: string;
  status: string;
  duration: string;
  steps: string;
  time: string;
  env: string;
}[];


//ActivityFeed
export type DashboardActivityFeedDto = {
  time: string;
  msg: string;
  type: string;
}[];

export interface DashboardWorkflowDto {
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

export type DashboardWorkflowsDto = DashboardWorkflowDto[];