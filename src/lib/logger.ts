const BRAND = "%c Atlas ";

const BRAND_STYLE =
  "background:#2e924d;color:white;padding:2px 6px;border-radius:3px;";

const LEVEL_STYLE = {
  log: "color:green;",
  debug: "color:blue;",
  info: "color:#2563eb;",
  warn: "color:#ca8a04;",
  error: "color:#dc2626;",
} as const;


type LogLevel = keyof typeof LEVEL_STYLE;
type LoggerContext = Record<string, unknown> & {
  skipSentry?: boolean;
};

const isBrowser = () => typeof window !== "undefined";


function createLogger(level: LogLevel) {
  return (...args: unknown[]) => {

    if (isBrowser()) {
      console[level](
        `${BRAND}%c${level}`,
        BRAND_STYLE,
        LEVEL_STYLE[level],
        ...args
      );

      return;
    }


    console[level](
      `[Atlas] ${level}`,
      ...args
    );
  };
}

function captureSentry(
  error: unknown,
  context?: LoggerContext
) {
  if (!(error instanceof Error)) {
    return;
  }

  import("@sentry/nextjs")
    .then((Sentry) => {
      Sentry.captureException(error, {
        extra: context,
      });
    })
    .catch(() => { });
}

export const logger = {
  log: createLogger("log"),

  debug: createLogger("debug"),

  info: createLogger("info"),

  warn: createLogger("warn"),

  error(
    error: unknown,
    context?: LoggerContext
  ) {
    const {
      skipSentry,
      ...sentryContext
    } = context ?? {};

    if (isBrowser()) {
      console.error(
        `${BRAND.replace("%c ", "")}error`,
        error,
        context
      );
    } else {
      console.error(
        "[Atlas] error",
        error,
        context
      );
    }


    if (
      process.env.NODE_ENV === "production" &&
      !skipSentry
    ) {
      captureSentry(error, sentryContext);
    }
  },
};