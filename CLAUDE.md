# Chinni Photography Portfolio

## Overview
Modern, futuristic photography portfolio built with Next.js 16 (App Router), Tailwind CSS v4, Framer Motion, and Supabase CMS. Dark cinema aesthetic with gold accents, film grain texture, and scroll-triggered animations. Mobile-first responsive design. Edit-in-place admin UI for content management.

## Tech Stack
- **Framework:** Next.js 16.2 (App Router, Turbopack)
- **Styling:** Tailwind CSS v4 (CSS-based config via `@theme` in `globals.css`, NOT `tailwind.config.ts`)
- **Animations:** Framer Motion (scroll reveals, page transitions, hover effects)
- **CMS:** Supabase (Postgres + Storage) with edit-in-place admin UI
- **Auth:** JWT via `jose` (password-based, HttpOnly cookies, 7-day expiry)
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
│   │   ├── layout.tsx       # Site layout: AdminProvider + Navbar + Footer + GrainOverlay
│   │   ├── page.tsx         # Homepage — async server component, fetches all data
│   │   ├── works/           # Portfolio listing (WorksPageClient) + [slug] detail (ProjectDetailClient)
│   │   ├── services/        # Services listing (ServicesPageClient)
│   │   ├── about/           # About the photographer (AboutPageClient) with AchievementsEditor
│   │   ├── events/          # Upcoming events (EventsPageClient)
│   │   ├── contact/         # Contact form + info (ContactPageClient)
│   │   └── admin/login/     # Admin login page
│   ├── api/
│   │   ├── admin/           # Admin routes: login, logout, me, update, upload
│   │   ├── contact/         # POST handler for contact form
│   │   ├── projects/        # GET all projects (for manager)
│   │   ├── testimonials/    # GET all testimonials (for manager)
│   │   ├── services/        # GET all services (for manager)
│   │   └── events/          # GET all events (for manager)
│   ├── layout.tsx           # Root layout (fonts, metadata, body)
│   ├── globals.css          # Tailwind v4 @theme config, custom CSS
│   └── not-found.tsx        # Custom 404 page
├── components/
│   ├── admin/               # EditableField, EditableImage, ImageUpload, AchievementsEditor, ProjectManager, TestimonialManager, ServiceManager, EventManager
│   ├── providers/           # AdminProvider (isAdmin context, floating admin pill)
│   ├── layout/              # Navbar, Footer (accept SiteSettings props)
│   ├── sections/            # Homepage sections: Hero, About, PortfolioGrid, Services, Testimonials, UpcomingEvents, ContactCTA (accept data props)
│   └── ui/                  # Reusable: AnimatedText, ImageReveal, FilterBar, ProjectCard, TestimonialCard, GrainOverlay, SocialIcons
└── lib/
    ├── supabase.ts          # Two Supabase clients: public (anon) + admin (service role), proxy support
    ├── auth.ts              # JWT create/verify via jose (HS256)
    ├── types.ts             # TypeScript interfaces: SiteSettings, Photographer, Project, Service, Testimonial, Event, Category, Achievement
    ├── data.ts              # Mapper functions (snake_case→camelCase) + async fetch functions with demo-data fallback
    ├── utils.ts             # cn(), formatDate(), formatEventDate()
    └── demo-data.ts         # Placeholder data used when Supabase is not configured

supabase/
├── migration.sql            # 7 tables (cp_ prefixed): site_settings, photographer, categories, projects, services, testimonials, events
└── seed.sql                 # Demo data for all tables
```

## Architecture

### Data Flow
1. Pages are **async server components** that fetch data via functions in `src/lib/data.ts`
2. Data functions query Supabase; if unavailable, fall back to `demo-data.ts`
3. Server components pass data as props to `"use client"` section components (needed for Framer Motion)
4. Admin edits go through `/api/admin/update` (PATCH/POST/DELETE) → Supabase service role client → `router.refresh()` to reload

### Database
- **Shared Supabase project** with another portfolio → all tables use `cp_` prefix to avoid collisions
- **7 tables:** `cp_site_settings`, `cp_photographer`, `cp_categories`, `cp_projects`, `cp_services`, `cp_testimonials`, `cp_events`
- **RLS:** public SELECT on all tables, writes only via service_role key
- **Storage:** `images` bucket for uploads (10MB limit)

### Admin System
- Login at `/admin/login` with `ADMIN_PASSWORD` env var → JWT cookie
- `AdminProvider` wraps the site, provides `isAdmin` context
- When admin: floating pill with CRUD manager links + logout
- **EditableField:** hover shows pencil icon, click to inline-edit text/textarea, save/cancel
- **EditableImage:** hover shows "Change Image" overlay, drag-drop upload with auto-compression
- **CRUD Managers:** slide-over panels for projects, testimonials, services, events

### Design System (defined in `globals.css` via Tailwind v4 `@theme`)
- **Background:** `#0A0A0A` | **Foreground:** `#F5F0EB` | **Accent (gold):** `#C9A96E`
- **Card:** `#111111` | **Muted:** `#1A1A1A` | **Border:** `#2A2A2A`
- **Fonts:** Playfair Display (serif headings) + Inter (sans body) — loaded via `next/font/google`

### Route Groups
- `(site)` — all public-facing pages share the Navbar + Footer layout

### Animations (Framer Motion)
- All scroll animations use `useInView` with `once: true` — animate only on first appearance
- `prefers-reduced-motion` is respected — grain overlay hidden, all animations disabled
- Parallax/cursor effects are disabled below `lg` breakpoint (1024px)

## Key Conventions
- **No brand icons in lucide-react** — use `src/components/ui/SocialIcons.tsx` for Instagram/Facebook/YouTube
- **Images:** Currently `unoptimized: true` in `next.config.ts` (bypasses Next.js image proxy). Remove this when deploying to Vercel for production optimization.
- **Server/Client split:** Each page has a server `page.tsx` (async data fetch) + client `*Client.tsx` (Framer Motion + interactivity)
- **Environment variables:** see `.env.example` for required vars

## Setup
1. Copy `.env.example` to `.env.local` and fill in Supabase + auth vars
2. Run `supabase/migration.sql` in Supabase SQL editor to create tables
3. Run `supabase/seed.sql` to populate demo data
4. Create a public `images` bucket in Supabase Storage
5. `npm run dev` — site works with or without Supabase (falls back to demo data)
6. Visit `/admin/login` to access edit-in-place admin features
