# Implementation Plan: OfekLabs Landing Page

## Overview

Build the OfekLabs single-page landing page using Next.js 16 App Router with Server Component–first architecture. The page fetches all content from Sanity CMS with a complete fallback system, renders seven sequential sections (Navigation, Hero, Products, Flagship, About, Contact, Footer), and uses Framer Motion for scroll-triggered animations. The implementation builds on the existing starter kit (Sanity client, schemas, URL module, site-content fetcher, vitest config).

## Tasks

- [x] 1. Foundation: Types, utilities, and schema extensions
  - [x] 1.1 Create TypeScript type definitions
    - Create `src/types/index.ts` with all interfaces: `SiteConfig`, `Product`, `SanityImage`, `ContactFormData`, `ContactFormErrors`, `NavLink`, `DefaultSiteConfig`
    - Export all types for use across the application
    - _Requirements: 1.4, 13.1, 13.2_

  - [x] 1.2 Create utility functions module
    - Create `src/lib/utils.ts` with: `cn()` (clsx + tailwind-merge), `truncate(input, maxLength)`, `truncateToSentences(input, maxSentences)`, `formatCopyright(name)`, `classifyCta(target)` returning `'anchor' | 'external'`
    - _Requirements: 6.2, 8.3, 12.1, 12.2, 3.5, 3.6_

  - [x] 1.3 Extend siteConfig Sanity schema with hero field
    - Add `hero` object field to `src/sanity/schemaTypes/siteConfig.ts` with: `headline` (string, max 80), `subheadline` (string, max 160), `ctaText` (string, max 30), `ctaTarget` (string)
    - _Requirements: 3.1, 3.2, 13.1_

  - [x] 1.4 Update site-content.ts with extended fallback and GROQ query
    - Extend `DEFAULT_SITE_CONFIG` in `src/config/site-content.ts` to include `hero` object with headline, subheadline, ctaText, ctaTarget, and `description` field
    - Update `getSiteConfig()` in `src/lib/sanity.ts` to fetch hero, socials, legal fields from siteConfig
    - _Requirements: 1.2, 1.5, 3.3_

  - [x]* 1.5 Write property tests for utility functions
    - **Property 4: Sentence truncation** — verify `truncateToSentences` returns at most N sentence-ending marks and output is a prefix of input
    - **Property 7: Copyright notice formatting** — verify `formatCopyright` produces `© {year} {name}` pattern
    - **Property 11: String truncation to maximum length** — verify `truncate` output length ≤ maxLength and identity for short strings
    - **Property 2: CTA target classification** — verify `classifyCta` correctly classifies `#` prefixed strings as anchor and `http(s)://` as external
    - Test file: `src/__tests__/lib/utils.test.ts`
    - **Validates: Requirements 6.2, 8.3, 12.1, 12.2, 3.5, 3.6**

  - [x]* 1.6 Write property tests for URL module
    - **Property 8: URL path normalization** — verify `buildFullUrl` produces no double slashes and no trailing slash
    - **Property 9: Product URL lookup** — verify `getProductUrl` returns correct URL or null
    - **Property 10: Base URL trailing slash normalization** — verify `getBaseUrl` strips trailing slashes
    - **Property 12: buildFullUrl whitespace handling** — verify whitespace-only input returns base URL
    - **Property 13: buildFullUrl round-trip** — verify path round-trip consistency
    - Test file: `src/__tests__/config/urls.test.ts`
    - **Validates: Requirements 9.1, 9.2, 9.3, 9.5, 14.1, 14.2, 14.3, 14.5**

  - [x]* 1.7 Write property tests for site-content fallback
    - **Property 1: Fallback configuration completeness** — verify `getSiteConfiguration()` returns complete config when Sanity returns null/undefined/error
    - Test file: `src/__tests__/config/site-content.test.ts`
    - **Validates: Requirements 1.2, 1.5**

  - [x]* 1.8 Write property test for product ordering
    - **Property 3: Product ordering invariant** — verify sorting products by `order` ascending produces correct ordering with undefined values last
    - Test file: `src/__tests__/lib/utils.test.ts`
    - **Validates: Requirements 4.3, 5.3**

