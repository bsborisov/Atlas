"use client";

import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { UserDto } from "@/features/auth/types/user.dto";
import { getFirstNameOnly } from "@/lib/utils";
import { Download, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardHeader = ({ user }: { user: UserDto }) => {

  const { push } = useRouter();

  return (
    <div className="flex relative mb-6 items-start justify-between">
      <div>
        <div className="mb-[6px] text-[10px] font-bold text-main-text uppercase tracking-[0.12em]">
          Command Center
        </div>
        {
          user?.name &&
          <Heading
            size={4}
            className="mb-1 text-[22px] text-atlas-foreground tracking-[-0.03em]"
          >
            {`Good morning, ${getFirstNameOnly(user.name)}.`}
          </Heading>
        }
        <p className="text-[13px] text-main-text-active">
          18 active workflows processed 1,842 runs overnight · 1 issue requires attention
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          icon={
            <Download size={13} />
          }
        >
          Import template
        </Button>
        <Button
          variant="primary"
          icon={
            <Plus size={13} />
          }
          onClick={
            () => push("/workflows")
          }
        >
          Create workflow
        </Button>
      </div>
    </div>
  )
}

export default DashboardHeader;