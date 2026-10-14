import {
  Bot, BrainCircuit, Earth, CodeXml, Cable, Search, LifeBuoy, Workflow,
  type LucideIcon,
} from "lucide-react";

export const signals = [
  "AI agents", "CRM", "Websites", "SEO", "Ads", "Analytics", "Automations", "Support",
];

export const headlineServices: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Bot, title: "AI Receptionists", text: "Voice and chat agents that answer, qualify, route, and book leads while your team stays focused." },
  { icon: BrainCircuit, title: "AI Automation", text: "Workflow automation, internal copilots, data syncs, and operational systems built for real teams." },
  { icon: Earth, title: "Websites", text: "Fast, premium websites with sharp positioning, conversion paths, analytics, and SEO foundations." },
  { icon: CodeXml, title: "Web Applications", text: "Custom portals, dashboards, booking flows, and software tools engineered for daily operations." },
  { icon: Cable, title: "CRM Integrations", text: "HubSpot, GoHighLevel, Zapier, forms, calls, calendars, and pipelines connected into one system." },
  { icon: Search, title: "SEO", text: "Technical SEO, local SEO, content systems, and measurement that compound into durable demand." },
  { icon: LifeBuoy, title: "Maintenance & Support", text: "Fast fixes, uptime care, site updates, reporting, and a responsive team when something needs attention." },
  { icon: Workflow, title: "Digital Operations", text: "A senior tech team for your digital stack, from strategy through launch, support, and optimization." },
];

export type Service = { name: string; text: string };

// 22 services in six categories (counts and names mirror the current Ethixweb catalog).
export const fullCatalog: { category: string; blurb: string; cta: string; items: Service[] }[] = [
  {
    category: "Website",
    blurb: "Sites that load fast on any phone and are built around how your business sells.",
    cta: "Learn more",
    items: [
      { name: "Website Redesign", text: "A modern, mobile-first site rebuilt around how your business actually wins customers." },
      { name: "Headless Architecture", text: "A faster, more flexible foundation that keeps up as you grow." },
      { name: "Landing Pages", text: "Purpose-built pages that turn campaign traffic into enquiries." },
      { name: "Maintenance & Security", text: "Updates, monitoring and patching after launch, so nothing quietly breaks." },
    ],
  },
  {
    category: "AI",
    blurb: "Assistants that answer instantly, in your brand voice, at any hour.",
    cta: "Learn more",
    items: [
      { name: "Knowledge Chatbot", text: "Fast, accurate answers from a fixed script or your FAQ library." },
      { name: "LLM Chatbot", text: "Reasons over your knowledge base and replies in your brand voice." },
      { name: "AI Receptionist / CSR", text: "Handles calls, WhatsApp and web enquiries around the clock." },
      { name: "Human Handoff", text: "A real person steps in the moment a conversation needs one." },
    ],
  },
  {
    category: "Growth",
    blurb: "Demand generation tuned for how Indian customers search, scroll and buy.",
    cta: "Learn more",
    items: [
      { name: "SEO", text: "Technical fixes, content and long-term authority, including local search." },
      { name: "Google Ads + LSA", text: "Campaigns built, tracked and optimised every week." },
      { name: "Meta Ads", text: "Facebook and Instagram ads, targeted and retargeted." },
      { name: "Social + Reels", text: "Strategy, content calendar and creative production." },
      { name: "Email Marketing", text: "Campaigns, automation and segmentation that keep customers coming back." },
      { name: "CRM Integration", text: "Leads flow straight into the system your team already uses." },
    ],
  },
  {
    category: "Data",
    blurb: "One honest view of what's working, in numbers you can act on.",
    cta: "Get in touch",
    items: [
      { name: "Dashboard", text: "Every channel's performance in one live view." },
      { name: "Analytics", text: "Website, ad and lead tracking, fully connected." },
      { name: "Monthly Reporting", text: "What happened, why, and what to do next." },
    ],
  },
  {
    category: "Accessibility",
    blurb: "Sites everyone can use, which also tends to mean better conversion.",
    cta: "Get in touch",
    items: [
      { name: "Accessibility Improvements", text: "Better contrast, navigation and structure across your site." },
      { name: "Accessibility Testing", text: "Reviewed against recognised accessibility standards." },
    ],
  },
  {
    category: "Support",
    blurb: "A real team on hand when something breaks or needs updating.",
    cta: "Get in touch",
    items: [
      { name: "Technical Support", text: "A real team available when something breaks." },
      { name: "AI + Content Updates", text: "Your chatbot's knowledge kept current, every month." },
      { name: "API Maintenance", text: "Integrations monitored and kept in sync." },
    ],
  },
];

export const catalog: { category: string; items: string[] }[] = fullCatalog.map((c) => ({
  category: c.category,
  items: c.items.map((i) => i.name),
}));
