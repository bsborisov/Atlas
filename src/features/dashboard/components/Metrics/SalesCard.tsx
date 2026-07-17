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

const data = {
  cardData: {
    title: "Sales",
    value: "test"
  },
  chartData:
    [
      {
        name: "Jan",
        sales: 400,
      },
      {
        name: "Feb",
        sales: 300,
      },
      {
        name: "Mar",
        sales: 1200,
      },
      {
        name: "Apr",
        sales: 1800,
      },
      {
        name: "May",
        sales: 1500,
      },
      {
        name: "Jun",
        sales: 390,
      },
    ]
}; //dummy data

const SalesCard = () => {
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