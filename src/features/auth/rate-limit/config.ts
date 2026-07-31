export const AUTH_RATE_LIMITS = {
  loginByIp: {
    limit: 20,
    windowMs: 15 * 60 * 1000,
  },
  loginByEmail: {
    limit: 5,
    windowMs: 15 * 60 * 1000,
  },
  googleByIp: {
    limit: 10,
    windowMs: 15 * 60 * 1000,
  },
  registerByIp: {
    limit: 5,
    windowMs: 60 * 60 * 1000,
  },
  registerByEmail: {
    limit: 3,
    windowMs: 60 * 60 * 1000,
  },
} as const;

export const RATE_LIMIT_MESSAGE =
  "Too many attempts. Please try again later.";
