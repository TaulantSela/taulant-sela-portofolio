# Project Overview

This document captures how the portfolio is put together and must be updated whenever we make a noticeable change. Treat it as the living source of truth for architecture, content integrations, and operational notes.

## Tech Stack

- **Framework:** Next.js (App Router) with TypeScript.
- **Styling:** TailwindCSS utility classes combined with custom components.
- **UI Components:** Colocated in `components/` with shared primitives under `components/ui/`.
- **State & Data:** Uses React Server Components. All content is authored in code under `lib/`.
- **Bundler/Runtime:** Vercel tooling (Node 18+) with edge-friendly patterns where possible.

## Directory Highlights

- `app/` – Route handlers, layouts, API routes (`app/api/contact/route.ts`), and page components.
- `components/` – Reusable UI building blocks and section layouts.
- `lib/` – Content modules (Projects, Blog, Hero, Skills, Contact) and utility functions.
- `public/` – Static assets: Open Graph image, placeholders, project logos (`public/projects/`), blog images (`public/blog/`), and the CV (`public/cv/`).
- `docs/` – Project documentation (this file).

## Content

All site content is authored in code — no external CMS:

- `lib/projects/projects.ts` – project cards for `/` and `/projects` (ordered by `featuredIndex`).
- `lib/blog/blog-posts.ts` – blog post cards for `/` and `/blog` (ordered newest first).
- `lib/hero/`, `lib/skills/`, `lib/contact/`, and the `*-section-content.ts` / `*-page-content.ts` modules – landing and archive-page copy.
- `lib/skills/tech-stack.ts` – the tech stack grid.

Each module exports a typed constant plus a memoised `fetch*` accessor (via `react/cache`) consumed by the Server Components. Content changes ship with a redeploy.

## External Integrations

### Email (Contact Form)

- Implemented via Nodemailer in `app/api/contact/route.ts`.
- Sends through Gmail SMTP using an App Password (`smtp.gmail.com`, port 465, secure).
- Requires `GMAIL_USER`, `GMAIL_APP_PASSWORD`, and optional `CONTACT_RECIPIENT_EMAIL`.
- API returns 500 if mandatory env vars are missing or if Gmail rejects the send.

## Environment Variables

| Variable                  | Purpose                                     |
| ------------------------- | ------------------------------------------- |
| `GMAIL_USER`              | Gmail account used as the sender.           |
| `GMAIL_APP_PASSWORD`      | App-specific password for SMTP auth.        |
| `CONTACT_RECIPIENT_EMAIL` | Optional inbox override for contact emails. |

Ensure local `.env` and `.env.example` stay aligned when variables change.

## Build & Deployment

- `npm run dev` – start local dev server.
- `npm run lint` – run Next.js linting.
- `npm run build` – production build (pages render fully static; only Gmail variables are needed at runtime, for the contact API).
- Deployments should inject the same environment variables available locally.
- Content updates are code changes and ship with a redeploy.

## Update Log

Maintain this log chronologically with latest entries first.

| Date (UTC) | Change                                                                                                                                                                                                                       |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-07-21 | Removed Contentful entirely: migrated all content to typed modules under `lib/`, moved assets/CV into `public/`, dropped the `contentful` dependency and all `CONTENTFUL_*` env vars. Content pages now render fully static. |
| 2025-11-11 | Expanded Contentful usage to power landing + archive sections, polished navigation/mobile styling, enabled analytics, and updated docs.                                                                                      |
| 2025-11-10 | Renamed the project and refreshed landing page copy/structure.                                                                                                                                                               |
| 2025-11-08 | Added major case studies (Elevator Simulator, Elite Mobile, Legion Training API) with new assets and links.                                                                                                                  |
| 2025-11-07 | Portfolio content overhaul: Orbit data platform narrative, curated blog highlights, CTA/contact fixes, and styling refinements.                                                                                              |
| 2025-08-13 | Switched email delivery to Nodemailer, refreshed branding assets, and expanded personal bio content.                                                                                                                         |
| 2025-08-11 | Initial scaffold from Create Next App with foundational portfolio layout.                                                                                                                                                    |
