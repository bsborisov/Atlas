import Badge from "./Badge";

function StatusBadge({ status }: { status: string }) {

  const map: Record<string, { label: string; variant: "success" | "error" | "warning" | "cyan" | "ghost" | "purple" }> = {
    active: { label: "Active", variant: "success" },
    success: { label: "Success", variant: "success" },
    failed: { label: "Failed", variant: "error" },
    running: { label: "Running", variant: "purple" },
    queued: { label: "Queued", variant: "cyan" },
    draft: { label: "Draft", variant: "ghost" },
    degraded: { label: "Degraded", variant: "warning" },
    healthy: { label: "Healthy", variant: "success" },
    expired: { label: "Expired", variant: "error" },
    warning: { label: "Warning", variant: "warning" },
  };

  const { label, variant } = map[status] || { label: status, variant: "ghost" as const };

  return <Badge variant={variant}>{label}</Badge>;

}

export default StatusBadge;