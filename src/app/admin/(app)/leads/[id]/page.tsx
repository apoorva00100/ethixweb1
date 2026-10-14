import { Suspense } from "react";
import { AdminLink } from "@/components/site/admin-link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";
import { Skeleton } from "@/components/site/skeleton";
import { StatusBadge } from "@/components/site/status-badge";
import { requireAdmin } from "@/lib/admin";
import { getLead } from "@/lib/leads-queries";
import { LeadControls } from "./lead-controls";

const when = (d: Date) =>
  new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(d) + " IST";

// params must be read inside a <Suspense> below the shared layout (see the dashboard page).
export default function LeadPage(props: PageProps<"/admin/leads/[id]">) {
  return (
    <Suspense
      fallback={
        <div>
          <Skeleton className="h-5 w-24" />
          <Skeleton className="mt-6 h-10 w-72" />
          <Skeleton className="mt-8 h-80" />
        </div>
      }
    >
      <LeadDetail params={props.params} />
    </Suspense>
  );
}

async function LeadDetail({ params }: { params: PageProps<"/admin/leads/[id]">["params"] }) {
  await requireAdmin();
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const lead = await getLead(id);
  if (!lead) notFound();

  const facts: [string, React.ReactNode][] = [
    ["Email", <a key="e" href={`mailto:${lead.email}`} className="text-primary-text hover:underline">{lead.email}</a>],
    ["Phone", <a key="p" href={`tel:${lead.phone}`} className="text-primary-text hover:underline">{lead.phone}</a>],
    ["Company", lead.company ?? "—"],
    ["City", lead.city],
    ["Service", lead.service],
    ["Budget", lead.budget],
    ["Received", when(lead.createdAt)],
    ["Source page", lead.source ?? "—"],
  ];

  return (
    <div>
      <AdminLink href="/admin" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> All leads
      </AdminLink>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-extrabold tracking-tight">{lead.name}</h1>
        <StatusBadge status={lead.status} />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {facts.map(([k, v]) => (
              <div key={k} className="bg-card p-4">
                <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{k}</dt>
                <dd className="mt-1 break-words">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Message</h2>
            <p className="mt-3 whitespace-pre-wrap leading-7">{lead.message}</p>
          </div>
        </div>
        <div className="h-fit rounded-2xl border border-border bg-card p-6">
          <LeadControls id={lead.id} status={lead.status} notes={lead.notes} />
        </div>
      </div>
    </div>
  );
}
