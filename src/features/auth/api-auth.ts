import "server-only";

import { NextResponse } from "next/server";

import { getSessionUser } from
  "@/features/auth/session";

export async function getApiUser() {
  return getSessionUser();
}

export function unauthorizedResponse() {
  return NextResponse.json(
    {
      error: "Unauthorized",
    },
    {
      status: 401,
    },
  );
}