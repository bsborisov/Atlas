export type PlansDto = {
  name: string;
  price: string;
  seats: string;
  runs: string;
  features: string[];
  current?: boolean
}

export type ApiKeysDto = {
  name: string;
  prefix: string;
  suffix: string;
  created: string;
  lastUsed: string;
  scopes: string[];
}

export type ActionsHistoryDto = {
  action: string;
  user: string;
  time: string;
}

export type UsageInfoDto = {
  label: string;
  used: number;
  total: number | null;
}

