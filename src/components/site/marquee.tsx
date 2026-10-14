import { signals } from "@/lib/services";

export function Marquee({ items = signals }: { items?: string[] }) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div aria-hidden className="overflow-hidden border-y border-border bg-surface/50 py-7">
      <div className="animate-marquee flex w-max gap-14 whitespace-nowrap pr-14">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-14 text-xl font-extrabold uppercase tracking-[0.32em] text-muted-foreground/70">
            {t}
            <span className="size-2 rounded-full bg-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}
