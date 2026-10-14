import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { headlineServices } from "@/lib/services";

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <SectionHeading
        eyebrow="Robust solutions"
        title="Senior operators for the systems that grow the"
        accent="growth."
      />
      <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {headlineServices.map((s, i) => (
          <Reveal key={s.title} delay={(i % 4) * 0.05}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/40">
              <div aria-hidden className="absolute -right-16 -top-16 size-36 rounded-full bg-primary/0 blur-3xl transition-colors group-hover:bg-primary/20" />
              <s.icon className="size-7 text-primary-text/70 transition-colors group-hover:text-primary-text" strokeWidth={1.7} />
              <h3 className="mt-7 text-xl font-bold">{s.title}</h3>
              <p className="mt-3 text-sm leading-6 text-foreground/75">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
