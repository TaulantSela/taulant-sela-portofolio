import { cache } from 'react';

export type HeroFact = {
  label: string;
  items: { name: string; href?: string }[];
  detail?: string;
};

export type HeroSectionContent = {
  headlineHighlight: string;
  headlineSecondary: string;
  description: string;
  location: string;
  facts: HeroFact[];
  marqueeItems: string[];
  cvUrl: string;
};

export const heroSectionContent: HeroSectionContent = {
  headlineHighlight: 'Taulant Sela',
  headlineSecondary: 'Senior Software Engineer',
  description: 'I build products for clients, and ship my own on the side.',
  location: 'Struga, North Macedonia',
  facts: [
    {
      label: 'Currently',
      items: [{ name: 'Hoyo Tech', href: 'https://hoyo.tech' }],
      detail: 'Software engineer, Team Lead & Scrum Master',
    },
    {
      label: 'Built for',
      items: [{ name: 'Goodyear' }, { name: 'BMG Production Music' }],
      detail: 'Through Valtech, 2021–2026',
    },
    {
      label: 'Building',
      items: [
        { name: 'Komshi', href: 'https://komshi.vercel.app' },
        { name: 'Watchcraft', href: 'https://watchcraft-app.vercel.app' },
        { name: 'Claude Semaphore', href: 'https://github.com/TaulantSela/claude-semaphore' },
        { name: 'Pack It Up', href: 'https://packitup.vercel.app' },
        { name: 'WatchPaper', href: 'https://watchpaper.vercel.app' },
        { name: 'Pizza Menu', href: 'https://suhotel.fastbite.app' },
      ],
    },
    {
      label: 'Studied',
      items: [{ name: "Master's in Software Engineering", href: '/projects/master-thesis' }],
      detail: 'Thesis on React state management',
    },
  ],
  marqueeItems: [
    'Angular 8 → Next.js 15',
    'Legacy React → TypeScript',
    'Multi-Brand Platforms',
    'Multi-Tenant SaaS',
    'Web & Mobile Apps',
    'Mentoring Juniors & Interns',
    'Requirement Calls & Client Demos',
    'Open Source',
  ],
  cvUrl: '/cv/Taulant_Sela_-_CV.pdf',
};

export const fetchHeroSectionContent = cache(async (): Promise<HeroSectionContent> => heroSectionContent);
