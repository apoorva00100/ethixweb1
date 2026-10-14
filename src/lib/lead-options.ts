import { fullCatalog } from "@/lib/services";

// Single source of truth for the enquiry form options. Used by the form (UI),
// the Zod schema (validation) and the admin dashboard (labels).
const serviceNames = fullCatalog.flatMap((c) => c.items.map((i) => i.name)) as [string, ...string[]];
export const SERVICE_OPTIONS: [string, ...string[]] = [...serviceNames, "Not sure yet"];

export const BUDGET_OPTIONS = [
  "Under ₹50,000",
  "₹50,000 – ₹2 lakh",
  "₹2 – ₹5 lakh",
  "₹5 lakh+",
  "Not sure yet",
] as const;

export const LEAD_STATUSES = ["new", "contacted", "qualified", "won", "lost"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];
