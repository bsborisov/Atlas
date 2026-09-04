"use client";

import { useState } from "react";
import { ActionsHistoryDto, ApiKeysDto, PlansDto, UsageInfoDto } from "../types/settings.dto";
import { Bell, CreditCard, Settings2, Shield, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import GeneralTab from "./tabs/General";
import SecurityTab from "./tabs/Security";
import NotificationsTab from "./tabs/Notifications";
import ApiTab from "./tabs/Api";
import BillingTab from "./tabs/Billing";

export function Settings({
  plans,
  apiKeys,
  actionsHistory,
  usageInfo
}: {
  plans: PlansDto[];
  apiKeys: ApiKeysDto[];
  actionsHistory: ActionsHistoryDto[];
  usageInfo: UsageInfoDto[];
}) {
  const [tab, setTab] = useState<"general" | "security" | "notifications" | "api" | "billing">("general");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const TABS = [
    { id: "general", label: "General", icon: Settings2 },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "api", label: "API & Webhooks", icon: Terminal },
    { id: "billing", label: "Billing", icon: CreditCard },
  ] as const;

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      {/* Left nav */}
      <div className="flex flex-col shrink-0 w-50 gap-0.5 py-6 px-3 border-r border-atlas-main-border">
        <div className="mb-2 px-2 text-[11px] tracking-[0.06em] text-main-text font-jet-mono">SETTINGS</div>
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setTab(id as typeof tab)}
            className={cn(
              "flex py-2 px-2.5 gap-2.25 w-full text-[13px] text-left rounded-[7px] items-center",
              tab === id
                ? "text-app-purple font-semibold bg-app-purple/10"
                : "text-main-text-active font-normal bg-transparent hover:bg-accent hover:text-foreground!",
              "border-none cursor-pointer transition-all duration-100"
            )}
          >
            <Icon size={14} className="shrink-0" />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 w-full py-8 px-10 overflow-y-auto">

        {/* ── GENERAL ── */}
        {tab === "general" && (
          <GeneralTab saved={saved} handleSave={handleSave} />
        )}

        {/* ── SECURITY ── */}
        {tab === "security" && (
          <SecurityTab actionsHistory={actionsHistory} saved={saved} handleSave={handleSave} />
        )}

        {/* ── NOTIFICATIONS ── */}
        {tab === "notifications" && (
          <NotificationsTab saved={saved} handleSave={handleSave} />
        )}

        {/* ── API ── */}
        {tab === "api" && (
          <ApiTab apiKeys={apiKeys} />
        )}

        {/* ── BILLING ── */}
        {tab === "billing" && (
          <BillingTab usageInfo={usageInfo} plans={plans} />
        )}
      </div>
    </div>
  );
}