"use client";

import { useEffect, useState } from "react";
import { LiveLogsDto, RunStepsDto, WorkflowNodesDto } from "../types/executions.dto";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import Dot from "@/components/ui/Dot";
import { Text } from "@/components/ui/Text";
import { Bot, Check, Copy, Database, GitBranch, Loader2, Terminal, Timer, User, Webhook, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/ui/StatusBadge";

const NODE_COLORS: Record<string, { bg: string; border: string; icon: string; }> = {
  trigger: { bg: "bg-app-cyan/8", border: "border-app-cyan/30", icon: "text-app-cyan" },
  data: { bg: "bg-app-blue/8", border: "border-app-blue/30", icon: "text-app-blue" },
  ai: { bg: "bg-app-purple/8", border: "border-app-purple/30", icon: "text-app-purple" },
  logic: { bg: "bg-app-light-yellow/8", border: "border-app-light-yellow/30", icon: "text-app-light-yellow" },
  action: { bg: "bg-app-light-red/8", border: "border-app-light-red/30", icon: "text-app-light-red" },
  human: { bg: "bg-app-light-green/8", border: "border-app-light-green/30", icon: "text-app-light-green" },
};

const NODE_ICONS: Record<string, React.ReactNode> = {
  trigger: <Webhook size={14} />,
  data: <Database size={14} />,
  ai: <Bot size={14} />,
  logic: <GitBranch size={14} />,
  action: <Zap size={14} />,
  human: <User size={14} />,
};

const NODE_TYPE_LABELS: Record<string, string> = {
  trigger: "Trigger",
  data: "Data",
  ai: "AI Model",
  logic: "Logic",
  action: "Action",
  human: "Human",
};

const NODE_EDGES = [
  { from: "n1", to: "n2" },
  { from: "n2", to: "n3" },
  { from: "n3", to: "n4" },
  { from: "n4", to: "n5" },
  { from: "n5", to: "n6" },
];

function WorkflowNode({
  node,
  selected,
  status = "idle",
  duration,
  onClick,
}: {
  node: WorkflowNodesDto;
  selected?: boolean;
  status?: string;
  duration?: string;
  onClick?: () => void;
}) {
  const colors = NODE_COLORS[node.type];

  const dynamicStyles =
    status === "success" ? "bg-app-light-green/12 border-app-light-green shadow-[0_0_12px] shadow-app-light-green/30"
      : status === "failed" ? "bg-app-light-red/12 border-app-light-red shadow-[0_0_16px] shadow-app-light-red/30"
        : status === "running" ? "bg-app-purple/12 border-app-purple shadow-[0_0_20px] shadow-app-purple/40"
          : status === "queued" ? "bg-app-cyan/12 border-app-cyan shadow-[0_0_12px] shadow-app-cyan/30"
            : selected ? `${colors.bg} border-app-purple shadow-[0_0_0_2px] shadow-app-purple/40`
              : `${colors.bg} ${colors.border} shadow-none`;
  return (
    <div
      onClick={onClick}
      className={cn(
        "absolute w-40 py-3 px-3.5 border-[1.5px]",
        dynamicStyles,
        "rounded-xl transition-all duration-200 cursor-pointer select-none"
      )}
      style={{ left: node.x, top: node.y }}
    >
      {status === "running" && (
        <div className="absolute -inset-1 rounded-xl border-[1.5px] border-app-purple pulse-ring-animation" />
      )}
      <div className="flex gap-2 mb-1.5 items-center">
        <div
          className={cn(
            "flex shrink-0 size-6.5 rounded-[7px] border",
            colors.border,
            colors.bg,
            colors.icon,
            "items-center justify-center"
          )}
        >
          {
            status === "running"
              ? <Loader2 size={12} className="text-app-purple animate-spin" />
              : status === "success"
                ? <Check size={12} className="text-app-light-green" />
                : status === "failed"
                  ? <X size={12} className="text-app-light-red" />
                  : NODE_ICONS[node.type]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-bold text-atlas-foreground text-ellipsis whitespace overflow-hidden">
            {node.label}
          </div>
          <div
            className={cn(
              "text-[9px] font-semibold uppercase tracking-[0.06em]",
              colors.icon
            )}
          >
            {NODE_TYPE_LABELS[node.type]}
          </div>
        </div>
      </div>
      {duration && (
        <div
          className={cn(
            "text-[10px] text-right font-jet-mono",
            status === "success"
              ? "text-app-light-green"
              : status === "failed"
                ? "text-app-light-green"
                : "text-main-text"
          )}
        >
          {duration}
        </div>
      )}

      {/* Ports */}
      {(["left", "right"]).map((side) => (
        <div
          key={side}
          className={cn(
            "absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full",
            "border-2 border-atlas-main-border-active bg-atlas-background-blue",
            side === "left" ? "-left-1.25" : "-right-1.25"
          )}
        />
      ))}
    </div>
  );
}

function NodeEdges({ nodes, statuses }: { nodes: WorkflowNodesDto[]; statuses?: Record<string, string> }) {

  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));

  return (
    <svg className="absolute inset-0 overflow-visible pointer-events-none">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--main-border-active)" />
        </marker>
        <marker id="arrow-success" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--app-light-green)" />
        </marker>
        <marker id="arrow-purple" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--app-purple)" />
        </marker>
      </defs>
      {NODE_EDGES.map(({ from, to }) => {
        const fn = nodeMap[from];
        const tn = nodeMap[to];
        if (!fn || !tn) return null;
        const x1 = fn.x + 160 + 5; const y1 = fn.y + 44;
        const x2 = tn.x - 5; const y2 = tn.y + 44;
        const cx1 = x1 + 40; const cx2 = x2 - 40;
        const fromStatus = statuses?.[from];
        const toStatus = statuses?.[to];
        const isActive = fromStatus === "success" && (toStatus === "success" || toStatus === "running");
        const isRunning = fromStatus === "success" && toStatus === "running";
        const edgeColor = isActive ? "var(--app-light-green)" : isRunning ? "var(--app-purple)" : "var(--main-border-active)";
        const markerId = isActive ? "arrow-success" : isRunning ? "arrow-purple" : "arrow";
        return (
          <g key={`${from}-${to}`}>
            <path d={`M${x1},${y1} C${cx1},${y1} ${cx2},${y2} ${x2},${y2}`}
              stroke={edgeColor} strokeWidth={isActive ? 1.5 : 1} fill="none"
              markerEnd={`url(#${markerId})`}
              strokeDasharray={!isActive && !isRunning ? "none" : "none"}
              className="transition-[stroke] duration-300"
            />
          </g>
        );
      })}
    </svg>
  );
}

