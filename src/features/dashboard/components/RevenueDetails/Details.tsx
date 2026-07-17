import InvestmentsCard from "./InvestmentsCard";
import RevenueCard from "./RevenueCard";

const Details = () => {
  return (
    <div className="w-full mb-6">
      <div className="w-full gap-6 grid grid-cols-1 md:grid-cols-2">
        <RevenueCard />
        <InvestmentsCard />
      </div>
    </div>
  )
}

export default Details