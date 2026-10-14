// Planned essays. None are published yet, so the index shows them as "in the works".
export type Post = { title: string; category: string; minutes: number; summary: string };

export const posts: Post[] = [
  { title: "Why your landing page isn't converting on mobile", category: "Growth", minutes: 6, summary: "The seven hero-section elements that matter on a phone, and the friction we remove first in every rebuild." },
  { title: "Building a WhatsApp AI agent in 14 days", category: "AI", minutes: 8, summary: "A candid account of taking a support agent from brief to production for a client, and what we'd do differently." },
  { title: "Your ad budget isn't the problem. Your follow-up is.", category: "Growth", minutes: 6, summary: "Five leaks in a typical lead funnel, and what each one quietly costs you every month." },
  { title: "Google Maps is your real homepage", category: "Local SEO", minutes: 6, summary: "Why the top three local results win the calls, and a weekly routine to earn your place there." },
  { title: "Brand systems that survive a pivot", category: "Design", minutes: 5, summary: "How to design an identity that still works after the product, the pricing and the audience change." },
  { title: "An AI receptionist picked up while you were with a patient", category: "AI", minutes: 5, summary: "How 24/7 missed-call capture works for a small clinic, and what it does and doesn't replace." },
  { title: "SEO in the age of AI Overviews", category: "SEO", minutes: 7, summary: "What AI-written search answers mean for organic growth, and how Indian businesses stay the answer." },
  { title: "Core Web Vitals on a 4G Android phone", category: "Engineering", minutes: 7, summary: "Raising a real business site's performance score without replatforming, tested on the phones your customers use." },
  { title: "Trust signals that make a big purchase feel safe", category: "Design", minutes: 5, summary: "Reviews, certifications and photos: which to show, and in what order, when the decision is large." },
  { title: "Review collection without begging", category: "Local SEO", minutes: 4, summary: "Simple automations that turn happy customers into public reviews, on WhatsApp and by SMS." },
  { title: "Next.js, WordPress or headless: an honest decision tree", category: "Engineering", minutes: 9, summary: "How we choose a stack for each client, and the criteria that decide it." },
  { title: "Fixing checkout drop-off for UPI and COD buyers", category: "Growth", minutes: 5, summary: "Where Indian shoppers abandon checkout and the small changes that bring them back." },
];

export const postCategories = ["All", "Growth", "AI", "Design", "SEO", "Local SEO", "Engineering"];
export const postTicker = ["Growth", "AI", "Design", "SEO", "Local SEO", "Engineering", "Case studies", "Field notes"];
