import { DashboardDetailsDto, DashboardMetricsDto, DashboardStatsDto } from "../types/dashboard.dto";

export async function getDashboardStats(): Promise<DashboardStatsDto> {
  // Simulate API/DB latency
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    users: 12458,
    projects: 387,
    aiRequests: 98421,
    revenue: 12750,
  };
}

export async function getDashboardMetrics(): Promise<DashboardMetricsDto> {
  // Later this becomes Prisma queries

  await new Promise((resolve) => setTimeout(resolve, 100));

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

export async function getDashboardDetails(): Promise<DashboardDetailsDto> {
  // Simulate API/DB latency
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    revenue: {
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
    },
    investments: {
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
    }
  };
}