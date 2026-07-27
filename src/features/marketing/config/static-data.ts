export const workflow_steps = [
  { status: "ok", step: "webhook_received", node: "Trigger", ms: "18ms", code: 200 },
  { status: "ok", step: "fetch_customer_data", node: "Salesforce", ms: "312ms", code: 200 },
  { status: "ai", step: "risk_score_model", node: "GPT-4o", ms: "1.14s", code: null },
  { status: "ok", step: "severity_router", node: "Logic", ms: "2ms", code: null },
  { status: "err", step: "create_pd_incident", node: "PagerDuty", ms: "240ms", code: 502 },
  { status: "ai", step: "↳ upstream_outage · conf=0.92", node: "Atlas AI", ms: "", code: null },
  { status: "ok", step: "create_pd_incident", node: "PagerDuty", ms: "321ms", code: 201 },
  { status: "ok", step: "notify_oncall_slack", node: "Slack", ms: "88ms", code: 200 },
  { status: "ok", step: "log_resolution_record", node: "Notion", ms: "143ms", code: 200 },
];