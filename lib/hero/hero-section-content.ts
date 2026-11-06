import { cache } from 'react';

export type HeroSectionContent = {
  headlineHighlight: string;
  headlineSecondary: string;
  description: string;
  marqueeItems: string[];
  cvUrl: string;
};

export const heroSectionContent: HeroSectionContent = {
  headlineHighlight: 'Taulant Sela',
  headlineSecondary: 'Senior Software Engineer',
  description: 'I build web apps with React and Next.js, from large platforms for clients to products of my own.',
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
