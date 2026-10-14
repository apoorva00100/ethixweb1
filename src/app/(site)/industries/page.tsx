import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight, Bot, Building2, CalendarCheck, Cable, MapPin, MessageCircle, Megaphone,
  PackageCheck, ShieldCheck, ShoppingBag, ShoppingCart, Stethoscope, LayoutTemplate, type LucideIcon,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/reveal";
import { Marquee } from "@/components/site/marquee";
import { Cta } from "@/components/site/cta";

export const metadata: Metadata = {
  title: "Industries | Ethixweb India",
  description:
    "Websites, AI lead capture and growth systems for Indian real estate, clinics and D2C brands, where calls and bookings can't wait.",
};

type Industry = {
  id: string;
  icon: LucideIcon;
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  proof: { value: string; label: string }[];
  cta: string;
  services: { icon: LucideIcon; title: string; text: string }[];
};

// Proof figures and client-style details are sample content, to be replaced with real case studies.
const industries: Industry[] = [
  {
    id: "real-estate",
    icon: Building2,
    name: "Real estate & developers",
    tagline: "You sell the homes. We sell the site visit.",
    problem:
      "Portal and ad leads cost a lot, and most go cold within minutes because nobody calls back fast enough. Every slow follow-up is a lost booking.",
    solution:
      "Instant response on call and WhatsApp, a clean pipeline, and project pages that make a buyer want to visit, all running while your sales team is on site.",
    proof: [
      { value: "3.2×", label: "more site visits booked" },
      { value: "<60s", label: "first response time" },
    ],
    cta: "Get the real estate plan",
    services: [
      { icon: Bot, title: "AI lead qualification", text: "An AI receptionist answers calls and WhatsApp, checks budget and location, and books the site visit." },
      { icon: Cable, title: "CRM & visit pipeline", text: "Zoho, LeadSquared or HubSpot set up and managed, so every lead has an owner and a next step." },
      { icon: LayoutTemplate, title: "Project microsites", text: "Fast project pages with floor plans, RERA details and walkthroughs that convert on mobile." },
      { icon: Megaphone, title: "Ads & portal sync", text: "Google and Meta campaigns, with leads from major portals flowing straight into your CRM." },
    ],
  },
  {
    id: "healthcare",
    icon: Stethoscope,
    name: "Clinics & healthcare",
    tagline: "You treat patients. We fill the diary.",
    problem:
      "Phones ring while you're with a patient, appointments are booked on paper, and the clinic across the road shows up first on Google Maps.",
    solution:
      "Online and WhatsApp booking, an AI front desk that never misses a call, and local search work that puts you on the map, built with patient data privacy in mind.",
    proof: [
      { value: "40%", label: "fewer missed calls" },
      { value: "2×", label: "Google profile actions" },
    ],
    cta: "Get the clinic plan",
    services: [
      { icon: CalendarCheck, title: "Appointment booking", text: "Online and WhatsApp booking with automatic reminders to cut no-shows." },
      { icon: Bot, title: "AI front desk", text: "Answers calls after hours, handles common questions and books the right slot." },
      { icon: MapPin, title: "Local search & reviews", text: "Google Business updates and review collection so \"clinic near me\" finds you." },
      { icon: ShieldCheck, title: "Privacy-minded systems", text: "Consent flows and secure handling of patient details, aligned with the DPDP Act." },
    ],
  },
  {
    id: "d2c",
    icon: ShoppingBag,
    name: "D2C & retail",
    tagline: "You make the product. We make it sell.",
    problem:
      "Ad costs keep rising, carts get abandoned, and orders, shipping and GST invoices are stitched together by hand across five tools.",
    solution:
      "A fast storefront with UPI and COD, WhatsApp order journeys, performance ads you can read, and operations that run themselves.",
    proof: [
      { value: "₹18L", label: "monthly online revenue" },
      { value: "−28%", label: "customer acquisition cost" },
    ],
    cta: "Get the D2C plan",
    services: [
      { icon: ShoppingCart, title: "Storefront build", text: "Shopify or WooCommerce stores with UPI, cards, COD and Razorpay checkout." },
      { icon: MessageCircle, title: "WhatsApp commerce", text: "Catalogue, order updates and abandoned-cart recovery on the channel customers read." },
      { icon: Megaphone, title: "Performance ads", text: "Meta and Google campaigns with ROAS reporting tied to real orders." },
      { icon: PackageCheck, title: "Ops automation", text: "Shipping, inventory sync and GST invoicing connected, so nothing is retyped." },
    ],
  },
];

const ticker = [
  "Real estate", "Clinics & healthcare", "D2C & retail", "AI lead capture",
  "WhatsApp automation", "Local SEO", "Booking engines", "Instant response",
];

export default function IndustriesPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:pt-24 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-text">Industries</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.4rem,5.6vw,5rem)] font-extrabold leading-[0.98] tracking-tight">
            Built for the businesses that{" "}
            <span className="font-serif font-normal italic text-primary-text">build Bharat.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/75">
            We focus on three kinds of Indian business. The operations differ, but the core problem is the same: calls and bookings can&apos;t wait.
          </p>
        </Reveal>
        <Reveal delay={0.24} className="mt-9 flex flex-wrap gap-4">
          <Link href="/contact" className={cn(buttonVariants(), "group h-12 rounded-full px-7 text-base font-bold")}>
            Book a consultation
            <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link href="#real-estate" className={cn(buttonVariants({ variant: "outline" }), "h-12 rounded-full px-7 text-base font-bold")}>
            Find your industry
          </Link>
        </Reveal>
      </section>

      <Marquee items={ticker} />

      {industries.map((ind, idx) => (
        <section key={ind.id} id={ind.id} className={cn("scroll-mt-24 py-24", idx % 2 === 1 && "border-y border-border bg-surface/30")}>
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary-text">
                    <ind.icon className="size-5" />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary-text">
                    {String(idx + 1).padStart(2, "0")} · {ind.name}
                  </span>
                </div>
                <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                  {ind.tagline}
                </h2>
                <dl className="mt-8 space-y-5 text-foreground/75">
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">The problem</dt>
                    <dd className="mt-1.5 leading-7">{ind.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">What we do</dt>
                    <dd className="mt-1.5 leading-7">{ind.solution}</dd>
                  </div>
                </dl>
                <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
                  {ind.proof.map((p) => (
                    <div key={p.label} className="rounded-xl border border-border bg-card p-4">
                      <div className="font-mono text-2xl text-primary-text">{p.value}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{p.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/contact" className={cn(buttonVariants(), "rounded-full px-5 font-semibold")}>
                    {ind.cta}
                  </Link>
                  <Link href="/our-work" className={cn(buttonVariants({ variant: "outline" }), "rounded-full px-5")}>
                    Read the case studies
                  </Link>
                </div>
              </div>
            </Reveal>
            <div className="grid content-start gap-4 sm:grid-cols-2">
              {ind.services.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.06}>
                  <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
                    <s.icon className="size-6 text-primary-text/70 transition-colors group-hover:text-primary-text" strokeWidth={1.7} />
                    <h3 className="mt-6 text-lg font-bold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-foreground/70">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <div className="pt-24">
        <Cta
          title="Which industry"
          accent="are you in?"
          body="Describe your operation and we'll send back a plan tailored to your industry, with no pitch deck required."
          primary="Book a consultation"
          secondary={{ label: "See the case studies", href: "/our-work" }}
        />
      </div>
    </>
  );
}
