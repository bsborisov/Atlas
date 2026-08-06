import {
  getDashboardActivityFeed,
  getDashboardExecutions,
  getDashboardMainData
} from "@/features/dashboard/services/dashboard.service";
import { getWorkflows } from "@/features/workflows/services/workflows.service";
import { DashboardWrapper } from "@/features/dashboard";

export default async function DashboardPage() {

  const mainData = await getDashboardMainData();
  const executions = await getDashboardExecutions();
  const activityFeed = await getDashboardActivityFeed();
  const workflows = await getWorkflows({ limit: 3 });

  return (

    <DashboardWrapper
      mainData={mainData}
      executions={executions}
      activityFeed={activityFeed}
      workflows={workflows}
    />

  );
}