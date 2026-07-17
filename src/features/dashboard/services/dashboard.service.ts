import { DashboardMetricsDto } from "../types/dashboard.dto";

export async function getDashboardMetrics(): Promise<DashboardMetricsDto> {
  // Later this becomes Prisma queries

  return {
    users: {
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
      ],
    },

    sales: {
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
        ],
    },

    subscriptions: {
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
    },
  };
}