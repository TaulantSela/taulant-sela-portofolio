import { cache } from 'react';

import { fetchRepoMetrics, parseRepoSlug } from '@/lib/github/repo-metrics';

export type ProjectLink = { label: string; href: string; icon?: 'github' | 'external' };

/**
 * Authored project data. For anything with a public repo the dates here are only a
 * fallback — {@link fetchProjects} overwrites them with what GitHub reports.
 */
export type ProjectSource = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  links?: ProjectLink[];
  imageFit?: 'cover' | 'contain';
  role: 'company' | 'personal' | 'oss';
  context: string;
  /** Month work started, `YYYY-MM`. Falls back to this when there's no repo. */
  startedAt: string;
  /** Month of the most recent meaningful work, `YYYY-MM`. Falls back to this when there's no repo. */
  updatedAt: string;
  /**
   * Editorial 0-100 weight: scope, business impact, and how relevant the project is to
   * the work I want. This is the half of "notable" that GitHub can't measure — commit
   * volume and recency are blended in at fetch time. Keep values distinct.
   */
  weight: number;
};

export type Project = ProjectSource & {
  /** `owner/name`, derived from the GitHub link. */
  repo?: string;
  /** Commits I authored, per GitHub. Absent when there's no public repo. */
  commits?: number;
  stars?: number;
  /** 0-100 blend of {@link ProjectSource.weight} and live GitHub activity. Drives "Most notable". */
  signal: number;
};

export const PROJECT_SORTS = [
  { key: 'latest', label: 'Latest' },
  { key: 'oldest', label: 'Oldest' },
  { key: 'notable', label: 'Most notable' },
] as const;

export type ProjectSortKey = (typeof PROJECT_SORTS)[number]['key'];

export const DEFAULT_PROJECT_SORT: ProjectSortKey = 'latest';

export function isProjectSortKey(value: unknown): value is ProjectSortKey {
  return PROJECT_SORTS.some((sort) => sort.key === value);
}

/**
 * An authored `YYYY-MM` and a GitHub ISO timestamp have to be comparable, so months are
 * padded to mid-month — a neutral guess that won't jump a hand-written date past a repo
 * pushed the same month.
 */
function sortableDate(value: string) {
  return value.length <= 7 ? `${value}-15T00:00:00Z` : value;
}

export function sortProjects(items: Project[], sort: ProjectSortKey): Project[] {
  const sorted = [...items];

  if (sort === 'notable') {
    // Ties break on recency so the order never looks arbitrary.
    return sorted.sort(
      (a, b) => b.signal - a.signal || sortableDate(b.updatedAt).localeCompare(sortableDate(a.updatedAt)),
    );
  }

  // Latest and oldest are the same axis — last activity — so they read as exact mirrors.
  // Sorting "oldest" by first commit instead would let a long-running project sit near
  // the top of both lists, which just looks broken.
  const byRecency = sorted.sort(
    (a, b) => sortableDate(b.updatedAt).localeCompare(sortableDate(a.updatedAt)) || b.signal - a.signal,
  );

  return sort === 'oldest' ? byRecency.reverse() : byRecency;
}

