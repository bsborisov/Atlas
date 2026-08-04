import { DashboardWrapper } from "@/features/dashboard";
//import { getDashboardDetails, getDashboardMetrics, getDashboardStats } from "@/features/dashboard/services/dashboard.service";


export default async function DashboardPage() {

  // const stats = await getDashboardStats();
  // const metrics = await getDashboardMetrics();
  // const details = await getDashboardDetails();//TODO dynamic

  return (

    <DashboardWrapper
    // stats={stats}
    // metrics={metrics}
    // details={details}//TODO dynamic
    />

  );
}