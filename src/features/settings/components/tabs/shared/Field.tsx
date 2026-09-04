import { cn } from "@/lib/utils";

const SettingsField = ({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) => (
  <div className="flex py-4 px-0 items-center justify-between">
    <div className="flex-1 mr-6">
      <div
        className={cn(
          "text-[13px] font-medium text-atlas-foreground",
          desc ? "mb-0.75" : "mb-0"
        )}>
        {label}
      </div>
      {desc && <div className="text-xs text-main-text leading-normal">{desc}</div>}
    </div>
    {children}
  </div>
);

export default SettingsField