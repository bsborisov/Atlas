import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { logger } from "@/lib/logger";
import {
  type NextRequest,
  NextResponse,
} from "next/server";

import {
  createAppUrl,
  exchangeGitHubCode,
  getGitHubIdentity,
} from "@/features/auth/github/github-oauth";

import {
  OAuthAccountConflictError,
  resolveOAuthUser,
} from "@/features/auth/oauth/resolve-oauth-user";

import {
  createAuthenticatedSession,
} from "@/features/auth/session";

function valuesMatch(
  received: string,
  expected: string,
): boolean {
  const receivedBuffer =
    Buffer.from(received);

  const expectedBuffer =
    Buffer.from(expected);

  return (
    receivedBuffer.length ===
    expectedBuffer.length &&
    timingSafeEqual(
      receivedBuffer,
      expectedBuffer,
    )
  );
}

function loginErrorRedirect(
  code: string,
): NextResponse {
  const url = createAppUrl("/login");

  url.searchParams.set("error", code);

  return NextResponse.redirect(url);
}

export async function GET(
  request: NextRequest,
): Promise<NextResponse> {
  const requestUrl = new URL(request.url);

  const code =
    requestUrl.searchParams.get("code");

  const state =
    requestUrl.searchParams.get("state");

  const providerError =
    requestUrl.searchParams.get("error");

  if (providerError) {
    return loginErrorRedirect(
      "github_cancelled",
    );
  }

  const cookieStore = await cookies();

  const expectedState =
    cookieStore.get(
      "github_oauth_state",
    )?.value;

  const codeVerifier =
    cookieStore.get(
      "github_oauth_code_verifier",
    )?.value;

  /*
   * State and verifier are one-time values.
   */
  cookieStore.delete(
    "github_oauth_state",
  );

  cookieStore.delete(
    "github_oauth_code_verifier",
  );

  if (
    !code ||
    !state ||
    !expectedState ||
    !codeVerifier ||
    !valuesMatch(state, expectedState)
  ) {
    return loginErrorRedirect(
      "invalid_github_callback",
    );
  }

  try {
    const accessToken =
      await exchangeGitHubCode({
        code,
        codeVerifier,
      });

    const identity =
      await getGitHubIdentity(accessToken);

    const user = await resolveOAuthUser({
      provider: "github",
      providerAccountId:
        identity.providerAccountId,
      email: identity.email,
      name: identity.name,
      image: identity.image,
    });

    await createAuthenticatedSession(
      user.id,
    );

    return NextResponse.redirect(
      createAppUrl("/dashboard"),
    );
  } catch (error) {
    if (
      error instanceof
      OAuthAccountConflictError
    ) {
      return loginErrorRedirect(
        "account_link_required",
      );
    }

    logger.error(error, {
      tags: {
        feature: "auth/github",
      },
      extra: [
        [
          "message",
          "GitHub authentication failed",
        ],
      ],
    });

    return loginErrorRedirect(
      "github_auth_failed",
    );
  }
}