import { cache } from 'react';

export type ProjectsPageContent = {
  heading: string;
  description: string;
};

export const projectsPageContent: ProjectsPageContent = {
  heading: 'All Projects',
  description:
    'Browse the full collection of company initiatives, open source contributions, and personal products I have built.',
};

export const fetchProjectsPageContent = cache(async (): Promise<ProjectsPageContent> => projectsPageContent);
