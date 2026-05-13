# OfekLabs.com — Professional Landing Page Plan

## Context

You're building a new landing page for `ofeklabs.com` — the professional brand site for OfekLabs.
- `ofeklabs.dev` stays as the experimental/lab playground
- `ofeklabs.com` is the company-facing site where real products live (e.g., `shifter.ofeklabs.com`)
- This is a fresh project in a new git repo

---

## Brand Strategy

| Domain | Purpose | Tone |
|--------|---------|------|
| ofeklabs.dev | Lab experiments, side projects | Hacker, experimental, playful |
| ofeklabs.com | Professional brand, real products | Clean, trustworthy, product-focused |

---

## Tech Stack (Proven from ofeklabs.dev)

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **CMS**: Sanity Studio (for all dynamic content)
- **Language**: TypeScript
- **Deployment**: Vercel
- **Architecture**: Horizon Standard principles (no hardcoded content, centralized URLs, dynamic rendering)

---

## Site Structure & Sections

### 1. Navigation (sticky)
- Logo (OfekLabs)
- Links: Products, About, Contact
- CTA button: "Get Started" or "Explore Products"
- Clean, minimal — no hamburger on desktop

### 2. Hero Section
- **Headline**: Clear value proposition (what OfekLabs builds and why it matters)
- **Subheadline**: One sentence expanding on the headline
- **CTA**: Primary button leading to products or contact
- **Visual**: Abstract/minimal illustration or product screenshot — NOT a terminal or particles
- **Tone**: Professional, confident, concise

Example direction:
```
"Software that works as hard as you do."
"We build tools for productivity, automation, and workflow management."
[Explore Products]
```

### 3. Products Section
- Grid of product cards (start with Shifter)
- Each card: Name, one-line description, status badge, "Learn More" link
- Links to subdomain (e.g., shifter.ofeklabs.com)
- Designed to scale — easy to add more products later
- All product data from Sanity CMS

### 4. Product Feature Highlight (optional, for flagship)
- Dedicated section for Shifter (or whichever product is the flagship)
- Screenshot/mockup of the product
- 3-4 key features with icons
- "Try it now" CTA
- This section can be toggled on/off from Sanity

### 5. About / Company Section
- Brief company story (2-3 sentences max)
- What makes OfekLabs different (focus on quality, reliability, developer-first)
- Optional: Key metrics if you have them (users, uptime, etc.)
- Keep it short — let the products speak

### 6. Social Proof (when available)
- Testimonials from users
- Logos of technologies used
- GitHub stars or download counts
- Can be hidden initially and enabled from Sanity when you have data

### 7. Contact / CTA Section
- Simple contact form (name, email, message)
- Or just email + social links
- Clear CTA: "Have a project in mind?" or "Get in touch"

### 8. Footer
- Logo
- Navigation links
- Social links (GitHub, LinkedIn)
- Legal links (Privacy, Terms) — even placeholder ones add credibility
- Copyright

---

## Design Principles

1. **Clean over clever** — No particles, terminals, or sci-fi effects. White space is your friend.
2. **Content-first** — Every section should communicate value, not just look cool.
3. **Professional palette** — Consider a light theme or a refined dark theme. Not the neon-cyan hacker look.
4. **Typography matters** — Use a professional font pairing (e.g., Inter for body, a serif or geometric sans for headings).
5. **Subtle animations** — Fade-in on scroll is fine. No hover effects that distract from content.
6. **Mobile-first** — Design for mobile, enhance for desktop.
7. **Fast** — Target 95+ Lighthouse score. No heavy 3D libraries.

---

## Color Palette Suggestions

