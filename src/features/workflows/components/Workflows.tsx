import GridBackground from "@/components/shared/GridBackground";
import { WorkflowDto } from "../types/workflows.dto";
import WorkflowsHeader from "./WorkflowsHeader";
import { cn } from "@/lib/utils";
import { Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import WorkflowsContainer from "./WorkflowsContainer";

export const Workflows = ({ workflows }: { workflows: WorkflowDto[]; }) => {
  return (
    <div className="relative min-h-full p-7">
      <GridBackground />

      <WorkflowsHeader workflows={workflows} />

      {/* Template banner */}
      <div
        className={cn(
          `flex mb-5 py-4 px-5 rounded-xl items-center justify-between`,
          `border border-app-purple/20`,
          `background-workflows-template`
        )}
      >
        <div className="flex gap-3 items-center">
          <div className="flex size-9 rounded-[9px] items-center justify-center border border-app-purple/25 bg-app-purple/12">
            <Star size={16} className="text-app-purple" />
          </div>
          <div>
            <div className="mb-0.5 text-[13px] font-bold text-atlas-foreground">
              Start with Incident intake + AI triage
            </div>
            <div className="text-xs text-main-text-active">
              Pre-built template · Used by 2,400+ teams · Connects PagerDuty, OpenAI, and Slack
            </div>
          </div>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={<Zap size={12} />}
        >
          Use template
        </Button>
      </div>

      <WorkflowsContainer workflows={workflows} />

    </div >
  )
}