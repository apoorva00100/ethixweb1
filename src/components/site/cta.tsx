import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Cta({
  title = "Ready to build something",
  accent = "worth sharing?",
  body = "Tell us about your business. We reply within one working day.",
  primary = "Start a project",
  secondary,
}: {
  title?: string;
  accent?: string;
  body?: string;
  primary?: string;
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-28">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center">
          <div aria-hidden className="bg-mandala absolute inset-0 -z-10" />
          <div aria-hidden className="absolute left-1/2 top-0 -z-10 h-48 w-[520px] -translate-x-1/2 rounded-full bg-primary/20 blur-[90px]" />
          <h2 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
            {title}{" "}
            <span className="font-serif font-normal italic text-primary-text">{accent}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            {body}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-6")}>
              {primary} <ArrowRight />
            </Link>
            {secondary && (
              <Link href={secondary.href} className={cn(buttonVariants({ size: "lg", variant: "outline" }), "rounded-full px-6")}>
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
