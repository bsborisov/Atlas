import { Dashboard } from "@/features/dashboard/components/Dashboard";
import { getStats } from "@/server/services/stats";


export default async function DashboardPage() {

  const stats = await getStats();

  return (
    
    <Dashboard 
      stats={stats} 
    />
  );
}