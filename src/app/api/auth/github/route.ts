import { randomBytes } from "node:crypto";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  createGitHubPkcePair,
  getGitHubOAuthConfig,
} from "@/features/auth/github/github-oauth";

const COOKIE_LIFETIME_SECONDS = 10 * 60;

const oauthCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: COOKIE_LIFETIME_SECONDS,
};

export async function GET(): Promise<NextResponse> {
  const {
    clientId,
    callbackUrl,
  } = getGitHubOAuthConfig();

  const state = randomBytes(32).toString(
    "base64url",
  );

  const {
    codeVerifier,
    codeChallenge,
  } = createGitHubPkcePair();

  const cookieStore = await cookies();

  cookieStore.set(
    "github_oauth_state",
    state,
    oauthCookieOptions,
  );

  cookieStore.set(
    "github_oauth_code_verifier",
    codeVerifier,
    oauthCookieOptions,
  );

  const authorizationUrl = new URL(
    "https://github.com/login/oauth/authorize",
  );

  authorizationUrl.searchParams.set(
    "client_id",
    clientId,
  );

  authorizationUrl.searchParams.set(
    "redirect_uri",
    callbackUrl,
  );

  authorizationUrl.searchParams.set(
    "state",
    state,
  );

  authorizationUrl.searchParams.set(
    "code_challenge",
    codeChallenge,
  );

  authorizationUrl.searchParams.set(
    "code_challenge_method",
    "S256",
  );

  authorizationUrl.searchParams.set(
    "prompt",
    "select_account",
  );

  return NextResponse.redirect(
    authorizationUrl,
  );
}