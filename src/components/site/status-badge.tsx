import { cn } from "@/lib/utils";
import type { LeadStatus } from "@/lib/lead-options";

const styles: Record<LeadStatus, string> = {
  new: "bg-primary/20 text-primary-text",
  contacted: "bg-teal/15 text-teal",
  qualified: "bg-amber-400/15 text-amber-300",
  won: "bg-emerald-400/15 text-emerald-300",
  lost: "bg-secondary text-muted-foreground",
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  return <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium capitalize", styles[status])}>{status}</span>;
}
