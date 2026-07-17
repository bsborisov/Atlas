"use client";

import { Card } from "@/components/ui/Card";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer
} from "recharts";

const SubscriptionsCard = () => {
  const data = {
    cardData: {
      title: "Sales",
      value: "Type of sales"
    },
    chartData: [
      {
        stat: "Free",
        value: 30
      },
      {
        stat: "Premium",
        value: 37
      },
      {
        stat: "Lite",
        value: 24
      },
      {
        stat: "Enterprise",
        value: 9
      }
    ]
  };

  return (
    <Card
      cardData={data.cardData}
      message="Type of sales in %"
    >
      <div className="w-full h-50">
        <ResponsiveContainer>
          <RadarChart data={data.chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="stat" />
            <Radar
              dataKey="value"
              fill="#bf5ae0"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ResponsiveContainer>

      </div>
    </Card>
  )
}

export default SubscriptionsCard