// Curated order — drives the homepage highlights. The /projects page sorts explicitly instead.
export const projects: ProjectSource[] = [
  {
    id: 'goodyear-multi-brand-b2c',
    startedAt: '2021-11',
    updatedAt: '2026-03',
    weight: 98,
    title: 'Goodyear - Multi-Brand B2C Platform',
    role: 'company',
    tags: ['React', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'AEM', 'GraphQL'],
    imageFit: 'cover',
    image: '/projects/goodyear_logo.jpg',
    links: [
      { label: 'Goodyear', href: 'https://www.goodyear.eu/' },
      { label: 'Dunlop', href: 'https://www.dunlop.eu/' },
      { label: 'Premio', href: 'https://www.premio.pl/' },
      { label: 'Vulco', href: 'https://www.vulco.es/' },
      { label: 'SuperService', href: 'https://www.retesuperservice.it/' },
    ],
    description:
      'AEM-powered B2C ecosystem serving Goodyear, Dunlop, Vulco, Premio, SuperService, and other brands across 30+ markets, covering consumer, commercial, retail, shop and motorcycle TBUs.',
    context:
      'Maintained the legacy React/Class Components codebase while leading the migration to functional React + TypeScript, RTK Query, Tailwind CSS, and reusable Storybook-driven components. Embedded React modules into AEM via Web Components, delivered REST/GraphQL integrations, and implemented extensive unit testing to support the Chameleon architecture that powers each brand and market variant.',
  },
  {
    id: 'pack-it-up',
    startedAt: '2025-08',
    updatedAt: '2025-12',
    weight: 76,
    title: 'Pack It Up - Smart Packing Assistant',
    role: 'personal',
    tags: ['Next.js 15', 'Clerk', 'Prisma', 'Neon', 'OpenAI', 'Tailwind CSS'],
    imageFit: 'cover',
    image: '/projects/pack-it-up_logo.avif',
    links: [
      { label: 'Live Demo', href: 'https://packitup.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/TaulantSela/pack-it-up', icon: 'github' },
    ],
    description:
      'AI-assisted packing planner that generates travel-ready checklists from trip details, weather, and activities with real-time editing tools.',
    context: 'Built as a personal SaaS-style project to explore AI-assisted UX and modern Next.js app router patterns.',
  },
  {
    id: 'hoyo-smart-office',
    startedAt: '2020-09',
    updatedAt: '2026-07',
    weight: 92,
    title: 'Hoyo Tech Smart Office & HoyoHome',
    role: 'company',
    tags: ['Scrum Mastery', 'Product Leadership', 'React', 'React Native', 'IoT'],
    imageFit: 'cover',
    image: '/projects/hoyohome_logo.webp',
    links: [
      { label: 'Smart Office', href: 'https://smart.hoyo.tech/' },
      { label: 'Hoyo Tech', href: 'https://hoyo.tech/' },
    ],
    description:
      'Second-generation smart office and smart living ecosystem that delivers real-time energy analytics, environmental intelligence, smart lighting, and climate automation across Hoyo Tech environments.',
    context:
      'As Scrum Master, coordinated cross-functional squads, migrated Angular modules to React, rebuilt native apps in React Native, and documented agile workflows to keep the platform shipping predictably.',
  },
  {
    id: 'react-google-places-autocomplete',
    startedAt: '2025-06',
    updatedAt: '2025-08',
    weight: 60,
    title: 'React Google Places Autocomplete (Enhanced Fork)',
    role: 'oss',
    tags: ['React', 'TypeScript', 'Open Source'],
    imageFit: 'contain',
    image: '/projects/react-google-places-autocomplete_logo.svg',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/TaulantSela/react-google-places-autocomplete',
        icon: 'github',
      },
    ],
    description:
      'Open-source fork that layers additional DX features on top of the community library, including richer suggestion handling and configuration.',
    context:
      'Exposed the `customSuggestions` prop, rewired load options, and adjusted option mapping to support advanced search experiences used in production apps.',
  },
  {
    id: 'bmg-production-music',
    startedAt: '2025-01',
    updatedAt: '2026-03',
    weight: 88,
    title: 'BMG Production Music Platform',
    role: 'company',
    tags: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS'],
    imageFit: 'cover',
    image: '/projects/bmgpm_logo.webp',
    links: [{ label: 'BMG Production Music', href: 'https://bmgproductionmusic.com/' }],
    description:
      'Migrated a legacy Angular 8 catalog and licensing tool to Next.js 15 with React 19, unlocking faster search, preview, and licensing flows for music supervisors.',
    context:
      'Spearheaded the full rewrite from Angular to a modern Next.js stack—rebuilding feature parity, modernizing the UI system, and ensuring SSR/ISR performance for global catalog searches.',
  },
  {
    id: 'parkber',
    startedAt: '2022-01',
    updatedAt: '2022-12',
    weight: 70,
    title: 'Parkber - Parking Management System',
    role: 'company',
    tags: ['React', 'Redux', 'Material UI', 'REST APIs'],
    imageFit: 'contain',
    image: '/projects/parkber_logo.png',
    description:
      'Operations dashboard that centralizes parking inventory, user roles, facility health, and real-time utilization reporting for mobility operators.',
    context:
      'As a lead engineer, designed role-based workspaces, monitoring widgets, and admin tooling that streamlined operations for municipal partners, focusing on UX and maintainable Redux patterns.',
  },
  {
    id: 'stepline',
    startedAt: '2023-01',
    updatedAt: '2023-12',
    weight: 68,
    title: 'Stepline - Document Template Management',
    role: 'company',
    tags: ['Angular', 'RxJS', 'TypeScript'],
    imageFit: 'contain',
    image: '/projects/stepline_logo.png',
    links: [{ label: 'Stepline', href: 'https://stepline.ch/' }],
    description:
      'Legal document automation platform serving Swiss advocacy groups with template editing, approvals, and canton-specific exports.',
    context:
      'As a lead engineer, implemented modular services, reactive forms, and access controls to help legal teams standardize document generation while reducing manual effort.',
  },
  {
    id: 'monochain',
    startedAt: '2020-07',
    updatedAt: '2021-04',
    weight: 80,
    title: 'MonoChain Product Suite',
    role: 'company',
    tags: ['React', 'React Native', 'Redux', 'Node.js', 'MongoDB', 'Next.js'],
    imageFit: 'cover',
    image: '/projects/monochain_logo.jpeg',
    links: [{ label: 'MonoChain', href: 'https://www.mono-chain.com/' }],
    description:
      'Set of React and React Native applications for sustainable fashion provenance, including the MonoChain web dashboards and the Twig (ex-DIEM) mobile experience.',
    context:
      'Shipped cross-platform features—index dashboards, certification tooling, and the Twig mobile app—while contributing to microservice integrations and dev tooling.',
  },
  {
    id: 'orbit-irrigation',
    startedAt: '2018-09',
    updatedAt: '2019-08',
    weight: 64,
    title: 'Orbit Irrigation Data Platform',
    role: 'company',
    tags: ['ETL', 'Matillion', 'Snowflake', 'SQL', 'Data Warehousing'],
    imageFit: 'cover',
    image: '/projects/orbit-irrigation_logo.jpeg',
    links: [{ label: 'Orbit', href: 'https://www.orbitonline.com/' }],
    description:
      "Data foundation that delivers analytics-ready information to Orbit's product and operations teams by consolidating irrigation telemetry into Snowflake.",
    context:
      'Implemented the full ETL lifecycle: exporting relational data from SQL Server, applying cleansing and business logic in Matillion/AWS Lambda, and loading the curated models into Snowflake to power Orbit’s analytics workflows.',
  },
  {
    id: 'seeu-web-decentralization',
    startedAt: '2017-12',
    updatedAt: '2018-05',
    weight: 30,
    title: 'SEEU Departmental Web Decentralization',
    role: 'company',
    tags: ['WordPress', 'Multisite', 'Content Strategy', 'Localization', 'Governance'],
    imageFit: 'contain',
    image: '/projects/seeu_logo.webp',
    links: [{ label: 'SEEU', href: 'https://seeu.edu.mk/' }],
    description:
      'WordPress multisite initiative that split the South East European University web presence into departmental subdomains and localized experiences to improve content ownership and publishing efficiency.',
    context:
      'As a webmaster assistant within the PR team, coordinated with department leads to scope requirements, stood up and themed subdomain sites, migrated legacy and multilingual content, and documented workflows so each unit could manage its own updates while staying on-brand.',
  },
  {
    id: 'elevator-simulator',
    startedAt: '2022-05',
    updatedAt: '2025-12',
    weight: 40,
    title: 'Elevator Simulator System',
    role: 'personal',
    tags: ['React', 'TypeScript', 'State Machines', 'Simulation'],
    imageFit: 'contain',
    image: '/projects/elevator-simulator_logo.svg',
    links: [
      { label: 'Elevator Simulator', href: 'https://elevator-simulator-system.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/TaulantSela/elevator-simulator', icon: 'github' },
    ],
    description:
      'Elevator simulator that visualizes hall-call priorities, cabin actions, and dispatch sequencing in real time.',
    context:
      'Built to model dispatcher strategies for an elevator system, showcasing hall/cabin call prioritization, transition messaging, and UI polish for teaching control-system concepts.',
  },
  {
    id: 'legion-training-api',
    startedAt: '2022-10',
    updatedAt: '2025-11',
    weight: 44,
    title: 'Legion Training Platform API',
    role: 'personal',
    tags: ['Node.js', 'Express', 'Swagger UI', 'JWT', 'Vercel'],
    imageFit: 'cover',
    image: '/projects/legion-training-api_logo.svg',
    links: [
      { label: 'API Docs', href: 'https://legion-training-api.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/TaulantSela/legion-training-api', icon: 'github' },
    ],
    description:
      'Multi-tenant REST API for gyms and coaches to orchestrate workouts, track progress, and manage members with granular role-based auth.',
    context:
      'Designed a modular Express service with JWT authentication, automated Swagger documentation, caching, and CI-ready integration tests—deployed serverlessly on Vercel.',
  },
  {
    id: 'elite-mobile',
    startedAt: '2023-09',
    updatedAt: '2025-12',
    weight: 34,
    title: 'Elite Mobile',
    role: 'personal',
    tags: ['PHP', 'MySQL', 'Bootstrap', 'CRUD'],
    imageFit: 'cover',
    image: '/projects/elite-mobile_logo.png',
    links: [
      { label: 'Elite Mobile', href: 'https://elite-mobile.vercel.app/', icon: 'external' },
      { label: 'GitHub', href: 'https://github.com/TaulantSela/elite-mobile', icon: 'github' },
    ],
    description:
      'Elite Mobile is a full-featured online storefront for flagship smartphones, providing a curated catalog, rich product pages, and professional repair service listings.',
    context:
      'The platform combines a modern PHP + MySQL frontend with an authenticated admin dashboard to add devices, manage categories, and publish service offerings without touching code.',
  },
  {
    id: 'watchpaper',
    startedAt: '2026-07',
    updatedAt: '2026-07',
    weight: 46,
    title: 'WatchPaper - Watch Dial Wallpapers',
    role: 'personal',
    tags: ['Next.js', 'React 19', 'TypeScript', 'SVG Generation', 'iOS Shortcuts'],
    imageFit: 'contain',
    image: '/projects/watchpaper_logo.png',
    links: [
      { label: 'Live Demo', href: 'https://watchpaper.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/TaulantSela/watchpaper', icon: 'github' },
    ],
    description:
      'Wallpaper generator that turns iconic watch dials into logo-free color-and-texture lock screens, plus a studio that extracts a palette from a photo of your own watch on-device.',
    context:
      'Built a parametric SVG generator with server-side PNG rendering via resvg, on-device k-means palette extraction, and an iOS Shortcuts integration for one-tap wallpaper setting.',
  },
  {
    id: 'claude-code-semaphore',
    startedAt: '2026-07',
    updatedAt: '2026-07',
    weight: 82,
    title: 'Claude Code Semaphore - Menu Bar Status Light',
    role: 'oss',
    tags: ['Go', 'Claude Code Plugin', 'Shell', 'Cross-Platform', 'CI/CD'],
    imageFit: 'contain',
    image: '/projects/claude-code-semaphore_logo.svg',
    links: [
      { label: 'Website', href: 'https://claude-semaphore.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/TaulantSela/claude-code-semaphore', icon: 'github' },
    ],
    description:
      'Published Claude Code plugin that drives a menu-bar traffic light—red when Claude needs you, orange while it works, green when done—visible from any window on macOS, Windows, and Linux.',
    context:
      'Shipped a cross-platform Go tray binary, a shell-hook plugin, and an automated GitHub Actions release pipeline, distributed through the Claude Code plugin marketplace.',
  },
  {
    id: 'bookslot',
    startedAt: '2026-07',
    updatedAt: '2026-07',
    weight: 48,
    title: 'BookSlot - Appointment Booking SaaS',
    role: 'personal',
    tags: ['Next.js', 'React 19', 'TypeScript', 'Drizzle', 'Turso', 'Resend'],
    imageFit: 'contain',
    image: '/projects/bookslot_logo.svg',
    links: [
      { label: 'Live Demo', href: 'https://bookslot-rho.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/TaulantSela/bookslot', icon: 'github' },
    ],
    description:
      'Multi-tenant appointment-booking SaaS giving local service businesses a public booking page, an embeddable widget, a management dashboard, and automated email reminders.',
    context:
      'Built end to end with multi-tenant auth, Drizzle on Turso/libSQL, Resend email, and a Vercel cron job for daily reminders.',
  },
  {
    id: 'fakt',
    startedAt: '2026-05',
    updatedAt: '2026-07',
    weight: 56,
    title: 'Fakt - North Macedonia E-Invoicing',
    role: 'personal',
    tags: ['Next.js', 'React 19', 'TypeScript', 'Prisma', 'NextAuth', 'XAdES'],
    imageFit: 'contain',
    image: '/projects/fakt_logo.svg',
    links: [
      { label: 'Live Demo', href: 'https://fakt-rust.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/TaulantSela/fakt', icon: 'github' },
    ],
    description:
      'Electronic invoicing app for North Macedonia that creates UBL invoices and submits them to the government UJP e-Faktura system, including qualified electronic signature (XAdES) signing.',
    context:
      'Implemented OAuth to the UJP platform, XAdES-BES qualified signing with WebCrypto, internationalization, and a Prisma/NextAuth data layer for a non-trivial regulatory domain.',
  },
  {
    id: 'react-state-management-thesis',
    startedAt: '2024-01',
    updatedAt: '2026-07',
    weight: 78,
    title: 'Master Thesis - React State Management Study',
    role: 'personal',
    tags: ['React', 'Redux Toolkit', 'Zustand', 'Vite', 'Benchmarking'],
    imageFit: 'contain',
    image: '/projects/master-thesis_logo.svg',
    links: [
      { label: 'Live Demos', href: '/projects/master-thesis' },
      { label: 'GitHub', href: 'https://github.com/TaulantSela/master-thesis', icon: 'github' },
    ],
    description:
      'Empirical master-thesis study testing whether React state-management performance depends on application type, benchmarking Multiple Contexts against Redux Toolkit across read-heavy, form, and real-time apps.',
    context:
      'Built nine comparable apps in a monorepo—catalog, dashboard, and form variants across Local State, Context API, Context Hell, Redux Toolkit, and Zustand—with Vitest benchmarking, a developer-experience survey, and written performance and DX analysis reports.',
  },
  {
    id: 'watchcrop',
    startedAt: '2026-06',
    updatedAt: '2026-07',
    weight: 54,
    title: 'WatchCrop - Daily Watch Guessing Game',
    role: 'personal',
    tags: ['Next.js', 'TypeScript', 'Neon', 'Drizzle', 'Tailwind CSS'],
    imageFit: 'contain',
    image: '/projects/watchcrop_logo.svg',
    links: [
      { label: 'Live Demo', href: 'https://watchcrop.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/TaulantSela/watchcrop', icon: 'github' },
    ],
    description:
      'Daily guess-the-watch game that starts zoomed into a dial detail and zooms out on each wrong guess—name the brand and model before the full reveal.',
    context:
      'Designed a server-authoritative anti-cheat flow with HMAC-signed state, a dual-database setup (Neon Postgres + PGlite), and a Sharp-based crop pipeline, with product and risk docs gating the launch.',
  },
  {
    id: 'freelancr',
    startedAt: '2026-05',
    updatedAt: '2026-07',
    weight: 58,
    title: 'Freelancr - Freelancer Tax & Invoicing (MK)',
    role: 'personal',
    tags: ['Next.js', 'React 19', 'TypeScript', 'Drizzle', 'Neon', 'JWT'],
    imageFit: 'contain',
    image: '/projects/freelancr_logo.svg',
    links: [
      { label: 'Live Demo', href: 'https://freelancr-mk.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/TaulantSela/freelancr', icon: 'github' },
    ],
    description:
      'Invoicing and tax-compliance SaaS for North Macedonia freelancers, covering multi-currency invoicing, VAT threshold monitoring, income-tax brackets, and quarterly deadline tracking.',
    context:
      'Built the full stack with Server Actions, Drizzle on Neon, custom JWT sessions, and PDF invoice rendering, encoding local tax logic ahead of the 2026 e-invoicing mandate.',
  },
  {
    id: 'soundscape',
    startedAt: '2025-12',
    updatedAt: '2026-07',
    weight: 52,
    title: 'Soundscape - Ambient Audio Mixer',
    role: 'personal',
    tags: ['Monorepo', 'Next.js', 'Expo', 'Electron', 'Express', 'Prisma'],
    imageFit: 'contain',
    image: '/projects/soundscape_logo.svg',
    links: [
      { label: 'Live Demo', href: 'https://soundscape-web-one.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/TaulantSela/soundscape', icon: 'github' },
    ],
    description:
      'Cross-platform ambient-audio mixer for blending curated sound layers into a shareable mix, delivered across web, mobile, desktop, and an API from one codebase.',
    context:
      'Structured an npm-workspaces monorepo spanning a Next.js web client, an Expo mobile app, an Electron desktop shell, and an Express/Prisma API with shared audio and config packages.',
  },
  {
    id: 'pizza-menu',
    startedAt: '2025-11',
    updatedAt: '2025-12',
    weight: 62,
    title: 'Pizza Menu - Multi-Tenant Digital Restaurant Menu',
    role: 'personal',
    tags: ['Next.js 16', 'React 19', 'TypeScript', 'Sanity CMS', 'Multi-Tenant', 'Tailwind CSS'],
    imageFit: 'contain',
    image: '/projects/pizza-menu_logo.svg',
    links: [
      { label: 'Live Demo', href: 'https://suhotel.fastbite.app' },
      { label: 'GitHub', href: 'https://github.com/metinjakupi/pizza-menu', icon: 'github' },
    ],
    description:
      'Hosted digital menu platform for restaurants — each venue gets its own subdomain, branding, and Sanity-managed menu, served from a single Next.js app and running in production for Su Hotel Restaurant & Bar.',
    context:
      'Initiated the project and built it with a collaborator: subdomain- and query-based tenant resolution in middleware, per-client theming driven entirely from Sanity, a password-gated Studio, seed and migration scripts, and per-tenant SEO metadata.',
  },
  {
    id: 'ui-library',
    startedAt: '2026-05',
    updatedAt: '2026-07',
    weight: 50,
    title: 'UI Library - Component System & Storybook',
    role: 'oss',
    tags: ['Monorepo', 'React 19', 'Storybook', 'shadcn/ui', 'Playwright'],
    imageFit: 'contain',
    image: '/projects/ui-library_logo.svg',
    links: [
      { label: 'Shared UI Library', href: 'https://ui-library-ui.vercel.app' },
      { label: 'Acme Dashboard Demo', href: 'https://ui-library-app-one.vercel.app' },
      { label: 'Bloom Settings Demo', href: 'https://ui-library-app-two.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/TaulantSela/ui-library', icon: 'github' },
    ],
    description:
      'Component-library monorepo with a shared UI package documented in Storybook and consumed by multiple demo apps.',
    context:
      'Set up a workspaces monorepo with shadcn/Base UI components, Storybook with accessibility and docs addons, and Vitest plus Playwright browser testing.',
  },
];

