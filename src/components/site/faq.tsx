import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "./section-heading";

export const homeFaqs = [
  ["How long does a website take?", "Most marketing sites go live in 3–4 weeks. Custom web apps are scoped individually."],
  ["Do you price in rupees?", "Yes. Every quote is in ₹ with GST shown separately, with milestone-based payments."],
  ["Can you integrate WhatsApp and our CRM?", "Yes. We connect enquiries to WhatsApp Business and to the CRM you already use, or set one up for you."],
  ["Will the site be fast on slow networks?", "Performance is a requirement, not a nice-to-have. We target 90+ on PageSpeed Insights for mobile and desktop."],
  ["Who owns the code and content?", "You do. Everything is handed over in your own repository and accounts."],
];

export function Faq({
  items = homeFaqs,
  eyebrow = "FAQ",
  title = "Questions,",
  accent = "answered.",
}: {
  items?: string[][];
  eyebrow?: string;
  title?: string;
  accent?: string;
}) {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-28">
      <SectionHeading eyebrow={eyebrow} title={title} accent={accent} />
      <Accordion className="mt-12">
        {items.map(([q, a], i) => (
          <AccordionItem key={q} value={`q${i}`}>
            <AccordionTrigger className="text-left text-base">
              <span className="mr-4 font-mono text-xs text-primary-text">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1">{q}</span>
            </AccordionTrigger>
            <AccordionContent className="pl-10 text-muted-foreground">{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
