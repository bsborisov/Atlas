import { OAuth2Client } from "google-auth-library";

function getRequiredEnvironmentVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const googleClientId =
  getRequiredEnvironmentVariable("GOOGLE_CLIENT_ID");

export const googleOAuthClient = new OAuth2Client({
  clientId: googleClientId,
  clientSecret: getRequiredEnvironmentVariable(
    "GOOGLE_CLIENT_SECRET",
  ),
  redirectUri: `${getRequiredEnvironmentVariable(
    "APP_URL",
  )}/api/auth/google/callback`,
});