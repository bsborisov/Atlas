import { beforeEach, describe, expect, it, vi } from "vitest";
import { loginUser, registerUser } from "./auth.service";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/password";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

vi.mock("@/lib/password", () => ({
  hashPassword: vi.fn(),
  verifyPassword: vi.fn(),
}));

const storedUser = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
  passwordHash: "stored-hash",
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: new Date("2026-01-01T00:00:00.000Z"),
};

describe("auth service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("loginUser", () => {
    it("returns a safe user DTO for valid credentials", async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(storedUser);
      vi.mocked(verifyPassword).mockResolvedValue(true);

      const result = await loginUser("john@example.com", "password123");

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: "john@example.com" },
      });
      expect(verifyPassword).toHaveBeenCalledWith(
        "password123",
        "stored-hash"
      );
      expect(result).toEqual({
        id: "user-1",
        name: "John Doe",
        email: "john@example.com",
      });
      expect(result).not.toHaveProperty("passwordHash");
    });

    it("rejects an unknown user with a generic error", async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null);

      await expect(
        loginUser("missing@example.com", "password123")
      ).rejects.toThrow("Invalid credentials");

      expect(verifyPassword).not.toHaveBeenCalled();
    });

    it("rejects an invalid password with the same generic error", async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(storedUser);
      vi.mocked(verifyPassword).mockResolvedValue(false);

      await expect(
        loginUser("john@example.com", "wrong-password")
      ).rejects.toThrow("Invalid credentials");
    });
  });

  describe("registerUser", () => {
    it("hashes the password and returns a safe user DTO", async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
      vi.mocked(hashPassword).mockResolvedValue("new-hash");
      vi.mocked(prisma.user.create).mockResolvedValue({
        ...storedUser,
        passwordHash: "new-hash",
      });

      const result = await registerUser({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      });

      expect(hashPassword).toHaveBeenCalledWith("password123");
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          name: "John Doe",
          email: "john@example.com",
          passwordHash: "new-hash",
        },
      });
      expect(result).toEqual({
        id: "user-1",
        name: "John Doe",
        email: "john@example.com",
      });
      expect(result).not.toHaveProperty("passwordHash");
    });

    it("does not hash or create when the email already exists", async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(storedUser);

      await expect(
        registerUser({
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
        })
      ).rejects.toThrow("User already exists");

      expect(hashPassword).not.toHaveBeenCalled();
      expect(prisma.user.create).not.toHaveBeenCalled();
    });
  });
});
