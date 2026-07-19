import Details from "./RevenueDetails/Details"
import Metrics from "./Metrics/Metrics"
import Stats from "./Stats"
import { DashboardDetailsDto, DashboardMetricsDto, DashboardStatsDto } from "../types/dashboard.dto"

export function DashboardWrapper({
  stats,
  metrics,
  details
}: {
  stats: DashboardStatsDto,
  metrics: DashboardMetricsDto,
  details: DashboardDetailsDto
}) {

  return (
    <div className="w-full overflow-hidden">
      <Stats stats={stats} />
      <Metrics data={metrics} />
      <Details data={details} />
    </div>
  )

}