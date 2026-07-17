import UsersCard from "./UsersCard";
import SalesCard from "./SalesCard";
import SubscriptionsCard from "./SubscriptionsCard";

const Metrics = () => {
  return (
    <div className="w-full mb-6">
      <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <UsersCard />
        <SalesCard />
        <SubscriptionsCard />
      </div>
    </div>
  )
}

export default Metrics