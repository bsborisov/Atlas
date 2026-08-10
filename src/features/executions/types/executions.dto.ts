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