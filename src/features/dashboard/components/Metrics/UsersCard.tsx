"use client";

import { Card } from "@/components/ui/Card";
import { MetricCardDtoUsers } from "../../types/dashboard.dto";
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

const UsersCard = ({
  data
}: {
  data: MetricCardDtoUsers
}) => {
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