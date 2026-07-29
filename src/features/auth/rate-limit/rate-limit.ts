import { createHash } from "node:crypto";
import { prisma } from "@/lib/prisma";

export type RateLimitPolicy = {
  limit: number;
  windowMs: number;
};

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds: number;
};

type RateLimitScope =
  | "login:ip"
  | "login:email"
  | "register:ip"
  | "register:email";

function hashIdentifier(identifier: string): string {
  return createHash("sha256")
    .update(identifier.trim().toLowerCase())
    .digest("hex");
}

export function createRateLimitKey(
  scope: RateLimitScope,
  identifier: string
): string {
  return `${scope}:${hashIdentifier(identifier)}`;
}

export async function consumeRateLimit(
  key: string,
  policy: RateLimitPolicy,
  now = new Date()
): Promise<RateLimitResult> {
  await prisma.authRateLimit.deleteMany({
    where: {
      key,
      expiresAt: {
        lte: now,
      },
    },
  });

  const entry = await prisma.authRateLimit.upsert({
    where: { key },
    create: {
      key,
      count: 1,
      expiresAt: new Date(now.getTime() + policy.windowMs),
    },
    update: {
      count: {
        increment: 1,
      },
    },
  });

  const remaining = Math.max(policy.limit - entry.count, 0);
  const retryAfterSeconds = Math.max(
    Math.ceil((entry.expiresAt.getTime() - now.getTime()) / 1000),
    0
  );

  return {
    allowed: entry.count <= policy.limit,
    limit: policy.limit,
    remaining,
    retryAfterSeconds,
  };
}

export async function clearRateLimit(key: string): Promise<void> {
  await prisma.authRateLimit.deleteMany({
    where: { key },
  });
}
