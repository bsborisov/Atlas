import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/features/auth/session";
import ProtectedLayout from "./layout";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("@/features/auth/session", () => ({
  getSessionUser: vi.fn(),
}));

vi.mock("@/providers/AuthProvider", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock("@/components/layout/AppShell", () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="app-shell">{children}</div>
  ),
}));

describe("ProtectedLayout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects unauthenticated visitors to login", async () => {
    vi.mocked(getSessionUser).mockResolvedValue(null);
    vi.mocked(redirect).mockImplementation(() => {
      throw new Error("NEXT_REDIRECT");
    });

    await expect(
      ProtectedLayout({ children: <div>Dashboard</div> })
    ).rejects.toThrow("NEXT_REDIRECT");

    expect(redirect).toHaveBeenCalledWith("/login");
  });

  it("renders protected content for an authenticated user", async () => {
    vi.mocked(getSessionUser).mockResolvedValue({
      id: "user-1",
      name: "John Doe",
      email: "john@example.com",
    });

    const view = await ProtectedLayout({
      children: <div>Dashboard</div>,
    });

    render(view);

    expect(screen.getByTestId("app-shell")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(redirect).not.toHaveBeenCalled();
  });
});
