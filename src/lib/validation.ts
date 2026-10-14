import { z } from "zod";
import { BUDGET_OPTIONS, SERVICE_OPTIONS } from "@/lib/lead-options";

/** Accepts 9876543210, 098765 43210, +91 98765-43210, 91 9876543210. Returns +91XXXXXXXXXX or null. */
export function normalizeIndianMobile(input: string): string | null {
  let d = input.replace(/[\s\-().]/g, "");
  if (d.startsWith("+")) d = d.slice(1);
  if (d.startsWith("91") && d.length === 12) d = d.slice(2);
  else if (d.startsWith("0") && d.length === 11) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? `+91${d}` : null;
}

const text = (label: string, min: number, max: number) =>
  z
    .string({ error: `${label} is required` })
    .trim()
    .min(min, `${label} must be at least ${min} characters`)
    .max(max, `${label} must be at most ${max} characters`);

// One schema, used by the form (client) and the API route (server).
export const enquirySchema = z.object({
  name: text("Name", 2, 100),
  email: z
    .string({ error: "Email is required" })
    .trim()
    .toLowerCase()
    .max(254, "Email is too long")
    .pipe(z.email("Enter a valid email address")),
  phone: z
    .string({ error: "Phone number is required" })
    .trim()
    .transform((v, ctx) => {
      const n = normalizeIndianMobile(v);
      if (!n) ctx.addIssue({ code: "custom", message: "Enter a valid 10-digit Indian mobile number" });
      return n ?? z.NEVER;
    }),
  company: z
    .string()
    .trim()
    .max(100, "Company must be at most 100 characters")
    .optional()
    .transform((v) => v || undefined),
  city: text("City", 2, 80),
  service: z.enum(SERVICE_OPTIONS, { error: "Choose a service" }),
  budget: z.enum(BUDGET_OPTIONS, { error: "Choose a budget range" }),
  message: text("Message", 10, 2000),
  // Spam traps. Real users never fill `website` and never submit within a few seconds of load.
  // Not length-limited here on purpose: the API route drops filled honeypots silently,
  // so a validation error never reveals which field is the trap.
  website: z.string().max(500).optional(),
  startedAt: z.number().int().optional(),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryData = z.output<typeof enquirySchema>;
