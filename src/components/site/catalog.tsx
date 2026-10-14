import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { catalog } from "@/lib/services";
import { Reveal } from "./reveal";

export function Catalog() {
  const total = catalog.reduce((n, c) => n + c.items.length, 0);
  return (
    <section className="border-y border-border bg-surface/30 py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-text">Full service catalog</p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              {total} services, one{" "}
              <span className="font-serif font-normal italic text-primary-text">accountable team.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              From website builds to AI receptionists, ad campaigns, reporting, accessibility and ongoing support: every capability we run, grouped by category.
            </p>
          </div>
          <Link href="/services" className={cn(buttonVariants({ variant: "outline" }), "group h-11 rounded-full px-6 font-bold")}>
            See all {total} services
            <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {catalog.map((c, i) => (
            <Reveal key={c.category} delay={(i % 3) * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-card p-7">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">{c.category}</h3>
                  <span className="rounded-full bg-primary/15 px-2.5 py-0.5 font-mono text-xs text-primary-text">{c.items.length}</span>
                </div>
                <ul className="mt-5 space-y-2.5 text-sm text-foreground/75">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-center gap-2.5">
                      <span className="size-1.5 rounded-full bg-primary/60" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
