"use client";

import { Grid, List, MoreHorizontal, Search, Zap } from "lucide-react";
import { WorkflowDto } from "../types/workflows.dto";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Card from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/ui/StatusBadge";
import { Text } from "@/components/ui/Text";
import Sparkline from "@/components/ui/Sparkline";

const WorkflowsContainer = ({ workflows }: { workflows: WorkflowDto[]; }) => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = workflows.filter((w) => {
    const matchSearch = w.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || w.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const serviceIcon: Record<string, string> = {
    PagerDuty: "🔔",
    OpenAI: "🤖",
    Slack: "💬",
    Salesforce: "☁️",
    Stripe: "💳",
    Jira: "📋",
    HubSpot: "🟠",
    Clearbit: "🔵",
    Intercom: "💬",
    Notion: "📝",
  };

  const { push } = useRouter();

  return (
    <>
      {/* Filters */}
      <div className="flex gap-2 mb-4 items-center">
        <div className="relative flex-1 max-w-70">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-main-text pointer-events-none" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search workflows…"
            className={cn(
              `w-full h-9 pr-3 pl-8 text-xs text-atlas-foreground outline-none`,
              `border border-atlas-main-border rounded-lg`,
              `bg-atlas-background-light`
            )}
          />
        </div>
        {["all", "active", "draft"].map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={cn(
              `h-9 px-3.5 rounded-lg text-xs cursor-pointer capitalize border`,
              statusFilter === s
                ? `border-app-purple bg-app-purple/12 text-app-purple font-semibold`
                : `border-atlas-main-border bg-atlas-background-light text-main-text-active font-normal`,
            )}
          >
            {
              s === "all"
                ? "All"
                : s.charAt(0).toUpperCase() + s.slice(1)
            }
          </button>
        ))}
        <div className="flex ml-auto p-0.75 gap-1 bg-atlas-background-light border border-atlas-main-border rounded-lg">
          {(["grid", "list"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)}
              className={cn(
                `flex py-1 px-2 rounded-md border-none`,
                `items-center justify-center cursor-pointer`,
                view === v
                  ? `bg-app-dark-blue text-atlas-foreground`
                  : `bg-transparent text-main-text`
              )}
            >
              {v === "grid" ? <Grid size={13} /> : <List size={13} />}
            </button>
          ))}
        </div>
      </div>

      {/* Workflow grid */}
      <div
        className={cn(
          "grid grid-cols-1 gap-3",
          view === "grid" ? "md:grid-cols-2 xl:grid-cols-3" : ""
        )}
      >
        {filtered.map((wf) => (
          <Card
            key={wf.id}
            onClick={() => push(`/workflow/${wf.id}`)}
            className={cn(
              "p-4.5 cursor-pointer transition-[border-color] duration-150",
              "hover:border-atlas-main-border-active"
            )}
          >
            <div className="flex mb-2.5 items-start justify-between">
              <div className="flex gap-2 items-center">
                <div
                  className={cn(
                    "flex size-7.5 rounded-lg items-center justify-center border",
                    wf.id === "wf_001"
                      ? "bg-app-purple/12 border-app-purple/25"
                      : "bg-atlas-background-blue border-atlas-main-border"
                  )}
                >
                  <Zap
                    size={14}
                    className={cn(
                      wf.id === "wf_001" ? "text-app-purple" : "text-main-text"
                    )}
                  />
                </div>
                <div className="text-[13px] font-semibold text-atlas-foreground">
                  {wf.name}
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <StatusBadge status={wf.status} />
                <button
                  className={cn(
                    "p-1 rounded-[5px] bg-transparent border-none cursor-pointer text-main-text",
                    "hover:bg-app-dark-blue hover:text-atlas-foreground"
                  )}
                >
                  <MoreHorizontal size={13} />
                </button>
              </div>
            </div>
            <p className="mb-3 text-xs text-main-text-active leading-[1.6]">
              {wf.description}
            </p>
            <div className="flex mb-3 gap-3">
              <div>
                <Text className="mb-0.5">
                  Success
                </Text>
                <div className="text-[13px] text-app-light-green font-bold font-jet-mono">
                  {wf.successRate}
                  {"%"}
                </div>
              </div>
              <div>
                <Text className="mb-0.5">
                  Runs
                </Text>
                <div className="text-[13px] text-atlas-foreground font-bold font-jet-mono">
                  {wf.executions.toLocaleString()}
                </div>
              </div>
              <div>
                <Text className="mb-0.5">
                  Last run
                </Text>
                <div className="text-[12px] text-main-text-active">
                  {wf.lastRun}
                </div>
              </div>
              <div className="ml-auto">
                <Sparkline
                  data={wf.sparkline}
                  color="#52D99A"
                  height={32} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {wf.services.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    title={s}
                    className="text-sm"
                  >
                    {serviceIcon[s] || "🔌"}
                  </span>
                ))}
              </div>
              <div className="flex gap-1.5 items-center">
                <div
                  className={cn(
                    "flex size-4.5 rounded-sm items-center justify-center",
                    "font-bold text-[9px] text-white background-workflows-display"
                  )}
                >
                  {wf.owner.split(" ").map(n => n[0]).join("")}
                </div>
                <Text className="text-[11px]" >
                  {wf.version}
                </Text>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}

export default WorkflowsContainer;