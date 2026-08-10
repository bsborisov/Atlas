"use client";

import { Button } from "@/components/ui/Button";
import Dot from "@/components/ui/Dot";
import { Heading } from "@/components/ui/Heading";
import { Select } from "@/components/ui/Select";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { Play, RefreshCw, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ExecutionsDto } from "../types/executions.dto";

export const Executions = ({ executions }: { executions: ExecutionsDto[] }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [wfFilter, setWfFilter] = useState<string>("all");
  const [selected, setSelected] = useState<typeof executions[0] | null>(null);

  const { push } = useRouter();

  const workflowItems = useMemo(
    () => [
      { value: "all", label: "All" },
      ...Array.from(new Set(executions.map((run) => run.workflow))).map(
        (workflow) => ({
          value: workflow,
          label: workflow,
        })
      ),
    ],
    [executions]
  );

  const filtered = executions.filter(r => {
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (wfFilter !== "all" && r.workflow !== wfFilter) return false;
    if (search && !r.id.includes(search) && !r.workflow.includes(search)) return false;
    return true;
  });

  const statusDot = (s: string, type: "bg" | "text") => {
    if (s === "success") return type == "bg" ? "bg-app-light-green" : "text-app-light-green";
    if (s === "failed") return type == "bg" ? "bg-app-light-red" : "text-app-light-red";
    if (s === "running") return type == "bg" ? "bg-app-cyan" : "text-app-cyan";
    return type == "bg" ? "bg-main-text" : "text-main-text";
  };


  const statusLabel = (s: string) => ({
    success: "Success", failed: "Failed", running: "Running", queued: "Queued", skipped: "Skipped",
  } as Record<string, string>)[s] ?? s;

  const counts = {
    success: executions.filter(r => r.status === "success").length,
    failed: executions.filter(r => r.status === "failed").length,
    running: executions.filter(r => r.status === "running").length,
  };

  return (
    <div className="flex flex-1 flex-col h-full overflow-hidden">

      {/* Header */}
      <div className="pt-6 px-8 pb-0 shrink-0">
        <div className="flex mb-5 items-center justify-between">
          <div>
            <Heading
              size={4}
              className="mb-0.75 text-[20px] text-atlas-foreground tracking-[-0.03em]"
            >
              Executions
            </Heading>
            <p className="text-[13px] text-main-text-active">
              {"All workflow runs across your workspace"}
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            icon={<Play size={13} />}
            onClick={() => push("/live-run")}>
            Watch live run
          </Button>
        </div>

        {/* Stat pills */}
        <div className="flex mb-5 gap-3">
          {[
            { label: "Total today", value: executions.length, color: "text-atlas-foreground" },
            { label: "Succeeded", value: counts.success, color: "text-app-light-green" },
            { label: "Failed", value: counts.failed, color: "text-app-light-red" },
            { label: "Running", value: counts.running, color: "text-app-cyan" },
          ].map(({ label, value, color }, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-1 py-2.5 px-4 bg-atlas-background-light",
                "border border-atlas-main-border rounded-lg items-center justify-between"
              )}
            >
              <span className="text-xs text-main-text">
                {label}
              </span>
              <span
                className={cn(
                  "text-[18px] font-bold font-jet-mono",
                  color
                )}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex mb-0 pb-0 gap-2 items-center">
          <div className="relative flex-1 max-w-70">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-main-text" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by run ID or workflow…"
              className={cn(
                `w-full h-8.5 pr-2.5 pl-7.5 text-xs text-atlas-foreground outline-none`,
                `border border-atlas-main-border rounded-lg`,
                `bg-atlas-background-light box-border`
              )}
            />
          </div>
          <Select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            items={[
              { value: "all", label: "All" },
              { value: "success", label: "Success" },
              { value: "failed", label: "Failed" },
              { value: "running", label: "Running" },
            ]}
          />
          <Select
            value={wfFilter}
            onChange={e => setWfFilter(e.target.value)}
            className="outline-none cursor-pointer max-w-50"
            items={workflowItems}
          />
          <div className="ml-auto text-[11px] text-main-text font-jet-mono">
            {filtered.length} runs
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex flex-1 mt-4 mx-8 mb-0 gap-0 overflow-hidden">
        {/* Run list */}
        <div
          className={cn(
            "flex flex-col rounded-[10px] overflow-hidden",
            selected ? "flex-[0_0_55%]" : "flex-1",
            "border border-atlas-main-border bg-atlas-background-light"
          )}
        >
          {/* Table header */}
          <div
            className={cn(
              "grid executions-table-grid gap-3",
              "py-2.5 px-4 border-b border-atlas-main-border",
              "bg-atlas-background-blue"
            )}
          >
            {["Run ID", "Workflow", "Status", "Steps", "Dur", "Env"].map(h => (
              <Text
                key={h}
                className="font-jet-mono tracking-[0.06em]"
              >
                {h}
              </Text>
            ))}
          </div>
          {/* Rows */}
          <div className="flex-1 overflow-y-auto">
            {filtered.map(run => (
              <div
                key={run.id}
                onClick={() => setSelected(selected?.id === run.id ? null : run)}
                className={cn(
                  "grid executions-table-grid gap-3 py-2.5 px-4",
                  " border-b border-atlas-main-border cursor-pointer",
                  selected?.id === run.id ? "bg-app-purple/6" : "bg-transparent",
                  "transition-colors duration-100"
                )}
              >

                <div className="flex min-w-0 gap-2 items-center">
                  <Dot
                    className={cn(
                      "size-1.5 shrink-0",
                      statusDot(run.status, "bg"),
                      run.status === "running" ? "animate-pulse-live" : ""
                    )}
                  />
                  <Text className="text-[11px] text-atlas-foreground overflow-hidden text-ellipsis whitespace-nowrap font-jet-mono">
                    {run.id}
                  </Text>
                </div>
                <span className="text-xs text-main-text-active overflow-hidden text-ellipsis whitespace-nowrap">
                  {run.workflow}
                </span>
                <span
                  className={cn(
                    "text-[11px] font-semibold",
                    statusDot(run.status, "text")
                  )}
                >
                  {statusLabel(run.status)}
                </span>
                <span className="text-[11px] text-main-text font-jet-mono">
                  {run.steps}
                  {" steps"}
                </span>
                <span className="text-[11px] text-main-text font-jet-mono">
                  {run.duration}
                </span>
                <span
                  className={cn(
                    "text-[10px] py-0.5 px-1.5 border rounded-sm font-jet-mono self-center",
                    run.env === "prod"
                      ? "bg-app-cyan/8 border-app-cyan/20 text-app-cyan"
                      : "bg-app-purple/8 border-app-purple/20 text-app-purple"
                  )}
                >
                  {run.env}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Detail drawer */}
        {selected && (
          <div className={cn(
            "flex flex-col flex-[0_0_42%] ml-3",
            "border border-atlas-main-border",
            "bg-atlas-background-light overflow-hidden"
          )}>
            <div className="flex py-3.5 px-4 border-b border-atlas-main-border items-center justify-between">
              <div>
                <div className="text-[11px] text-main-text mb-1 font-jet-mono">
                  {selected.id}
                </div>
                <div className="text-sm text-atlas-foreground font-semibold">
                  {selected.workflow}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => push(selected.status === "failed" ? "/failure" : "/live-run")}
                >
                  {selected.status === "failed" ? "View failure" : "View run"}
                </Button>
                <button
                  onClick={() => setSelected(null)}
                  className={cn(
                    "flex size-7 rounded-md items-center justify-center",
                    "bg-none border border-atlas-main-border",
                    "cursor-pointer text-main-text"
                  )}
                >
                  {"×"}
                </button>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-2 mb-5">
                {[
                  ["Status", statusLabel(selected.status)],
                  ["Started", selected.started],
                  ["Duration", selected.duration],
                  ["Steps", `${selected.steps} total`],
                  ["Trigger", selected.trigger],
                  ["Env", selected.env],
                ].map(([k, v]) => (
                  <div key={k} className="py-2 px-3 rounded-[7px] bg-atlas-background-blue">
                    <div className="text-[11px] text-main-text mb-0.75">
                      {k}
                    </div>
                    <div
                      className={cn(
                        "text-xs font-jet-mono",
                        selected.status === "failed" && k === "Status"
                          ? "text-app-light-red"
                          : selected.status === "running" && k === "Status"
                            ? "text-app-cyan"
                            : "text-atlas-foreground"
                      )}
                    >
                      {v}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mb-2.5 text-[11px] text-main-text font-jet-mono tracking-wider">
                STEP TRACE
              </div>
              <div className="flex flex-col gap-0.5">
                {Array.from({ length: Math.min(selected.steps, 9) }).map((_, i) => {
                  const isErr = selected.status === "failed" && i === (selected.steps > 4 ? 4 : selected.steps - 1);
                  const isAI = i === 2;
                  const names = ["webhook_received", "fetch_customer_data", "risk_score_model", "severity_router", "create_pd_incident", "↳ ai_diagnosis", "create_pd_incident", "notify_oncall", "log_resolution"];
                  return (
                    <div
                      key={i}
                      className={cn(
                        "flex py-1.5 px-2.5 gap-2.5 rounded-[5px] items-center",
                        isErr ? "bg-app-light-red/4" : "bg-transparent"
                      )}
                    >
                      <Text className={cn(
                        "w-3 shrink-0 text-[11px] font-bold font-jet-mono",
                        isErr ? "text-app-light-red" : isAI ? "text-app-purple" : "text-app-light-green"
                      )}>
                        {isErr ? "✗" : isAI ? "~" : "✓"}
                      </Text>
                      <Text className={cn(
                        "flex-1 font-jet-mono",
                        isErr ? "text-app-light-red" : isAI ? "text-app-purple" : "text-main-text-active"
                      )}>
                        {names[i] ?? `step_${i + 1}`}
                      </Text>
                      <Text className="font-jet-mono">
                        {selected.duration}
                      </Text>
                    </div>
                  );
                })}
              </div>
              {selected.status === "failed" && (
                <div className="mt-4">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<RefreshCw size={12} />}
                    className="w-full justify-center" onClick={() => push("/retry-success")}>
                    Retry from failed step
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div >
  )
}