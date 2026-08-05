import Card from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import { DashboardWorkflowsDto } from "../types/dashboard.dto";
import { Button } from "@/components/ui/Button";
import { ChevronRight } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";
import Sparkline from "@/components/ui/Sparkline";

const WorkflowHealth = ({
  workflows
}: {
  workflows: DashboardWorkflowsDto
}) => {
  const { push } = useRouter();

  return (
    <div className="mt-4">
      <Card className="p-5">
        <div className="flex mb-4 items-center justify-between">
          <div className="text-[13px] font-semibold text-atlas-foreground">
            Workflow Health
          </div>
          <Button variant="ghost" size="xs" onClick={() => push("/workflows")}>
            {"View all workflows "}
            <ChevronRight size={11} />
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {workflows.slice(0, 3).map((wf) => (
            <div
              key={wf.id}
              onClick={() => push(`/workflow-detail/${wf.id}`)}
              className={cn(
                `py-[14px] px-4 rounded-[10px] cursor-pointer`,
                `border border-atlas-main-border bg-atlas-background-blue`,
                `hover:border-atlas-background-light-blue transition-colors`
              )}
            >
              <div className="flex mb-[10px] items-start justify-between">
                <div className="text-xs font-semibold text-atlas-foreground">
                  {wf.name}
                </div>
                <StatusBadge status={wf.status} />
              </div>
              <div className="flex gap-4 mb-2">
                <div>
                  <div className="text-[10px] text-main-text mb-px">
                    Success
                  </div>
                  <div className="text-[13px] font-bold text-app-light-green font-jet-mono">
                    {wf.successRate}
                    {"%"}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-main-text mb-px">
                    Executions
                  </div>
                  <div className="text-[13px] font-bold text-atlas-foreground font-jet-mono">
                    {wf.executions.toLocaleString()}
                  </div>
                </div>
              </div>
              <Sparkline data={wf.sparkline} color={"#52D99A"} height={24} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default WorkflowHealth;