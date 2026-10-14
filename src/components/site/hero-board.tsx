import { IndianRupee, Layers, Palette, PhoneCall, TrendingUp, type LucideIcon } from "lucide-react";

// Procedurally generated isometric "operations board". Pure SVG + CSS, no JS.
const N = 15;
const C = (N - 1) / 2;
const HW = 26;
const HH = 13;
const U = 10; // height of one block level, px
const Y0 = 70; // vertical offset of the board centre inside the viewBox
const S = 0.8; // tile size (<1 leaves gaps between tiles)

const sx = (i: number, j: number) => (i - j) * HW;
const sy = (i: number, j: number, z = 0) => (i + j) * HH - z + Y0;
const P = (i: number, j: number, z = 0) => `${sx(i - C, j - C).toFixed(1)},${sy(i - C, j - C, z).toFixed(1)}`;

// Deterministic pseudo-random so server and client markup match.
const rnd = (a: number, b: number) => {
  const v = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return v - Math.floor(v);
};

type Tone = { top: string; left: string; right: string };
const DARK: Tone = { top: "#1b1a18", left: "#0e0d0c", right: "#141311" };
const RED: Tone[] = [
  { top: "hsl(358 72% 56%)", left: "hsl(356 64% 32%)", right: "hsl(355 60% 23%)" },
  { top: "hsl(358 66% 46%)", left: "hsl(356 60% 28%)", right: "hsl(355 56% 20%)" },
  { top: "hsl(357 58% 36%)", left: "hsl(355 54% 23%)", right: "hsl(354 50% 17%)" },
  { top: "hsl(356 46% 26%)", left: "hsl(354 44% 17%)", right: "hsl(353 42% 13%)" },
];

function Block({ i, j, z0 = 0, h, tone, stroke = "rgba(255,255,255,0.07)" }: { i: number; j: number; z0?: number; h: number; tone: Tone; stroke?: string }) {
  const a = S / 2;
  const z1 = z0 + h;
  const T = P(i - a, j - a, z1), R = P(i + a, j - a, z1), B = P(i + a, j + a, z1), L = P(i - a, j + a, z1);
  const Lb = P(i - a, j + a, z0), Bb = P(i + a, j + a, z0), Rb = P(i + a, j - a, z0);
  return (
    <g strokeLinejoin="round" stroke={stroke} strokeWidth={0.5}>
      <polygon points={`${L} ${B} ${Bb} ${Lb}`} fill={tone.left} />
      <polygon points={`${B} ${R} ${Rb} ${Bb}`} fill={tone.right} />
      <polygon points={`${T} ${R} ${B} ${L}`} fill={tone.top} />
    </g>
  );
}

const cells = Array.from({ length: N * N }, (_, k) => [Math.floor(k / N), k % N] as const).sort(
  (a, b) => a[0] + a[1] - (b[0] + b[1]),
);

function Board() {
  const edge = "rgba(255,255,255,0.05)";
  const corners = [P(-0.5, -0.5), P(N - 0.5, -0.5), P(N - 0.5, N - 0.5), P(-0.5, N - 0.5)];
  const under = [P(-0.5, N - 0.5, -9), P(N - 0.5, N - 0.5, -9), P(N - 0.5, -0.5, -9)];
  return (
    <>
      {/* slab */}
      <polygon points={`${corners[3]} ${corners[2]} ${under[1]} ${under[0]}`} fill="#0a0a09" stroke={edge} strokeWidth={0.5} />
      <polygon points={`${corners[2]} ${corners[1]} ${under[2]} ${under[1]}`} fill="#0e0d0c" stroke={edge} strokeWidth={0.5} />
      <polygon points={corners.join(" ")} fill="#121110" stroke={edge} strokeWidth={0.5} />
      {cells.map(([i, j]) => {
        const d = Math.max(Math.abs(i - C), Math.abs(j - C));
        if (d <= 3) return null; // centrepiece drawn separately
        const r = rnd(i, j);
        if (r < 0.62) return null;
        return <Block key={`${i}-${j}`} i={i} j={j} h={(r > 0.9 ? 3 : r > 0.8 ? 2 : 1) * 5} tone={DARK} />;
      })}
      {/* stepped centrepiece */}
      {[3, 2, 1, 0].map((d) =>
        cells
          .filter(([i, j]) => Math.max(Math.abs(i - C), Math.abs(j - C)) === d)
          .map(([i, j]) => (
            <Block key={`c${i}-${j}`} i={i} j={j} h={(4 - d) * U * 0.9 + 4} tone={RED[d]} stroke="rgba(255,150,155,0.2)" />
          )),
      )}
    </>
  );
}

