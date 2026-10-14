import { Smartphone, IndianRupee, MessageCircle, MapPin } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const points = [
  { icon: Smartphone, title: "Mobile-first, always", text: "Most Indian traffic is on mid-range Android over 4G. We build and test for exactly that." },
  { icon: MessageCircle, title: "WhatsApp-native", text: "One-tap WhatsApp enquiries and automated follow-ups, where your customers already are." },
  { icon: IndianRupee, title: "Priced in ₹, GST-ready", text: "Transparent rupee pricing, GST invoices and UPI-friendly checkout flows." },
  { icon: MapPin, title: "Local-search ready", text: "Google Business, city pages and local SEO tuned for Indian search behaviour." },
];

export function India() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-28">
      <SectionHeading eyebrow="Why India-first" title="Not a template with a" accent="₹ sign." body="Global playbooks miss how India buys. We start from the Indian customer and work backwards." />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <div className="h-full rounded-2xl border border-border bg-card p-6">
              <p.icon className="size-6 text-primary-text" />
              <h3 className="mt-5 font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
