"use client";

//import { DashboardDetailsDto, DashboardMetricsDto, DashboardStatsDto } from "../types/dashboard.dto"
import { useAuth } from "@/providers/AuthProvider";
import HeroPulseAndAIBrief from "./HeroPulseAndAIBrief";
import DashboardHeader from "./DashboardHeader";

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg width="100%" height="100%" className="opacity-3">
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

// export function DashboardWrapper({
//   stats,
//   metrics,
//   details
// }: {
//   stats: DashboardStatsDto,
//   metrics: DashboardMetricsDto,
//   details: DashboardDetailsDto
// }) { TODO add dynamic values
export function DashboardWrapper() {
  const user = useAuth();

  return (
    <div className="relative min-h-full p-7 overflow-x-hidden">
      <GridBackground />

      <DashboardHeader user={user} />

      <HeroPulseAndAIBrief />






      {/* <Metrics data={metrics} />
      <Details data={details} /> */}
    </div>
  )

}