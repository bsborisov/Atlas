import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getGoogleOAuthClient } from "@/features/auth/google/google-oauth";
import { CodeChallengeMethod } from "google-auth-library";

const COOKIE_LIFETIME_SECONDS = 10 * 60;

const oauthCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: COOKIE_LIFETIME_SECONDS,
};

export async function GET(): Promise<NextResponse> {
  const googleOAuthClient =
    getGoogleOAuthClient();

  const state = randomBytes(32).toString(
    "base64url",
  );

  const {
    codeVerifier,
    codeChallenge,
  } = await googleOAuthClient.generateCodeVerifierAsync();

  const cookieStore = await cookies();

  cookieStore.set(
    "google_oauth_state",
    state,
    oauthCookieOptions,
  );

  cookieStore.set(
    "google_oauth_code_verifier",
    codeVerifier,
    oauthCookieOptions,
  );

  const authorizationUrl =
    googleOAuthClient.generateAuthUrl({
      access_type: "online",
      prompt: "select_account",

      scope: [
        "openid",
        "email",
        "profile",
      ],

      state,

      code_challenge: codeChallenge,
      code_challenge_method: CodeChallengeMethod.S256,
    });

  return NextResponse.redirect(authorizationUrl);
}