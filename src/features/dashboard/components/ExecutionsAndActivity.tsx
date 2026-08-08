"use client";

import Card from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import {
  DashboardActivityFeedDto,
  DashboardExecutionsDto
} from "../types/dashboard.dto";
import { Filter, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/ui/StatusBadge";
import Dot from "@/components/ui/Dot";

const ExecutionsAndActivity = ({
  executions,
  activityFeed
}: {
  executions: DashboardExecutionsDto
  activityFeed: DashboardActivityFeedDto
}) => {
  const { push } = useRouter();

  return (
    <div className="grid grid-cols-[1fr_340px] gap-4">
      {/* Recent runs table */}
      <Card>
        <div className="flex py-4 px-5 items-center justify-between border-b border-atlas-main-border">
          <div className="text-[13px] font-semibold text-atlas-foreground">
            Recent Executions
          </div>
          <div className="flex gap-1.5">
            <Button
              variant="ghost"
              size="xs"
              icon={<Filter size={11} />}
            >
              Filter
            </Button>
            <Button
              variant="ghost"
              size="xs"
              icon={<RefreshCw size={11} />}
            >
              Refresh
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-atlas-main-border">
                {["Run ID", "Workflow", "Status", "Steps", "Duration", "Time"].map((h) => (
                  <th
                    key={h}
                    className="py-2 px-4 text-left text-[11px] font-semibold tracking-[0.04em] uppercase text-main-text"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-atlas-main-border">
              {executions.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => push(`/workflow/${r.id}`)}
                  className={cn(
                    `cursor-pointer`,
                    r.status === "failed" ? `bg-app-light-red/3` : `bg-transparent`,
                    `hover:bg-app-dark-blue transition-colors`,
                    `[&>td]:py-2.75 [&>td]:px-4`
                  )}
                >
                  <td
                    className={cn(
                      `text-[11px] font-jet-mono`,
                      r.status === "failed" ? `text-app-light-red` : `text-app-blue`
                    )}
                  >
                    {r.id}
                  </td>
                  <td className="text-xs text-atlas-foreground font-medium">
                    {r.workflow}
                  </td>
                  <td>
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="text-xs text-main-text-active font-jet-mono">
                    {r.steps}
                  </td>
                  <td className="text-xs text-main-text-active font-jet-mono">
                    {r.duration}
                  </td>
                  <td className="text-[11px] text-main-text font-jet-mono">
                    {r.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Activity feed */}
      <Card className="flex flex-col">
        <div className="flex py-4 px-5 items-center justify-between border-b border-atlas-main-border">
          <div className="text-[13px] font-semibold text-atlas-foreground">
            Activity
          </div>
          <Badge variant="ghost">
            Live
          </Badge>
        </div>
        <div className="flex-1 py-2 px-0 overflow-y-auto">
          {activityFeed.map((item, i) => (
            <div
              key={i}
              className="flex py-2 px-4 gap-2.5 cursor-pointer hover:bg-app-dark-blue"
            >
              <Dot
                className={cn(
                  `size-1.5 mt-1.25 shrink-0`,
                  item.type === "error"
                    ? `bg-app-light-red`
                    : item.type === "warning"
                      ? `bg-app-light-yellow`
                      : `bg-app-light-green`
                )}
              />
              <div className="flex-1">
                <div
                  className={cn(
                    `text-xs leading-normal`,
                    item.type === "error" ? `text-app-light-red` : `text-main-text-active`
                  )}
                >
                  {item.msg}
                </div>
                <div className="text-[10px] text-main-text mt-0.5 font-jet-mono">
                  {item.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default ExecutionsAndActivity;