import { cache } from 'react';

export type BlogSectionContent = {
  eyebrow: string;
  heading: string;
  description: string;
};

export const blogSectionContent: BlogSectionContent = {
  eyebrow: 'Blog',
  heading: "Things I've written.",
  description: 'Write-ups on React, AWS, and the products I build.',
};

export const fetchBlogSectionContent = cache(async (): Promise<BlogSectionContent> => blogSectionContent);
