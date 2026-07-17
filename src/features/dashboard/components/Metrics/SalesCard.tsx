"use client";

import { Card } from "@/components/ui/Card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { MetricCardDtoSales } from "../../types/dashboard.dto";

const SalesCard = ({
  data
}: {
  data: MetricCardDtoSales
}) => {
  return (
    <Card
      cardData={data.cardData}
      message="Number of sales by month"
    >
      <div className="w-full h-50">
        <ResponsiveContainer>
          <BarChart data={data.chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />
            <YAxis />

            <Tooltip />

            <Bar
              dataKey="sales"
              fill="#22c55e"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export default SalesCard