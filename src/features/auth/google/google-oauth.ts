import {
  OAuth2Client,
} from "google-auth-library";

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

export function getGoogleClientId(): string {
  return getRequiredEnvironmentVariable(
    "GOOGLE_CLIENT_ID",
  );
}

export function getGoogleOAuthClient(): OAuth2Client {
  const clientId = getGoogleClientId();

  const clientSecret =
    getRequiredEnvironmentVariable(
      "GOOGLE_CLIENT_SECRET",
    );

  const appUrl =
    getRequiredEnvironmentVariable("APP_URL");

  return new OAuth2Client({
    clientId,
    clientSecret,
    redirectUri:
      `${appUrl}/api/auth/google/callback`,
  });
}