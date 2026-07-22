import type { ComponentType } from 'react';
import { cache } from 'react';

type BlogPostBase = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  imageFit?: 'cover' | 'contain';
  author: string;
};

/**
 * An on-site archive of a post published elsewhere. The body lives in `content/blog/<slug>.mdx`
 * exactly like a local post, but it is *not* the canonical copy: the page points `rel=canonical`
 * at the original publisher and stays out of the sitemap and the feed, so the two copies never
 * compete in search.
 */
type MirrorConfig = {
  slug: string;
  /**
   * The fallback switch. Flip to `true` if the original ever disappears — cards then link to the
   * on-site copy, canonical becomes self-referential, and the post joins the sitemap.
   */
  primary?: boolean;
};

/** Published elsewhere (e.g. the Hoyo Tech blog). Cards link out unless a mirror is promoted. */
export type ExternalBlogPost = BlogPostBase & {
  kind: 'external';
  url: string;
  /** Publisher shown on the mirrored page, e.g. "hoyo.tech". */
  publisher?: string;
  mirror?: MirrorConfig;
};

/** Written here. Body lives in `content/blog/<slug>.mdx` and renders at `/blog/<slug>`. */
export type LocalBlogPost = BlogPostBase & {
  kind: 'local';
  slug: string;
  /** Drafts render in `next dev` only — excluded from listings, the sitemap and the feed in production. */
  draft?: boolean;
};

export type BlogPost = ExternalBlogPost | LocalBlogPost;

/**
 * Bodies for every post rendered on this site, local and mirrored. Static imports (rather than a
 * dynamic template literal) keep this bundler-agnostic and make a missing file a type error
 * instead of a runtime 404.
 */
const postBodies: Record<string, () => Promise<{ default: ComponentType }>> = {
  'shipping-bookslot-on-turso': () => import('@/content/blog/shipping-bookslot-on-turso.mdx'),
  'introducing-pack-it-up': () => import('@/content/blog/introducing-pack-it-up.mdx'),
  'optimizing-file-uploads-aws-presigned-urls': () =>
    import('@/content/blog/optimizing-file-uploads-aws-presigned-urls.mdx'),
  'react-state-management-global-local-insights': () =>
    import('@/content/blog/react-state-management-global-local-insights.mdx'),
};

// Ordered newest first (by date).
const allBlogPosts: BlogPost[] = [
  {
    kind: 'local',
    id: 'shipping-bookslot-on-turso',
    slug: 'shipping-bookslot-on-turso',
    title: 'Shipping BookSlot on Turso',
    excerpt:
      'Notes on building an embeddable appointment-booking widget: why the data layer ended up on Turso/libSQL, what the Vercel Hobby cron limit forced, and where the design still leaks.',
    date: '2026-07-22T00:00+02:00',
    readTime: '6 min read',
    category: 'Next.js',
    author: 'Taulant Sela',
    imageFit: 'cover',
    image: '/blog/placeholder_blog.svg',
    draft: true,
  },
  {
    kind: 'external',
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
    publisher: 'hoyo.tech',
    mirror: { slug: 'introducing-pack-it-up' },
  },
  {
    kind: 'external',
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
    publisher: 'hoyo.tech',
    mirror: { slug: 'optimizing-file-uploads-aws-presigned-urls' },
  },
  {
    kind: 'external',
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
    publisher: 'hoyo.tech',
    mirror: { slug: 'react-state-management-global-local-insights' },
  },
];

const showDrafts = process.env.NODE_ENV === 'development';

export const blogPosts: BlogPost[] = allBlogPosts.filter(
  (post) => post.kind === 'external' || !post.draft || showDrafts,
);

export function isLocalPost(post: BlogPost): post is LocalBlogPost {
  return post.kind === 'local';
}

/** The `/blog/<slug>` route for a post, if it has a body on this site at all. */
export function blogPostSlug(post: BlogPost): string | undefined {
  return post.kind === 'local' ? post.slug : post.mirror?.slug;
}

/** True when the on-site copy is a mirror of something published elsewhere. */
export function isMirror(post: BlogPost): post is ExternalBlogPost & { mirror: MirrorConfig } {
  return post.kind === 'external' && Boolean(post.mirror);
}

/** Where a card should point: the publisher for external posts, unless their mirror was promoted. */
export function blogPostHref(post: BlogPost): string {
  if (post.kind === 'local') {
    return `/blog/${post.slug}`;
  }

  return post.mirror?.primary ? `/blog/${post.mirror.slug}` : post.url;
}

/** Link props for a card — off-site destinations open in a new tab, on-site ones stay in the SPA. */
export function blogPostLinkProps(post: BlogPost) {
  const href = blogPostHref(post);

  return href.startsWith('/') ? { href } : { href, target: '_blank' as const, rel: 'noopener noreferrer' };
}

/** Call to action for a card, so readers know when they're about to leave the site. */
export function blogPostCtaLabel(post: BlogPost): string {
  const href = blogPostHref(post);

  if (href.startsWith('/')) {
    return 'Read More';
  }

  return post.kind === 'external' && post.publisher ? `Read on ${post.publisher}` : 'Read More';
}

export const fetchBlogPosts = cache(async (): Promise<BlogPost[]> => blogPosts);

export async function fetchLatestBlogPosts(count = 3) {
  const posts = await fetchBlogPosts();
  return posts.slice(0, count);
}

/** Every post with a body on this site — local posts plus mirrors. Drives `generateStaticParams`. */
export async function fetchRenderableBlogPosts(): Promise<BlogPost[]> {
  const posts = await fetchBlogPosts();
  return posts.filter((post) => blogPostSlug(post) !== undefined);
}

/** Local (originally-published-here) posts only — used by the sitemap and the RSS feed. */
export async function fetchLocalBlogPosts(): Promise<LocalBlogPost[]> {
  const posts = await fetchBlogPosts();
  return posts.filter(isLocalPost);
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await fetchRenderableBlogPosts();
  return posts.find((post) => blogPostSlug(post) === slug);
}

export async function loadBlogPostBody(slug: string): Promise<ComponentType | undefined> {
  const load = postBodies[slug];
  if (!load) {
    return undefined;
  }

  const { default: Body } = await load();
  return Body;
}
