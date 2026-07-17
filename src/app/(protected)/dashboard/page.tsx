import { DashboardWrapper } from "@/features/dashboard/components/DashboardWrapper";
import { getDashboardMetrics } from "@/features/dashboard/services/dashboard.service";
import { getStats } from "@/server/services/stats";


export default async function DashboardPage() {

  const stats = await getStats();
  const metrics = await getDashboardMetrics();
  //const details = await getDashboardMetrics();

  return (

    <DashboardWrapper
      stats={stats}
      metrics={metrics}
    //details={details}
    />

  );
}