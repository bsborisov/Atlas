import * as Sentry from "@sentry/nextjs";

const enabled = process.env.NODE_ENV === "production";

Sentry.init({
  enabled,
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ?? process.env.NODE_ENV,

  integrations: enabled
    ? [Sentry.replayIntegration()]
    : [],

  tracesSampleRate: enabled ? 0.1 : 0,
  enableLogs: enabled,

  replaysSessionSampleRate: enabled ? 0.01 : 0,
  replaysOnErrorSampleRate: enabled ? 1 : 0,

  sendDefaultPii: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;