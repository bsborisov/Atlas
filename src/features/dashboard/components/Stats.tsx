import { Card } from "@/components/ui/Card"
import { DashboardStatsDto } from "../types/dashboard.dto";

const Stats = ({
  data
}: {
  data: DashboardStatsDto
}) => {
  return (
    <div className="w-full mb-6">
      <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {data.map((card) => (
          <Card
            key={card.title}
            cardData={card}
            message={'test'}
          />
        ))}
      </div>
    </div>
  )
}

export default Stats