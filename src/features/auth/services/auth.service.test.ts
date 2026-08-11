import { beforeEach, describe, expect, it, vi } from "vitest";

import { prisma } from "@/lib/prisma";
import {
  hashPassword,
  verifyPassword,
} from "@/lib/password";

import {
  loginUser,
  registerUser,
} from "./auth.service";

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

const findUniqueMock = vi.mocked(
  prisma.user.findUnique,
);

const createUserMock = vi.mocked(
  prisma.user.create,
);

const hashPasswordMock = vi.mocked(
  hashPassword,
);

const verifyPasswordMock = vi.mocked(
  verifyPassword,
);

const databaseUser = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
  image: null,
  passwordHash: "hashed-password",
  emailVerified: null,
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
};

describe("auth service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("registerUser", () => {
    it("creates and returns a new user", async () => {
      findUniqueMock.mockResolvedValue(null);

      hashPasswordMock.mockResolvedValue(
        "hashed-password",
      );

      createUserMock.mockResolvedValue(
        databaseUser,
      );

      const result = await registerUser({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      });

      expect(findUniqueMock).toHaveBeenCalledOnce();

      expect(findUniqueMock).toHaveBeenCalledWith({
        where: {
          email: "john@example.com",
        },
      });

      expect(hashPasswordMock).toHaveBeenCalledOnce();

      expect(hashPasswordMock).toHaveBeenCalledWith(
        "password123",
      );

      expect(createUserMock).toHaveBeenCalledOnce();

      expect(createUserMock).toHaveBeenCalledWith({
        data: {
          name: "John Doe",
          email: "john@example.com",
          passwordHash: "hashed-password",
        },
      });

      expect(result).toEqual({
        id: "user-1",
        name: "John Doe",
        email: "john@example.com",
        image: null,
      });
    });

    it("rejects registration when the user already exists", async () => {
      findUniqueMock.mockResolvedValue(
        databaseUser,
      );

      await expect(
        registerUser({
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
        }),
      ).rejects.toThrow("Unable to create an account with these details.");

      expect(hashPasswordMock).not.toHaveBeenCalled();
      expect(createUserMock).not.toHaveBeenCalled();
    });

    it("does not expose the password hash in the returned DTO", async () => {
      findUniqueMock.mockResolvedValue(null);

      hashPasswordMock.mockResolvedValue(
        "hashed-password",
      );

      createUserMock.mockResolvedValue(
        databaseUser,
      );

      const result = await registerUser({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      });

      expect(result).not.toHaveProperty(
        "passwordHash",
      );
    });
  });

  describe("loginUser", () => {
    it("returns the user when the password is valid", async () => {
      findUniqueMock.mockResolvedValue(
        databaseUser,
      );

      verifyPasswordMock.mockResolvedValue(true);

      const result = await loginUser(
        "john@example.com",
        "password123",
      );

      expect(findUniqueMock).toHaveBeenCalledWith({
        where: {
          email: "john@example.com",
        },
      });

      expect(verifyPasswordMock).toHaveBeenCalledWith(
        "password123",
        "hashed-password",
      );

      expect(result).toEqual({
        id: "user-1",
        name: "John Doe",
        email: "john@example.com",
        image: null,
      });
    });

    it("rejects login when the user does not exist", async () => {
      findUniqueMock.mockResolvedValue(null);

      await expect(
        loginUser(
          "missing@example.com",
          "password123",
        ),
      ).rejects.toThrow("Invalid credentials");

      expect(
        verifyPasswordMock,
      ).not.toHaveBeenCalled();
    });

    it("rejects login for a Google-only account without a password", async () => {
      findUniqueMock.mockResolvedValue({
        ...databaseUser,
        passwordHash: null,
      });

      await expect(
        loginUser(
          "john@example.com",
          "password123",
        ),
      ).rejects.toThrow("Invalid credentials");

      expect(
        verifyPasswordMock,
      ).not.toHaveBeenCalled();
    });

    it("rejects login when the password is invalid", async () => {
      findUniqueMock.mockResolvedValue(
        databaseUser,
      );

      verifyPasswordMock.mockResolvedValue(false);

      await expect(
        loginUser(
          "john@example.com",
          "wrong-password",
        ),
      ).rejects.toThrow("Invalid credentials");

      expect(verifyPasswordMock).toHaveBeenCalledWith(
        "wrong-password",
        "hashed-password",
      );
    });

    it("does not expose the password hash after login", async () => {
      findUniqueMock.mockResolvedValue(
        databaseUser,
      );

      verifyPasswordMock.mockResolvedValue(true);

      const result = await loginUser(
        "john@example.com",
        "password123",
      );

      expect(result).not.toHaveProperty(
        "passwordHash",
      );
    });
  });
});