- [x] 2. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 3. Global styles and layout
  - [x] 3.1 Create globals.css with Tailwind v4 and dark theme
    - Create `src/app/globals.css` with Tailwind v4 `@import "tailwindcss"`, CSS custom properties for dark theme (background #09090B, text colors, accent color in blue-to-teal range), and base styles
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

  - [x] 3.2 Create root layout with Geist font and metadata
    - Create `src/app/layout.tsx` with Geist font import, `generateMetadata()` using `getSiteConfiguration()` and `truncate()`, Vercel Analytics/Speed Insights, and proper HTML structure
    - _Requirements: 11.3, 12.1, 12.2, 12.3, 12.4, 12.5_

- [x] 4. Reusable UI components
  - [x] 4.1 Create Container component
    - Create `src/components/ui/Container.tsx` — max-width wrapper with responsive padding
    - _Requirements: 10.3, 10.4_

  - [x] 4.2 Create Button component
    - Create `src/components/ui/Button.tsx` — reusable button with variants (primary, secondary, ghost), proper sizing (44×44px min tap target on mobile), and CTA target classification (anchor vs external link)
    - _Requirements: 10.6, 11.2, 3.5, 3.6_

  - [x] 4.3 Create Badge component
    - Create `src/components/ui/Badge.tsx` — status badge with color variants for product statuses (active, beta, dev, coming-soon)
    - _Requirements: 4.2, 11.4_

  - [x] 4.4 Create SocialLinks component
    - Create `src/components/ui/SocialLinks.tsx` — renders social icon links conditionally based on which URLs are populated in config
    - _Requirements: 7.2, 8.4_

  - [x] 4.5 Create ProductCard component
    - Create `src/components/ui/ProductCard.tsx` — Server Component displaying product title, tagline, badge, and link with card styling (1px border, subtle background)
    - _Requirements: 4.2, 11.4_

  - [x]* 4.6 Write property test for conditional link rendering
    - **Property 5: Conditional link rendering** — verify SocialLinks renders exactly those links with non-empty URLs and omits empty/undefined/null ones
    - Test file: `src/__tests__/components/social-links.test.ts`
    - **Validates: Requirements 7.2, 8.4**

- [x] 5. Animation components (Client Components)
  - [x] 5.1 Create ScrollReveal component
    - Create `src/components/motion/ScrollReveal.tsx` — Client Component using Framer Motion `useInView` for viewport-triggered fade-in + slide-up animation (opacity 0→1, translateY 20→0, 400-600ms, ease-out). Respects `prefers-reduced-motion` via `useReducedMotion()`
    - _Requirements: 11.5, 11.6_

  - [x] 5.2 Create FadeIn component
    - Create `src/components/motion/FadeIn.tsx` — Client Component for initial load fade-in animation with configurable duration/delay. Respects `prefers-reduced-motion`
    - _Requirements: 3.7, 11.5, 11.6_

  - [x] 5.3 Create MobileMenu component
    - Create `src/components/motion/MobileMenu.tsx` — Client Component with toggle state, smooth open/close animation, closes on link click or outside click, 44×44px hamburger button
    - _Requirements: 2.4, 10.6_

- [x] 6. Section components
  - [x] 6.1 Create Navigation section
    - Create `src/components/sections/Navigation.tsx` — Server Component with fixed positioning, company logo, section links (Products, About, Contact), CTA button, and MobileMenu integration for viewports < 768px
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

  - [x] 6.2 Create HeroSection
    - Create `src/components/sections/HeroSection.tsx` — Server Component displaying headline, subheadline, CTA button wrapped in FadeIn. Dark background (#09090B), white headline, gray (#A1A1AA) subheadline
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

  - [x] 6.3 Create ProductsSection
    - Create `src/components/sections/ProductsSection.tsx` — Server Component rendering responsive grid (1 col < 768px, 2 cols ≥ 768px) of ProductCards wrapped in ScrollReveal. Returns null if products array is empty
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

  - [x] 6.4 Create FlagshipSection
    - Create `src/components/sections/FlagshipSection.tsx` — Server Component showing flagship product title, description, screenshot (with native lazy loading), features list (up to 4 with icons), and CTA button. Wrapped in ScrollReveal
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_

  - [x] 6.5 Create AboutSection
    - Create `src/components/sections/AboutSection.tsx` — Server Component displaying company description truncated to 3 sentences using `truncateToSentences()`. Returns null if description is empty/missing
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [x] 6.6 Create ContactSection
    - Create `src/components/sections/ContactSection.tsx` — Client Component with mailto link, social links via SocialLinks, and contact form with client-side validation (name required, email format, message ≥ 10 chars). Manages form state, displays inline errors, handles submission success/failure
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_

  - [x] 6.7 Create Footer section
    - Create `src/components/sections/Footer.tsx` — Server Component with logo, nav links, SocialLinks, legal links (conditional), copyright via `formatCopyright()`. Single-column layout below 768px
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

  - [x]* 6.8 Write property test for contact form validation
    - **Property 6: Contact form validation** — verify `validateContactForm` returns errors for exactly the invalid fields (name empty, email invalid format, message < 10 chars) and no errors when all valid
    - Test file: `src/__tests__/components/contact-form.test.ts`
    - **Validates: Requirements 7.4, 7.6**

- [x] 7. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Page orchestrator and wiring
  - [x] 8.1 Create the home page orchestrator
    - Create `src/app/page.tsx` with `export const dynamic = 'force-dynamic'`, parallel data fetching via `Promise.all([getSiteConfiguration(), getProductsList()])`, flagship selection (first product by order), and render all section components with props
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [x] 8.2 Wire responsive breakpoints and verify layout
    - Ensure all components use mobile-first Tailwind classes with breakpoints at sm (640px), md (768px), lg (1024px), xl (1280px). Verify Container max-width, grid columns, nav collapse, footer stacking
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

- [x] 9. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document (13 properties total)
- Unit tests validate specific examples and edge cases
- The existing starter kit provides: `src/lib/sanity.ts`, `src/config/urls.ts`, `src/config/site-content.ts`, Sanity schemas, `vitest.config.ts`, `sanity.config.ts`, and the `/studio` route — these are extended, not recreated
- All 4 Client Components: `MobileMenu`, `ContactSection`, `ScrollReveal`, `FadeIn`
- Everything else is Server Components for zero client-side JS overhead
- fast-check is already installed as a dev dependency for property-based tests

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.3", "3.1"] },
    { "id": 1, "tasks": ["1.2", "1.4", "3.2"] },
    { "id": 2, "tasks": ["1.5", "1.6", "1.7", "1.8", "4.1", "4.2", "4.3", "4.4", "4.5"] },
    { "id": 3, "tasks": ["4.6", "5.1", "5.2", "5.3"] },
    { "id": 4, "tasks": ["6.1", "6.2", "6.3", "6.4", "6.5", "6.7"] },
    { "id": 5, "tasks": ["6.6", "6.8"] },
    { "id": 6, "tasks": ["8.1"] },
    { "id": 7, "tasks": ["8.2"] }
  ]
}
```
