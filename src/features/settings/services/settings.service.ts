import { ActionsHistoryDto, ApiKeysDto, PlansDto, UsageInfoDto } from "../types/settings.dto";

export async function getPlans(): Promise<PlansDto[]> {

  return [
    { name: "Free", price: "$0", seats: "1", runs: "500/mo", features: ["3 workflows", "500 runs/mo", "7-day log retention"] },
    { name: "Growth", price: "$49", seats: "10", runs: "10k/mo", features: ["Unlimited workflows", "10k runs/mo", "90-day logs", "AI diagnosis", "Team management"], current: true },
    { name: "Scale", price: "$199", seats: "50", runs: "100k/mo", features: ["Everything in Growth", "SSO / SAML", "Audit log", "SLA 99.9%", "Priority support"] },
    { name: "Enterprise", price: "Custom", seats: "∞", runs: "Unlimited", features: ["Custom contracts", "Dedicated infra", "On-prem option", "HIPAA / SOC2"] },
  ]
}

export async function getApiKeys(): Promise<ApiKeysDto[]> {

  return [
    { name: "Production key", prefix: "atl_prod_", suffix: "••••••••••••3f2a", created: "Jan 12, 2024", lastUsed: "2m ago", scopes: ["read", "write", "exec"] },
    { name: "CI / CD key", prefix: "atl_ci_", suffix: "••••••••••••8b91", created: "Mar 4, 2024", lastUsed: "1d ago", scopes: ["exec"] },
    { name: "Analytics key", prefix: "atl_an_", suffix: "••••••••••••c440", created: "May 20, 2024", lastUsed: "1h ago", scopes: ["read"] },
  ]
}

export async function getActionsHistory(): Promise<ActionsHistoryDto[]> {

  return [
    { action: "API key created", user: "layla@meridian.io", time: "2m ago" },
    { action: "Member role changed", user: "ravi@meridian.io", time: "1h ago" },
    { action: "SSO config updated", user: "layla@meridian.io", time: "3h ago" },
    { action: "Workspace renamed", user: "layla@meridian.io", time: "2d ago" },
    { action: "Member removed", user: "nour@meridian.io", time: "5d ago" },
  ]
}

export async function getUsageInfo(): Promise<UsageInfoDto[]> {

  return [
    { label: "Runs this month", used: 8291, total: 10000 },
    { label: "Seats used", used: 6, total: 10 },
    { label: "Workflows", used: 12, total: null },
  ]
}

