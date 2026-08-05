"use client";

import {
  DashboardActivityFeedDto,
  DashboardExecutionsDto,
  DashboardMainDataDto,
  DashboardWorkflowsDto
} from "../types/dashboard.dto"
import { useAuth } from "@/providers/AuthProvider";
import HeroPulseAndAIBrief from "./HeroPulseAndAIBrief";
import DashboardHeader from "./DashboardHeader";
import ExecutionsAndActivity from "./ExecutionsAndActivity";
import WorkflowHealth from "./WorkflowHealth";

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

export function DashboardWrapper({
  mainData,
  executions,
  activityFeed,
  workflows
}: {
  mainData: DashboardMainDataDto;
  executions: DashboardExecutionsDto;
  activityFeed: DashboardActivityFeedDto;
  workflows: DashboardWorkflowsDto;
}) {
  const user = useAuth();

  return (
    <div className="relative min-h-full p-7 overflow-x-hidden">
      <GridBackground />

      <DashboardHeader user={user} />

      <HeroPulseAndAIBrief mainData={mainData} />

      <ExecutionsAndActivity
        executions={executions}
        activityFeed={activityFeed}
      />

      <WorkflowHealth workflows={workflows} />




      {/* <Metrics data={metrics} />
      <Details data={details} /> */}
    </div>
  )

}