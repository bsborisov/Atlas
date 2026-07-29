import { beforeEach, describe, expect, it, vi } from "vitest";
import { prisma } from "@/lib/prisma";
import {
  clearRateLimit,
  consumeRateLimit,
  createRateLimitKey,
} from "./rate-limit";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    authRateLimit: {
      deleteMany: vi.fn(),
      upsert: vi.fn(),
    },
  },
}));

describe("rate limiting", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("hashes identifiers instead of storing raw emails or IPs", () => {
    const key = createRateLimitKey("login:email", "John@Example.com");

    expect(key).toMatch(/^login:email:[a-f0-9]{64}$/);
    expect(key).not.toContain("john@example.com");
    expect(key).toBe(
      createRateLimitKey("login:email", " john@example.com ")
    );
  });

  it("allows requests while the count is within the limit", async () => {
    const now = new Date("2026-07-29T08:00:00.000Z");
    vi.mocked(prisma.authRateLimit.upsert).mockResolvedValue({
      id: "rate-1",
      key: "login:ip:hash",
      count: 2,
      expiresAt: new Date("2026-07-29T08:15:00.000Z"),
      createdAt: now,
      updatedAt: now,
    });

    const result = await consumeRateLimit(
      "login:ip:hash",
      { limit: 5, windowMs: 15 * 60 * 1000 },
      now
    );

    expect(result).toEqual({
      allowed: true,
      limit: 5,
      remaining: 3,
      retryAfterSeconds: 900,
    });
  });

  it("blocks requests after the limit is exceeded", async () => {
    const now = new Date("2026-07-29T08:00:00.000Z");
    vi.mocked(prisma.authRateLimit.upsert).mockResolvedValue({
      id: "rate-1",
      key: "login:email:hash",
      count: 6,
      expiresAt: new Date("2026-07-29T08:10:00.000Z"),
      createdAt: now,
      updatedAt: now,
    });

    const result = await consumeRateLimit(
      "login:email:hash",
      { limit: 5, windowMs: 15 * 60 * 1000 },
      now
    );

    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
    expect(result.retryAfterSeconds).toBe(600);
  });

  it("deletes an expired window before consuming the next request", async () => {
    const now = new Date("2026-07-29T08:00:00.000Z");
    vi.mocked(prisma.authRateLimit.upsert).mockResolvedValue({
      id: "rate-1",
      key: "login:ip:hash",
      count: 1,
      expiresAt: new Date("2026-07-29T08:15:00.000Z"),
      createdAt: now,
      updatedAt: now,
    });

    await consumeRateLimit(
      "login:ip:hash",
      { limit: 5, windowMs: 15 * 60 * 1000 },
      now
    );

    expect(prisma.authRateLimit.deleteMany).toHaveBeenCalledWith({
      where: {
        key: "login:ip:hash",
        expiresAt: { lte: now },
      },
    });
  });

  it("clears a limiter key", async () => {
    await clearRateLimit("login:email:hash");

    expect(prisma.authRateLimit.deleteMany).toHaveBeenCalledWith({
      where: { key: "login:email:hash" },
    });
  });
});
