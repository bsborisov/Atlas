"use client";

import GridBackground from "@/components/shared/GridBackground";
import { useState } from "react";
import { ConnectionsDto } from "../types/connections.dto";
import { Activity, Bell, Bot, Database, Filter, Hash, Lock, MoreHorizontal, Plus, RefreshCw, Search, Shield, Trash2, Webhook, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import Card from "@/components/ui/Card";
import Dot from "@/components/ui/Dot";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/ui/StatusBadge";

export const Connections = ({
  connections
}: {
  connections: ConnectionsDto[]
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedConn, setSelectedConn] = useState<typeof connections[0] | null>(null);
  const [search, setSearch] = useState("");

  const connIcons: Record<string, React.ReactNode> = {
    incident: <Bell size={15} />,
    ai: <Bot size={15} />,
    crm: <Database size={15} />,
    messaging: <Hash size={15} />,
    trigger: <Webhook size={15} />,
    payments: <Shield size={15} />,
  };

  const statusColor: Record<string, Record<string, string>> = {
    healthy: {
      bg: "bg-app-light-green/20",
      border: "border-app-light-green/40",
      color: "text-app-light-green"
    },
    degraded: {
      bg: "bg-app-light-yellow/20",
      border: "border-app-light-yellow/40",
      color: "text-app-light-yellow"
    },
    expired: {
      bg: "bg-app-light-red/20",
      border: "border-app-light-red/40",
      color: "text-app-light-red"
    }
  };

  const filtered = connections.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative p-7">
      <GridBackground />

      <div className="flex mb-5 items-center justify-between">
        <div>
          <Heading
            size={4}
            className="mb-0.75 text-[20px] text-atlas-foreground tracking-[-0.03em]"
          >
            Connections
          </Heading>
          <p className="text-[13px] text-main-text-active">
            {"18 total · 16 healthy · 2 need attention"}
          </p>
        </div>
        <Button variant="primary" icon={<Plus size={13} />}>Add connection</Button>
      </div>

      {/* Health overview */}
      <div className="mb-5 gap-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {[
          { label: "Healthy", value: 16, textColor: "text-app-light-green", borderColor: "border-app-light-green", bg: "bg-app-light-green" },
          { label: "Degraded", value: 1, textColor: "text-app-light-yellow", borderColor: "border-app-light-yellow", bg: "bg-app-light-yellow" },
          { label: "Expired / Error", value: 1, textColor: "text-app-light-red", borderColor: "border-app-light-red", bg: "bg-app-light-red" }, //TODO real data
        ].map(({ label, value, textColor, borderColor, bg }) => (
          <Card
            key={label}
            className={cn(
              "py-4 px-5 border-0 border-l-[3px]",
              borderColor
            )}
          >
            <div className="flex gap-3 items-center">
              <Dot className={bg} />
              <div className="text-[11px] text-main-text-active">
                {label}
              </div>
              <div
                className={cn(
                  "ml-auto text-[20px] font-bold font-jet-mono",
                  textColor
                )}
              >
                {value}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Search + filters */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1 max-w-65">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-main-text pointer-events-none" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search connections…"
            className={cn(
              `w-full h-9 pr-3 pl-8 text-xs text-atlas-foreground outline-none`,
              `border border-atlas-main-border rounded-lg`,
              `bg-atlas-background-light`
            )}
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          icon={<Filter size={12} />}
        >
          Environment
        </Button>
        <Button
          variant="outline"
          size="sm"
          icon={<Activity size={12} />}
        >
          Health
        </Button>
      </div>

      {/* Connections table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-atlas-main-border">
                {["Connection", "Status", "P95 Latency", "Last checked", "Workflows", ""].map((h) => (
                  <th
                    key={h}
                    className="py-2.5 px-4 text-left text-[11px] text-main-text font-semibold tracking-[0.04em] uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((conn, i) => (
                <tr key={conn.id} onClick={() => { setSelectedConn(conn); setDrawerOpen(true); }}
                  className={cn(
                    i < filtered.length - 1 ? "border-b border-atlas-main-border" : "border-none",
                    "hover:bg-app-dark-blue transition-colors cursor-pointer",
                    "[&>td]:py-3.25 [&>td]:px-4"
                  )}
                >
                  <td>
                    <div className="flex gap-2.5 items-center">
                      <div
                        className={cn(
                          "flex size-8 rounded-lg items-center justify-center border",
                          statusColor[conn.status].border,
                          statusColor[conn.status].color,
                          statusColor[conn.status].bg,

                        )}
                      >
                        {connIcons[conn.type]}
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold text-atlas-foreground">
                          {conn.name}
                        </div>
                        <div className="text-[11px] text-main-text">
                          {conn.type} · {conn.env}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <StatusBadge status={conn.status} />
                  </td>
                  <td
                    className={cn(
                      "text-xs font-jet-mono",
                      conn.latency === "—"
                        ? "text-main-text"
                        : conn.status === "degraded"
                          ? "text-app-light-yellow"
                          : "text-main-text-active"
                    )}
                  >
                    {conn.latency}
                  </td>
                  <td className="text-xs text-main-text-active">
                    {conn.checked}
                  </td>
                  <td className="text-xs font-jet-mono text-main-text-active">
                    {conn.workflows}
                  </td>
                  <td>
                    <div
                      className="flex gap-1.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {
                        conn.status === "degraded" &&
                        <Button
                          variant="warning"
                          size="xs"
                          icon={<RefreshCw size={10} />}
                        >
                          Repair
                        </Button>
                      }
                      {
                        conn.status === "expired" &&
                        <Button
                          variant="primary"
                          size="xs"
                          icon={<Lock size={10} />}
                        >
                          Reconnect
                        </Button>
                      }
                      {
                        conn.status === "healthy" &&
                        <Button
                          variant="ghost"
                          size="xs"
                          icon={<Activity size={10} />}
                        >
                          Test
                        </Button>
                      }
                      <button className="p-1 rounded-[5px] bg-transparent border-none cursor-pointer text-main-text hover:bg-app-dark-blue">
                        <MoreHorizontal size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      {/* Drawer */}
      {drawerOpen && selectedConn && (
        <div className="fixed inset-0 z-40" onClick={() => setDrawerOpen(false)}>
          <div
            className={cn(
              "flex flex-col absolute right-0 top-0 bottom-0 w-95",
              "border-l border-atlas-main-border-active bg-atlas-background-light"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex py-4.5 px-5 border-b border-atlas-main-border items-center justify-between">
              <div>
                <div className="text-sm font-bold text-atlas-foreground">
                  {selectedConn.name}
                </div>
                <div className="text-[11px] mt-0.5 text-main-text">
                  {selectedConn.type}
                  {" connection"}
                </div>
              </div>
              <button
                className="flex size-7 rounded-[7px] bg-none border-none items-center cursor-pointer hover:bg-app-dark-blue"
                onClick={() => setDrawerOpen(false)}
              >
                <X size={14} className="text-main-text-active" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="flex gap-2.5 mb-5">
                <StatusBadge status={selectedConn.status} />
                <span className="text-[11px] font-jet-mono text-main-text">
                  {"Last checked: "}
                  {selectedConn.checked}
                </span>
              </div>
              <div className="flex flex-col gap-2.5 mb-5">
                {[
                  { label: "P95 Latency", value: selectedConn.latency },
                  { label: "Used by workflows", value: String(selectedConn.workflows) },
                  { label: "Environment", value: selectedConn.env },
                  { label: "Health check", value: "Every 5 min" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex py-2 px-3 rounded-lg justify-between bg-atlas-background-blue">
                    <span className="text-xs text-main-text">
                      {label}
                    </span>
                    <span className="text-xs text-atlas-foreground font-semibold font-jet-mono">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<Activity size={12} />}
                  className="w-full justify-center"
                >
                  Test connection
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<RefreshCw size={12} />}
                  className="w-full justify-center"
                >
                  Rotate credentials
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  icon={<Trash2 size={12} />}
                  className="w-full justify-center"
                >
                  Remove connection
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}