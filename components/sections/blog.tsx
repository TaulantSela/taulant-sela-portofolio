'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: 'Building Scalable React Applications with TypeScript',
    excerpt:
      'Learn how to structure large React applications using TypeScript, best practices for component architecture, and state management patterns.',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'React',
    image: '/blog-react-typescript.png',
    author: 'Alex Johnson',
  },
  {
    id: 2,
    title: "The Future of Web Development: What's Coming in 2024",
    excerpt:
      'Exploring upcoming trends in web development including AI integration, WebAssembly, and the evolution of JavaScript frameworks.',
    date: '2024-01-10',
    readTime: '6 min read',
    category: 'Web Development',
    image: '/blog-future-web.png',
    author: 'Alex Johnson',
  },
  {
    id: 3,
    title: 'Optimizing Performance in Next.js Applications',
    excerpt:
      'Deep dive into Next.js performance optimization techniques, from image optimization to server-side rendering strategies.',
    date: '2024-01-05',
    readTime: '10 min read',
    category: 'Next.js',
    image: '/blog-nextjs-performance.png',
    author: 'Alex Johnson',
  },
  {
    id: 4,
    title: 'CSS Grid vs Flexbox: When to Use Which',
    excerpt:
      'A comprehensive guide to understanding the differences between CSS Grid and Flexbox, with practical examples and use cases.',
    date: '2023-12-28',
    readTime: '7 min read',
    category: 'CSS',
    image: '/blog-css-layout.png',
    author: 'Alex Johnson',
  },
  {
    id: 5,
    title: 'Building RESTful APIs with Node.js and Express',
    excerpt:
      'Step-by-step guide to creating robust RESTful APIs using Node.js, Express, and MongoDB with authentication and validation.',
    date: '2023-12-20',
    readTime: '12 min read',
    category: 'Backend',
    image: '/blog-nodejs-api.png',
    author: 'Alex Johnson',
  },
  {
    id: 6,
    title: 'Modern JavaScript: ES2024 Features You Should Know',
    excerpt:
      'Explore the latest JavaScript features including new array methods, improved async/await patterns, and performance enhancements.',
    date: '2023-12-15',
    readTime: '9 min read',
    category: 'JavaScript',
    image: '/blog-react-typescript.png',
    author: 'Alex Johnson',
  },
];

export function Blog() {
  return (
    <section id="blog" className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-900/50">
      <div className="mx-auto max-w-6xl">
        <div className="animate-in fade-in-50 slide-in-from-bottom-5 mb-16 text-center duration-700">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">Latest Blog Posts</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Thoughts, tutorials, and insights about web development and technology
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Card
              key={post.id}
              className="group animate-in fade-in-50 slide-in-from-bottom-5 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <Image
                  src={post.image || '/placeholder.svg'}
                  alt={post.title}
                  height={312}
                  width={312}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <CardHeader className="pb-3">
                <div className="mb-2 flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                    <Calendar className="mr-1 h-3 w-3" />
                    {/* {new Date(post.date).toLocaleDateString()} */}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="mb-4 line-clamp-3 text-sm">{post.excerpt}</CardDescription>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                    <User className="mr-1 h-3 w-3" />
                    {post.author}
                  </div>
                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                    <Clock className="mr-1 h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>
                <Link href={`/blog/${post.id}`} className="mt-4 block">
                  <Button variant="ghost" size="sm" className="group/btn w-full">
                    Read More
                    <ArrowRight className="ml-2 h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="animate-in fade-in-50 slide-in-from-bottom-5 mt-12 text-center delay-300 duration-700">
          <Button
            variant="outline"
            size="lg"
            className="bg-transparent transition-transform duration-300 hover:scale-105"
          >
            View All Posts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
