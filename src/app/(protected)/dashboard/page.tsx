import { DashboardWrapper } from "@/features/dashboard/components/DashboardWrapper";
import { getStats } from "@/server/services/stats";


export default async function DashboardPage() {

  const stats = await getStats();

  return (

    <DashboardWrapper
      stats={stats}
    />
  );
}