export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author: string;
  url: string;
};

const posts: BlogPost[] = [
  {
    id: 1,
    title: 'Introducing Pack It Up: The Smart Packing List Generator for Modern Travelers',
    excerpt:
      'Pack It Up is an intelligent packing assistant that generates AI-powered, trip-specific checklists based on destination, weather, and planned activities.',
    date: '2025-11-07',
    readTime: '9 min read',
    category: 'Next.js',
    image: '/blog/pack-it-up_blog.avif',
    author: 'Taulant Sela',
    url: 'https://hoyo.tech/article/introducing-pack-it-up-the-smart-packing-list-generator-for-modern-travelers',
  },
  {
    id: 2,
    title: 'Optimizing File Uploads with AWS Pre-Signed URLs',
    excerpt:
      'Why shifting from direct uploads to pre-signed S3 URLs strengthened performance, hardened security, and reduced infrastructure load for registration workflows.',
    date: '2025-04-04',
    readTime: '7 min read',
    category: 'AWS',
    image: '/blog/aws-presign_blog.webp',
    author: 'Taulant Sela',
    url: 'https://hoyo.tech/article/optimizing-file-uploads-with-aws-pre-signed-urls',
  },
  {
    id: 3,
    title: 'React State Management: Exploring global and local insights',
    excerpt:
      'A walkthrough of when to reach for Redux Toolkit, Context API, or local state tools like useState, and how to blend them for scalable React architectures.',
    date: '2023-12-13',
    readTime: '8 min read',
    category: 'React',
    image: '/blog/react-state-management_blog.jpg',
    author: 'Taulant Sela',
    url: 'https://hoyo.tech/article/react-state-management-exploring-global-and-local-insights',
  },
];

posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const blogPosts = posts;

export const latestBlogPosts = (count = 3) => blogPosts.slice(0, count);
