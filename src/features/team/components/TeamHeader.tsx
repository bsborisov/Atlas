import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { MembersDto } from "../types/team.dto";
import { Text } from "@/components/ui/Text";

const TeamHeader = ({
  members,
  setInviteOpen
}: {
  members: MembersDto[];
  setInviteOpen: Dispatch<SetStateAction<boolean>>;
}) => {

  const activeCount = members.filter(m => m.status === "active").length;
  const pendingCount = members.filter(m => m.status === "pending").length;

  return (
    <div className="shrink-0 py-6 px-8 border-b border-atlas-main-border">
      <div className="flex items-start justify-between">
        <div>
          <Heading
            size={4}
            className="text-[20px] text-atlas-foreground tracking-[-0.03em]"
          >
            Team
          </Heading>
          <p className="mt-0.5 text-[13px] text-main-text-active">
            Manage members, roles, and permissions for Meridian workspace
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={<Plus size={13} />}
          onClick={() => setInviteOpen(true)}
        >
          Invite member
        </Button>
      </div>

      {/* Stats */}
      <div className="flex mt-5 gap-6">
        {[
          { label: "Active members", value: activeCount },
          { label: "Pending invites", value: pendingCount },
          { label: "Seats used", value: `${members.length} / 20` },
          { label: "Plan", value: "Growth" },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-0.5">
            <Text className="text-[11px]">{label}</Text>
            <Text className="text-base font-bold text-atlas-foreground font-jet-mono">
              {value}
            </Text>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamHeader;