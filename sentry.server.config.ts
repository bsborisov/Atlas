import * as Sentry from "@sentry/nextjs";

const enabled = process.env.NODE_ENV === "production";

Sentry.init({
  enabled,
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENVIRONMENT ?? process.env.NODE_ENV,

  tracesSampleRate: enabled ? 0.1 : 0,
  enableLogs: enabled,

  sendDefaultPii: false,
});