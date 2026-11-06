import { cache } from 'react';

export type BlogPageContent = {
  heading: string;
  description: string;
};

export const blogPageContent: BlogPageContent = {
  heading: 'All Blog Posts',
  description: "Everything I've written on React, AWS, and the products I build.",
};

export const fetchBlogPageContent = cache(async (): Promise<BlogPageContent> => blogPageContent);
