import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

const isProduction = process.env.NODE_ENV === "production";

const sentryOptions = {
  org: "brumbo",
  project: "atlas",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",

  webpack: {
    automaticVercelMonitors: false,
    treeshake: {
      removeDebugLogging: true,
    },
  },
};

export default isProduction
  ? withSentryConfig(nextConfig, sentryOptions)
  : nextConfig;