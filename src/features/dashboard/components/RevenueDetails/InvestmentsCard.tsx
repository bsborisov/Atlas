"use client";

import { Card } from "@/components/ui/Card";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer
} from "recharts";


const data = {
  cardData: {
    title: "Investments",
    value: "Investments ratio"
  },
  chartData: [
    {
      name: "Small",
      value: 32,
      fill: "#3b82f6"
    },
    {
      name: "Medium",
      value: 46,
      fill: "#3bf63b"
    },
    {
      name: "Enterprise",
      value: 22,
      fill: "#f63b3b"
    }
  ]
};

const InvestmentsCard = () => {
  return (
    <Card
      cardData={data.cardData}
      message="Investmets projects by size - ratio in %"
    >
      <div className="w-full h-50">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data.chartData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={100}
              paddingAngle={0}
            />

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export default InvestmentsCard