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
  heading: 'Client platforms, open source, and my own products.',
  description:
    "From Goodyear's multi-brand platform across 30+ markets to Komshi, Watchcraft, and Claude Semaphore, a Claude Code plugin I published.",
};

export const fetchProjectsSectionContent = cache(async (): Promise<ProjectsSectionContent> => projectsSectionContent);
