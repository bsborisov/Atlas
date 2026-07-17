"use client";

import { Card } from "@/components/ui/Card";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer
} from "recharts";
import { MetricCardDtoSubs } from "../../types/dashboard.dto";

const SubscriptionsCard = ({
  data
}: {
  data: MetricCardDtoSubs
}) => {

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