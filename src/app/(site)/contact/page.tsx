import type { Metadata } from "next";
import { Clock, FileText, PhoneCall } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { EnquiryForm } from "@/components/site/enquiry-form";

export const metadata: Metadata = {
  title: "Contact | Ethixweb India",
  description: "Tell us about your business. A senior member of the team replies within one working day.",
};

const next = [
  { icon: Clock, title: "We reply within one working day", text: "From a senior member of the team, not a ticket queue." },
  { icon: PhoneCall, title: "A short discovery call", text: "Twenty minutes to understand your business, customers and goals." },
  { icon: FileText, title: "A fixed-scope proposal in ₹", text: "Clear deliverables and timeline, agreed in writing before any work starts." },
];

export default function ContactPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-14 px-5 pb-24 pt-16 sm:pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <div>
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-text">Contact</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 text-[clamp(2.4rem,5.2vw,4.6rem)] font-extrabold leading-[0.98] tracking-tight">
            Let&apos;s build something{" "}
            <span className="font-serif font-normal italic text-primary-text">worth sharing.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-md text-lg leading-8 text-foreground/75">
            Tell us where the friction is and we&apos;ll explain how we&apos;d fix it, with no pitch deck required.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <ol className="mt-10 space-y-6">
            {next.map((n, i) => (
              <li key={n.title} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary-text">
                  <n.icon className="size-5" />
                </span>
                <div>
                  <p className="font-semibold">
                    <span className="mr-2 font-mono text-xs text-primary-text">{String(i + 1).padStart(2, "0")}</span>
                    {n.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{n.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
      <Reveal delay={0.12}>
        <div className="rounded-3xl border border-border bg-card/90 p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
          <EnquiryForm />
        </div>
      </Reveal>
    </section>
  );
}
