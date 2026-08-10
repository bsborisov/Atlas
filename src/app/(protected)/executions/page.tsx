import { Executions } from "@/features/executions";
import { getExecutions } from "@/features/executions/services/executions.service";

export default async function ExecutionsPage() {

  const executions = await getExecutions();

  return (
    <Executions executions={executions} />
  );
}