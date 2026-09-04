import { cn } from "@/lib/utils";

const SettingsToggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
  <button
    onClick={() => onChange(!value)}
    className={cn(
      "relative shrink-0 w-10 h-5.5 rounded-[11px]",
      value ? "bg-app-purple" : "bg-atlas-main-border",
      "border-none cursor-pointer transition-colors duration-150"
    )}
  >
    <div
      className={cn(
        "absolute top-0.75 size-4 rounded-full",
        value ? "left-5" : "left-0.75",
        "bg-white transition-[left] duration-150"
      )}
    />
  </button>
);

export default SettingsToggle