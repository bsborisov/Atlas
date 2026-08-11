import { LiveRun } from "@/features/executions";
import {
  getLiveLogs,
  getRunSteps,
  getWorkflowNodes
} from "@/features/executions/services/executions.service";


export default async function LiveRunPage() {

  const liveRuns = await getLiveLogs();
  const workflowNodes = await getWorkflowNodes();
  const runSteps = await getRunSteps();

  return (
    <LiveRun
      liveRuns={liveRuns}
      workflowNodes={workflowNodes}
      runSteps={runSteps}
    />
  );
}