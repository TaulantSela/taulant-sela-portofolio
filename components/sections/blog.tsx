'use client';

import { ScrollReveal } from '@/components/scroll-reveal';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

import type { BlogPost } from '@/lib/blog-posts';

type BlogProps = {
  posts: BlogPost[];
};

export function Blog({ posts }: BlogProps) {
  if (!posts.length) {
    return null;
  }

  const [leadPost, ...otherPosts] = posts;

  return (
    <section
      id="blog"
      className="relative isolate px-6 text-slate-950 transition-colors duration-500 sm:px-10 lg:px-16 dark:text-white"
    >
      <div className="relative mx-auto flex max-w-6xl flex-col gap-16">
        <ScrollReveal asChild className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-3 rounded-full border border-slate-300/60 bg-white/80 px-4 py-2 text-xs tracking-[0.4em] text-slate-500 uppercase dark:border-white/20 dark:bg-white/10 dark:text-white/60">
                Blog
              </div>
              <h2 className="max-w-3xl text-4xl leading-tight font-semibold text-slate-900 sm:text-5xl dark:text-white">
                Blog posts on building modern products and leading teams steadily.
              </h2>
              <p className="max-w-2xl text-base text-slate-600 sm:text-lg dark:text-white/70">
                Occasional write-ups covering front-end decisions, design system upkeep, and day-to-day delivery habits.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-slate-300/70 bg-white/80 px-6 py-2 text-xs tracking-[0.3em] text-slate-600 uppercase transition-transform duration-300 hover:-translate-y-1 hover:border-slate-400 hover:text-slate-900 dark:border-white/20 dark:bg-white/10 dark:text-white/70 dark:hover:border-white/40 dark:hover:text-white"
            >
              <Link href="/blog">
                View archive
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </header>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {leadPost ? (
            <ScrollReveal delay={140} className="h-full">
              <LeadArticle post={leadPost} />
            </ScrollReveal>
          ) : null}

          <div className="grid gap-8 lg:content-start">
            {otherPosts.map((post, index) => (
              <ScrollReveal key={post.id} delay={200 + index * 90}>
                <ArticleCard post={post} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type Post = BlogPost;

function LeadArticle({ post }: { post: Post }) {
  return (
    <Link
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative isolate flex h-full flex-col rounded-3xl border border-slate-200 bg-white/90 shadow-[0_16px_48px_rgba(148,163,184,0.28)] transition-transform duration-500 hover:-translate-y-2 hover:border-slate-300 dark:border-white/15 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-900 dark:shadow-[0_20px_60px_rgba(15,23,42,0.45)]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.18),transparent_45%)] opacity-80 transition-opacity duration-700 group-hover:opacity-100 dark:bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.35),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.25),transparent_45%)]" />
      <div className="relative flex h-full flex-col justify-between p-8 text-slate-900 dark:text-white">
        <div className="flex items-center text-xs tracking-[0.35em] text-slate-500 uppercase dark:text-white/70">
          <span className="flex-1">{post.category}</span>
          <span className="ml-auto inline-flex items-center gap-2 pl-4">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(post.date).toLocaleDateString()}
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-4 pt-4">
          <h3 className="text-[2.25rem] leading-tight font-semibold text-slate-900 sm:text-[2.35rem] dark:text-white">
            {post.title}
          </h3>
          <p className="max-w-xl text-sm text-slate-600 dark:text-white/75">{post.excerpt}</p>
        </div>
        <div className="mt-auto flex items-end justify-end pt-6 pb-2 text-xs tracking-[0.35em] text-slate-500 uppercase dark:text-white/70">
          <span className="inline-flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}

function ArticleCard({ post }: { post: Post }) {
  return (
    <Link
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-[0_10px_30px_rgba(148,163,184,0.2)] transition-transform duration-300 hover:-translate-y-1 hover:border-slate-300 dark:border-white/15 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-800 dark:shadow-[0_12px_40px_rgba(15,23,42,0.35)]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.12),transparent_45%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100 dark:bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.25),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.2),transparent_45%)]" />
      <div className="relative flex flex-1 flex-col gap-3 text-slate-900 dark:text-white">
        <div className="flex items-center text-xs tracking-[0.3em] text-slate-500 uppercase dark:text-white/60">
          <span className="flex-1">{post.category}</span>
          <span className="ml-auto inline-flex items-center gap-2 pl-4">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(post.date).toLocaleDateString()}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-slate-700 dark:text-white dark:group-hover:text-white/80">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm text-slate-600 dark:text-white/70">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-end text-xs tracking-[0.3em] text-slate-500 uppercase dark:text-white/60">
          <span className="inline-flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
