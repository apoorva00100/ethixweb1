import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { projects } from "@/lib/projects";
import { Reveal } from "@/components/site/reveal";
import { Cta } from "@/components/site/cta";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/our-work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.name} | Ethixweb India`, description: p.summary } : {};
}

export default async function CaseStudyPage(props: PageProps<"/our-work/[slug]">) {
  const { slug } = await props.params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];

  return (
    <>
      <section className="mx-auto max-w-5xl px-5 pb-16 pt-14 sm:pt-20">
        <Link href="/our-work" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> All work
        </Link>
        <Reveal delay={0.05}>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary-text">{t}</span>
            ))}
            <span className="rounded-full bg-secondary px-2.5 py-0.5 font-mono text-xs text-muted-foreground">{p.year}</span>
          </div>
          <h1 className="mt-5 text-[clamp(2.4rem,5.4vw,4.6rem)] font-extrabold leading-[1] tracking-tight">{p.name}</h1>
          <p className="mt-2 text-muted-foreground">{p.industry}</p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/75">{p.summary}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className={`relative mt-10 overflow-hidden rounded-3xl border border-border bg-gradient-to-br ${p.tone} to-transparent p-8 sm:p-12`}>
            <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
            <div className="relative flex flex-wrap gap-x-16 gap-y-6">
              {p.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-mono text-5xl sm:text-6xl">{s.value}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-border bg-surface/30 py-20">
        <div className="mx-auto grid max-w-5xl gap-14 px-5 md:grid-cols-2">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-text">The challenge</p>
            <p className="mt-4 text-lg leading-8 text-foreground/80">{p.challenge}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-text">What we did</p>
            <ol className="mt-4 space-y-4">
              {p.approach.map((a, i) => (
                <li key={a} className="flex gap-4 leading-7 text-foreground/80">
                  <span className="font-mono text-primary-text">{String(i + 1).padStart(2, "0")}</span>
                  {a}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-text">The results</p>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {p.results.map((r) => (
              <li key={r} className="flex gap-3 rounded-2xl border border-border bg-card p-6 leading-7">
                <Check className="mt-1 size-5 shrink-0 text-teal" />
                {r}
              </li>
            ))}
          </ul>
        </Reveal>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/contact" className={cn(buttonVariants(), "group h-12 rounded-full px-7 font-bold")}>
            Start a project
            <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link href={`/our-work/${next.slug}`} className={cn(buttonVariants({ variant: "outline" }), "h-12 rounded-full px-7 font-bold")}>
            Next: {next.name}
          </Link>
        </div>
      </section>
      <Cta />
    </>
  );
}
