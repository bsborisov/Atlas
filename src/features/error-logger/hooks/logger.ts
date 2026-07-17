const BRAND = "%c Atlas ";
const BRAND_STYLE = `background: #2e924d; color: white;`;

const LEVEL_STYLE = {
  log: "color: green; border: 1px solid green;",
  debug: "color: blue; border: 1px solid blue;",
  info: "color: blue; border: 1px solid blue;",
  warn: "color: yellow; border: 1px solid yellow;",
  error: "color: red; border: 1px solid red;",
};

const isBrowser = typeof window !== "undefined";

function createLogger(level: keyof typeof LEVEL_STYLE) {
  return (...args: any[]) => {
    if (!isBrowser) return;

    const style = LEVEL_STYLE[level];

    console[level](
      `${BRAND}%c ${level} `,
      BRAND_STYLE,
      style,
      ...args
    );
  };
}

export const logger = {
  log: createLogger("log"),
  debug: createLogger("debug"),
  info: createLogger("info"),
  warn: createLogger("warn"),

  error: (...args: any[]) => {
    const payload = args[1];

    if (
      typeof window !== "undefined" &&
      (window as any).__SENTRY_ENABLED__
    ) {
      const shouldSkip = payload?.skipSentry;
      if (!shouldSkip) {
        //TODO
        import("@sentry/browser").then((Sentry) => {
          Sentry.captureException(args[0], payload);
        });
      }
    }

    console.error(
      `${BRAND.replace("%c ", "")}error`,
      ...args
    );
  },
};