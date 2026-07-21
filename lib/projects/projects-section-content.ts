import { cache } from 'react';

export type ProjectsSectionContent = {
  badgeLeading: string;
  badgeTrailing: string;
  heading: string;
  description: string;
};

export const projectsSectionContent: ProjectsSectionContent = {
  badgeLeading: 'Selected Projects',
  badgeTrailing: 'Recent partnerships & experiments',
  heading: 'Lean collaborations rooted in steady delivery.',
  description:
    'Front-end architecture, design system tuning, and release support for teams shipping on schedule.',
};

export const fetchProjectsSectionContent = cache(async (): Promise<ProjectsSectionContent> => projectsSectionContent);
