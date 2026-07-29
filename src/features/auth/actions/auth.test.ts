import { beforeEach, describe, expect, it, vi } from "vitest";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginAction, logoutAction } from "./auth";
import { loginUser } from "@/features/auth/services/auth.service";
import { createSession, destroySession } from "@/features/auth/session";

vi.mock("next/headers", () => ({
  cookies: vi.fn(),
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

vi.mock("@/lib/logger", () => ({
  logger: {
    error: vi.fn(),
  },
}));

const cookieStore = {
  set: vi.fn(),
};

describe("auth actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(cookies).mockResolvedValue(cookieStore as never);
  });

  it("returns validation errors without calling the authentication service", async () => {
    const result = await loginAction({
      email: "not-an-email",
      password: "short",
    });

    expect(result).toMatchObject({ success: false });
    expect(loginUser).not.toHaveBeenCalled();
    expect(createSession).not.toHaveBeenCalled();
  });

  it("creates a secure session cookie and redirects after login", async () => {
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
    expect(cookieStore.set).toHaveBeenCalledWith(
      "session",
      "session-token",
      {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      }
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
    expect(cookieStore.set).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("destroys the session before redirecting on logout", async () => {
    await logoutAction();

    expect(destroySession).toHaveBeenCalledOnce();
    expect(redirect).toHaveBeenCalledWith("/login");
  });
});
