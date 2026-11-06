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
  locationDetail: string;
  facts: HeroFact[];
  marqueeItems: string[];
  cvUrl: string;
};

export const heroSectionContent: HeroSectionContent = {
  headlineHighlight: 'Taulant Sela',
  headlineSecondary: 'Senior Software Engineer',
  description: 'I build React and Next.js apps for clients, and ship my own products on the side.',
  location: 'Struga, North Macedonia',
  locationDetail: 'Working remotely',
  facts: [
    {
      label: 'Now',
      items: [{ name: 'Hoyo Tech', href: 'https://hoyo.tech' }],
      detail: 'Technical team lead & Scrum Master',
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
      ],
    },
    {
      label: 'Studied',
      items: [{ name: "Master's in Software Engineering", href: '/projects/master-thesis' }],
      detail: 'Thesis on React state management',
    },
  ],
  marqueeItems: [
    'Goodyear in 30+ Markets',
    'BMG Production Music',
    'Angular 8 → Next.js 15',
    'Legacy React → TypeScript',
    'Technical Team Lead',
    'Scrum Master',
    'Mentoring Juniors & Interns',
    "Master's in Software Engineering",
    'Published Claude Code Plugin',
  ],
  cvUrl: '/cv/Taulant_Sela_-_CV.pdf',
};

export const fetchHeroSectionContent = cache(async (): Promise<HeroSectionContent> => heroSectionContent);
