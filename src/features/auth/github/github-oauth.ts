import "server-only";

import {
  createHash,
  randomBytes,
} from "node:crypto";

const GITHUB_API_VERSION = "2026-03-10";

function getRequiredEnvironmentVariable(
  name: string,
): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing environment variable: ${name}`,
    );
  }

  return value;
}

export function getAppUrl(): string {
  return getRequiredEnvironmentVariable(
    "APP_URL",
  ).replace(/\/$/, "");
}

export function createAppUrl(path: string): URL {
  return new URL(path, getAppUrl());
}

export function getGitHubOAuthConfig() {
  return {
    clientId: getRequiredEnvironmentVariable(
      "GITHUB_CLIENT_ID",
    ),
    clientSecret:
      getRequiredEnvironmentVariable(
        "GITHUB_CLIENT_SECRET",
      ),
    callbackUrl: createAppUrl(
      "/api/auth/github/callback",
    ).toString(),
  };
}

export function createGitHubPkcePair(): {
  codeVerifier: string;
  codeChallenge: string;
} {
  const codeVerifier = randomBytes(32).toString(
    "base64url",
  );

  const codeChallenge = createHash("sha256")
    .update(codeVerifier)
    .digest("base64url");

  return {
    codeVerifier,
    codeChallenge,
  };
}

type GitHubTokenResponse = {
  access_token?: string;
  token_type?: string;
  expires_in?: number;

  error?: string;
  error_description?: string;
};

export async function exchangeGitHubCode({
  code,
  codeVerifier,
}: {
  code: string;
  codeVerifier: string;
}): Promise<string> {
  const {
    clientId,
    clientSecret,
    callbackUrl,
  } = getGitHubOAuthConfig();

  const response = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: callbackUrl,
        code_verifier: codeVerifier,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(
      `GitHub token exchange failed: ${response.status}`,
    );
  }

  const tokenResponse =
    (await response.json()) as GitHubTokenResponse;

  if (!tokenResponse.access_token) {
    throw new Error(
      tokenResponse.error_description ??
      tokenResponse.error ??
      "GitHub did not return an access token.",
    );
  }

  return tokenResponse.access_token;
}

type GitHubUserResponse = {
  id: number;
  login: string;
  name: string | null;
  email: string | null;
  avatar_url: string;
};

type GitHubEmailResponse = {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: "public" | "private" | null;
};

export type GitHubIdentity = {
  providerAccountId: string;
  email: string;
  name: string;
  image: string | null;
};

function createGitHubApiHeaders(
  accessToken: string,
): HeadersInit {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${accessToken}`,
    "X-GitHub-Api-Version":
      GITHUB_API_VERSION,
  };
}

export async function getGitHubIdentity(
  accessToken: string,
): Promise<GitHubIdentity> {
  const headers =
    createGitHubApiHeaders(accessToken);

  const [userResponse, emailResponse] =
    await Promise.all([
      fetch("https://api.github.com/user", {
        headers,
        cache: "no-store",
      }),

      fetch(
        "https://api.github.com/user/emails",
        {
          headers,
          cache: "no-store",
        },
      ),
    ]);

  if (!userResponse.ok) {
    throw new Error(
      `GitHub user request failed: ${userResponse.status}`,
    );
  }

  if (!emailResponse.ok) {
    throw new Error(
      `GitHub email request failed: ${emailResponse.status}`,
    );
  }

  const githubUser =
    (await userResponse.json()) as GitHubUserResponse;

  const githubEmails =
    (await emailResponse.json()) as GitHubEmailResponse[];

  const verifiedEmail =
    githubEmails.find(
      ({ primary, verified }) =>
        primary && verified,
    ) ??
    githubEmails.find(
      ({ verified }) => verified,
    );

  if (!verifiedEmail) {
    throw new Error(
      "The GitHub account has no verified email address.",
    );
  }

  return {
    providerAccountId: String(githubUser.id),
    email: verifiedEmail.email
      .trim()
      .toLowerCase(),
    name: githubUser.name ?? githubUser.login,
    image: githubUser.avatar_url ?? null,
  };
}