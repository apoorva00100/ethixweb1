import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, X, Gauge, IndianRupee, Radio, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Cta } from "@/components/site/cta";

export const metadata: Metadata = {
  title: "About | Ethixweb India",
  description:
    "A small, senior team building websites, AI automation and growth systems for Indian businesses. No account managers, no theatre.",
};

const badges = ["Senior-led", "No account managers", "Remote-first", "Built for India", "Revenue over vanity metrics"];

const heroStats = [
  { icon: Gauge, value: "2–4 wks", label: "typical time to launch" },
  { icon: Users, value: "100%", label: "senior-led delivery" },
  { icon: IndianRupee, value: "₹ fixed", label: "scope agreed in writing" },
  { icon: Radio, value: "IST", label: "your hours, your language" },
];

const steps = [
  { title: "Discover & strategise", text: "We study your business, customers and competitors in your city and category, then write a plan tied to revenue." },
  { title: "Design & build", text: "Senior designers and developers ship a fast, mobile-first site or system, reviewed with you every week." },
  { title: "Launch & optimise", text: "We go live quickly, then improve messaging, design and speed using real data from real Indian users." },
  { title: "Grow & scale", text: "We double down on what works across search, ads, WhatsApp and automation." },
];

const values = [
  { title: "Revenue obsessed", text: "We measure enquiries, bookings and revenue. Not impressions, clicks or awards." },
  { title: "Senior team only", text: "You speak directly to the people doing the work, from the first call to launch day." },
  { title: "Move fast, ship clean", text: "A lean process with weekly iteration and continuous optimisation." },
];

const compare = [
  ["Who does the work", "Senior team, on the kickoff call", "Juniors behind an account manager"],
  ["Pricing", "Fixed scope in ₹, agreed in writing upfront", "Open-ended retainers and surprise invoices"],
  ["What gets reported", "Enquiries, bookings and revenue", "Impressions, clicks and vanity dashboards"],
  ["Time to launch", "2–4 weeks", "A quarter of discovery"],
  ["Getting answers", "A direct line to the builders", "Ticket queues and message relays"],
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-text">About Ethixweb India</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 text-[clamp(2.4rem,5.4vw,4.8rem)] font-extrabold leading-[0.98] tracking-tight">
              A small, senior team.{" "}
              <span className="font-serif font-normal italic text-primary-text">No account managers.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-8 text-foreground/75">
              Ethixweb is a web development and digital growth team for Indian businesses that want measurable results, built by people who are tired of agency theatre.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-9 flex flex-wrap gap-4">
            <Link href="/contact" className={cn(buttonVariants(), "group h-12 rounded-full px-7 text-base font-bold")}>
              Start a project
              <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link href="#how-we-work" className={cn(buttonVariants({ variant: "outline" }), "h-12 rounded-full px-7 text-base font-bold")}>
              How we work
            </Link>
          </Reveal>
          <Reveal delay={0.3}>
            <ul className="mt-9 flex flex-wrap gap-2">
              {badges.map((b) => (
                <li key={b} className="rounded-full border border-border bg-surface/70 px-3 py-1 text-xs text-muted-foreground">
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <div className="grid grid-cols-2 gap-3 rounded-3xl border border-border bg-card/80 p-3 backdrop-blur">
            {heroStats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-background/60 p-5">
                <s.icon className="size-5 text-primary-text" />
                <div className="mt-5 font-mono text-3xl">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 01 Story */}
      <section className="border-y border-border bg-surface/30 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-text">01 · Our story</p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Built for owners tired of{" "}
              <span className="font-serif font-normal italic text-primary-text">big agency theatre.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-lg leading-8 text-foreground/75">
            <p>
              Ethixweb started from a simple frustration: agencies that promise the moon, hand your project to a junior, and send a report full of numbers that never reach your bank account.
            </p>
            <p>
              India has some of the most ambitious small businesses in the world, and they deserve better than templates and retainers. So we kept the team small and senior. You work directly with the developers, designers and strategists doing the build: no relay of messages, no one learning on your budget.
            </p>
            {/* TODO: replace with the real India origin story once content is decided */}
          </Reveal>
        </div>
      </section>

      {/* 02 Mission / Vision */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <SectionHeading eyebrow="02 · What drives us" title="Clear about why we" accent="exist." />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {[
            ["Mission", "Turn marketing spend into measurable revenue.", "We judge every project by whether it brings more enquiries, bookings and revenue."],
            ["Vision", "The senior team Indian businesses call first.", "We want to be the long-term growth partner for ambitious companies across India."],
          ].map(([k, t, d], i) => (
            <Reveal key={k} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-card p-8">
                <span className="rounded-full bg-primary/15 px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary-text">{k}</span>
                <h3 className="mt-6 text-2xl font-bold leading-snug">{t}</h3>
                <p className="mt-3 text-foreground/70">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 03 How we work */}
      <section id="how-we-work" className="border-y border-border bg-surface/30 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="03 · How we work"
            title="A clear process. Zero"
            accent="guesswork."
            body="You see progress from the first call to launch, with weekly updates on what shipped, why, and what it moved."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.07}>
                <div className="h-full rounded-2xl border border-border bg-card p-7">
                  <span className="font-mono text-3xl text-primary-text">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-8 text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-foreground/70">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 Values */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <SectionHeading eyebrow="04 · What we stand for" title="Three things we" accent="won't compromise on." />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-card p-8 transition-colors hover:border-primary/40">
                <Check className="size-6 text-primary-text" />
                <h3 className="mt-6 text-xl font-bold">{v.title}</h3>
                <p className="mt-2 text-foreground/70">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 05 Difference */}
      <section className="border-y border-border bg-surface/30 py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <SectionHeading eyebrow="05 · The difference" title="Ethixweb versus the" accent="typical agency." />
          <Reveal className="mt-14 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-widest">
                    <th scope="col" className="p-5 font-mono text-muted-foreground" />
                    <th scope="col" className="p-5 font-mono text-primary-text">Ethixweb</th>
                    <th scope="col" className="p-5 font-mono text-muted-foreground">Typical agency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {compare.map(([k, us, them]) => (
                    <tr key={k}>
                      <th scope="row" className="p-5 font-semibold">{k}</th>
                      <td className="p-5 text-foreground/85">
                        <span className="flex items-start gap-2"><Check className="mt-0.5 size-4 shrink-0 text-teal" />{us}</span>
                      </td>
                      <td className="p-5 text-muted-foreground">
                        <span className="flex items-start gap-2"><X className="mt-0.5 size-4 shrink-0 text-destructive/80" />{them}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="pt-24">
        <Cta />
      </div>
    </>
  );
}
