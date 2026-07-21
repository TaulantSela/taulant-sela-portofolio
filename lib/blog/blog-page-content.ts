import { cache } from 'react';

export type BlogPageContent = {
  heading: string;
  description: string;
};

export const blogPageContent: BlogPageContent = {
  heading: 'All Blog Posts',
  description:
    'Explore the full collection of writing on modern products, thoughtful engineering, and steady team delivery.',
};

export const fetchBlogPageContent = cache(async (): Promise<BlogPageContent> => blogPageContent);
