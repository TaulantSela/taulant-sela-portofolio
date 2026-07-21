import { cache } from 'react';

export type BlogSectionContent = {
  eyebrow: string;
  heading: string;
  description: string;
};

export const blogSectionContent: BlogSectionContent = {
  eyebrow: 'Blog',
  heading: 'Blog posts on building modern products and leading teams steadily.',
  description:
    'Occasional write-ups covering front-end decisions, design system upkeep, and day-to-day delivery habits.',
};

export const fetchBlogSectionContent = cache(async (): Promise<BlogSectionContent> => blogSectionContent);
