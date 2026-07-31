"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { loginSchema } from "@/features/auth/schemas/login.schema";
import {
  loginUser,
  registerUser
} from "@/features/auth/services/auth.service";
import {
  createAuthenticatedSession,
  destroySession
} from "@/features/auth/session";
import { registerSchema } from "@/features/auth/schemas/register.schema";
import {
  AUTH_RATE_LIMITS,
  RATE_LIMIT_MESSAGE,
  clearRateLimit,
  consumeRateLimit,
  createRateLimitKey,
  getClientIp,
} from "@/features/auth/rate-limit";
import { validationError } from "@/lib/action-error";
import type { ActionResult } from "@/types/action";
import { logger } from "@/lib/logger";

async function isRateLimited(
  checks: Array<{
    key: string;
    policy: { limit: number; windowMs: number };
  }>
): Promise<boolean> {
  const results = await Promise.all(
    checks.map(({ key, policy }) => consumeRateLimit(key, policy))
  );

  return results.some((result) => !result.allowed);
}

export async function registerAction(input: unknown): Promise<ActionResult> {
  const result = registerSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      error: validationError(result.error),
    };
  }

  const requestHeaders = await headers();
  const clientIp = getClientIp(requestHeaders);
  const normalizedEmail = result.data.email.trim().toLowerCase();
  const ipKey = createRateLimitKey("register:ip", clientIp);
  const emailKey = createRateLimitKey("register:email", normalizedEmail);

  if (
    await isRateLimited([
      { key: ipKey, policy: AUTH_RATE_LIMITS.registerByIp },
      { key: emailKey, policy: AUTH_RATE_LIMITS.registerByEmail },
    ])
  ) {
    return {
      success: false,
      error: { message: RATE_LIMIT_MESSAGE },
    };
  }

  try {
    const {
      name,
      password,
    } = result.data;

    await registerUser({
      name,
      email: normalizedEmail,
      password,
    });

    await clearRateLimit(emailKey);

    return { success: true };
  } catch (error) {
    logger.error(error, {
      tags: {
        feature: "auth/registration",
      },
      extra: [["message", "User registration failed on server"]],
    });

    return {
      success: false,
      error: {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
    };
  }
}

export async function loginAction(input: unknown): Promise<ActionResult> {
  const result = loginSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      error: validationError(result.error),
    };
  }

  const requestHeaders = await headers();
  const clientIp = getClientIp(requestHeaders);
  const normalizedEmail = result.data.email.trim().toLowerCase();
  const ipKey = createRateLimitKey("login:ip", clientIp);
  const emailKey = createRateLimitKey("login:email", normalizedEmail);

  if (
    await isRateLimited([
      { key: ipKey, policy: AUTH_RATE_LIMITS.loginByIp },
      { key: emailKey, policy: AUTH_RATE_LIMITS.loginByEmail },
    ])
  ) {
    return {
      success: false,
      error: { message: RATE_LIMIT_MESSAGE },
    };
  }

  try {

    const user = await loginUser(normalizedEmail, result.data.password);

    await createAuthenticatedSession(user.id);
    await clearRateLimit(emailKey);

  } catch (error) {
    logger.error(error, {
      tags: {
        feature: "auth/login",
      },
      extra: [["message", "User login threw an error"]],
    });

    return {
      success: false,
      error: {
        message: "Your login details are incorrect",
      },
    };
  }

  redirect("/dashboard");
}

export async function logoutAction() {
  await destroySession();
  redirect("/login");
}
