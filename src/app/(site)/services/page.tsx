import type { Metadata } from "next";
import Link from "next/link";
import { Accessibility, ArrowUpRight, BarChart3, Bot, Globe, LifeBuoy, TrendingUp, type LucideIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fullCatalog } from "@/lib/services";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Faq } from "@/components/site/faq";
import { Cta } from "@/components/site/cta";

export const metadata: Metadata = {
  title: "Services | Ethixweb India",
  description:
    "22 services across websites, AI, growth, data, accessibility and support, run by one senior team for Indian businesses.",
};

const icons: Record<string, LucideIcon> = {
  Website: Globe,
  AI: Bot,
  Growth: TrendingUp,
  Data: BarChart3,
  Accessibility,
  Support: LifeBuoy,
};

const slug = (s: string) => s.toLowerCase();
const total = fullCatalog.reduce((n, c) => n + c.items.length, 0);

const process = [
  { title: "Audit", text: "We review your current site, ads and tracking to find exactly where leads are being lost." },
  { title: "Plan", text: "A prioritised roadmap with the expected impact of each item, for you to approve." },
  { title: "Build", text: "Our senior team ships the site, campaigns and integrations in weeks, not quarters." },
  { title: "Optimise", text: "Weekly iteration guided by enquiries, bookings and revenue." },
];

const faqs = [
  ["Do you only work with one industry?", "We focus on real estate, clinics and D2C brands, but the systems apply to most Indian businesses that live on calls, bookings and enquiries."],
  ["Can you work with my existing website?", "Yes. We audit first, keep what works and rebuild only what doesn't."],
  ["How do you price projects?", "Fixed scope in ₹, agreed in writing before work starts, with GST shown separately and milestone-based payments."],
  ["How fast can we start?", "Usually within a week of the discovery call. Most projects launch in 2–4 weeks."],
  ["Who actually does the work?", "Senior developers, designers and strategists: the same people you meet on the kickoff call."],
];

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-16 sm:pt-24 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-text">Services</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.4rem,5.6vw,5rem)] font-extrabold leading-[0.98] tracking-tight">
            Everything your business needs to{" "}
            <span className="font-serif font-normal italic text-primary-text">grow online.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/75">
            Websites, AI, ads, SEO and tracking, handled by a senior team that answers the phone.
          </p>
        </Reveal>
        <Reveal delay={0.24} className="mt-9 flex flex-wrap gap-4">
          <Link href="/contact" className={cn(buttonVariants(), "group h-12 rounded-full px-7 text-base font-bold")}>
            Start a project
            <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link href="#what-we-offer" className={cn(buttonVariants({ variant: "outline" }), "h-12 rounded-full px-7 text-base font-bold")}>
            Browse services
          </Link>
        </Reveal>
        <Reveal delay={0.3}>
          <ul className="mt-10 flex flex-wrap gap-2">
            {fullCatalog.flatMap((c) => c.items).map((s) => (
              <li key={s.name} className="rounded-full border border-border bg-surface/70 px-3 py-1 text-xs text-muted-foreground">
                {s.name}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section id="what-we-offer" className="scroll-mt-24 border-t border-border bg-surface/30 pb-24 pt-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="What we offer"
            title="Everything under"
            accent="one roof."
            body={`${total} services across six areas, run by one team instead of several disconnected vendors.`}
          />
          <nav aria-label="Service categories" className="sticky top-24 z-30 mt-10 flex flex-wrap justify-center gap-2">
            {fullCatalog.map((c) => (
              <a key={c.category} href={`#${slug(c.category)}`} className="rounded-full border border-border bg-background/80 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur transition-colors hover:border-primary/50 hover:text-foreground">
                {c.category} <span className="font-mono text-xs text-primary-text">{c.items.length}</span>
              </a>
            ))}
          </nav>
          <div className="mt-16 space-y-20">
            {fullCatalog.map((c) => {
              const Icon = icons[c.category];
              return (
                <div key={c.category} id={slug(c.category)} className="grid scroll-mt-40 gap-8 lg:grid-cols-[0.7fr_1.3fr]">
                  <Reveal>
                    <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary-text">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-5 text-3xl font-extrabold tracking-tight">
                      {c.category} <span className="font-mono text-base font-normal text-primary-text">({c.items.length})</span>
                    </h3>
                    <p className="mt-3 max-w-sm text-foreground/70">{c.blurb}</p>
                    <Link href="/contact" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-text hover:underline">
                      {c.cta} <ArrowUpRight className="size-4" />
                    </Link>
                  </Reveal>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {c.items.map((s, i) => (
                      <Reveal key={s.name} delay={i * 0.05}>
                        <div className="h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
                          <span className="font-mono text-xs text-primary-text">{String(i + 1).padStart(2, "0")}</span>
                          <h4 className="mt-3 text-lg font-bold">{s.name}</h4>
                          <p className="mt-2 text-sm leading-6 text-foreground/70">{s.text}</p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <SectionHeading
          eyebrow="How an engagement runs"
          title="Audit first. Build second."
          accent="Optimise forever."
          body="Every service follows the same four-step rhythm."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {process.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07}>
              <div className="h-full rounded-2xl border border-border bg-card p-7">
                <span className="font-mono text-3xl text-primary-text">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-8 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-foreground/70">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="border-t border-border bg-surface/30">
        <Faq items={faqs} eyebrow="Before you ask" title="The questions every new client" accent="asks." />
      </div>

      <div className="pt-24">
        <Cta
          title="One team for your whole"
          accent="growth system."
          body="Tell us your growth goals and we'll map the system to get you there."
          secondary={{ label: "See the results", href: "/our-work" }}
        />
      </div>
    </>
  );
}
