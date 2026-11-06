import { cache } from 'react';

export type BlogPageContent = {
  heading: string;
  description: string;
};

export const blogPageContent: BlogPageContent = {
  heading: 'All Blog Posts',
  description: 'All my write-ups on front-end decisions, architecture trade-offs, and the products I ship.',
};

export const fetchBlogPageContent = cache(async (): Promise<BlogPageContent> => blogPageContent);
