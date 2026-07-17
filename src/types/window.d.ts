export { };

declare global {
  interface Window {
    __SENTRY__?: unknown;
  }
}