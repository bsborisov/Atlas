import { DashboardWrapper } from "@/features/dashboard";
import {
  getDashboardActivityFeed,
  getDashboardExecutions,
  getDashboardMainData,
  getWorkflows,
} from "@/features/dashboard/services/dashboard.service";


export default async function DashboardPage() {

  const mainData = await getDashboardMainData();
  const executions = await getDashboardExecutions();
  const activityFeed = await getDashboardActivityFeed();
  const workflows = await getWorkflows();

  return (

    <DashboardWrapper
      mainData={mainData}
      executions={executions}
      activityFeed={activityFeed}
      workflows={workflows}
    />

  );
}