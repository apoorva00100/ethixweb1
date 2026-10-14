import "server-only";
import { and, count, desc, eq, gt, ilike, or } from "drizzle-orm";
import { db, schema } from "@/db";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/lead-options";

export const PAGE_SIZE = 20;

const escapeLike = (s: string) => s.replace(/[\\%_]/g, "\\$&");

export async function getStats() {
  const d = db();
  const byStatus = await d.select({ status: schema.leads.status, n: count() }).from(schema.leads).groupBy(schema.leads.status);
  const [{ week }] = await d
    .select({ week: count() })
    .from(schema.leads)
    .where(gt(schema.leads.createdAt, new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)));
  const counts = Object.fromEntries(LEAD_STATUSES.map((s) => [s, 0])) as Record<LeadStatus, number>;
  byStatus.forEach((r) => (counts[r.status] = r.n));
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  return { total, week, counts };
}

export async function listLeads({ q, status, page }: { q?: string; status?: LeadStatus; page: number }) {
  const d = db();
  const term = q ? `%${escapeLike(q)}%` : null;
  const where = and(
    status ? eq(schema.leads.status, status) : undefined,
    term
      ? or(
          ilike(schema.leads.name, term),
          ilike(schema.leads.email, term),
          ilike(schema.leads.phone, term),
          ilike(schema.leads.city, term),
          ilike(schema.leads.company, term),
        )
      : undefined,
  );
  const [{ total }] = await d.select({ total: count() }).from(schema.leads).where(where);
  const rows = await d
    .select()
    .from(schema.leads)
    .where(where)
    .orderBy(desc(schema.leads.createdAt))
    .limit(PAGE_SIZE)
    .offset((page - 1) * PAGE_SIZE);
  return { rows, total, pages: Math.max(1, Math.ceil(total / PAGE_SIZE)) };
}

export async function getLead(id: string) {
  const [row] = await db().select().from(schema.leads).where(eq(schema.leads.id, id)).limit(1);
  return row ?? null;
}
