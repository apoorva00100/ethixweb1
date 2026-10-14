"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { filters, projects } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function ProjectGrid() {
  const [active, setActive] = useState("All");
  const shown = projects.filter((p) => active === "All" || p.tags.includes(active));
  return (
    <>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={active === f}
            onClick={() => setActive(f)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              active === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background/80 text-muted-foreground hover:border-primary/50 hover:text-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {shown.map((p) => (
          <Link
            key={p.slug}
            href={`/our-work/${p.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40"
          >
            <div className={`relative h-56 bg-gradient-to-br ${p.tone} to-transparent`}>
              <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
              <ArrowUpRight className="absolute right-5 top-5 size-5 text-foreground/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <div className="absolute bottom-5 left-6 flex gap-8">
                {p.stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-mono text-3xl">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary-text">{t}</span>
                ))}
                <span className="rounded-full bg-secondary px-2.5 py-0.5 font-mono text-xs text-muted-foreground">{p.year}</span>
              </div>
              <h3 className="mt-4 text-xl font-bold">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.industry}</p>
              <p className="mt-3 text-sm leading-6 text-foreground/75">{p.summary}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-text">
                View case study <ArrowUpRight className="size-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
