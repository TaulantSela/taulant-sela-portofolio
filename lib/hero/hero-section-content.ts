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
  headlineSecondary: 'Software Engineer turning ideas into refined products.',
  description:
    'Collaborating with teams to design and develop modern web products that are built with clean architecture, reliable systems, and long-term maintainability in mind.',
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
