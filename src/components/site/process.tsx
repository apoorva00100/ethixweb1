import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const steps = [
  { n: "01", title: "Discover", text: "We learn your customers, your city and your numbers before we design anything.", tag: "Week 1" },
  { n: "02", title: "Design & build", text: "A premium, mobile-first build with real content, shared with you weekly.", tag: "Weeks 2–4" },
  { n: "03", title: "Launch & grow", text: "We go live, measure what matters and keep improving every month.", tag: "Ongoing" },
];

export function Process() {
  return (
    <section id="process" className="border-y border-border bg-surface/30 py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="How we work" title="A simple process, a" accent="serious result." />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl text-primary-text">{s.n}</span>
                  <span className="rounded-full bg-teal/15 px-2.5 py-0.5 text-xs text-teal">{s.tag}</span>
                </div>
                <h3 className="mt-8 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
