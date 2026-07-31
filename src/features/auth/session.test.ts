import { beforeEach, describe, expect, it, vi } from "vitest";
import crypto from "crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import {
  createSession,
  destroySession,
  getSessionUser,
} from "./session";

vi.mock("next/headers", () => ({
  cookies: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    session: {
      create: vi.fn(),
      findUnique: vi.fn(),
      delete: vi.fn(),
      deleteMany: vi.fn(),
    },
  },
}));

const cookieStore = {
  get: vi.fn(),
  delete: vi.fn(),
};

const safeUser = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
};

describe("session service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(cookies).mockResolvedValue(cookieStore as never);
  });

  describe("createSession", () => {
    it("creates a seven-day session with a cryptographically generated token", async () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-07-29T07:00:00.000Z"));
      vi.spyOn(crypto, "randomBytes").mockReturnValue(
        Buffer.from("a".repeat(64), "hex") as never
      );
      vi.mocked(prisma.session.create).mockResolvedValue({} as never);

      const session = await createSession("user-1");

      expect(session).toEqual({
        token: "a".repeat(64),
        expiresAt: new Date("2026-08-05T07:00:00.000Z"),
      });
      expect(prisma.session.create).toHaveBeenCalledWith({
        data: {
          token: "a".repeat(64),
          userId: "user-1",
          expiresAt: new Date("2026-08-05T07:00:00.000Z"),
        },
      });

      vi.useRealTimers();
    });
  });

  describe("getSessionUser", () => {
    it("returns null without a session cookie", async () => {
      cookieStore.get.mockReturnValue(undefined);

      await expect(getSessionUser()).resolves.toBeNull();
      expect(prisma.session.findUnique).not.toHaveBeenCalled();
    });

    it("returns null when the token is not found", async () => {
      cookieStore.get.mockReturnValue({ value: "missing-token" });
      vi.mocked(prisma.session.findUnique).mockResolvedValue(null);

      await expect(getSessionUser()).resolves.toBeNull();
    });

    it("returns only safe user fields for a valid session", async () => {
      cookieStore.get.mockReturnValue({ value: "valid-token" });
      vi.mocked(prisma.session.findUnique).mockResolvedValue({
        id: "session-1",
        expiresAt: new Date(Date.now() + 60_000),
        user: safeUser,
      } as never);

      const result = await getSessionUser();

      expect(prisma.session.findUnique).toHaveBeenCalledWith({
        where: { token: "valid-token" },
        select: {
          id: true,
          expiresAt: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      });
      expect(result).toEqual(safeUser);
      expect(result).not.toHaveProperty("passwordHash");
    });

    it("deletes an expired session and returns null", async () => {
      cookieStore.get.mockReturnValue({ value: "expired-token" });
      vi.mocked(prisma.session.findUnique).mockResolvedValue({
        id: "session-expired",
        expiresAt: new Date(Date.now() - 1),
        user: safeUser,
      } as never);
      vi.mocked(prisma.session.delete).mockResolvedValue({} as never);

      await expect(getSessionUser()).resolves.toBeNull();
      expect(prisma.session.delete).toHaveBeenCalledWith({
        where: { id: "session-expired" },
      });
    });
  });

  describe("destroySession", () => {
    it("deletes the stored session and clears the cookie", async () => {
      cookieStore.get.mockReturnValue({ value: "active-token" });
      vi.mocked(prisma.session.deleteMany).mockResolvedValue({ count: 1 });

      await destroySession();

      expect(prisma.session.deleteMany).toHaveBeenCalledWith({
        where: { token: "active-token" },
      });
      expect(cookieStore.delete).toHaveBeenCalledWith("session");
    });

    it("still clears the cookie when no token is present", async () => {
      cookieStore.get.mockReturnValue(undefined);

      await destroySession();

      expect(prisma.session.deleteMany).not.toHaveBeenCalled();
      expect(cookieStore.delete).toHaveBeenCalledWith("session");
    });
  });
});
