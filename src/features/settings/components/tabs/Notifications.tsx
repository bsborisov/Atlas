"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import SettingsField from "./shared/Field";
import SettingsToggle from "./shared/Toggle";
import { Heading } from "@/components/ui/Heading";
import { cn } from "@/lib/utils";

const NotificationsTab = ({
  saved,
  handleSave
}: {
  saved: boolean;
  handleSave: () => void
}) => {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [slackNotifs, setSlackNotifs] = useState(true);
  const [failureAlerts, setFailureAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  return (
    <div>
      <Heading
        size={4}
        className="mb-1 text-[17px] text-atlas-foreground tracking-[-0.02em]"
      >
        Notifications
      </Heading>
      <p className="text-[13px] text-main-text mb-7">Control how and when Atlas alerts you</p>

      <div className="mb-6 px-5 rounded-[10px] border border-atlas-main-border bg-atlas-background-light">
        <div className="py-3.5 border-b border-atlas-main-border">
          <div className="mb-3 text-xs font-semibold font-jet-mono text-main-text tracking-[0.06em]">CHANNELS</div>
        </div>
        <SettingsField label="Email notifications" desc="Send run alerts and weekly digests to your email.">
          <SettingsToggle value={emailNotifs} onChange={setEmailNotifs} />
        </SettingsField>
        <SettingsField label="Slack notifications" desc="Post alerts to a Slack channel when runs fail or recover.">
          <SettingsToggle value={slackNotifs} onChange={setSlackNotifs} />
        </SettingsField>
        {slackNotifs && (
          <div className="py-3 border-b border-atlas-main-border">
            <div className="mb-2 text-xs text-main-text-active">Slack channel</div>
            <input
              defaultValue="#atlas-alerts"
              className={cn(
                "w-50 h-8.5 px-2.5 text-[13px] rounded-[7px]",
                "font-jet-mono text-atlas-foreground outline-none",
                "border border-atlas-main-border bg-atlas-background-blue"
              )}
            />
          </div>
        )}
      </div>

      <div className="mb-7 px-5 rounded-[10px] border border-atlas-main-border bg-atlas-background-light">
        <div className="py-3.5 border-b border-atlas-main-border">
          <div className="mb-0 text-xs font-semibold text-main-text font-jet-mono tracking-[0.06em]">ALERT TRIGGERS</div>
        </div>
        <SettingsField label="Workflow failure" desc="Alert when any run ends with a failed step.">
          <SettingsToggle value={failureAlerts} onChange={setFailureAlerts} />
        </SettingsField>
        <SettingsField label="Workflow recovery" desc="Alert when a failed run successfully retries.">
          <SettingsToggle value={true} onChange={() => { }} />
        </SettingsField>
        <SettingsField label="Run threshold exceeded" desc="Alert when a workflow takes longer than expected.">
          <SettingsToggle value={false} onChange={() => { }} />
        </SettingsField>
        <SettingsField label="Weekly digest" desc="Sunday summary of run counts, success rates, and top errors.">
          <SettingsToggle value={weeklyDigest} onChange={setWeeklyDigest} />
        </SettingsField>
      </div>

      <Button variant="primary" size="sm" onClick={handleSave}>{saved ? "✓ Saved" : "Save changes"}</Button>
    </div>
  )
}

export default NotificationsTab;