import { Text } from "@/components/ui/Text"
import { workflow_steps } from "../../config/static-data"
import { cn } from "@/lib/utils";

export const RecoverGraph = () => {

  const statusColor = (s: string) =>
    s === "ok"
      ? "text-app-light-green"
      : s === "err"
        ? "text-app-light-red"
        : "text-app-purple";

  const toMs = (s: string) => {
    if (!s) return 0;

    const n = parseFloat(s);

    return s.includes("s") && !s.includes("ms") ? n * 1000 : n;
  };

  return (
    <div className="flex flex-col p-14 items-center self-stretch justify-center bg-atlas-background-light/[40%]">
      <div className="flex flex-col w-full items-start rounded-[10px] border border-atlas-main-border bg-atlas-background-light">
        <div className="flex py-[10px] px-4 items-center justify-between gap-3 self-stretch border-b border-atlas-main-border">
          <Text
            className="font-jet-mono"
          >
            execution timeline
          </Text>
          <div className="flex items-center gap-[5px]">
            <Text
              className="font-jet-mono text-app-light-green"
            >
              run_01HZAQ7
            </Text>
          </div>
        </div>
        <div className="flex flex-col py-2 px-0 items-start self-stretch divide-y divide-atlas-main-border/[40%]">
          {workflow_steps.map((s, i) => {
            const pct =
              s.ms
                ? Math.min(100, (toMs(s.ms) / 1200) * 100)
                : 0;

            const col =
              s.status === "ok"
                ? "bg-app-light-green"
                : s.status === "err"
                  ? "bg-app-light-red"
                  : "bg-app-purple";

            return (
              <div
                key={i}
                className={cn(
                  `demo-table-grid-observe w-full items-center py-[6px] px-4 gap-2 rounded-sm font-jet-mono text-[11px]`,
                  s.status === "err" ? "bg-app-red/[6%]" : ""
                )}
              >
                <span className={cn(
                  statusColor(s.status),
                  `font-bold`
                )}
                >
                  {s.status === "ok" ? "✓" : s.status === "err" ? "✗" : "~"}
                </span>
                <span className={cn(
                  s.status === "err"
                    ? "text-app-light-red"
                    : s.status === "ai"
                      ? "text-app-purple"
                      : "text-main-text",
                  `overflow-hidden text-ellipsis whitespace-nowrap`
                )}>
                  {s.step}
                </span>
                <div className="h-1 bg-white/[5%] rounded-[2px] overflow-hidden">
                  <div
                    className={`h-full ${col} opacity-50 rounded-[2px]`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-main-text text-right">{s.ms}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}