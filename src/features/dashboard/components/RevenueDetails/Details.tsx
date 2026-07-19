import { DashboardDetailsDto } from "../../types/dashboard.dto";
import InvestmentsCard from "./InvestmentsCard";
import RevenueCard from "./RevenueCard";

const Details = ({
  data
}: {
  data: DashboardDetailsDto
}) => {
  return (
    <div className="w-full mb-6">
      <div className="w-full gap-6 grid grid-cols-1 md:grid-cols-2">
        <RevenueCard data={data.revenue} />
        <InvestmentsCard data={data.investments} />
      </div>
    </div>
  )
}

export default Details