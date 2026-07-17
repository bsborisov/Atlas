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