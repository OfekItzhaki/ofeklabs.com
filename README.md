# OfekLabs.com

Professional landing page for OfekLabs — built with Next.js 16, Sanity CMS, and Tailwind CSS v4.

## Overview

Single-page landing page with a "Quiet Confidence" design direction (think Linear, Vercel, Raycast). All content is CMS-driven via Sanity Studio. The site auto-discovers products from configured subdomains.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Server Components)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **CMS**: Sanity
- **Animations**: Framer Motion
- **Testing**: Vitest + fast-check (property-based)
- **CI/CD**: GitHub Actions

## Prerequisites

- Node.js 22+
- npm 10+
- A Sanity project (free tier works)

## Installation

```bash
# Clone the repository
git clone https://github.com/OfekItzhaki/ofeklabs.com.git
cd ofeklabs.com/ofeklabs-com-starter

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local
# Edit .env.local with your Sanity project ID
```

## Configuration

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SITE_URL` | Production URL | Yes |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | Yes |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name | Yes |
| `RESEND_API_KEY` | Resend API key for contact form | No |

## Usage

```bash
# Development server
npm run dev

# Run tests
npm test

# Type check
npm run typecheck

# Lint
npm run lint

# Production build
npm run build
npm start
```

## Testing

Property-based tests using Vitest + fast-check:

```bash
npm test              # Run all tests once
npm run test:watch    # Watch mode
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/health/         # Health check endpoint
│   ├── studio/             # Sanity Studio
│   ├── globals.css         # Tailwind + theme
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Home page orchestrator
├── components/
│   ├── motion/             # Animation components (Client)
│   ├── sections/           # Page sections (Server)
│   └── ui/                 # Reusable UI components
├── config/                 # Site content + URL utilities
├── lib/                    # Sanity client + utilities
├── sanity/                 # Sanity schema definitions
├── types/                  # TypeScript interfaces
└── __tests__/              # Property-based tests
```

## Deployment

Deploy to Vercel:

1. Connect the GitHub repository to Vercel
2. Set the root directory to `ofeklabs-com-starter`
3. Add environment variables in Vercel dashboard
4. Deploy

## Health Check

```
GET /api/health
```

Returns service status, version, and dependency health.

## Contributing

1. Create a feature branch: `git checkout -b feat/description`
2. Follow conventional commits: `feat(scope): description`
3. Ensure tests pass: `npm test`
4. Ensure build succeeds: `npm run build`
5. Push and create a PR

## License

Private — OfekLabs © 2026