export const LiveRun = ({
  liveRuns,
  workflowNodes,
  runSteps
}: {
  liveRuns: LiveLogsDto[];
  workflowNodes: WorkflowNodesDto[];
  runSteps: RunStepsDto[]
}) => {
  const [elapsed, setElapsed] = useState(0);
  const [logs, setLogs] = useState(liveRuns.slice(0, 4));

  const { push } = useRouter();

  useEffect(() => {
    const id = setInterval(() => setElapsed((e) => e + 100), 100);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setLogs((l) => l.length < liveRuns.length ? liveRuns.slice(0, l.length + 1) : l);
    }, 700);
    return () => clearInterval(id);
  }, [liveRuns]);

  const elapsedStr = `${(elapsed / 1000).toFixed(1)}s`;

  const nodeStatuses: Record<string, string> = {
    n1: "success", n2: "success", n3: "running", n4: "queued", n5: "queued", n6: "queued",
  };

  const stepDurations: Record<string, string> = { n1: "18ms", n2: "42ms" };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div
        className={cn(
          "flex shrink-0 gap-4 py-0 px-5 h-14 items-center",
          "border-b border-atlas-main-border bg-atlas-background-light"
        )}
      >
        <div className="flex gap-2.5 items-center">
          <Dot className="size-2 bg-app-purple shadow-[0_0_10px] shadow-app-purple animate-pulse" />
          <span className="text-[13px] font-bold text-atlas-foreground">Test run in progress</span>
        </div>
        <div
          className={cn(
            "flex gap-1.5 py-1 px-2.5 rounded-[7px] items-center",
            "border border-atlas-main-border bg-atlas-background-blue"
          )}
        >
          <Text className="text-[11px] font-jet-mono">
            run_01JAZ9
          </Text>
        </div>
        <Badge variant="purple">
          <Dot className="size-1.25 bg-app-purple animate-pulse" />
          Running
        </Badge>
        <div className="flex gap-1.5 text-[11px] text-main-text-active items-center font-jet-mono">
          <Timer size={12} />
          {elapsedStr}
        </div>
        <div className="flex ml-auto gap-2">
          <Text className="text-[11px]">
            Started by Maya Brooks
          </Text>
          <Button
            variant="destructive"
            size="sm"
            icon={<X size={11} />}
            onClick={() => push("/failure")}
          >
            Cancel run
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="relative flex-1 bg-atlas-background overflow-hidden">
          <svg className="absolute inset-0 opacity-4" width="100%" height="100%">
            <defs><pattern id="lg2" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeWidth="0.5" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#lg2)" />
          </svg>
          <div className="absolute top-[35%] left-1/2 w-125 h-87.5 background-gradient-liverun pointer-events-none" />
          <div className="absolute top-20 left-10">
            <NodeEdges nodes={workflowNodes} statuses={nodeStatuses} />
            {workflowNodes.map((n) => (
              <WorkflowNode key={n.id} node={n} status={nodeStatuses[n.id] || "idle"} duration={stepDurations[n.id]} />
            ))}
          </div>
        </div>

        <div className="flex flex-col shrink-0 w-75 border-l border-atlas-main-border bg-atlas-background-light">
          <div className="py-3.5 px-4 border-b border-atlas-main-border">
            <div className="text-xs font-bold text-atlas-foreground">
              Execution Timeline
            </div>
          </div>
          <div className="flex-1 py-2 px-0 overflow-y-auto">
            {runSteps.map((step, i) => {
              const isRunning = step.status === "running";
              return (
                <div key={step.nodeId} className="flex relative py-2.5 px-4 gap-2.5">

                  {i < runSteps.length - 1 && <div className="absolute left-5.5 top-8.5 bottom-0 w-px bg-atlas-main-border" />}

                  <div
                    className={cn(
                      "flex shrink-0 size-5 rounded-full items-center justify-center border-2",
                      step.status === "success"
                        ? "bg-app-light-green/12 border-app-light-green"
                        : step.status === "running"
                          ? "bg-app-purple/12 border-app-purple"
                          : step.status === "failed"
                            ? "bg-app-light-red/12 border-app-light-red"
                            : "bg-atlas-background-blue border-main-text",
                      isRunning ? "shadow-[0_0_10px] shadow-app-purple/60" : "shadow-none"
                    )}>
                    {
                      step.status === "success"
                        ? <Check size={10} className="text-app-light-green" />
                        : isRunning
                          ? <Loader2 size={10} className="text-app-purple animate-spin" />
                          : null
                    }
                  </div>
                  <div className="flex-1">
                    <div
                      className={cn(
                        "text-xs font-semibold",
                        isRunning
                          ? "text-app-purple"
                          : step.status === "success"
                            ? "text-atlas-foreground"
                            : "text-main-text"
                      )}
                    >
                      {step.label}
                    </div>
                    <div className="flex mt-0.5 gap-2">
                      <StatusBadge status={step.status} />
                      {
                        step.duration !== "—" &&
                        <span className="text-[10px] text-main-text font-jet-mono">{step.duration}</span>
                      }
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="h-50 border-t border-atlas-main-border">
            <div className="flex gap-1.5 py-2 px-3 border-b border-atlas-main-border items-center">
              <Terminal size={11} className="text-main-text" />
              <span className="text-[11px] font-semibold text-main-text-active">
                Live Logs
              </span>
              <div className="ml-auto">
                <Button
                  variant="ghost"
                  size="xs"
                  icon={<Copy size={9} />}
                />
              </div>
            </div>
            <div className="h-40 py-1.5 px-0 overflow-y-auto">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="flex gap-2 py-0.5 px-3 items-start"
                >
                  <Text className="pt-px shrink-0 text-[9px] font-jet-mono">
                    {log.time.split(".")[1]}
                  </Text>
                  <Text
                    className={cn(
                      "shrink-0 w-9.5 text-[9px] font-jet-mono",
                      log.level === "DEBUG"
                        ? "text-main-text"
                        : log.level === "INFO"
                          ? "text-app-cyan"
                          : "text-app-light-yellow"
                    )}
                  >
                    {log.level}
                  </Text>
                  <Text className="text-main-text-active leading-normal">
                    {log.msg}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "flex py-3 px-5 border-t border-atlas-main-border",
          "bg-atlas-background-light items-center justify-between"
        )}
      >
        <div className="text-xs text-main-text">
          Step 3/6 · Risk scoring is running… <span className="text-app-purple">claude-sonnet-4-6</span>
        </div>
        <Button variant="secondary" size="sm" onClick={() => push("/failure")}>
          Fast-forward to failure →
        </Button>
      </div>
    </div>
  )
}