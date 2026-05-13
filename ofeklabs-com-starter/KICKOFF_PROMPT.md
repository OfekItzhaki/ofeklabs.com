# Kickoff Prompt for New Kiro Session

Copy everything below the line into your new Kiro session:

---

## Project Context

I'm building the official landing page for **OfekLabs** (ofeklabs.com) — a software company that builds productivity and automation tools. This is the professional, company-facing site (not the experimental lab at ofeklabs.dev).

**Live product:** Shifter (shifter.ofeklabs.com) — a keyboard-driven productivity tool.

I have a starter kit in this repo with proven patterns from my previous project. Check:
- `docs/OFEKLABS_COM_PLAN.md` — Full project plan
- `docs/HORIZON_STANDARD.md` — Architecture standard (copy to root as ARCHITECTURE.md)
- `src/` — Reference implementations for Sanity integration, URL management, schemas

## Tech Stack

- Next.js 16 (App Router, Server Components by default)
- TypeScript (strict, no `any`)
- Tailwind CSS v4
- Sanity CMS (all content managed there, zero hardcoded content)
- Vercel deployment
- Vitest + fast-check for testing
- Framer Motion (subtle animations only)

## Design Direction

**Tone:** Professional SaaS company. Think Linear, Vercel, Raycast — clean, confident, minimal.

**Theme:** Dark with refined accents. NOT neon/hacker/sci-fi. Think:
- Background: Near-black (#09090B)
- Text: Clean white/gray hierarchy
- Accent: One subtle brand color (blue or teal)
- Cards: Subtle glass/border effects, not heavy gradients

**Typography:** Inter or Geist. Clean, modern, readable.

**Animations:** Subtle fade-in on scroll. No particles, no 3D, no cursor effects.

## Site Sections (in order)

1. **Nav** — Sticky, minimal. Logo + Products / About / Contact + CTA button
2. **Hero** — Bold headline, one-line subtext, CTA button. Maybe a subtle product screenshot or abstract visual.
3. **Products** — Grid cards. Each product: name, one-liner, status badge, link. Data from Sanity.
4. **Flagship Highlight** — Dedicated section for Shifter with screenshot, 3-4 features, "Try it" CTA.
5. **About** — 2-3 sentences about the company. Brief, confident. No fluff.
6. **Contact** — Simple form or just email + socials.
7. **Footer** — Logo, nav links, socials, legal links, copyright.

## Key Principles

- **No hardcoded content** — Everything from Sanity CMS
- **Dynamic rendering** — `export const dynamic = 'force-dynamic'` on the main page
- **Server Components** — Only `"use client"` when interactivity is needed
- **Centralized URLs** — All links through the URL module
- **Mobile-first** — Design for mobile, enhance for desktop
- **95+ Lighthouse** — Fast, accessible, SEO-optimized
- **Conventional commits** — `type(scope): description`
- **Follow the Horizon Standard** — See ARCHITECTURE.md

## Implementation Approach

Start with Phase 1 (Foundation):
1. Set up the project structure using the starter kit files
2. Configure Sanity with the provided schemas
3. Build the layout (Nav + Footer)
4. Wire up dynamic data fetching from Sanity
5. Then build sections one by one

Don't over-engineer. Keep it simple, clean, and professional. Let the content and products speak for themselves.
