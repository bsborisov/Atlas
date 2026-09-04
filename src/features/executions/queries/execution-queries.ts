import { useQuery } from "@tanstack/react-query";
import type { ExecutionsDto } from "../types/executions.dto";

export const executionKeys = {
  all: ["executions"] as const,
  list: () => [...executionKeys.all, "list"] as const,
};

async function fetchExecutions(): Promise<ExecutionsDto[]> {
  const response = await fetch("/api/executions");

  if (!response.ok) {
    throw new Error(
      "Failed to load executions",
    );
  }

  return response.json();
}

export function useExecutions(initialData?: ExecutionsDto[]) {
  return useQuery({
    queryKey: executionKeys.list(),
    queryFn: fetchExecutions,
    initialData,

    staleTime: 5000,

    refetchInterval: (query) => {
      const executions = query.state.data;

      const hasRunningExecution =
        executions?.some(
          (execution) =>
            execution.status === "running",
        );

      return hasRunningExecution ? 5000 : 30000;
    },
  });
}