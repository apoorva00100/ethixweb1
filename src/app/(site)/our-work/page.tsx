import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { projects } from "@/lib/projects";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { ProjectGrid } from "@/components/site/project-grid";
import { Cta } from "@/components/site/cta";

export const metadata: Metadata = {
  title: "Our Work | Ethixweb India",
  description: "Selected websites and growth campaigns for Indian businesses, each with a clear before and after.",
};

export default function OurWorkPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-16 sm:pt-24 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-text">Our work</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.4rem,5.6vw,5rem)] font-extrabold leading-[0.98] tracking-tight">
            We build things that{" "}
            <span className="font-serif font-normal italic text-primary-text">matter.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/75">
            From fast-moving local businesses to scaling brands, we ship websites and campaigns that drive real outcomes. Here is a selection of recent projects.
          </p>
        </Reveal>
        <Reveal delay={0.24} className="mt-9 flex flex-wrap gap-4">
          <Link href="/contact" className={cn(buttonVariants(), "group h-12 rounded-full px-7 text-base font-bold")}>
            Start a project
            <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link href="#case-studies" className={cn(buttonVariants({ variant: "outline" }), "h-12 rounded-full px-7 text-base font-bold")}>
            See the case studies
          </Link>
        </Reveal>
      </section>

      <section id="case-studies" className="scroll-mt-24 border-y border-border bg-surface/30 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow="Case studies" title="A clear before and after," accent="every time." />
          <div className="mt-12">
            <ProjectGrid />
          </div>
        </div>
      </section>

      <section aria-label="Selected clients" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Trusted by growing Indian businesses</p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-14 gap-y-5">
          {projects.map((p) => (
            <li key={p.slug} className="font-serif text-2xl italic text-foreground/50">{p.name}</li>
          ))}
        </ul>
      </section>

      <Cta
        title="Let's create your next"
        accent="success story."
        body="Tell us where the friction is and we'll explain how we'd fix it, with no pitch deck required."
        secondary={{ label: "See what we do", href: "/services" }}
      />
      <div className="pb-0" />
    </>
  );
}