### Option A: Light & Professional
- Background: White / Light gray (#FAFAFA)
- Text: Dark gray (#1A1A1A)
- Accent: Deep blue (#2563EB) or Teal (#0D9488)
- Secondary: Soft gray for cards (#F3F4F6)

### Option B: Refined Dark
- Background: Near-black (#0A0A0A)
- Text: Off-white (#E5E5E5)
- Accent: Clean blue (#3B82F6) or subtle cyan (#06B6D4)
- Cards: Dark gray (#18181B) with subtle borders

### Option C: Hybrid (dark hero, light content)
- Hero: Dark background with light text
- Content sections: Light background
- Creates visual hierarchy and feels modern

---

## Content Management (Sanity CMS)

### Schema Types to Create:
1. **siteConfig** — Company name, tagline, email, socials, legal links
2. **product** — Name, slug, description, features, URL, status, screenshot, order
3. **testimonial** — Author, role, quote, avatar (for future use)
4. **page** — For any additional pages (About, Privacy, Terms)

### Key Principle:
Everything visible on the site should be editable from Sanity Studio. Zero hardcoded content.

---

## Architecture Decisions

1. **Dynamic rendering** (`export const dynamic = 'force-dynamic'`) — Content updates from Sanity appear immediately
2. **Centralized URLs** — All external links managed in one config, sourced from CMS
3. **No hardcoded content** — All text, images, and data from Sanity
4. **Component-based** — Each section is its own component, receives data as props
5. **Server Components by default** — Only use `"use client"` when you need interactivity

---

## File Structure

```
ofeklabs-com/
├── .kiro/
│   └── steering/          # Horizon Standard rules
├── public/
│   └── images/            # Static assets (logo, og-image)
├── src/
│   ├── app/
│   │   ├── page.tsx       # Home page (dynamic)
│   │   ├── layout.tsx     # Root layout with metadata
│   │   ├── globals.css    # Tailwind + custom styles
│   │   └── studio/        # Sanity Studio route
│   ├── components/
│   │   ├── sections/      # Hero, Products, About, Contact, Footer
│   │   ├── ui/            # Button, Card, Badge, etc.
│   │   └── layout/        # Nav, Container
│   ├── config/
│   │   ├── site-content.ts  # CMS data fetching
│   │   └── urls.ts          # URL centralization
│   ├── lib/
│   │   └── sanity.ts      # Sanity client + queries
│   └── sanity/
│       └── schemaTypes/   # Sanity schemas
├── sanity.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── ARCHITECTURE.md        # Horizon Standard
```

---

## Implementation Order

### Phase 1: Foundation
1. Create Next.js project with TypeScript + Tailwind
2. Set up Sanity Studio with schemas (siteConfig, product)
3. Create base layout (Nav + Footer)
4. Set up dynamic rendering + Sanity data fetching
5. Add ARCHITECTURE.md with Horizon Standard

### Phase 2: Core Sections
6. Hero section (content from Sanity)
7. Products grid (data from Sanity)
8. About section
9. Contact section / form

### Phase 3: Polish
10. Responsive design pass
11. Animations (subtle fade-in on scroll)
12. SEO metadata (dynamic from Sanity)
13. Open Graph images
14. Lighthouse optimization

### Phase 4: Launch
15. Connect to ofeklabs.com domain
16. Set up proper environment variables
17. Final content review in Sanity
18. Deploy to Vercel

---

## Prompt to Start the New Session

Copy this into your new Kiro session to get started:

```
I'm building a professional landing page for ofeklabs.com — a software company that builds productivity tools. The flagship product is Shifter (shifter.ofeklabs.com).

Tech stack: Next.js 16 (App Router), TypeScript, Tailwind CSS, Sanity CMS, Vercel.

Key principles:
- No hardcoded content — everything from Sanity CMS
- Clean, professional design (NOT a hacker/lab aesthetic)
- Dynamic rendering for fresh CMS data
- Mobile-first, fast (95+ Lighthouse)
- Follow the Horizon Standard architecture

Sections needed: Navigation, Hero, Products, About, Contact, Footer.

I have a starter kit with proven patterns from my previous project. Check the docs/ folder for the full plan and the src/ folder for reference implementations of Sanity integration, URL management, and schemas.

Start by scaffolding the project structure and setting up the foundation (Next.js + Sanity + Tailwind). Then we'll build section by section.
```

---

## Reference: What NOT to Carry Over from ofeklabs.dev

- ❌ Particle field / 3D effects
- ❌ Interactive terminal
- ❌ Neon cyan / sci-fi color scheme
- ❌ "Lab" / "Experiment" language
- ❌ Cursor glow effects
- ❌ Heavy animation libraries (framer-motion is fine for subtle use)

## Reference: What TO Carry Over

- ✅ Sanity CMS integration pattern
- ✅ Dynamic rendering approach
- ✅ URL centralization architecture
- ✅ Horizon Standard principles
- ✅ TypeScript strict mode
- ✅ Component-based architecture
- ✅ Server Components by default
