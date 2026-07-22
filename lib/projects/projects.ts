import { cache } from 'react';

export type ProjectLink = { label: string; href: string; icon?: 'github' | 'external' };

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  links?: ProjectLink[];
  imageFit?: 'cover' | 'contain';
  role: 'company' | 'personal' | 'oss';
  context: string;
  featuredIndex?: number | null;
};

// Ordered by featuredIndex (ascending); entries without one fall to the end.
export const projects: Project[] = [
  {
    id: 'goodyear-multi-brand-b2c',
    featuredIndex: 1,
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
    featuredIndex: 2,
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
    featuredIndex: 3,
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
    featuredIndex: 4,
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
    featuredIndex: 5,
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
    featuredIndex: 6,
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
    featuredIndex: 7,
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
    featuredIndex: 8,
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
    featuredIndex: 9,
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
    featuredIndex: 10,
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
    featuredIndex: 12,
    title: 'Elevator Simulator System',
    role: 'personal',
    tags: ['React', 'TypeScript', 'State Machines', 'Simulation'],
    imageFit: 'contain',
    image: '/projects/elevator-system_logo.svg',
    links: [
      { label: 'Elevator Simulator', href: 'https://elevator-simulator-system.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/TaulantSela/elevator-system', icon: 'github' },
    ],
    description:
      'Elevator simulator that visualizes hall-call priorities, cabin actions, and dispatch sequencing in real time.',
    context:
      'Built to model dispatcher strategies for an elevator system, showcasing hall/cabin call prioritization, transition messaging, and UI polish for teaching control-system concepts.',
  },
  {
    id: 'legion-training-api',
    featuredIndex: 13,
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
    featuredIndex: null,
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
    featuredIndex: null,
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
    featuredIndex: null,
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
    featuredIndex: null,
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
    featuredIndex: null,
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
    featuredIndex: null,
    title: 'Master Thesis - React State Management Study',
    role: 'personal',
    tags: ['React', 'Redux Toolkit', 'Zustand', 'Vite', 'Benchmarking'],
    imageFit: 'contain',
    image: '/projects/master-thesis_logo.svg',
    links: [
      { label: 'Catalog — Context API', href: 'https://thesis-catalog-context-chi.vercel.app' },
      { label: 'Catalog — Context Hell', href: 'https://thesis-catalog-context-hell-henna.vercel.app' },
      { label: 'Catalog — Local State', href: 'https://thesis-catalog-local-state-pink.vercel.app' },
      { label: 'Catalog — Redux Toolkit', href: 'https://thesis-catalog-redux-rtk-ruddy.vercel.app' },
      { label: 'Catalog — Zustand', href: 'https://thesis-catalog-zustand.vercel.app' },
      { label: 'Dashboard — Context', href: 'https://thesis-dashboard-context.vercel.app' },
      { label: 'Dashboard — Redux', href: 'https://thesis-dashboard-redux-opal.vercel.app' },
      { label: 'Form — Context', href: 'https://thesis-form-context.vercel.app' },
      { label: 'Form — Redux', href: 'https://thesis-form-redux-livid.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/TaulantSela/master-thesis', icon: 'github' },
    ],
    description:
      'Empirical master-thesis study testing whether React state-management performance depends on application type, benchmarking Multiple Contexts against Redux Toolkit across read-heavy, form, and real-time apps.',
    context:
      'Built nine comparable apps in a monorepo—catalog, dashboard, and form variants across Local State, Context API, Context Hell, Redux Toolkit, and Zustand—with Vitest benchmarking, a developer-experience survey, and written performance and DX analysis reports.',
  },
  {
    id: 'watchcrop',
    featuredIndex: null,
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
    featuredIndex: null,
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
    featuredIndex: null,
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
    id: 'ui-library',
    featuredIndex: null,
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

export const fetchProjects = cache(async (): Promise<Project[]> => projects);

export async function fetchFeaturedProjects(count = 3) {
  const all = await fetchProjects();
  return all.slice(0, count);
}
