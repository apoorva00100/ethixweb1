// Fixed, drifting smoke layer. Pure CSS (transform/opacity only) so it stays GPU-cheap.
const grain =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const clouds = [
  { cls: "left-[-15%] top-[-10%] h-[70vh] w-[75vw] animate-cloud-a", color: "oklch(0.42 0.16 25 / 60%)" },
  { cls: "right-[-20%] top-[5%] h-[65vh] w-[70vw] animate-cloud-b", color: "oklch(0.34 0.13 22 / 55%)" },
  { cls: "left-[10%] top-[35%] h-[60vh] w-[80vw] animate-cloud-c", color: "oklch(0.38 0.14 28 / 42%)" },
  { cls: "right-[-10%] bottom-[-15%] h-[60vh] w-[70vw] animate-cloud-a", color: "oklch(0.3 0.11 20 / 48%)" },
];

export function CloudBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      {clouds.map((c, i) => (
        <div
          key={i}
          className={`absolute rounded-[50%] blur-[90px] will-change-transform ${c.cls}`}
          style={{ background: `radial-gradient(closest-side, ${c.color}, transparent)` }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/70" />
      <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay" style={{ backgroundImage: grain }} />
    </div>
  );
}
