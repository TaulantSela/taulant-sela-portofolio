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
    'Clean Architecture',
    'Performance Optimization',
    'Maintainable Codebases',
    'Scalable Systems',
    'Technical Consulting',
    'Codebase Refactoring',
    'Team Leadership',
    'Technical Mentorship',
    'Agile & Scrum',
  ],
  cvUrl: '/cv/Taulant_Sela_-_CV.pdf',
};

export const fetchHeroSectionContent = cache(async (): Promise<HeroSectionContent> => heroSectionContent);
