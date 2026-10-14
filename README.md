# Ethixweb India

A full-stack redesign of [ethixweb.com](https://www.ethixweb.com) built for **Indian businesses and Indian audiences**: Indian customers' habits (mobile-first, WhatsApp, UPI, ₹), India-focused industries and copy, and a working lead-capture backend with a protected admin.

> Built for the Ethixweb Full Stack Developer Assessment (24 hours, AI tools allowed).

| | |
|---|---|
| **Live URL** | `https://ethixweb1.vercel.app/` |
| **Repository** | `https://github.com/apoorva00100/ethixweb1/edit/main/README.md` |
| **Demo admin login** | `/admin` · email `amitanoni@gmail.com` · password `123456` |

> The demo admin account is a throwaway created only for this assessment. It holds no real data.

---

## Contents

1. [What's in the box](#whats-in-the-box)
2. [Tech stack and why](#tech-stack-and-why)
3. [Design rationale: what makes it India-specific](#design-rationale-what-makes-it-india-specific)
4. [Architecture](#architecture)
5. [API reference](#api-reference)
6. [Security](#security)
7. [Getting started](#getting-started)
8. [Deployment](#deployment)
9. [Performance](#performance)
10. [How it was tested](#how-it-was-tested)
11. [Decisions and trade-offs](#decisions-and-trade-offs)
12. [Honest limitations](#honest-limitations)
13. [Project structure](#project-structure)

---

## What's in the box

**Public site**

| Route | Purpose |
|---|---|
| `/` | Hero with value proposition, signal marquee, eight core services, the 22-service catalog, process, "why India-first", featured work, FAQ, closing CTA |
| `/services` | All 22 services in six categories, audit-to-optimise process, FAQ |
| `/industries` | Three Indian industries (real estate, clinics and healthcare, D2C and retail), each with problem, approach, proof and four services |
| `/our-work` | Filterable case studies |
| `/our-work/[slug]` | Case-study detail pages (challenge, approach, results) |
| `/about` | The India story, mission and vision, process, values, comparison table |
| `/blog` | Filterable journal index |
| `/contact` | Working enquiry form that saves to the database |

**Backend**

- `POST /api/enquiries`: validated, spam-protected, rate-limited lead capture into Postgres.
- `/admin`: sign-in, a leads dashboard (stats, status filters, search, pagination), a lead detail page (status, notes, delete).

---

## Tech stack and why

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router), **TypeScript** | Pages and API routes in one repo, one deploy, strong performance defaults (`next/font`, server components). |
| Styling | **Tailwind CSS v4** + **shadcn/ui** (Base UI) | Fast to build, easy to keep one consistent design system through CSS tokens. |
| Motion | **motion** (lazy-loaded) + CSS animations | Scroll reveals and micro-interactions. The above-the-fold hero uses pure CSS so it never waits on JavaScript. |
| Database | **Supabase Postgres** (free tier) | A real relational database with nothing hardcoded. |
| ORM / migrations | **Drizzle ORM** + `drizzle-kit` + `postgres` (postgres.js) | Type-safe queries, schema in TypeScript, migrations as plain SQL files committed to the repo. |
| Validation | **Zod 4**, one schema shared by client and server | The form and the API enforce identical rules, so they can't drift. |
| Admin auth | **Supabase Auth** (`@supabase/ssr`) | Email and password, public sign-up disabled, plus an email allow-list. |
| Hosting | **Vercel** | Environment variables for secrets, zero-config Next.js. |

---

## Design rationale: what makes it India-specific

The brief says *"how you make it India-specific is up to you; that thinking is the test."* These are the decisions and the reasoning behind them.

**1. Built around how Indian customers actually buy**

- **WhatsApp-first.** The "why India-first" section, the industry pages and the case studies are framed around WhatsApp enquiries, order updates and AI receptionists on WhatsApp, because that is where Indian customers expect to talk to a business.
- **Mobile-first and fast on 4G.** Most Indian traffic is mid-range Android over 4G, so performance was treated as a design constraint: lazy-loaded animation, a CSS-only hero entrance, trimmed fonts, no heavy imagery. The site is tuned for that device, not for a developer's laptop.
- **₹, GST and UPI.** Pricing language is rupees with GST shown separately and milestone payments. The contact form's budget field is in ₹ ranges (₹50,000 to ₹5 lakh+), using lakh notation. Checkout copy mentions UPI, COD and Razorpay.

**2. Industries chosen for India, not translated from the US**

The current site targets US home services and fishing charters. The India version targets **real estate, clinics and healthcare, and D2C and retail**. Each has a problem that is specifically Indian: portal leads going cold in minutes, missed clinic calls plus Google Maps competition, and rising ad costs with UPI/COD checkout drop-off.

**3. A form built for India**

The enquiry form validates **Indian mobile numbers** (`+91`, 10 digits starting 6 to 9), accepts the formats people actually type (`98765 43210`, `+91-98765-43210`, `098765 43210`) and normalises them to `+91XXXXXXXXXX`. It also asks for **city**, because lead routing in India is local, and the admin shows times in **IST**.

**4. A look and feel that is Indian without being a costume**

- Premium dark base with the Ethixweb red as the brand colour, as the brief asks for.
- Indian references are subtle and structural (concentric-arc linework nodding at rangoli and mandala patterns, warm smoke background), not clip-art.
- An IST clock chip in the navigation, in place of the original's global timezone widget.

**5. What was improved over the current site**

| Problem on ethixweb.com | What this version does |
|---|---|
| Reviews repeated several times on the same page | No invented testimonials. The slot is left for real, unique reviews. |
| Metrics rendering as "0 days" / "0 yrs" | Every metric shows a real value. |
| "24/7, under 1h" claims contradicting a Mon–Fri 9–5 footer | No contradictory availability claims. |
| Clocks showing `--:--` until JavaScript loads | The clock reserves its width and fills in after mount, with no layout shift. |
| Dense, repetitive home page | Each section has one job. The catalog and the headline services are visually distinct. |
| Decorative images without alt text | Decorative SVGs are `aria-hidden`. Lighthouse accessibility is 100 on every page tested. |
| Case-study cards that only labelled categories | Filters actually filter. |

---

## Architecture

```
Browser ──► /contact  (EnquiryForm, client)
              │  1. Zod validation (same schema as the server)
              ▼
         POST /api/enquiries  (Route Handler)
              │  2. size cap  3. Zod  4. spam traps  5. rate limit  6. duplicate guard
              ▼
         Drizzle ──► Supabase Postgres  (table: leads, RLS on, no policies)

Browser ──► /admin/*  ──► proxy.ts (redirect if signed out)
                            │
                            ▼
                   Server Components / Server Actions
                     └─ requireAdmin()  (re-checks the session every time)
                     └─ Drizzle queries
```

Leads are read and written **only on the server** through Drizzle. The browser never talks to the database. Supabase is used for the database host and for admin Auth.

---

## API reference

### `POST /api/enquiries`

Public endpoint used by the contact form.

**Request** (`application/json`)

| Field | Rules |
|---|---|
| `name` | 2–100 chars |
| `email` | valid email, lower-cased, ≤ 254 chars |
| `phone` | Indian mobile; normalised to `+91XXXXXXXXXX` |
| `company` | optional, ≤ 100 chars |
| `city` | 2–80 chars |
| `service` | one of the listed services, or `Not sure yet` |
| `budget` | one of the listed ₹ ranges |
| `message` | 10–2000 chars |
| `website` | honeypot, must be left empty by humans |
| `startedAt` | epoch ms when the form loaded (time trap) |

**Responses**

| Status | Meaning |
|---|---|
| `201 {"ok":true}` | Saved. **Also returned for spam, deliberately** (see [Security](#security)). |
| `400 invalid_json` | Body isn't valid JSON. |
| `413 payload_too_large` | Body over 10 KB. |
| `422 validation_failed` | Field-level errors in `error.fields`. |
| `429 rate_limited` | Too many enquiries from one network. Includes `Retry-After`. |
| `500 server_error` | Generic message. Details are logged server-side only. |

All errors share one shape:

```json
{ "error": { "code": "validation_failed", "message": "Please fix the highlighted fields.",
             "fields": { "phone": ["Enter a valid 10-digit Indian mobile number"] } } }
```

### Admin

The admin uses Server Components and Server Actions rather than public JSON endpoints. Every page and every action calls `requireAdmin()` first.

---

## Security

**Secrets.** Every secret lives in environment variables. `.env*` is gitignored, and only `.env.example` (names, no values) is committed.

**Spam protection on the enquiry form (layered):**

1. **Honeypot field.** Hidden from people and assistive tech, and bots tend to fill every field.
2. **Minimum fill time.** Submissions under 3 seconds, or older than 24 hours, are dropped.
3. **Rate limit.** 3 enquiries per 10 minutes per hashed IP, counted in Postgres itself, so no extra service is needed.
4. **Duplicate guard.** Same email and message within 24 hours is treated as already received.
5. **Size cap and strict validation** on every request.

Traps 1 and 2 return the same `201` a real user gets, so bots learn nothing about why they were dropped. During testing a filled honeypot used to return a validation error that named the trap field. That leak was found and fixed.

**Data protection.**

- IPs are never stored. Only a **salted SHA-256 hash** is kept, for rate limiting.
- The `leads` table has **Row Level Security enabled with no policies**. Verified against the live project: the public anon key reads an empty list and its inserts are rejected with a row-level-security violation.

**Admin access, in layers:**

1. Public sign-up is **disabled** in Supabase.
2. Only emails in `ADMIN_EMAILS` are allowed in, even if someone obtained a Supabase account.
3. `proxy.ts` redirects signed-out visitors away from `/admin`.
4. Every admin page and Server Action re-verifies the session with `requireAdmin()`. The proxy is a convenience, not a security boundary: layouts don't re-run on client navigation and Server Actions are public POST endpoints.
5. Login failures use one generic message and never reveal which emails exist.
6. Admin pages are `noindex`.

---

## Getting started

### Prerequisites

- Node.js 22+
- A free [Supabase](https://supabase.com) project

### 1. Install

```bash
npm install
```

### 2. Environment variables

```bash
cp .env.example .env.local
```

| Variable | Where to get it |
|---|---|
| `DATABASE_URL` | Supabase → Project Settings → Database → Connection string → **Transaction pooler** (port 6543). Used by the app. |
| `DIRECT_URL` | Same page → **Session pooler** (port 5432). Used for migrations. Optional; falls back to `DATABASE_URL`. |
| `NEXT_PUBLIC_SUPABASE_URL` | Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Project Settings → API |
| `ADMIN_EMAILS` | Comma-separated emails allowed into `/admin` |
| `IP_HASH_SALT` | Any long random string: `openssl rand -hex 32` |

> **Passwords with special characters** (`@`, `#`, `/`, `:`, `?`) must be percent-encoded inside the connection URLs, for example `@` → `%40`. Don't include the `[ ]` brackets that Supabase's template shows around the password.

### 3. Create the database

```bash
npm run db:migrate
```

This applies the committed migration in `drizzle/` (the `leads` table, indexes, status enum, and Row Level Security).

### 4. Create the admin user

In Supabase: **Authentication → Users → Add user**, using an email that is in `ADMIN_EMAILS`. Then turn off **Authentication → Sign In / Providers → Allow new users to sign up**.

### 5. Run

```bash
npm run dev      # http://localhost:3000
```

### Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` | ESLint |
| `npm run db:generate` | Generate a new migration after editing `src/db/schema.ts` |
| `npm run db:migrate` | Apply pending migrations |
| `npm run db:studio` | Browse the database with Drizzle Studio |

---

## Deployment

Deployed on **Vercel**.

1. Import the GitHub repository into Vercel.
2. Add all six environment variables above (Production, and Preview if you use previews).
3. Use the **transaction pooler** URL for `DATABASE_URL`, since serverless functions open many short-lived connections.
4. Run `npm run db:migrate` once from your machine against the same database.
5. Deploy.

---

## Performance

PageSpeed targets **90+ on mobile and desktop**. These are Lighthouse results from a **local production build** (`next build && next start`) on the red theme, run on 14 Oct 2026 with Lighthouse's default simulated throttling (mobile: Moto G Power on slow 4G):

| Page | Device | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| `/` | Mobile | **92** | 100 | 100 | 100 | 3.2 s | 0 | 40 ms |
| `/services` | Mobile | **92** | 100 | 100 | 100 | 3.3 s | 0 | 20 ms |
| `/contact` | Mobile | **89** | 100 | 100 | 100 | 3.7 s | 0 | 40 ms |
| `/` | Desktop | **89** | 100 | 100 | 100 | 3.7 s | 0 | 40 ms |
| `/about` | Desktop | **90** | 100 | 100 | 100 | 3.6 s | 0 | 50 ms |

Read these honestly:

- **Three of five runs passed and two landed at 89, just under the target:** `/contact` on mobile and `/` on desktop.
- **The numbers are noisy.** The machine was also running a dev server, a bundler and other processes, and scores moved by several points between identical runs. Earlier runs of the home page measured mobile 90 to 92 and desktop 100. A re-run on the deployed Vercel URL is the number that counts.
- **Accessibility, best practices and SEO are 100**, and layout shift is 0 on every page.

Work done specifically for speed: a CSS-only hero entrance (a JavaScript fade-in had left the hero text invisible until hydration and delayed LCP), only the italic serif font loaded, the mono font deferred off the critical path, `LazyMotion` instead of the full animation library, a plain scroll listener for the progress bar, and a GPU-only (`transform`) animated background.

Known remaining costs: render-blocking CSS (about 65 KB) and roughly 60 to 90 KB of unused JavaScript flagged by Lighthouse.

> PageSpeed Insights screenshots (mobile and desktop) for the deployed URL: `<add after deploy>`

---

## How it was tested

**API, against a running server:**

| Case | Result |
|---|---|
| Invalid JSON | 400 |
| Missing or invalid fields, unknown service | 422 with per-field messages |
| Oversized body | 413 |
| Valid request with no database configured | clean 500, no details leaked |
| Honeypot filled / submitted instantly / no timer | silent 201, nothing stored |
| Valid enquiry | 201, row stored |
| Exact duplicate | 201, **not stored** |
| 4th enquiry from one IP in 10 minutes | 429 with `Retry-After` |
| Same burst from a different IP | accepted |

**Database and security, against the live Supabase project:** the table, columns, indexes and RLS flag exist; policies on `leads` = 0; phone stored as `+919876543210`; email lower-cased; IP stored as a 64-character hash; public anon-key read returns `[]`; public anon-key insert is rejected.

**Admin:** signed-out visits to `/admin` and `/admin/leads/...` redirect to login; wrong password is rejected; public sign-up is confirmed disabled; signing in works and the lead list renders real submitted data. **Not yet confirmed end to end:** opening a lead's detail page (status, notes, delete). It was being debugged when this was written (see limitations).

**Static checks:** `tsc --noEmit`, ESLint and `next build` all pass. There is no automated test suite (see limitations).

---

## Decisions and trade-offs

- **Drizzle over the Supabase data client.** Data access goes straight to Postgres through Drizzle for type safety and committed migrations. Supabase is used for hosting and Auth only. Because Drizzle connects with a privileged role, Row Level Security can't protect the app's own queries, so RLS is kept on purely to lock the public anon API out of the table.
- **Rate limiting in Postgres, not Redis.** One fewer service and account to depend on. The trade-off is one extra query per submission, which is negligible at this scale.
- **No CAPTCHA.** Honeypot, time trap, rate limit and duplicate guard stop casual and scripted spam without adding friction for real users. A determined attacker could forge the time trap, which is why Cloudflare Turnstile is the obvious next layer if abuse appears.
- **Plain `<a>` links inside `/admin`.** The project has Cache Components enabled, which is strict about client-side navigation into per-request pages. The admin gains nothing from prefetching, so a full page load is used instead.
- **Dark-only theme.** The brief asks for a premium red-and-dark look. A light theme would double the design surface for no stated benefit.
- **Red `#c0272d` for fills, a lighter red for text.** The brand red is only 3.3:1 against the dark background, which fails accessibility for small text. A lighter red (`#e0555a`, 5.2:1) carries all text. The brand red is used for buttons, borders and glows.

---

## Honest limitations

These are deliberate gaps, listed so nothing is a surprise:

- **Content is placeholder.** The case studies, client names, metrics, industry proof figures, blog essay topics and stats are **fictional samples**, clearly marked in the code. They must be replaced with real material before launch.
- **No testimonials.** Inventing client quotes would be dishonest, so none are shown.
- **Blog has no articles.** `/blog` is an index of planned essays marked "In the works", mirroring the original.
- **Logo is a text placeholder.** The official Ethixweb logo asset wasn't available.
- **No email notification** when a lead arrives, and **no CSV export** (both cut for scope).
- **No automated test suite.** Behaviour was verified manually and with scripted API calls, not with committed tests.
- **No light theme or theme toggle**, and no global-timezone dropdown.
- **Rate limiting trusts `x-forwarded-for`.** That is correct behind Vercel's proxy; on a bare server it could be spoofed.
- **Performance scores are borderline** and need re-measuring on the deployed URL (see above).
- **The lead detail page is unconfirmed.** Clicking a lead in the dashboard failed to open it in development. Admin links were switched to full page loads as a fix, but this hasn't yet been confirmed working. Verify it before submitting.

---

## Project structure

```
drizzle/                    SQL migrations (committed)
src/
├─ app/
│  ├─ (site)/               Public pages and the marketing layout (nav, footer, background)
│  │  ├─ page.tsx           Home
│  │  ├─ about/ blog/ contact/ industries/ services/
│  │  └─ our-work/[slug]/   Case-study pages
│  ├─ admin/
│  │  ├─ login/             Sign-in page and server actions
│  │  └─ (app)/             Guarded dashboard, lead page, actions
│  ├─ api/enquiries/        POST route handler
│  └─ globals.css           Design tokens (red theme) and animations
├─ components/
│  ├─ site/                 Hero, board illustration, nav, sections, forms
│  └─ ui/                   shadcn/ui primitives
├─ db/                      Drizzle schema and client
├─ lib/
│  ├─ validation.ts         Shared Zod schema
│  ├─ lead-options.ts       Services, budgets, statuses (single source of truth)
│  ├─ leads-queries.ts      Dashboard queries
│  ├─ admin.ts              requireAdmin()
│  ├─ api.ts                Uniform API error shape
│  ├─ services.ts projects.ts posts.ts   Site content data
│  └─ supabase/             Auth client
└─ proxy.ts                 /admin redirect and session refresh
```

---

## AI usage

AI tools were used throughout (planning, scaffolding, copy, debugging). Every design and code choice above is explained with its reasoning so it can be defended in the interview, and behaviours were verified by running the code rather than assumed.
