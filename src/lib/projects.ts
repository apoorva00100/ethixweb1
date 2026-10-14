// Sample case studies: fictional clients and figures, to be replaced with real work.
export type Project = {
  slug: string;
  name: string;
  industry: string;
  year: string;
  tags: string[];
  summary: string;
  stats: { value: string; label: string }[];
  challenge: string;
  approach: string[];
  results: string[];
  tone: string;
};

export const projects: Project[] = [
  {
    slug: "kaveri-homes",
    name: "Kaveri Homes",
    industry: "Real estate · Bengaluru",
    year: "2026",
    tags: ["Web Design", "Paid Media"],
    summary:
      "A project-first website and instant-response lead system that turned portal and ad enquiries into booked site visits.",
    stats: [
      { value: "3.2×", label: "more site visits booked" },
      { value: "<60s", label: "first response time" },
    ],
    challenge:
      "Leads from portals and ads were going cold. The sales team called back hours later, and the old site gave buyers no reason to visit.",
    approach: [
      "Rebuilt the site around project pages with floor plans, RERA details and walkthroughs, tuned for mobile.",
      "Added an AI receptionist on call and WhatsApp that qualifies budget and location and books the visit.",
      "Connected every source to one CRM pipeline, so each lead has an owner and a next step.",
    ],
    results: ["3.2× more site visits booked in one quarter", "First response under 60 seconds, day and night", "One view of lead source to booking"],
    tone: "from-primary/25",
  },
  {
    slug: "masala-lane",
    name: "Masala Lane",
    industry: "D2C food · Mumbai",
    year: "2026",
    tags: ["Web Design", "Paid Media", "Social"],
    summary:
      "A fast storefront with UPI and COD, WhatsApp order journeys and ROAS-tracked ads for a growing spice brand.",
    stats: [
      { value: "₹18L", label: "monthly online revenue" },
      { value: "−28%", label: "customer acquisition cost" },
    ],
    challenge:
      "Rising ad costs, abandoned carts and manual order handling were capping growth, and nobody could say which campaign actually paid back.",
    approach: [
      "Rebuilt the storefront for speed on mid-range phones, with UPI, cards and COD at checkout.",
      "Set up WhatsApp order updates and abandoned-cart recovery.",
      "Restructured Meta and Google campaigns around ROAS reporting tied to real orders.",
    ],
    results: ["₹18L monthly online revenue", "Customer acquisition cost down 28%", "Order, shipping and GST invoice flow fully automated"],
    tone: "from-teal/25",
  },
  {
    slug: "dr-iyer-dental",
    name: "Dr. Iyer Dental",
    industry: "Healthcare · Chennai",
    year: "2026",
    tags: ["Web Design", "SEO"],
    summary:
      "Online booking, an AI front desk and local search work that filled the diary and stopped missed calls.",
    stats: [
      { value: "40%", label: "fewer missed calls" },
      { value: "2×", label: "Google profile actions" },
    ],
    challenge:
      "Calls went unanswered while the dentist was with patients, bookings lived on paper, and a competitor ranked first on Google Maps.",
    approach: [
      "Launched a clean clinic site with online and WhatsApp booking and automatic reminders.",
      "Added an AI front desk to answer after-hours calls and common questions.",
      "Optimised the Google Business profile and set up steady review collection.",
    ],
    results: ["40% fewer missed calls", "Google profile actions doubled", "Fewer no-shows thanks to reminders"],
    tone: "from-primary/25",
  },
  {
    slug: "tara-boutique",
    name: "Tara Boutique",
    industry: "Fashion retail · Jaipur",
    year: "2026",
    tags: ["UX Design", "Social", "Content"],
    summary:
      "A browse-first catalogue experience and Reels-led content plan that turned Instagram followers into repeat buyers.",
    stats: [
      { value: "2.4×", label: "Instagram-to-site visits" },
      { value: "35%", label: "repeat purchase rate" },
    ],
    challenge:
      "A loyal Instagram following, but a clunky catalogue and no content rhythm meant followers rarely became customers.",
    approach: [
      "Redesigned the catalogue around fast filtering, clear sizing and one-tap WhatsApp enquiries.",
      "Built a Reels and stories calendar tied to new collections.",
      "Set up email and WhatsApp journeys for repeat purchases.",
    ],
    results: ["2.4× more visits from Instagram", "35% repeat purchase rate", "A content calendar the team can run alone"],
    tone: "from-teal/25",
  },
];

export const filters = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];
