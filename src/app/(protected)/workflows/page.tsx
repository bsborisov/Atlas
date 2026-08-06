import { Workflows } from "@/features/workflows";
import { getWorkflows } from "@/features/workflows/services/workflows.service";

export default async function WorkflowsPage() {

  const workflows = await getWorkflows();

  return (
    <Workflows workflows={workflows} />
  );
}