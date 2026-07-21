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
    context:
      'Built as a personal SaaS-style project to explore AI-assisted UX and modern Next.js app router patterns.',
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
];

export const fetchProjects = cache(async (): Promise<Project[]> => projects);

export async function fetchFeaturedProjects(count = 3) {
  const all = await fetchProjects();
  return all.slice(0, count);
}
