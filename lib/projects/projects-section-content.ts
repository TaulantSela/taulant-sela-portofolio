import { cache } from 'react';

export type ProjectsSectionContent = {
  badgeLeading: string;
  badgeTrailing: string;
  heading: string;
  description: string;
};

export const projectsSectionContent: ProjectsSectionContent = {
  badgeLeading: 'Selected Projects',
  badgeTrailing: 'Client work & side projects',
  heading: "Things I've built.",
  description: 'Client platforms, open source, and products of my own.',
};

export const fetchProjectsSectionContent = cache(async (): Promise<ProjectsSectionContent> => projectsSectionContent);
