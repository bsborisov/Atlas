import { cookies } from "next/headers";
import {
  type NextRequest,
  NextResponse,
} from "next/server";

import {
  googleClientId,
  googleOAuthClient,
} from "@/features/auth/google/google-oauth";
import {
  GoogleAccountConflictError,
  resolveGoogleUser,
} from "@/features/auth/google/google-auth.service";
import { createAuthenticatedSession } from "@/features/auth/session";

function loginErrorRedirect(
  request: NextRequest,
  code: string,
): NextResponse {
  const url = new URL("/login", request.url);
  url.searchParams.set("error", code);

  return NextResponse.redirect(url);
}

export async function GET(
  request: NextRequest,
): Promise<NextResponse> {
  const requestUrl = new URL(request.url);

  const code = requestUrl.searchParams.get("code");
  const state = requestUrl.searchParams.get("state");
  const providerError =
    requestUrl.searchParams.get("error");

  if (providerError) {
    return loginErrorRedirect(
      request,
      "google_cancelled",
    );
  }

  const cookieStore = await cookies();

  const expectedState = cookieStore.get(
    "google_oauth_state",
  )?.value;

  const codeVerifier = cookieStore.get(
    "google_oauth_code_verifier",
  )?.value;

  cookieStore.delete("google_oauth_state");
  cookieStore.delete(
    "google_oauth_code_verifier",
  );

  if (
    !code ||
    !state ||
    !expectedState ||
    !codeVerifier ||
    state !== expectedState
  ) {
    return loginErrorRedirect(
      request,
      "invalid_google_callback",
    );
  }

  try {
    const { tokens } =
      await googleOAuthClient.getToken({
        code,
        codeVerifier,
      });

    if (!tokens.id_token) {
      throw new Error(
        "Google did not return an ID token.",
      );
    }

    const ticket =
      await googleOAuthClient.verifyIdToken({
        idToken: tokens.id_token,
        audience: googleClientId,
      });

    const payload = ticket.getPayload();

    if (
      !payload?.sub ||
      !payload.email ||
      payload.email_verified !== true
    ) {
      throw new Error(
        "Google identity is incomplete or unverified.",
      );
    }

    const user = await resolveGoogleUser({
      googleSubject: payload.sub,
      email: payload.email.trim().toLowerCase(),
      name: payload.name ?? payload.email,
      image: payload.picture ?? null,
    });

    await createAuthenticatedSession(user.id);

    return NextResponse.redirect(
      new URL("/dashboard", request.url),
    );
  } catch (error) {
    if (error instanceof GoogleAccountConflictError) {
      return loginErrorRedirect(
        request,
        "account_link_required",
      );
    }

    return loginErrorRedirect(
      request,
      "google_auth_failed",
    );
  }
}