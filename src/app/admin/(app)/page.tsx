import { Suspense } from "react";
import { AdminLink } from "@/components/site/admin-link";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Skeleton } from "@/components/site/skeleton";
import { StatusBadge } from "@/components/site/status-badge";
import { Input } from "@/components/ui/input";
import { requireAdmin } from "@/lib/admin";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/lead-options";
import { getStats, listLeads } from "@/lib/leads-queries";
import { cn } from "@/lib/utils";

const when = (d: Date) =>
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" }).format(d);

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

// With Cache Components, reading searchParams must happen inside a <Suspense> that sits below the
// shared admin layout, otherwise client navigations into this route block.
export default function AdminPage(props: PageProps<"/admin">) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Dashboard searchParams={props.searchParams} />
    </Suspense>
  );
}

function DashboardSkeleton() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">Leads</h1>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-24" />)}
      </div>
      <Skeleton className="mt-8 h-72" />
    </div>
  );
}

async function Dashboard({ searchParams }: { searchParams: PageProps<"/admin">["searchParams"] }) {
  await requireAdmin();
  const sp = await searchParams;
  const q = one(sp.q)?.trim().slice(0, 100) || undefined;
  const statusParam = one(sp.status);
  const status = LEAD_STATUSES.find((s) => s === statusParam) as LeadStatus | undefined;
  const page = Math.max(1, Number.parseInt(one(sp.page) ?? "1", 10) || 1);

  const [stats, { rows, total, pages }] = await Promise.all([getStats(), listLeads({ q, status, page })]);

  const href = (over: { status?: string | null; page?: number }) => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    const st = over.status === undefined ? status : over.status;
    if (st) p.set("status", st);
    if (over.page && over.page > 1) p.set("page", String(over.page));
    const s = p.toString();
    return s ? `/admin?${s}` : "/admin";
  };

  const cards = [
    { label: "Total leads", value: stats.total },
    { label: "New", value: stats.counts.new, accent: true },
    { label: "Last 7 days", value: stats.week },
    { label: "Won", value: stats.counts.won },
  ];

  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">Leads</h1>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-border bg-card p-5">
            <div className={cn("font-mono text-3xl", c.accent && "text-primary-text")}>{c.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <nav aria-label="Filter by status" className="flex flex-wrap gap-2">
          {[null, ...LEAD_STATUSES].map((s) => (
            <AdminLink
              key={s ?? "all"}
              href={href({ status: s })}
              aria-current={(status ?? null) === s ? "true" : undefined}
              className={cn(
                "rounded-full border px-3.5 py-1 text-sm capitalize transition-colors",
                (status ?? null) === s
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {s ?? "All"}
              {s && <span className="ml-1.5 font-mono text-xs opacity-70">{stats.counts[s]}</span>}
            </AdminLink>
          ))}
        </nav>
        <form action="/admin" className="relative w-full sm:w-72">
          {status && <input type="hidden" name="status" value={status} />}
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input name="q" defaultValue={q} placeholder="Search name, email, phone, city…" className="pl-9" aria-label="Search leads" />
        </form>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card">
        {rows.length === 0 ? (
          <p className="p-10 text-center text-muted-foreground">
            {stats.total === 0 ? "No enquiries yet. They'll appear here as soon as someone submits the contact form." : "No leads match your filters."}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead>
                <tr className="border-b border-border font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  <th scope="col" className="p-4 font-normal">Received</th>
                  <th scope="col" className="p-4 font-normal">Lead</th>
                  <th scope="col" className="p-4 font-normal">Contact</th>
                  <th scope="col" className="p-4 font-normal">Interest</th>
                  <th scope="col" className="p-4 font-normal">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((l) => (
                  <tr key={l.id} className="transition-colors hover:bg-accent/40">
                    <td className="whitespace-nowrap p-4 text-muted-foreground">{when(l.createdAt)}</td>
                    <td className="p-4">
                      <AdminLink href={`/admin/leads/${l.id}`} className="font-semibold hover:text-primary-text hover:underline">
                        {l.name}
                      </AdminLink>
                      <div className="text-xs text-muted-foreground">{[l.company, l.city].filter(Boolean).join(" · ")}</div>
                    </td>
                    <td className="p-4">
                      <div>{l.email}</div>
                      <div className="text-xs text-muted-foreground">{l.phone}</div>
                    </td>
                    <td className="p-4">
                      <div>{l.service}</div>
                      <div className="text-xs text-muted-foreground">{l.budget}</div>
                    </td>
                    <td className="p-4"><StatusBadge status={l.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {pages > 1 && (
        <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
          <span>{total} lead{total === 1 ? "" : "s"} · page {page} of {pages}</span>
          <div className="flex gap-2">
            <AdminLink aria-disabled={page <= 1} href={href({ page: page - 1 })} className={cn("inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5", page <= 1 && "pointer-events-none opacity-40")}>
              <ChevronLeft className="size-4" /> Prev
            </AdminLink>
            <AdminLink aria-disabled={page >= pages} href={href({ page: page + 1 })} className={cn("inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5", page >= pages && "pointer-events-none opacity-40")}>
              Next <ChevronRight className="size-4" />
            </AdminLink>
          </div>
        </div>
      )}
    </div>
  );
}
