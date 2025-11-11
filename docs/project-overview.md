# Project Overview

This document captures how the portfolio is put together and must be updated whenever we make a noticeable change. Treat it as the living source of truth for architecture, content integrations, and operational notes.

## Tech Stack

- **Framework:** Next.js (App Router) with TypeScript.
- **Styling:** TailwindCSS utility classes combined with custom components.
- **UI Components:** Colocated in `components/` with shared primitives under `components/ui/`.
- **State & Data:** Uses React Server Components and `react/cache` for memoised CMS fetches.
- **Bundler/Runtime:** Vercel tooling (Node 18+) with edge-friendly patterns where possible.

## Directory Highlights

- `app/` – Route handlers, layouts, API routes (`app/api/contact/route.ts`), and page components.
- `components/` – Reusable UI building blocks and section layouts.
- `lib/` – Integration helpers (Contentful, Contact, Projects, Blog, Skills) and utility functions.
- `public/` – Static assets (Open Graph image, placeholders).
- `docs/` – Project documentation (this file).

## External Integrations

### Contentful

- Content models:
  - `post` – blog entries used across `/` and `/blog`.
  - `project` – project cards for `/` and `/projects`.
  - `heroSection`, `projectsSection`, `skillsSection`, `blogSection`, `contactSection` – singletons controlling landing page copy.
  - `blogPage`, `projectsPage` – singletons providing headings and descriptions for archive pages.
- Fetchers live under `lib/` and use `resolveLocalizedField` to reduce locale branching. Missing required fields throw to surface misconfiguration during build/runtime.
- Environment overrides allow custom content type IDs per environment (see `.env`).

### Email (Contact Form)

- Implemented via Nodemailer in `app/api/contact/route.ts`.
- Sends through Gmail SMTP using an App Password (`smtp.gmail.com`, port 465, secure).
- Requires `GMAIL_USER`, `GMAIL_APP_PASSWORD`, and optional `CONTACT_RECIPIENT_EMAIL`.
- API returns 500 if mandatory env vars are missing or if Gmail rejects the send.

## Environment Variables

| Variable                                      | Purpose                                        |
| --------------------------------------------- | ---------------------------------------------- |
| `GMAIL_USER`                                  | Gmail account used as the sender.              |
| `GMAIL_APP_PASSWORD`                          | App-specific password for SMTP auth.           |
| `CONTACT_RECIPIENT_EMAIL`                     | Optional inbox override for contact emails.    |
| `CONTENTFUL_SPACE_ID`                         | Contentful space identifier.                   |
| `CONTENTFUL_ENVIRONMENT`                      | Contentful environment (defaults to `master`). |
| `CONTENTFUL_DELIVERY_TOKEN`                   | Access token for published content.            |
| `CONTENTFUL_PREVIEW_TOKEN`                    | Token for preview API (optional).              |
| `CONTENTFUL_BLOG_POST_CONTENT_TYPE_ID`        | Overrides the `post` content type ID.          |
| `CONTENTFUL_PROJECT_CONTENT_TYPE_ID`          | Overrides the `project` content type ID.       |
| `CONTENTFUL_HERO_SECTION_CONTENT_TYPE_ID`     | Singleton content override.                    |
| `CONTENTFUL_PROJECTS_SECTION_CONTENT_TYPE_ID` | Singleton content override.                    |
| `CONTENTFUL_SKILLS_SECTION_CONTENT_TYPE_ID`   | Singleton content override.                    |
| `CONTENTFUL_BLOG_SECTION_CONTENT_TYPE_ID`     | Singleton content override.                    |
| `CONTENTFUL_CONTACT_CONTENT_TYPE_ID`          | Singleton content override.                    |
| `CONTENTFUL_BLOG_PAGE_CONTENT_TYPE_ID`        | Archive page singleton override.               |
| `CONTENTFUL_PROJECTS_PAGE_CONTENT_TYPE_ID`    | Archive page singleton override.               |

Ensure local `.env` and `.env.example` stay aligned when variables change.

## Build & Deployment

- `npm run dev` – start local dev server.
- `npm run lint` – run Next.js linting.
- `npm run build` – production build (must have Contentful + Gmail variables defined).
- Deployments should inject the same environment variables available locally.
- Content updates in Contentful require a rebuild unless incremental ISR is added later.

## Update Log

Maintain this log chronologically with latest entries first.

| Date (UTC) | Change                                                                                                                                  |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 2025-11-11 | Expanded Contentful usage to power landing + archive sections, polished navigation/mobile styling, enabled analytics, and updated docs. |
| 2025-11-10 | Renamed the project and refreshed landing page copy/structure.                                                                          |
| 2025-11-08 | Added major case studies (Elevator Simulator, Elite Mobile, Legion Training API) with new assets and links.                             |
| 2025-11-07 | Portfolio content overhaul: Orbit data platform narrative, curated blog highlights, CTA/contact fixes, and styling refinements.         |
| 2025-08-13 | Switched email delivery to Nodemailer, refreshed branding assets, and expanded personal bio content.                                    |
| 2025-08-11 | Initial scaffold from Create Next App with foundational portfolio layout.                                                               |
