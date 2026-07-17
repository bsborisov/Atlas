"use client";

import { Card } from "@/components/ui/Card";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const data = {
  cardData: {
    title: "Users",
    value: "Unique users"
  },
  chartData: [
    { month: "Jan", users: 120 },
    { month: "Feb", users: 780 },
    { month: "Mar", users: 260 },
    { month: "Apr", users: 310 },
    { month: "May", users: 220 },
    { month: "Jun", users: 520 },
  ]
}; //dummy data

const UsersCard = () => {
  return (
    <Card
      cardData={data.cardData}
      message="Unique users on site by month"
    >
      <div className="w-full h-50">
        <ResponsiveContainer>
          <LineChart data={data.chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#e64f45"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export default UsersCard