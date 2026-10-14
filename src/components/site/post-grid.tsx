"use client";

import { useState } from "react";
import { posts, postCategories } from "@/lib/posts";
import { cn } from "@/lib/utils";

export function PostGrid() {
  const [active, setActive] = useState("All");
  const shown = posts
    .map((p, i) => ({ ...p, n: i + 1 }))
    .filter((p) => active === "All" || p.category === active);
  return (
    <>
      <div role="group" aria-label="Filter essays" className="flex flex-wrap justify-center gap-2">
        {postCategories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              active === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background/80 text-muted-foreground hover:border-primary/50 hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {shown.map((p) => (
          <article
            key={p.title}
            className={cn(
              "flex flex-col rounded-2xl border bg-card p-7",
              p.n === 1 ? "border-primary/50" : "border-border",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-primary-text">{String(p.n).padStart(2, "0")}</span>
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs",
                  p.n === 1 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
                )}
              >
                {p.n === 1 ? "Up next" : "In the works"}
              </span>
            </div>
            <div className="mt-6 flex gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-primary-text">{p.category}</span>
              <span className="py-0.5 font-mono">{p.minutes} min</span>
            </div>
            <h2 className="mt-4 text-xl font-bold leading-snug">{p.title}</h2>
            <p className="mt-3 text-sm leading-6 text-foreground/70">{p.summary}</p>
          </article>
        ))}
      </div>
    </>
  );
}
