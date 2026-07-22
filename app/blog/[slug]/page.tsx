import { ScrollReveal } from '@/components/scroll-reveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  blogPostSlug,
  fetchBlogPostBySlug,
  fetchRenderableBlogPosts,
  isLocalPost,
  isMirror,
  loadBlogPostBody,
} from '@/lib/blog/blog-posts';
import { ArrowLeft, ArrowUpRight, Calendar, Clock, User } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const siteUrl = 'https://taulantsela.com';
const socialImage = `${siteUrl}/og-image.svg`;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await fetchRenderableBlogPosts();
  return posts.map((post) => ({ slug: blogPostSlug(post)! }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  const pageUrl = `${siteUrl}/blog/${slug}`;
  const isDraft = isLocalPost(post) && post.draft;
  // An unpromoted mirror defers to the original — that's what keeps the two copies from competing.
  const deferring = isMirror(post) && !post.mirror.primary;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: deferring ? post.url : `/blog/${slug}`,
    },
    robots: isDraft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'article',
      url: pageUrl,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: socialImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [socialImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);
  const Body = post ? await loadBlogPostBody(slug) : undefined;

  if (!post || !Body) {
    notFound();
  }

  const mirrored = isMirror(post);
  const deferring = mirrored && !post.mirror.primary;

  // Structured data would compete with the original's, so an unpromoted mirror emits none.
  const structuredData = deferring
    ? null
    : {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        image: `${siteUrl}${post.image}`,
        articleSection: post.category,
        inLanguage: 'en',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${siteUrl}/blog/${slug}`,
        },
        author: {
          '@type': 'Person',
          name: post.author,
          url: siteUrl,
        },
        publisher: {
          '@type': 'Person',
          name: post.author,
          url: siteUrl,
        },
      };

  return (
    <main className="relative isolate min-h-screen overflow-hidden px-6 py-24 pb-32 transition-colors duration-500 sm:px-10 sm:py-32 lg:px-16">
      {structuredData ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      ) : null}

      <article className="relative mx-auto max-w-3xl">
        <ScrollReveal className="mb-10 space-y-6">
          <Button asChild variant="ghost" size="sm" className="-ml-3">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              All posts
            </Link>
          </Button>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="text-xs">
              {post.category}
            </Badge>
            {isLocalPost(post) && post.draft ? (
              <Badge variant="outline" className="text-xs">
                Draft
              </Badge>
            ) : null}
          </div>

          <h1 className="text-3xl leading-tight font-bold text-slate-900 sm:text-4xl dark:text-slate-100">
            {post.title}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>

          {mirrored ? (
            <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-white/15 dark:bg-white/5 dark:text-slate-300">
              Originally published on{' '}
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium underline underline-offset-4"
              >
                {post.publisher ?? 'the original site'}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              . This is an archived copy.
            </p>
          ) : null}
        </ScrollReveal>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <Body />
        </div>
      </article>
    </main>
  );
}
