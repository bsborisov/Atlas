import { getExecutions } from "@/features/executions/services/executions.service";
import { NextResponse } from "next/server";

export async function GET() {
  const executions = await getExecutions();

  return NextResponse.json(executions);
}