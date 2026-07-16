import { DashboardStats } from "@/types/stats-service";

export async function getStats(): Promise<DashboardStats> {
  // Simulate API/DB latency
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    users: 12458,
    projects: 387,
    aiRequests: 98421,
    revenue: 12750,
  };
}