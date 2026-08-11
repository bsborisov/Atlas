import { beforeEach, describe, expect, it, vi } from "vitest";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { loginSchema } from "@/features/auth/schemas/login.schema";
import { registerSchema } from "@/features/auth/schemas/register.schema";
import {
  loginUser,
  registerUser,
} from "@/features/auth/services/auth.service";
import {
  createAuthenticatedSession,
  destroySession,
} from "@/features/auth/session";
import {
  AUTH_RATE_LIMITS,
  RATE_LIMIT_MESSAGE,
  clearRateLimit,
  consumeRateLimit,
  createRateLimitKey,
  getClientIp,
} from "@/features/auth/rate-limit";
import { validationError } from "@/lib/action-error";
import { logger } from "@/lib/logger";

import {
  loginAction,
  logoutAction,
  registerAction,
} from "./auth";

vi.mock("next/headers", () => ({
  cookies: vi.fn(),
  headers: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("@/features/auth/schemas/login.schema", () => ({
  loginSchema: {
    safeParse: vi.fn(),
  },
}));

vi.mock("@/features/auth/schemas/register.schema", () => ({
  registerSchema: {
    safeParse: vi.fn(),
  },
}));

vi.mock("@/features/auth/services/auth.service", () => ({
  loginUser: vi.fn(),
  registerUser: vi.fn(),
}));

vi.mock("@/features/auth/session", () => ({
  createAuthenticatedSession: vi.fn(),
  createSession: vi.fn(),
  destroySession: vi.fn(),
}));

vi.mock("@/features/auth/rate-limit", () => ({
  AUTH_RATE_LIMITS: {
    loginByIp: {
      limit: 20,
      windowMs: 15 * 60 * 1000,
    },
    loginByEmail: {
      limit: 5,
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
  },
  RATE_LIMIT_MESSAGE: "Too many attempts. Please try again later.",
  clearRateLimit: vi.fn(),
  consumeRateLimit: vi.fn(),
  createRateLimitKey: vi.fn(
    (scope: string, identifier: string) => `${scope}:${identifier}`,
  ),
  getClientIp: vi.fn(),
}));

vi.mock("@/lib/action-error", () => ({
  validationError: vi.fn(),
}));

vi.mock("@/lib/logger", () => ({
  logger: {
    error: vi.fn(),
  },
}));

const headersMock = vi.mocked(headers);
const redirectMock = vi.mocked(redirect);

const loginSafeParseMock = vi.mocked(loginSchema.safeParse);
const registerSafeParseMock = vi.mocked(registerSchema.safeParse);

const loginUserMock = vi.mocked(loginUser);
const registerUserMock = vi.mocked(registerUser);

const createAuthenticatedSessionMock = vi.mocked(
  createAuthenticatedSession,
);
const destroySessionMock = vi.mocked(destroySession);

const consumeRateLimitMock = vi.mocked(consumeRateLimit);
const clearRateLimitMock = vi.mocked(clearRateLimit);
const createRateLimitKeyMock = vi.mocked(createRateLimitKey);
const getClientIpMock = vi.mocked(getClientIp);

const validationErrorMock = vi.mocked(validationError);
const loggerErrorMock = vi.mocked(logger.error);

const requestHeaders = {
  get: vi.fn(),
};

const allowedRateLimitResult = {
  allowed: true,
} as never;

const blockedRateLimitResult = {
  allowed: false,
} as never;

describe("auth actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    headersMock.mockResolvedValue(requestHeaders as never);
    getClientIpMock.mockReturnValue("203.0.113.10");

    createRateLimitKeyMock.mockImplementation(
      (scope, identifier) => `${scope}:${identifier}`,
    );

    consumeRateLimitMock.mockResolvedValue(
      allowedRateLimitResult,
    );

    clearRateLimitMock.mockResolvedValue(undefined);
    createAuthenticatedSessionMock.mockResolvedValue(undefined);
    destroySessionMock.mockResolvedValue(undefined);
  });

  describe("registerAction", () => {
    it("returns a validation error without consuming rate limits", async () => {
      const schemaError = {
        issues: [],
      };

      const actionError = {
        message: "Invalid registration details",
      };

      registerSafeParseMock.mockReturnValue({
        success: false,
        error: schemaError,
      } as never);

      validationErrorMock.mockReturnValue(actionError);

      const result = await registerAction({
        email: "invalid",
      });

      expect(result).toEqual({
        success: false,
        error: actionError,
      });

      expect(validationErrorMock).toHaveBeenCalledWith(
        schemaError,
      );

      expect(headersMock).not.toHaveBeenCalled();
      expect(consumeRateLimitMock).not.toHaveBeenCalled();
      expect(registerUserMock).not.toHaveBeenCalled();
    });

    it("normalizes the email and registers without confirmPassword", async () => {
      registerSafeParseMock.mockReturnValue({
        success: true,
        data: {
          name: "John Doe",
          email: "  JOHN@EXAMPLE.COM  ",
          password: "password123",
          confirmPassword: "password123",
        },
      } as never);

      registerUserMock.mockResolvedValue({
        id: "user-1",
        name: "John Doe",
        email: "john@example.com",
        image: null,
      });

      const result = await registerAction({
        name: "John Doe",
        email: "  JOHN@EXAMPLE.COM  ",
        password: "password123",
        confirmPassword: "password123",
      });

      expect(result).toEqual({
        success: true,
      });

      expect(headersMock).toHaveBeenCalledOnce();
      expect(getClientIpMock).toHaveBeenCalledWith(
        requestHeaders,
      );

      expect(createRateLimitKeyMock).toHaveBeenNthCalledWith(
        1,
        "register:ip",
        "203.0.113.10",
      );

      expect(createRateLimitKeyMock).toHaveBeenNthCalledWith(
        2,
        "register:email",
        "john@example.com",
      );

      expect(consumeRateLimitMock).toHaveBeenCalledTimes(2);

      expect(consumeRateLimitMock).toHaveBeenCalledWith(
        "register:ip:203.0.113.10",
        AUTH_RATE_LIMITS.registerByIp,
      );

      expect(consumeRateLimitMock).toHaveBeenCalledWith(
        "register:email:john@example.com",
        AUTH_RATE_LIMITS.registerByEmail,
      );

      expect(registerUserMock).toHaveBeenCalledOnce();

      expect(registerUserMock).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      });

      expect(clearRateLimitMock).toHaveBeenCalledWith(
        "register:email:john@example.com",
      );
    });

    it("returns the rate-limit message and does not register", async () => {
      registerSafeParseMock.mockReturnValue({
        success: true,
        data: {
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
          confirmPassword: "password123",
        },
      } as never);

      consumeRateLimitMock
        .mockResolvedValueOnce(blockedRateLimitResult)
        .mockResolvedValueOnce(allowedRateLimitResult);

      const result = await registerAction({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        confirmPassword: "password123",
      });

      expect(result).toEqual({
        success: false,
        error: {
          message: RATE_LIMIT_MESSAGE,
        },
      });

      expect(consumeRateLimitMock).toHaveBeenCalledTimes(2);
      expect(registerUserMock).not.toHaveBeenCalled();
      expect(clearRateLimitMock).not.toHaveBeenCalled();
    });

    it("logs and returns a registration service error", async () => {
      const error = new Error("Unable to create an account with these details.");

      registerSafeParseMock.mockReturnValue({
        success: true,
        data: {
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
          confirmPassword: "password123",
        },
      } as never);

      registerUserMock.mockRejectedValue(error);

      const result = await registerAction({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        confirmPassword: "password123",
      });

      expect(result).toEqual({
        success: false,
        error: {
          message: "Unable to create an account with these details.",
        },
      });

      expect(loggerErrorMock).toHaveBeenCalledWith(error, {
        tags: {
          feature: "auth/registration",
        },
        extra: [
          [
            "message",
            "User registration failed on server",
          ],
        ],
      });

      expect(clearRateLimitMock).not.toHaveBeenCalled();
    });

    it("returns a generic registration error for non-Error failures", async () => {
      registerSafeParseMock.mockReturnValue({
        success: true,
        data: {
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
          confirmPassword: "password123",
        },
      } as never);

      registerUserMock.mockRejectedValue("database failure");

      const result = await registerAction({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        confirmPassword: "password123",
      });

      expect(result).toEqual({
        success: false,
        error: {
          message: "Something went wrong",
        },
      });

      expect(loggerErrorMock).toHaveBeenCalledOnce();
    });
  });

  describe("loginAction", () => {
    it("returns a validation error without consuming rate limits", async () => {
      const schemaError = {
        issues: [],
      };

      const actionError = {
        message: "Invalid login details",
      };

      loginSafeParseMock.mockReturnValue({
        success: false,
        error: schemaError,
      } as never);

      validationErrorMock.mockReturnValue(actionError);

      const result = await loginAction({
        email: "invalid",
      });

      expect(result).toEqual({
        success: false,
        error: actionError,
      });

      expect(validationErrorMock).toHaveBeenCalledWith(
        schemaError,
      );

      expect(headersMock).not.toHaveBeenCalled();
      expect(consumeRateLimitMock).not.toHaveBeenCalled();
      expect(loginUserMock).not.toHaveBeenCalled();
    });

    it("normalizes the email, creates a session, clears the limiter, and redirects", async () => {
      loginSafeParseMock.mockReturnValue({
        success: true,
        data: {
          email: "  JOHN@EXAMPLE.COM  ",
          password: "password123",
        },
      } as never);

      loginUserMock.mockResolvedValue({
        id: "user-1",
        name: "John Doe",
        email: "john@example.com",
        image: null,
      });

      await loginAction({
        email: "  JOHN@EXAMPLE.COM  ",
        password: "password123",
      });

      expect(createRateLimitKeyMock).toHaveBeenNthCalledWith(
        1,
        "login:ip",
        "203.0.113.10",
      );

      expect(createRateLimitKeyMock).toHaveBeenNthCalledWith(
        2,
        "login:email",
        "john@example.com",
      );

      expect(consumeRateLimitMock).toHaveBeenCalledWith(
        "login:ip:203.0.113.10",
        AUTH_RATE_LIMITS.loginByIp,
      );

      expect(consumeRateLimitMock).toHaveBeenCalledWith(
        "login:email:john@example.com",
        AUTH_RATE_LIMITS.loginByEmail,
      );

      expect(loginUserMock).toHaveBeenCalledWith(
        "john@example.com",
        "password123",
      );

      expect(
        createAuthenticatedSessionMock,
      ).toHaveBeenCalledWith("user-1");

      expect(clearRateLimitMock).toHaveBeenCalledWith(
        "login:email:john@example.com",
      );

      expect(redirectMock).toHaveBeenCalledWith(
        "/dashboard",
      );
    });

    it("returns the rate-limit message without authenticating", async () => {
      loginSafeParseMock.mockReturnValue({
        success: true,
        data: {
          email: "john@example.com",
          password: "password123",
        },
      } as never);

      consumeRateLimitMock
        .mockResolvedValueOnce(allowedRateLimitResult)
        .mockResolvedValueOnce(blockedRateLimitResult);

      const result = await loginAction({
        email: "john@example.com",
        password: "password123",
      });

      expect(result).toEqual({
        success: false,
        error: {
          message: RATE_LIMIT_MESSAGE,
        },
      });

      expect(loginUserMock).not.toHaveBeenCalled();
      expect(
        createAuthenticatedSessionMock,
      ).not.toHaveBeenCalled();
      expect(redirectMock).not.toHaveBeenCalled();
    });

    it("returns a generic credentials error and does not redirect when login fails", async () => {
      const error = new Error("Invalid credentials");

      loginSafeParseMock.mockReturnValue({
        success: true,
        data: {
          email: "john@example.com",
          password: "wrong-password",
        },
      } as never);

      loginUserMock.mockRejectedValue(error);

      const result = await loginAction({
        email: "john@example.com",
        password: "wrong-password",
      });

      expect(result).toEqual({
        success: false,
        error: {
          message: "Your login details are incorrect",
        },
      });

      expect(loggerErrorMock).toHaveBeenCalledWith(error, {
        tags: {
          feature: "auth/login",
        },
        extra: [
          [
            "message",
            "User login threw an error",
          ],
        ],
      });

      expect(
        createAuthenticatedSessionMock,
      ).not.toHaveBeenCalled();

      expect(clearRateLimitMock).not.toHaveBeenCalled();
      expect(redirectMock).not.toHaveBeenCalled();
    });

    it("does not redirect when session creation fails", async () => {
      const error = new Error("Session creation failed");

      loginSafeParseMock.mockReturnValue({
        success: true,
        data: {
          email: "john@example.com",
          password: "password123",
        },
      } as never);

      loginUserMock.mockResolvedValue({
        id: "user-1",
        name: "John Doe",
        email: "john@example.com",
        image: null,
      });

      createAuthenticatedSessionMock.mockRejectedValue(
        error,
      );

      const result = await loginAction({
        email: "john@example.com",
        password: "password123",
      });

      expect(result).toEqual({
        success: false,
        error: {
          message: "Your login details are incorrect",
        },
      });

      expect(clearRateLimitMock).not.toHaveBeenCalled();
      expect(redirectMock).not.toHaveBeenCalled();
      expect(loggerErrorMock).toHaveBeenCalledOnce();
    });
  });

  describe("logoutAction", () => {
    it("destroys the session and redirects to login", async () => {
      await logoutAction();

      expect(destroySessionMock).toHaveBeenCalledOnce();
      expect(redirectMock).toHaveBeenCalledWith(
        "/login",
      );
    });

    it("does not redirect when session destruction fails", async () => {
      const error = new Error("Could not destroy session");

      destroySessionMock.mockRejectedValue(error);

      await expect(logoutAction()).rejects.toThrow(
        "Could not destroy session",
      );

      expect(redirectMock).not.toHaveBeenCalled();
    });
  });
});