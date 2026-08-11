export interface ExecutionsDto {
  id: string;
  workflow: string;
  status: string;
  started: string;
  duration: string;
  steps: number;
  trigger: string;
  env: string;
};

export interface LiveLogsDto {
  id: number;
  time: string;
  level: string;
  msg: string;
};

export interface WorkflowNodesDto {
  id: string;
  label: string;
  type: string;
  x: number;
  y: number;
};

export interface RunStepsDto {
  nodeId: string;
  label: string;
  duration: string;
  status: string;
};