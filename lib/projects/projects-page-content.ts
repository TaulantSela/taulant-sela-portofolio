import { cache } from 'react';

export type ProjectsPageContent = {
  heading: string;
  description: string;
};

export const projectsPageContent: ProjectsPageContent = {
  heading: 'All Projects',
  description: "Everything I've worked on: client platforms, open source, and products of my own.",
};

export const fetchProjectsPageContent = cache(async (): Promise<ProjectsPageContent> => projectsPageContent);
