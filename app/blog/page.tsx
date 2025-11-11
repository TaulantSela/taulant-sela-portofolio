import { AuroraBackground } from '@/components/aurora-background';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { fetchBlogPosts } from '@/lib/blog-posts';

const siteUrl = 'https://taulantsela.com';
const pageUrl = `${siteUrl}/blog`;
const socialImage = `${siteUrl}/og-image.svg`;

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Read articles by Taulant Sela on shipping reliable products, web engineering best practices, and modern development workflows.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    type: 'article',
    url: pageUrl,
    title: 'Articles by Taulant Sela',
    description:
      'Insights on shipping reliable products, web engineering best practices, and modern development workflows.',
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: 'Taulant Sela - Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taulant Sela — Blog',
    description: 'Engineering essays and notes on building resilient products, modern tooling, and impactful teams.',
    images: [socialImage],
  },
  keywords: [
    'Taulant Sela blog',
    'software engineering articles',
    'web development insights',
    'frontend best practices',
  ],
};

export default async function BlogPage() {
  const posts = await fetchBlogPosts();

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-slate-50 px-6 py-24 pb-32 transition-colors duration-500 sm:px-10 sm:py-32 lg:px-16 dark:bg-slate-900/50">
      <AuroraBackground />
      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal className="mb-12 flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div className="space-y-5 sm:space-y-6">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">All Blog Posts</h1>
            <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Explore the full collection of writing on modern products, thoughtful engineering, and steady team
              delivery.
            </p>
          </div>
          <Button asChild variant="ghost" size="sm" className="self-center sm:self-end">
            <Link href="/#blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Highlights
            </Link>
          </Button>
        </ScrollReveal>

        {posts.length ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <ScrollReveal
                key={post.id}
                delay={120 + index * 80}
                className="group overflow-hidden pt-0 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >
                <Card className="h-full overflow-hidden pt-0">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <Image
                      src={post.image || '/placeholder.svg'}
                      alt={post.title}
                      height={312}
                      width={312}
                      className={`h-full w-full transition-transform duration-700 group-hover:scale-110 ${
                        post.imageFit === 'contain' ? 'object-contain group-hover:scale-100' : 'object-cover'
                      }`}
                    />
                  </div>
                  <CardHeader className="flex flex-col gap-2 pt-6">
                    <div className="mb-2 flex w-full items-center justify-between">
                      <Badge variant="secondary" className="shrink-0 text-xs">
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex h-full flex-col pt-2">
                    <CardDescription className="mb-4 line-clamp-3 text-sm">{post.excerpt}</CardDescription>
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                        <User className="mr-1 h-3 w-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                        <Clock className="mr-1 h-3 w-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <Link href={post.url} target="_blank" rel="noopener noreferrer" className="mt-auto block">
                      <Button variant="ghost" size="sm" className="group/btn w-full">
                        Read More
                        <ArrowRight className="ml-2 h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-12 text-center text-slate-500 shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:border-white/15 dark:bg-white/5 dark:text-white/60">
            No blog posts published yet.
          </div>
        )}
      </div>
    </main>
  );
}
