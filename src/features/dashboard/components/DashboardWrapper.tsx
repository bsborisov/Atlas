import { DashboardStats } from "@/types/stats-service"
import Details from "./RevenueDetails/Details"
import Metrics from "./Metrics/Metrics"
import Stats from "./Stats"
import { DashboardMetricsDto } from "../types/dashboard.dto"

export function DashboardWrapper({
  stats,
  metrics
}: {
  stats: DashboardStats
  metrics: DashboardMetricsDto
}) {

  return (
    <div className="w-full overflow-hidden">
      <Stats stats={stats} />
      <Metrics data={metrics} />
      <Details />
    </div>
  )

}