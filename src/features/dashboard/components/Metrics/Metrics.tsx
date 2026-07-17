import UsersCard from "./UsersCard";
import SalesCard from "./SalesCard";
import SubscriptionsCard from "./SubscriptionsCard";
import { DashboardMetricsDto } from "../../types/dashboard.dto";

const Metrics = ({
  data
}: {
  data: DashboardMetricsDto
}) => {
  return (
    <div className="w-full mb-6">
      <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <UsersCard data={data.users} />
        <SalesCard data={data.sales} />
        <SubscriptionsCard data={data.subscriptions} />
      </div>
    </div>
  )
}

export default Metrics