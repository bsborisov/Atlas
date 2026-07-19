"use client";

import { Card } from "@/components/ui/Card";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { DetailsCardDtoRevenue } from "../../types/dashboard.dto";

const RevenueCard = ({
  data
}: {
  data: DetailsCardDtoRevenue
}) => {

  return (
    <Card
      cardData={data.cardData}
      message="Revenue/users ratio"
    >
      <div className="w-full h-50">
        <ResponsiveContainer>

          <ComposedChart data={data.chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="revenue"
              fill="#6366f1"
            />
            <Line
              dataKey="users"
              stroke="#ef4444"
              strokeWidth={3}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export default RevenueCard