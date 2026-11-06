import { cache } from 'react';

export type BlogSectionContent = {
  eyebrow: string;
  heading: string;
  description: string;
};

export const blogSectionContent: BlogSectionContent = {
  eyebrow: 'Blog',
  heading: "Things I've written.",
  description: 'Occasional write-ups covering front-end decisions, architecture trade-offs, and the products I ship.',
};

export const fetchBlogSectionContent = cache(async (): Promise<BlogSectionContent> => blogSectionContent);
