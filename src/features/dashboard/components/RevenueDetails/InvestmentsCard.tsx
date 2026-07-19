"use client";

import { Card } from "@/components/ui/Card";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { DetailsCardDtoInvestments } from "../../types/dashboard.dto";


const InvestmentsCard = ({
  data
}: {
  data: DetailsCardDtoInvestments
}) => {
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