// Pills are positioned in % of the board box; arms are drawn in the SVG's own coordinates,
// so both are derived from the same percentages and stay aligned at any width.
const vx = (pct: number) => -480 + pct * 9.6;
const vy = (pct: number) => -260 + pct * 5.6;
const HUB = [0, sy(0, 0, 4 * U * 0.9 + 6)] as const;

const points: { icon: LucideIcon; label: string; left: number; top: number; side: "l" | "r" | "b" }[] = [
  { icon: PhoneCall, label: "More booked jobs", left: 0, top: 2, side: "l" },
  { icon: TrendingUp, label: "More conversions", left: 66, top: 2, side: "r" },
  { icon: Layers, label: "UI/UX Systems", left: 0, top: 58, side: "l" },
  { icon: IndianRupee, label: "Revenue tracked", left: 66, top: 58, side: "r" },
  { icon: Palette, label: "Design that converts", left: 33, top: 90, side: "b" },
];
const PILL_W = 34; // % of board width
const PILL_H = 10; // % of board height

function anchor(p: (typeof points)[number]) {
  const y = p.top + PILL_H / 2;
  if (p.side === "l") return [vx(p.left + PILL_W), vy(y)] as const;
  if (p.side === "r") return [vx(p.left), vy(y)] as const;
  return [vx(p.left + PILL_W / 2), vy(p.top)] as const;
}

function arm([ax, ay]: readonly [number, number]) {
  const [hx, hy] = HUB;
  const cx = ax + (hx - ax) * 0.55;
  const cy = ay;
  return `M${ax.toFixed(1)},${ay.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${hx},${hy.toFixed(1)}`;
}

function Pill({ icon: Icon, label, className, style }: { icon: LucideIcon; label: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div style={style} className={`flex items-center gap-[0.7em] rounded-full border border-border bg-card/90 px-[1.1em] shadow-xl shadow-black/40 backdrop-blur [font-size:clamp(11px,2.5cqw,15px)] ${className ?? ""}`}>
      <Icon className="size-[1.2em] shrink-0 text-primary-text" />
      <span className="truncate font-medium">{label}</span>
    </div>
  );
}

export function HeroBoard() {
  return (
    <div className="relative mx-auto w-full max-w-[1100px]">
      <div className="relative [container-type:inline-size]">
        <div aria-hidden className="absolute left-1/2 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/20 blur-[100px]" />
        <svg viewBox="-480 -260 960 560" className="relative w-full" aria-hidden preserveAspectRatio="xMidYMid meet">
          <Board />
          {/* arms from the centrepiece to each point */}
          {points.map((p, i) => {
            const d = arm(anchor(p));
            const [ax, ay] = anchor(p);
            return (
              <g key={p.label} fill="none">
                <path d={d} stroke="hsl(358 75% 55% / 0.16)" strokeWidth={7} strokeLinecap="round" />
                <path d={d} stroke="hsl(358 80% 62% / 0.65)" strokeWidth={1.2} strokeDasharray="4 6" className="board-dash" />
                <circle cx={ax} cy={ay} r={3} fill="hsl(358 80% 66%)" />
                <circle r={3.2} fill="#fff" opacity={0}>
                  <animateMotion dur="2.8s" begin={`${i * 0.55}s`} repeatCount="indefinite" path={d} />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.8;1" dur="2.8s" begin={`${i * 0.55}s`} repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}
          {/* floating cubes */}
          <g className="animate-float-cube"><Block i={C - 4.2} j={C - 4.2} z0={80} h={14} tone={RED[0]} stroke="rgba(255,150,155,0.32)" /></g>
          <g className="animate-float-cube [animation-delay:-2s]"><Block i={C + 4.2} j={C - 4.2} z0={72} h={12} tone={RED[1]} stroke="rgba(255,150,155,0.32)" /></g>
          {/* beacon */}
          <g transform={`translate(${HUB[0]} ${HUB[1]})`}>
            <circle r={14} fill="none" stroke="hsl(358 80% 66% / 0.5)" className="beacon-ring" />
            <circle r={5} fill="#fff" />
          </g>
        </svg>
        {points.map((p) => (
          <Pill
            key={p.label}
            icon={p.icon}
            label={p.label}
            className="absolute hidden sm:flex"
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: `${PILL_W}%`, height: `${PILL_H}%` }}
          />
        ))}
      </div>
      {/* small screens: the same five points as a row under the board */}
      <div className="mt-6 flex flex-wrap justify-center gap-3 px-3 sm:hidden">
        {points.map((p) => (
          <Pill key={p.label} icon={p.icon} label={p.label} className="py-2.5 text-sm" />
        ))}
      </div>
    </div>
  );
}
