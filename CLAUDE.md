# Chinni Photography Portfolio

## Overview
Modern, futuristic photography portfolio built with Next.js 16 (App Router), Tailwind CSS v4, Framer Motion, and Sanity CMS. Dark cinema aesthetic with gold accents, film grain texture, and scroll-triggered animations. Mobile-first responsive design.

## Tech Stack
- **Framework:** Next.js 16.2 (App Router, Turbopack)
- **Styling:** Tailwind CSS v4 (CSS-based config via `@theme` in `globals.css`, NOT `tailwind.config.ts`)
- **Animations:** Framer Motion (scroll reveals, page transitions, hover effects)
- **CMS:** Sanity v3 (embedded Studio at `/studio`)
- **Language:** TypeScript (strict mode)
- **Icons:** Lucide React + custom SVG social icons (`SocialIcons.tsx`)

## Commands
- `npm run dev` — start dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## Code Organisation

```
src/
├── app/
│   ├── (site)/              # Public site (route group)
│   │   ├── layout.tsx       # Site layout: Navbar + Footer + GrainOverlay
│   │   ├── page.tsx         # Homepage — composes all section components
│   │   ├── works/           # Portfolio listing + [slug] detail pages
│   │   ├── services/        # Services listing
│   │   ├── about/           # About the photographer
│   │   ├── events/          # Upcoming events
│   │   └── contact/         # Contact form + info
│   ├── studio/[[...tool]]/  # Embedded Sanity Studio (CMS admin)
│   ├── api/
│   │   ├── contact/         # POST handler for contact form
│   │   └── revalidate/      # Sanity webhook → ISR revalidation
│   ├── layout.tsx           # Root layout (fonts, metadata, body)
│   ├── globals.css          # Tailwind v4 @theme config, custom CSS
│   └── not-found.tsx        # Custom 404 page
├── components/
│   ├── layout/              # Navbar, Footer (site-wide)
│   ├── sections/            # Homepage sections: Hero, About, PortfolioGrid, Services, Testimonials, UpcomingEvents, ContactCTA
│   └── ui/                  # Reusable: AnimatedText, ImageReveal, FilterBar, ProjectCard, TestimonialCard, GrainOverlay, SocialIcons
├── sanity/
│   ├── config.ts            # Sanity project config (reads from env vars)
│   ├── schemas/             # 8 document schemas: siteSettings, photographer, category, project, service, testimonial, event, blogPost
│   └── lib/
│       ├── client.ts        # Sanity client instance
│       └── queries.ts       # GROQ queries for all content types
└── lib/
    ├── utils.ts             # cn(), formatDate(), formatEventDate()
    └── demo-data.ts         # Placeholder data used when Sanity is not configured
```

## Architecture

### Data Flow
Currently uses **demo data** (`src/lib/demo-data.ts`) for all content. When Sanity is configured:
1. Replace demo-data imports with Sanity `client.fetch()` calls using queries from `src/sanity/lib/queries.ts`
2. Sanity webhook hits `/api/revalidate` on content publish → triggers ISR
3. Content updates appear on site within 60 seconds

### Design System (defined in `globals.css` via Tailwind v4 `@theme`)
- **Background:** `#0A0A0A` | **Foreground:** `#F5F0EB` | **Accent (gold):** `#C9A96E`
- **Card:** `#111111` | **Muted:** `#1A1A1A` | **Border:** `#2A2A2A`
- **Fonts:** Playfair Display (serif headings) + Inter (sans body) — loaded via `next/font/google`

### Route Groups
- `(site)` — all public-facing pages share the Navbar + Footer layout
- `/studio` — standalone Sanity Studio (no site layout)

### Animations (Framer Motion)
- All scroll animations use `useInView` with `once: true` — animate only on first appearance
- `prefers-reduced-motion` is respected — grain overlay hidden, all animations disabled
- Parallax/cursor effects are disabled below `lg` breakpoint (1024px)

## Key Conventions
- **No brand icons in lucide-react** — use `src/components/ui/SocialIcons.tsx` for Instagram/Facebook/YouTube
- **Images:** Currently `unoptimized: true` in `next.config.ts` (bypasses Next.js image proxy). Remove this when deploying to Vercel for production optimization.
- **Sanity schemas** live in `src/sanity/schemas/` — each file is one document type, registered in `index.ts`
- **Environment variables:** see `.env.example` for required vars when connecting Sanity

## Setup for Sanity CMS
1. Create a Sanity project at https://sanity.io/manage
2. Copy project ID to `.env.local` as `NEXT_PUBLIC_SANITY_PROJECT_ID`
3. Set `NEXT_PUBLIC_SANITY_DATASET=production`
4. Visit `/studio` to manage content
5. Add a webhook in Sanity dashboard pointing to `https://yourdomain.com/api/revalidate?secret=YOUR_SECRET`
