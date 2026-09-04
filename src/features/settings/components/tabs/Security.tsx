"use client";

import Badge from "@/components/ui/Badge"
import SettingsField from "./shared/Field"
import SettingsToggle from "./shared/Toggle"
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { ActionsHistoryDto } from "../../types/settings.dto";

const SecurityTab = ({
  actionsHistory,
  saved,
  handleSave
}: {
  actionsHistory: ActionsHistoryDto[];
  saved: boolean;
  handleSave: () => void;
}) => {
  const [twoFactor, setTwoFactor] = useState(true);
  const [ssoEnabled, setSsoEnabled] = useState(false);

  return (
    <div>
      <Heading
        size={4}
        className="mb-1 text-[17px] text-atlas-foreground tracking-[-0.02em]"
      >
        Security
      </Heading>
      <p className="text-[13px] text-main-text mb-7">Authentication and access controls</p>

      <div className="mb-6 px-5 rounded-[10px] border border-atlas-main-border bg-atlas-background-light">
        <SettingsField label="Two-factor authentication" desc="Require 2FA for all workspace members.">
          <SettingsToggle value={twoFactor} onChange={setTwoFactor} />
        </SettingsField>
        <SettingsField label="SSO / SAML" desc="Single sign-on via your identity provider. Requires Scale plan.">
          <div className="flex gap-2.5 items-center">
            <Badge variant="warning">Scale</Badge>
            <SettingsToggle value={ssoEnabled} onChange={setSsoEnabled} />
          </div>
        </SettingsField>
        <SettingsField label="Session timeout" desc="Auto-sign-out inactive sessions after this period.">
          <select className="h-8.5 px-2.5 text-[13px] rounded-[7px] text-main-text-active border border-atlas-main-border bg-atlas-background-blue outline-none">
            <option>1 hour</option>
            <option>8 hours</option>
            <option>24 hours</option>
            <option>7 days</option>
          </select>
        </SettingsField>
        <SettingsField label="IP allowlist" desc="Restrict workspace access to specific IP ranges. Leave blank to allow all.">
          <input
            placeholder="e.g. 192.168.0.0/24"
            className="w-50 h-8.5 px-2.5 text-[13px] rounded-[7px] font-jet-mono text-atlas-foreground border border-atlas-main-border bg-atlas-background-blue outline-none"
          />
        </SettingsField>
      </div>

      <div className="mb-6 py-4 px-5 rounded-[10px] border border-atlas-main-border bg-atlas-background-light">
        <div className="mb-4 text-[13px] font-semibold divide-x divide-atlas-main-border/50 text-atlas-foreground ">Audit log</div>
        {actionsHistory.map((e, i) => (
          <div key={i} className="flex py-2 items-center justify-between">
            <div>
              <span className="text-xs text-atlas-foreground">{e.action}</span>
              <span className="ml-2 text-[11px] text-main-text">by {e.user}</span>
            </div>
            <Text className="text-[11px] font-jet-mono">{e.time}</Text>
          </div>
        ))}
      </div>

      <Button variant="primary" size="sm" onClick={handleSave}>{saved ? "✓ Saved" : "Save changes"}</Button>
    </div>
  )
}

export default SecurityTab