import { Card } from "@/components/ui/Card"
import { DashboardStats } from "@/types/stats-service";
import { CarIcon, CpuIcon, EarIcon, UsersRoundIcon } from "lucide-react";

const cards = [
  {
    title: "Online Users",
    value: 123,
    icon: UsersRoundIcon,
    iconBackground: "bg-dash-stats-card-gradient1",
  },
  {
    title: "Server Load",
    value: "87%",
    icon: CpuIcon,
    iconBackground: "bg-dash-stats-card-gradient2",
  },
  {
    title: "AI Workspace",
    value: 123,
    icon: EarIcon,
    iconBackground: "bg-dash-stats-card-gradient3",
  },
  {
    title: "AI Car",
    value: 123,
    icon: CarIcon,
    iconBackground: "bg-dash-stats-card-gradient4",
  },
];


const Stats = ({
  stats
}: {
  stats: DashboardStats
}) => {
  return (
    <div className="w-full mb-6">
      <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
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