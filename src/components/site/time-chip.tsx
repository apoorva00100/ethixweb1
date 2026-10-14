"use client";

import { useEffect, useState } from "react";

const fmt = () =>
  new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" }).format(new Date());

export function TimeChip() {
  // Empty until mounted so server and client markup match; the chip reserves its width meanwhile.
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(fmt());
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="hidden h-9 items-center gap-2 rounded-full px-2.5 text-xs text-muted-foreground md:inline-flex" aria-label="Current time in India">
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal opacity-70" />
        <span className="relative inline-flex size-1.5 rounded-full bg-teal" />
      </span>
      <span className="rounded-sm bg-primary/15 px-1 text-[9px] font-bold leading-4 text-primary-text">IN</span>
      <span className="min-w-[4.5rem] font-medium tabular-nums text-foreground/90">{time ? `${time}` : " "}</span>
    </div>
  );
}
