# OfekLabs.com Starter Kit

This folder contains proven patterns and reference implementations from the ofeklabs.dev project.
Use these as a starting point for the new ofeklabs.com landing page.

## What's Included

```
ofeklabs-com-starter/
├── docs/
│   ├── OFEKLABS_COM_PLAN.md      # Full project plan with sections, design, and phases
│   └── HORIZON_STANDARD.md       # Architecture standard (copy to root as ARCHITECTURE.md)
├── src/
│   ├── lib/sanity.ts             # Sanity client + query functions
│   ├── config/
│   │   ├── site-content.ts       # CMS data fetching layer
│   │   └── urls.ts               # URL centralization module
│   ├── sanity/schemaTypes/
│   │   ├── index.ts              # Schema registry
│   │   ├── product.ts            # Product schema (with screenshot field)
│   │   └── siteConfig.ts         # Site config schema (with legal links)
│   └── app/studio/[[...tool]]/
│       └── page.tsx              # Sanity Studio route
├── sanity.config.ts              # Sanity configuration
├── vitest.config.ts              # Test configuration
├── package.json                  # Dependencies (no 3D/particle libs)
├── .env.local.example            # Environment variables template
└── README.md                     # This file
```

## How to Use

1. Create a new Next.js project: `npx create-next-app@latest ofeklabs-com --typescript --tailwind --app`
2. Copy the `src/` files into your new project
3. Copy `sanity.config.ts`, `vitest.config.ts` to root
4. Copy `.env.local.example` and fill in your values
5. Copy `docs/HORIZON_STANDARD.md` to root as `ARCHITECTURE.md`
6. Run `npm install` with the dependencies from `package.json`
7. Set up your Sanity project at https://sanity.io/manage
8. Start building sections following the plan in `docs/OFEKLABS_COM_PLAN.md`

## Key Differences from ofeklabs.dev

- No `@react-three/fiber`, `@react-three/drei`, `three` (no 3D effects)
- No interactive terminal component
- Product schema includes `screenshot` field for product images
- SiteConfig schema includes `legal` field for privacy/terms links
- SiteConfig schema includes `name`, `tagline`, `description` for company info
- URL module defaults to `ofeklabs.com` instead of `ofeklabs.dev`

## Architecture Principles

1. **Zero hardcoded content** — Everything from Sanity CMS
2. **Dynamic rendering** — Fresh data on every request
3. **Server Components** — Only `"use client"` when needed
4. **Centralized URLs** — All links managed in one place
5. **Type safety** — No `any` types
6. **Conventional commits** — `type(scope): description`
