import { NextResponse } from "next/server";

import {
  getExecutions,
} from "@/features/executions/services/executions.service";

import {
  getApiUser,
  unauthorizedResponse,
} from "@/features/auth/api-auth";

export async function GET() {
  const user = await getApiUser();

  if (!user) {
    return unauthorizedResponse();
  }

  const executions =
    await getExecutions();

  return NextResponse.json(executions);
}