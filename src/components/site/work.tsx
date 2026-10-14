import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Work() {
  return (
    <section id="work" className="border-t border-border bg-surface/30 py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="Selected work" title="Results our clients" accent="can measure." />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {projects.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link href={`/our-work/${p.slug}`} className="group block h-full overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40">
                <div className={`relative h-44 bg-gradient-to-br ${p.tone} to-transparent`}>
                  <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
                  <ArrowUpRight className="absolute right-4 top-4 size-5 text-foreground/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <div className="absolute bottom-4 left-5">
                    <div className="font-mono text-4xl text-foreground">{p.stats[0].value}</div>
                    <div className="text-xs text-muted-foreground">{p.stats[0].label}</div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.industry}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/our-work" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-text hover:underline">
            See all work <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
