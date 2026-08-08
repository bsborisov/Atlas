"use client";

import { Heading } from "@/components/ui/Heading";
import { Download, Plus } from "lucide-react";
import { WorkflowDto } from "../types/workflows.dto";
import { Button } from "@/components/ui/Button";

const WorkflowsHeader = ({ workflows }: { workflows: WorkflowDto[]; }) => {

  return (
    <div className="flex mb-5 items-centrer justify-between">
      <div>
        <Heading
          size={4}
          className="mb-0.75 text-[20px] text-atlas-foreground tracking-[-0.03em]"
        >
          Workflows
        </Heading>
        <p className="text-[13px] text-main-text-active">
          {workflows.length}
          {" workflows · "}
          {workflows.filter(w => w.status === "active").length}
          {" active"}
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          icon={<Download size={13} />}
        >
          Import
        </Button>
        <Button
          variant="primary"
          icon={<Plus size={13} />}
        >
          New workflow
        </Button>
      </div>
    </div>
  )
}

export default WorkflowsHeader;