/** How much of "notable" GitHub activity is allowed to move, for projects that have a repo. */
const ACTIVITY_SHARE = 0.45;

function githubLink(project: ProjectSource) {
  return project.links?.find((link) => link.icon === 'github' || parseRepoSlug(link.href));
}

/** Date -> months since year 0, so ranges can be normalised arithmetically. */
function monthIndex(value: string) {
  const [year, month] = value.slice(0, 7).split('-').map(Number);
  return year * 12 + (month - 1);
}

function normalise(value: number, min: number, max: number) {
  return max > min ? (value - min) / (max - min) : 1;
}

/**
 * Merges authored copy with live GitHub metrics:
 * dates come straight from the repo, and "notable" becomes a blend of the editorial
 * weight and measured activity (commits dominate, then recency, then stars).
 * Projects with no public repo — client work — keep their authored values untouched.
 */
export const fetchProjects = cache(async (): Promise<Project[]> => {
  const slugs = projects.map((project) => {
    const link = githubLink(project);
    return link ? parseRepoSlug(link.href) : null;
  });

  const metrics = await fetchRepoMetrics(slugs.filter((slug): slug is string => Boolean(slug)));

  const merged: Project[] = projects.map((project, index) => {
    const slug = slugs[index];
    const repoMetrics = slug ? metrics.get(slug) : undefined;

    if (!repoMetrics) {
      return { ...project, ...(slug ? { repo: slug } : {}), signal: project.weight };
    }

    return {
      ...project,
      repo: repoMetrics.repo,
      startedAt: repoMetrics.createdAt,
      updatedAt: repoMetrics.pushedAt,
      commits: repoMetrics.commits,
      stars: repoMetrics.stars,
      signal: project.weight,
    };
  });

  // Normalise against the whole set so one prolific repo can't peg every score at 100.
  const maxCommits = Math.max(...merged.map((project) => project.commits ?? 0), 1);
  const maxStars = Math.max(...merged.map((project) => project.stars ?? 0), 1);
  const months = merged.map((project) => monthIndex(project.updatedAt));
  const [oldest, newest] = [Math.min(...months), Math.max(...months)];

  return merged.map((project) => {
    if (project.commits === undefined) {
      return project;
    }

    // log scale: the 5th commit says far more about a project than the 35th.
    const commitScore = Math.log1p(project.commits) / Math.log1p(maxCommits);
    const recencyScore = normalise(monthIndex(project.updatedAt), oldest, newest);
    const starScore = (project.stars ?? 0) / maxStars;
    const activity = 100 * (0.6 * commitScore + 0.25 * recencyScore + 0.15 * starScore);

    return {
      ...project,
      signal: Math.round((1 - ACTIVITY_SHARE) * project.weight + ACTIVITY_SHARE * activity),
    };
  });
});

export async function fetchFeaturedProjects(count = 3) {
  const all = await fetchProjects();
  return all.slice(0, count);
}
