import { DashboardStats } from "@/types/stats-service"
import Details from "./RevenueDetails/Details"
import Metrics from "./Metrics/Metrics"
import Stats from "./Stats"

export function DashboardWrapper({
  stats
}: {
  stats: DashboardStats
}) {

  return (
    <div className="w-full overflow-hidden">
      <Stats stats={stats} />
      <Metrics />
      <Details />
    </div>
  )

}