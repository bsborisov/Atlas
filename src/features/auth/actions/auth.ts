"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginSchema } from "@/features/auth/schemas/login.schema";
import { loginUser, registerUser } from "@/features/auth/services/auth.service";
import { createSession, destroySession } from "@/features/auth/session";
import { registerSchema } from "@/features/auth/schemas/register.schema";
import { validationError } from "@/lib/action-error";
import { ActionResult } from "@/types/action";
import { logger } from "@/features/error-logger";

export async function registerAction(
  input: unknown
): Promise<ActionResult> {


  const result = registerSchema.safeParse(input);

  if (!result.success) {

    return {
      success: false,
      error: validationError(result.error)
    }

  }

  try {

    await registerUser(result.data);

    return {

      success: true

    }

  } catch (error) {

    logger.error(error, {
      tags: {
        feature: "auth/registration"
      },
      extra: [
        ["message", "User registration failed on server"]
      ]
    })

    return {
      success: false,
      error: {
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong"
      }
    }

  }
}

export async function loginAction(
  input: unknown
): Promise<ActionResult> {

  const result = loginSchema.safeParse(input);

  if (!result.success) {

    return {
      success: false,
      error: validationError(result.error)
    }

  }

  try {
    const user = await loginUser(
      result.data.email,
      result.data.password
    );

    const token = await createSession(user.id);
    const cookieStore = await cookies();

    cookieStore.set(
      "session",
      token,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/"
      }
    );

  }

  catch (error) {

    logger.warn(error, {
      tags: {
        feature: "auth/login"
      },
      extra: [
        ["message", "User login details are incorrect"]
      ],
      skipSentry: true
    })

    return {
      success: false,
      error: {
        message: "Your login details are incorrect"
      }
    }
  }

  redirect("/dashboard");
}

export async function logoutAction() {

  await destroySession();

  redirect("/login");

}