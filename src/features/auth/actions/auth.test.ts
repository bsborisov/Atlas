import { beforeEach, describe, expect, it, vi } from "vitest";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { loginAction, logoutAction, registerAction } from "./auth";
import {
  loginUser,
  registerUser,
} from "@/features/auth/services/auth.service";
import { createSession, destroySession } from "@/features/auth/session";
import {
  clearRateLimit,
  consumeRateLimit,
  createRateLimitKey,
} from "@/features/auth/rate-limit";

vi.mock("next/headers", () => ({
  cookies: vi.fn(),
  headers: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("@/features/auth/services/auth.service", () => ({
  loginUser: vi.fn(),
  registerUser: vi.fn(),
}));

vi.mock("@/features/auth/session", () => ({
  createSession: vi.fn(),
  destroySession: vi.fn(),
}));

vi.mock("@/features/auth/rate-limit", () => ({
  AUTH_RATE_LIMITS: {
    loginByIp: { limit: 20, windowMs: 900_000 },
    loginByEmail: { limit: 5, windowMs: 900_000 },
    registerByIp: { limit: 5, windowMs: 3_600_000 },
    registerByEmail: { limit: 3, windowMs: 3_600_000 },
  },
  RATE_LIMIT_MESSAGE: "Too many attempts. Please try again later.",
  getClientIp: vi.fn(() => "203.0.113.10"),
  createRateLimitKey: vi.fn(
    (scope: string, identifier: string) => `${scope}:${identifier}`
  ),
  consumeRateLimit: vi.fn(),
  clearRateLimit: vi.fn(),
}));

vi.mock("@/lib/logger", () => ({
  logger: {
    error: vi.fn(),
  },
}));

const cookieStore = {
  set: vi.fn(),
};

const requestHeaders = {
  get: vi.fn(),
};

const allowedResult = {
  allowed: true,
  limit: 5,
  remaining: 4,
  retryAfterSeconds: 900,
};

describe("auth actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(cookies).mockResolvedValue(cookieStore as never);
    vi.mocked(headers).mockResolvedValue(requestHeaders as never);
    vi.mocked(consumeRateLimit).mockResolvedValue(allowedResult);
  });

  it("returns validation errors without consuming a login limit", async () => {
    const result = await loginAction({
      email: "not-an-email",
      password: "short",
    });

    expect(result).toMatchObject({ success: false });
    expect(consumeRateLimit).not.toHaveBeenCalled();
    expect(loginUser).not.toHaveBeenCalled();
    expect(createSession).not.toHaveBeenCalled();
  });

  it("checks both IP and normalized-email limits before login", async () => {
    vi.mocked(loginUser).mockRejectedValue(new Error("Invalid credentials"));

    await loginAction({
      email: "John@Example.com",
      password: "wrong-password",
    });

    expect(createRateLimitKey).toHaveBeenCalledWith(
      "login:ip",
      "203.0.113.10"
    );
    expect(createRateLimitKey).toHaveBeenCalledWith(
      "login:email",
      "john@example.com"
    );
    expect(consumeRateLimit).toHaveBeenCalledTimes(2);
    expect(loginUser).toHaveBeenCalledWith(
      "john@example.com",
      "wrong-password"
    );
  });

  it("blocks login before checking credentials when any limit is exceeded", async () => {
    vi.mocked(consumeRateLimit)
      .mockResolvedValueOnce(allowedResult)
      .mockResolvedValueOnce({
        ...allowedResult,
        allowed: false,
        remaining: 0,
      });

    const result = await loginAction({
      email: "john@example.com",
      password: "password123",
    });

    expect(result).toEqual({
      success: false,
      error: {
        message: "Too many attempts. Please try again later.",
      },
    });
    expect(loginUser).not.toHaveBeenCalled();
    expect(createSession).not.toHaveBeenCalled();
  });

  it("creates a secure session cookie, clears the email limit, and redirects", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.mocked(loginUser).mockResolvedValue({
      id: "user-1",
      name: "John Doe",
      email: "john@example.com",
    });
    vi.mocked(createSession).mockResolvedValue("session-token");

    await loginAction({
      email: "john@example.com",
      password: "password123",
    });

    expect(createSession).toHaveBeenCalledWith("user-1");
    expect(cookieStore.set).toHaveBeenCalledWith("session", "session-token", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    expect(clearRateLimit).toHaveBeenCalledWith(
      "login:email:john@example.com"
    );
    expect(redirect).toHaveBeenCalledWith("/dashboard");

    vi.unstubAllEnvs();
  });

  it("returns a generic message when credentials are invalid", async () => {
    vi.mocked(loginUser).mockRejectedValue(new Error("Invalid credentials"));

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
    expect(clearRateLimit).not.toHaveBeenCalled();
    expect(cookieStore.set).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("blocks registration before creating a user", async () => {
    vi.mocked(consumeRateLimit).mockResolvedValue({
      ...allowedResult,
      allowed: false,
      remaining: 0,
    });

    const result = await registerAction({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      confirmPassword: "password123",
    });

    expect(result).toEqual({
      success: false,
      error: {
        message: "Too many attempts. Please try again later.",
      },
    });
    expect(registerUser).not.toHaveBeenCalled();
  });

  it("normalizes registration email and clears its limiter on success", async () => {
    vi.mocked(registerUser).mockResolvedValue({
      id: "user-1",
      name: "John Doe",
      email: "john@example.com",
    });

    const result = await registerAction({
      name: "John Doe",
      email: "John@Example.com",
      password: "password123",
      confirmPassword: "password123",
    });

    expect(registerUser).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      confirmPassword: "password123",
    });
    expect(clearRateLimit).toHaveBeenCalledWith(
      "register:email:john@example.com"
    );
    expect(result).toEqual({ success: true });
  });

  it("destroys the session before redirecting on logout", async () => {
    await logoutAction();

    expect(destroySession).toHaveBeenCalledOnce();
    expect(redirect).toHaveBeenCalledWith("/login");
  });
});
