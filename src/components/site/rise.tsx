import type { ReactNode } from "react";

// Above-the-fold entrance using CSS only, so the text paints without waiting for JS hydration
// (a JS-driven fade-in kept the hero paragraph invisible and delayed LCP on mobile).
export function Rise({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`animate-rise ${className ?? ""}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
