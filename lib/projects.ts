export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  links?: Array<{ label: string; href: string; icon?: 'github' | 'external' }>;
  imageFit?: 'cover' | 'contain';
  role: 'company' | 'personal' | 'oss';
  context: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: 'Pack It Up - Smart Packing Assistant',
    description:
      'AI-assisted packing planner that generates travel-ready checklists from trip details, weather, and activities with real-time editing tools.',
    image: '/projects/pack-it-up_logo.avif',
    tags: ['Next.js 15', 'Clerk', 'Prisma', 'Neon', 'OpenAI', 'Tailwind CSS'],
    links: [
      { label: 'Live Demo', href: 'https://packitup.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/TaulantSela/pack-it-up', icon: 'github' },
    ],
    role: 'personal',
    context: 'Built as a personal SaaS-style project to explore AI-assisted UX and modern Next.js app router patterns.',
  },
  {
    id: 2,
    title: 'Hoyo Tech Smart Office & HoyoHome',
    description:
      'Second-generation smart office and smart living ecosystem that delivers real-time energy analytics, environmental intelligence, smart lighting, and climate automation across Hoyo Tech environments.',
    image: '/projects/hoyohome_logo.webp',
    tags: ['Scrum Mastery', 'Product Leadership', 'React', 'React Native', 'IoT'],
    links: [
      { label: 'Smart Office', href: 'https://smart.hoyo.tech/' },
      { label: 'Hoyo Tech', href: 'https://hoyo.tech/' },
    ],
    role: 'company',
    context:
      'As Scrum Master, coordinated cross-functional squads, migrated Angular modules to React, rebuilt native apps in React Native, and documented agile workflows to keep the platform shipping predictably.',
  },

  {
    id: 3,
    title: 'Goodyear - Multi-Brand B2C Platform',
    description:
      'AEM-powered B2C ecosystem serving Goodyear, Dunlop, Vulco, Premio, SuperService, and other brands across 30+ markets, covering consumer, commercial, retail, shop and motorcycle TBUs.',
    image: '/projects/goodyear_logo.jpg',
    tags: ['React', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'AEM', 'GraphQL'],
    links: [
      { label: 'Goodyear', href: 'https://www.goodyear.eu/' },
      { label: 'Dunlop', href: 'https://www.dunlop.eu/' },
      { label: 'Premio', href: 'https://www.premio.pl/' },
      { label: 'Vulco', href: 'https://www.vulco.es/' },
      { label: 'SuperService', href: 'https://www.retesuperservice.it/' },
    ],
    role: 'company',
    context:
      'Maintained the legacy React/Class Components codebase while leading the migration to functional React + TypeScript, RTK Query, Tailwind CSS, and reusable Storybook-driven components. Embedded React modules into AEM via Web Components, delivered REST/GraphQL integrations, and implemented extensive unit testing to support the Chameleon architecture that powers each brand and market variant.',
  },
  {
    id: 4,
    title: 'React Google Places Autocomplete (Enhanced Fork)',
    description:
      'Open-source fork that layers additional DX features on top of the community library, including richer suggestion handling and configuration.',
    image: '/projects/react-google-places-autocomplete_logo.svg',
    imageFit: 'contain',
    tags: ['React', 'TypeScript', 'Open Source'],
    links: [
      { label: 'GitHub', href: 'https://github.com/TaulantSela/react-google-places-autocomplete', icon: 'github' },
    ],
    role: 'oss',
    context:
      'Exposed the `customSuggestions` prop, rewired load options, and adjusted option mapping to support advanced search experiences used in production apps.',
  },
  {
    id: 5,
    title: 'BMG Production Music Platform',
    description:
      'Migrated a legacy Angular 8 catalog and licensing tool to Next.js 15 with React 19, unlocking faster search, preview, and licensing flows for music supervisors.',
    image: '/projects/bmgpm_logo.webp',
    tags: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS'],
    links: [{ label: 'BMG Production Music', href: 'https://productionmusic.bmg.com/' }],
    role: 'company',
    context:
      'Spearheaded the full rewrite from Angular to a modern Next.js stack—rebuilding feature parity, modernizing the UI system, and ensuring SSR/ISR performance for global catalog searches.',
  },

  {
    id: 6,
    title: 'Parkber - Parking Management System',
    description:
      'Operations dashboard that centralizes parking inventory, user roles, facility health, and real-time utilization reporting for mobility operators.',
    image: '/projects/parkber_logo.png',
    imageFit: 'contain',
    tags: ['React', 'Redux', 'Material UI', 'REST APIs'],
    role: 'company',
    context:
      'As a lead engineer, designed role-based workspaces, monitoring widgets, and admin tooling that streamlined operations for municipal partners, focusing on UX and maintainable Redux patterns.',
  },
  {
    id: 7,
    title: 'Stepline - Document Template Management',
    description:
      'Legal document automation platform serving Swiss advocacy groups with template editing, approvals, and canton-specific exports.',
    image: '/projects/stepline_logo.png',
    imageFit: 'contain',
    tags: ['Angular', 'RxJS', 'TypeScript'],
    links: [{ label: 'Stepline', href: 'https://stepline.ch/' }],
    role: 'company',
    context:
      'As a lead engineer, implemented modular services, reactive forms, and access controls to help legal teams standardize document generation while reducing manual effort.',
  },
  {
    id: 8,
    title: 'MonoChain Product Suite',
    description:
      'Set of React and React Native applications for sustainable fashion provenance, including the MonoChain web dashboards and the Twig (ex-DIEM) mobile experience.',
    image: '/projects/monochain_logo.jpeg',
    tags: ['React', 'React Native', 'Redux', 'Node.js', 'MongoDB', 'Next.js'],
    links: [
      { label: 'MonoChain', href: 'https://www.mono-chain.com/' },
      { label: 'Twig Mobile', href: 'https://twigpay.co.uk/' },
    ],
    role: 'company',
    context:
      'Shipped cross-platform features—index dashboards, certification tooling, and the Twig mobile app—while contributing to microservice integrations and dev tooling.',
  },
  {
    id: 9,
    title: 'Orbit Irrigation Data Platform',
    description:
      "Data foundation that delivers analytics-ready information to Orbit's product and operations teams by consolidating irrigation telemetry into Snowflake.",
    image: '/projects/orbit-irrigation_logo.jpeg',
    tags: ['ETL', 'Matillion', 'Snowflake', 'SQL', 'Data Warehousing'],
    links: [{ label: 'Orbit', href: 'https://www.orbitonline.com/' }],
    role: 'company',
    context:
      'Implemented the full ETL lifecycle: exporting relational data from SQL Server, applying cleansing and business logic in Matillion/AWS Lambda, and loading the curated models into Snowflake to power Orbit’s analytics workflows.',
  },
  {
    id: 10,
    title: 'SEEU Departmental Web Decentralization',
    description:
      'WordPress multisite initiative that split the South East European University web presence into departmental subdomains and localized experiences to improve content ownership and publishing efficiency.',
    image: '/projects/seeu_logo.webp',
    imageFit: 'contain',
    tags: ['WordPress', 'Multisite', 'Content Strategy', 'Localization', 'Governance'],
    role: 'company',
    context:
      'As a webmaster assistant within the PR team, coordinated with department leads to scope requirements, stood up and themed subdomain sites, migrated legacy and multilingual content, and documented workflows so each unit could manage its own updates while staying on-brand.',
  },
];

export const featuredProjects = (count = 3) => projects.slice(0, count);
