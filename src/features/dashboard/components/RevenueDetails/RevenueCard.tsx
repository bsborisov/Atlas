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

const data = {
  cardData: {
    title: "Revenue",
    value: "Revenue & Users"
  },
  chartData: [
    {
      month: "Jan",
      revenue: 12000,
      users: 6000
    },
    {
      month: "Feb",
      revenue: 18000,
      users: 9500
    },
    {
      month: "Mar",
      revenue: 20000,
      users: 6000
    },
    {
      month: "Apr",
      revenue: 50000,
      users: 16000
    },
    {
      month: "May",
      revenue: 25000,
      users: 8000
    },
    {
      month: "Jun",
      revenue: 2000,
      users: 200
    }
  ]
};


const RevenueCard = () => {

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