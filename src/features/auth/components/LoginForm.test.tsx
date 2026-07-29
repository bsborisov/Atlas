import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import LoginForm from "./LoginForm";
import { loginAction } from "@/features/auth/actions/auth";

vi.mock("@/features/auth/actions/auth", () => ({
  loginAction: vi.fn(),
}));

describe("LoginForm", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders all fields", () => {
    render(<LoginForm />);

    expect(
      screen.getByPlaceholderText(/email address/i)
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/^password$/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /login/i,
      })
    ).toBeInTheDocument();
  });

  it("allows entering email and password", async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    const email = screen.getByPlaceholderText(/email address/i);
    const password = screen.getByPlaceholderText(/^password$/i);

    await user.type(email, "john@test.com");
    await user.type(password, "password123");

    expect(email).toHaveValue("john@test.com");
    expect(password).toHaveValue("password123");
  });

  it("submits valid credentials", async () => {
    const user = userEvent.setup();

    vi.mocked(loginAction).mockResolvedValue({
      success: true,
    });

    render(<LoginForm />);

    await user.type(
      screen.getByPlaceholderText(/email address/i),
      "john@test.com"
    );

    await user.type(
      screen.getByPlaceholderText(/^password$/i),
      "password123"
    );

    await user.click(
      screen.getByRole("button", {
        name: /login/i,
      })
    );

    expect(loginAction).toHaveBeenCalledWith({
      email: "john@test.com",
      password: "password123",
    });
  });
});