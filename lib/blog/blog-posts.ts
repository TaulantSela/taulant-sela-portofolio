import { cache } from 'react';

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  imageFit?: 'cover' | 'contain';
  author: string;
  url: string;
};

// Ordered newest first (by date).
export const blogPosts: BlogPost[] = [
  {
    id: 'introducing-pack-it-up',
    title: 'Introducing Pack It Up: The Smart Packing List Generator for Modern Travelers',
    excerpt:
      'Pack It Up is an intelligent packing assistant that generates AI-powered, trip-specific checklists based on destination, weather, and planned activities. It layers in packing heuristics for climate, trip length, and planned activities, while offering real-time editing, sharing, and export tools tailored for solo travelers and teams.',
    date: '2025-11-07T00:00+01:00',
    readTime: '9 min read',
    category: 'Next.js',
    author: 'Taulant Sela',
    imageFit: 'cover',
    image: '/blog/pack-it-up_blog.avif',
    url: 'https://hoyo.tech/article/introducing-pack-it-up-the-smart-packing-list-generator-for-modern-travelers',
  },
  {
    id: 'optimizing-file-uploads-aws-presigned-urls',
    title: 'Optimizing File Uploads with AWS Pre-Signed URLs',
    excerpt:
      'Why shifting from direct uploads to pre-signed S3 URLs strengthened performance, hardened security, and reduced infrastructure load for registration workflows.',
    date: '2025-04-04T00:00+01:00',
    readTime: '7 min read',
    category: 'AWS',
    author: 'Taulant Sela',
    imageFit: 'cover',
    image: '/blog/aws-presign_blog.webp',
    url: 'https://hoyo.tech/article/optimizing-file-uploads-with-aws-pre-signed-urls',
  },
  {
    id: 'react-state-management-global-local-insights',
    title: 'React State Management: Exploring global and local insights',
    excerpt:
      'A walkthrough of when to reach for Redux Toolkit, Context API, or local state tools like useState, and how to blend them for scalable React architectures.',
    date: '2023-12-13T00:00+01:00',
    readTime: '8 min read',
    category: 'React',
    author: 'Taulant Sela',
    imageFit: 'cover',
    image: '/blog/react-state-management_blog.jpg',
    url: 'https://hoyo.tech/article/react-state-management-exploring-global-and-local-insights',
  },
];

export const fetchBlogPosts = cache(async (): Promise<BlogPost[]> => blogPosts);

export async function fetchLatestBlogPosts(count = 3) {
  const posts = await fetchBlogPosts();
  return posts.slice(0, count);
}
