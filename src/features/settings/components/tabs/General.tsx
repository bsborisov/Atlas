"use client";

import { Button } from "@/components/ui/Button"
import SettingsField from "./shared/Field"
import { Trash2 } from "lucide-react"
import { useState } from "react";
import { Heading } from "@/components/ui/Heading";
import { cn } from "@/lib/utils";

const GeneralTab = ({
  saved,
  handleSave
}: {
  saved: boolean;
  handleSave: () => void
}) => {
  const [workspaceName, setWorkspaceName] = useState("Meridian");
  const [workspaceSlug, setWorkspaceSlug] = useState("meridian");
  const [defaultEnv, setDefaultEnv] = useState("production");
  const [retainLogs, setRetainLogs] = useState("90");

  return (
    <div>
      <Heading
        size={4}
        className="mb-1 text-[17px] text-atlas-foreground tracking-[-0.02em]"
      >
        General
      </Heading>
      <p className="text-[13px] text-main-text mb-7">Workspace identity and runtime defaults</p>

      <div className="px-5 mb-6 rounded-[10px] border border-atlas-main-border bg-atlas-background-light">
        <SettingsField label="Workspace name" desc="Displayed across the Atlas UI and in notifications.">
          <input
            value={workspaceName}
            onChange={e => setWorkspaceName(e.target.value)}
            className="w-50 h-8.5 px-2.5 text-[13px] rounded-[7px] text-atlas-foreground outline-none bg-atlas-background-blue"
          />
        </SettingsField>
        <SettingsField label="Workspace slug" desc="Used in API endpoints and webhooks. Lowercase, no spaces.">
          <div className="flex gap-0 rounded-[7px] items-center overflow-hidden border border-atlas-main-border bg-atlas-background-blue">
            <span className="flex h-8.5 px-2.5 text-xs items-center text-main-text border-r border-atlas-main-border font-jet-mono">
              atlas.io/
            </span>
            <input
              value={workspaceSlug}
              onChange={e => setWorkspaceSlug(e.target.value.toLowerCase().replace(/\s/g, "-"))}
              className="w-35 h-8.5 px-2.5 text-[13px] text-atlas-foreground bg-transparent border-none outline-none font-jet-mono"
            />
          </div>
        </SettingsField>
        <SettingsField label="Default environment" desc="Applied when triggering runs without an explicit env header.">
          <select value={defaultEnv} onChange={e => setDefaultEnv(e.target.value)}
            className="h-8.5 px-2.5 text-[13px] text-main-text-active border border-atlas-main-border rounded-[7px] bg-atlas-background-blue outline-none">
            <option value="production">production</option>
            <option value="staging">staging</option>
            <option value="development">development</option>
          </select>
        </SettingsField>
        <SettingsField label="Log retention" desc="How long run logs and payloads are stored.">
          <select value={retainLogs} onChange={e => setRetainLogs(e.target.value)}
            className="h-8.5 px-2.5 text-[13px] text-main-text-active border border-atlas-main-border rounded-[7px] bg-atlas-background-blue outline-none">
            {["7", "30", "90", "180", "365"].map(d => <option key={d} value={d}>{d} days</option>)}
          </select>
        </SettingsField>
      </div>

      <div className="px-5 mb-7 rounded-[10px] border border-atlas-main-border bg-atlas-background-light">
        <div className="py-3.5 border-b border-atlas-main-border">
          <div className="mb-3 text-[13px] font-semibold text-atlas-foreground">Workspace icon</div>
          <div className="flex gap-4 items-center">
            <div
              className={cn(
                "flex size-14 text-[22px] font-extrabold text-app-purple",
                "border border-app-purple/20 bg-app-purple/12",
                "items-center justify-center rounded-xl"
              )}
            >
              M
            </div>
            <div>
              <Button variant="secondary" size="sm">Upload image</Button>
              <div className="mt-1.5 text-[11px] text-main-text">PNG or SVG · max 1 MB</div>
            </div>
          </div>
        </div>
        <SettingsField label="Timezone" desc="Used for scheduled workflow triggers and log timestamps.">
          <select className="h-8.5 px-2.5 text-[13px] text-main-text-active border border-atlas-main-border rounded-[7px] bg-atlas-background-blue outline-none">
            <option>UTC</option>
            <option>America/New_York</option>
            <option>Europe/London</option>
            <option>Asia/Tokyo</option>
          </select>
        </SettingsField>
      </div>

      <div className="flex gap-2.5 items-center">
        <Button variant="primary" size="sm" onClick={handleSave}>{saved ? "✓ Saved" : "Save changes"}</Button>
        <Button variant="ghost" size="sm">Discard</Button>
      </div>

      <div className="mt-10 pt-7 border-t border-atlas-main-border">
        <div className="mb-2 text-[14px] font-semibold text-app-light-red">Danger zone</div>
        <div className="flex py-4 px-5 rounded-[10px] border border-app-light-red/20 bg-app-light-red/4 items-center justify-between">
          <div>
            <div className="mb-0.75 text-[13px] font-medium text-atlas-foreground">Delete workspace</div>
            <div className="text-[12px] text-main-text">Permanently deletes all workflows, runs, and connections. This cannot be undone.</div>
          </div>
          <Button variant="destructive" size="sm" icon={<Trash2 size={12} />}>Delete workspace</Button>
        </div>
      </div>
    </div>
  )
}

export default GeneralTab