"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { TimeChip } from "./time-chip";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/industries", label: "Industries" },
  { href: "/services", label: "Services" },
  { href: "/our-work", label: "Our Work" },
  { href: "/blog", label: "Blog" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div className="mx-auto max-w-7xl rounded-2xl border border-border/70 bg-background/60 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4 px-5 py-2.5 lg:px-6">
          <Logo />
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="flex h-9 items-center rounded-lg px-3.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <TimeChip />
            <Link href="/contact" className={cn(buttonVariants(), "group h-9 rounded-full px-4.5 font-semibold")}>
              Start a project
              <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <button
            className="inline-flex size-11 items-center justify-center rounded-lg text-muted-foreground hover:bg-foreground/5 hover:text-foreground lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-nav-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {open && (
          <nav id="mobile-nav-menu" className="flex flex-col gap-1 border-t border-border px-5 py-4 lg:hidden" aria-label="Mobile">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-foreground/80 hover:bg-foreground/5">
                {l.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className={cn(buttonVariants(), "mt-2 h-11 rounded-full font-semibold")}>
              Start a project
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
