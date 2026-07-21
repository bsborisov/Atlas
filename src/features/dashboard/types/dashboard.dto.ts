import { LucideIcon } from "lucide-react";

//Stats
export interface DashboardStats {
  title: string,
  value: number | string,
  icon: LucideIcon,
  iconBackground: string,
};

export type DashboardStatsDto = DashboardStats[]

//Metrics
export interface MetricChartPointUsers {
  month: string;
  users: number;
}

export interface MetricChartPointSales {
  name: string;
  sales: number;
}

export interface MetricChartPointSubs {
  stat: string;
  value: number;
}

export interface MetricCardCardDataDto {
  title: string;
  value: string;
}

export interface MetricCardDtoUsers {
  cardData: MetricCardCardDataDto;
  chartData: MetricChartPointUsers[];
}

export interface MetricCardDtoSales {
  cardData: MetricCardCardDataDto;
  chartData: MetricChartPointSales[];
}

export interface MetricCardDtoSubs {
  cardData: MetricCardCardDataDto;
  chartData: MetricChartPointSubs[];
}

export interface DashboardMetricsDto {
  users: MetricCardDtoUsers;
  sales: MetricCardDtoSales;
  subscriptions: MetricCardDtoSubs;
}


//Details
export interface DetailsChartPointRevenue {
  month: string;
  revenue: number;
  users: number;
}

export interface DetailsChartPointInvestments {
  name: string;
  value: number;
  fill: string;
}

export interface DetailsCardDtoRevenue {
  cardData: MetricCardCardDataDto;
  chartData: DetailsChartPointRevenue[];
}

export interface DetailsCardDtoInvestments {
  cardData: MetricCardCardDataDto;
  chartData: DetailsChartPointInvestments[];
}

export interface DashboardDetailsDto {
  revenue: DetailsCardDtoRevenue;
  investments: DetailsCardDtoInvestments;
}