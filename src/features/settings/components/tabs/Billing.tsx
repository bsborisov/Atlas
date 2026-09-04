"use client";

import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CreditCard } from "lucide-react";
import { PlansDto, UsageInfoDto } from "../../types/settings.dto";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";

const BillingTab = ({
  usageInfo,
  plans
}: {
  usageInfo: UsageInfoDto[];
  plans: PlansDto[];
}) => {
  return (
    <div>
      <Heading
        size={4}
        className="mb-1 text-[17px] text-atlas-foreground tracking-[-0.02em]"
      >
        Billing
      </Heading>
      <p className="text-[13px] text-main-text mb-7">Subscription, usage, and payment details</p>

      {/* Current plan */}
      <div className="mb-6 p-5 rounded-[10px] border border-atlas-main-border bg-atlas-background-light">
        <div className="flex mb-4 items-start justify-between">
          <div>
            <div className="flex gap-2.5 mb-1.5 items-center">
              <span className="text-base font-bold text-atlas-foreground">Growth plan</span>
              <Badge variant="success">Active</Badge>
            </div>
            <div className="text-[13px] text-main-text">$49 / month · Renews Dec 12, 2026</div>
          </div>
          <Button variant="secondary" size="sm">Manage plan</Button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {usageInfo.map(({ label, used, total }) => (
            <div key={label} className="py-3 px-3.5 rounded-lg bg-atlas-background-blue">
              <div className="text-[11px] text-main-text mb-2">{label}</div>
              <div className="mb-1.5 text-[18px] font-bold font-jet-mono text-atlas-foreground">
                {used.toLocaleString()}{total ? <Text className="text-[13px]"> / {total.toLocaleString()}</Text> : ""}
              </div>
              {total && (
                <div className="h-0.75 rounded-xs bg-white/6 overflow-hidden">
                  <div
                    style={{ width: `${(used / total) * 100}%` }}
                    className={cn(
                      "h-full rounded-xs",
                      (used / total) > 0.85 ? "bg-app-light-yellow" : "bg-app-purple"
                    )}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Plan comparison */}
      <div className="mb-3.5 text-[14px] font-semibold text-atlas-foreground">Upgrade plan</div>
      <div className="grid grid-cols-4 gap-2.5 mb-7">
        {plans.map(p => (
          <div
            key={p.name}
            className={cn(
              "relative py-4 px-3.5 rounded-[10px] border",
              p.current ? "bg-app-purple/6 border-app-purple/30" : "bg-atlas-background-light border-atlas-main-border"
            )}
          >
            {p.current &&
              <div className={cn(
                "absolute py-0.5 px-2 -top-px left-1/2 -translate-x-1/2",
                "text-[9px] font-bold rounded-b-[5px]",
                "bg-app-purple text-white tracking-wider"
              )}
              >
                CURRENT
              </div>
            }
            <div className="mb-1 text-[14px] font-bold text-atlas-foreground">{p.name}</div>
            <div
              className={cn(
                "mb-0.5 text-[20px] font-extrabold font-jet-mono tracking-[-0.04em]",
                p.current ? "text-app-purple" : "text-atlas-foreground"
              )}
            >
              {p.price}
            </div>
            {p.price !== "Custom" && <div className="mb-3.5 text-main-text text-[11px]">per month</div>}
            <div className="flex flex-col gap-1.25 mb-3.5">
              {p.features.map(f => (
                <div key={f} className="flex gap-2.5 text-main-text-active text-[11px]">
                  <span className="text-app-light-green">✓</span> {f}
                </div>
              ))}
            </div>
            {!p.current && (
              <button
                className={cn(
                  "w-full h-8 text-xs font-semibold rounded-md border",
                  p.name === "Enterprise"
                    ? "bg-none border-atlas-main-border text-main-text-active"
                    : "bg-app-purple border-app-purple text-white",
                  "text-xs font-semibold cursor-pointer"
                )}
              >
                {p.name === "Enterprise" ? "Contact us" : "Upgrade"}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Payment method */}
      <div
        className={cn(
          "flex py-4 px-5 rounded-[10px] items-center justify-between",
          "border border-atlas-main-border bg-atlas-background-light"
        )}
      >
        <div className="flex gap-3.5 items-center">
          <div
            className={cn(
              "flex w-10 h-6.5 rounded-[5px] items-center justify-center",
              "border border-atlas-main-border bg-atlas-background-blue"
            )}
          >
            <CreditCard size={14} className="text-main-text" />
          </div>
          <div>
            <div className="text-[13px] text-atlas-foreground font-medium">Visa ending in 4242</div>
            <div className="text-[11px] text-main-text">Expires 08 / 2027</div>
          </div>
        </div>
        <Button variant="ghost" size="sm">Update card</Button>
      </div>
    </div>
  )
}

export default BillingTab;