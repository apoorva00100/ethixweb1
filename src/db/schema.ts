import { index, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { LEAD_STATUSES } from "@/lib/lead-options";

export const leadStatus = pgEnum("lead_status", LEAD_STATUSES);

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(), // normalised to +91XXXXXXXXXX
    company: text("company"),
    city: text("city").notNull(),
    service: text("service").notNull(),
    budget: text("budget").notNull(),
    message: text("message").notNull(),
    status: leadStatus("status").notNull().default("new"),
    notes: text("notes"),
    source: text("source"), // page the enquiry came from
    ipHash: text("ip_hash"), // salted SHA-256, never the raw IP
    userAgent: text("user_agent"),
  },
  (t) => [
    index("leads_created_at_idx").on(t.createdAt),
    index("leads_status_idx").on(t.status),
    index("leads_ip_hash_created_at_idx").on(t.ipHash, t.createdAt),
    index("leads_email_idx").on(t.email),
  ],
  // Row Level Security on with no policies: Supabase's public (anon) API can read or write nothing.
  // The app reaches the table only through server-side Drizzle queries.
).enableRLS();

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
