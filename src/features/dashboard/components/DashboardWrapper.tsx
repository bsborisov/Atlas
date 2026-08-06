"use client";

import {
  DashboardActivityFeedDto,
  DashboardExecutionsDto,
  DashboardMainDataDto
} from "../types/dashboard.dto"
import { WorkflowDto } from "@/features/workflows/types/workflows.dto";
import { useAuth } from "@/providers/AuthProvider";
import HeroPulseAndAIBrief from "./HeroPulseAndAIBrief";
import DashboardHeader from "./DashboardHeader";
import ExecutionsAndActivity from "./ExecutionsAndActivity";
import WorkflowHealth from "./WorkflowHealth";
import GridBackground from "@/components/shared/GridBackground";

export function DashboardWrapper({
  mainData,
  executions,
  activityFeed,
  workflows
}: {
  mainData: DashboardMainDataDto;
  executions: DashboardExecutionsDto;
  activityFeed: DashboardActivityFeedDto;
  workflows: WorkflowDto[];
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

    </div>
  )

}