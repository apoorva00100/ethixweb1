import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Rise } from "./rise";
import { HeroBoard } from "./hero-board";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-14 sm:pt-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-24">
        <div className="relative z-10">
          <Rise>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary-text">
              <span className="size-1.5 rounded-full bg-primary shadow-[0_0_18px_#c0272de6]" />
              Premium digital operations team · India
            </span>
          </Rise>
          <Rise delay={0.08}>
            <h1 className="mt-7 text-[clamp(2.6rem,5.6vw,5.2rem)] font-extrabold leading-[0.95] tracking-tight">
              We run the <span className="tech-3d">tech.</span>
              <br />
              You run the{" "}
              <span className="accent-shimmer font-serif font-normal italic">business.</span>
            </h1>
          </Rise>
          <Rise delay={0.16}>
            <p className="mt-7 max-w-xl text-lg leading-8 text-foreground/75 sm:text-xl">
              We manage your digital operation, from AI booking agents and CRM
              integrations to websites, SEO and ads, built around how Indian
              customers discover, trust and buy.
            </p>
          </Rise>
          <Rise delay={0.24} className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact" className={cn(buttonVariants(), "group h-12 min-w-[200px] rounded-full px-7 text-base font-bold")}>
              Start a project
              <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link href="/our-work" className={cn(buttonVariants({ variant: "outline" }), "group h-12 min-w-[200px] rounded-full px-7 text-base font-bold")}>
              See our work
              <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Rise>
        </div>
        <Rise delay={0.2} className="relative z-0 lg:-mr-6">
          <HeroBoard />
        </Rise>
      </div>
    </section>
  );
}
