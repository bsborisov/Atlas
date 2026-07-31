import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getSessionUser } from "@/features/auth/session";
import { redirect } from "next/navigation";

import ProtectedLayout from "./layout";

vi.mock("@/features/auth/session", () => ({
  getSessionUser: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("@/providers/AuthProvider", () => ({
  AuthProvider: ({
    user,
    children,
  }: {
    user: {
      id: string;
      name: string;
      email: string;
      image: string | null;
    };
    children: ReactNode;
  }) => (
    <div
      data-testid="auth-provider"
      data-user-id={user.id}
      data-user-email={user.email}
    >
      {children}
    </div>
  ),
}));

vi.mock("@/components/layout/AppShell", () => ({
  AppShell: ({ children }: { children: ReactNode }) => (
    <div data-testid="app-shell">{children}</div>
  ),
}));

const getSessionUserMock = vi.mocked(getSessionUser);
const redirectMock = vi.mocked(redirect);

const sessionUser = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
  image: null,
};

describe("ProtectedLayout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects unauthenticated users to the login page", async () => {
    getSessionUserMock.mockResolvedValue(null);

    redirectMock.mockImplementation(() => {
      throw new Error("NEXT_REDIRECT");
    });

    await expect(
      ProtectedLayout({
        children: <div>Protected content</div>,
      }),
    ).rejects.toThrow("NEXT_REDIRECT");

    expect(getSessionUserMock).toHaveBeenCalledOnce();
    expect(redirectMock).toHaveBeenCalledOnce();
    expect(redirectMock).toHaveBeenCalledWith("/login");
  });

  it("renders authenticated users inside AuthProvider and AppShell", async () => {
    getSessionUserMock.mockResolvedValue(sessionUser);

    const layout = await ProtectedLayout({
      children: <div>Protected content</div>,
    });

    render(layout);

    expect(getSessionUserMock).toHaveBeenCalledOnce();
    expect(redirectMock).not.toHaveBeenCalled();

    expect(screen.getByTestId("auth-provider")).toHaveAttribute(
      "data-user-id",
      "user-1",
    );

    expect(screen.getByTestId("auth-provider")).toHaveAttribute(
      "data-user-email",
      "john@example.com",
    );

    expect(screen.getByTestId("app-shell")).toBeInTheDocument();

    expect(
      screen.getByText("Protected content"),
    ).toBeInTheDocument();
  });
});