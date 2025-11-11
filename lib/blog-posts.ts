import type { Asset, Entry, EntryFieldTypes, EntrySkeletonType } from 'contentful';
import { cache } from 'react';

import { extractAssetUrl, getContentfulClient, isContentfulConfigured, resolveLocalizedField } from '@/lib/contentful';

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

type ContentfulBlogPostFields = {
  title: EntryFieldTypes.Symbol;
  slug?: EntryFieldTypes.Symbol;
  excerpt?: EntryFieldTypes.Text;
  publishDate?: EntryFieldTypes.Date;
  readTime?: EntryFieldTypes.Symbol;
  category?: EntryFieldTypes.Symbol;
  author?: EntryFieldTypes.Symbol;
  externalUrl?: EntryFieldTypes.Symbol;
  imageFit?: EntryFieldTypes.Symbol<'cover' | 'contain'>;
  heroImage?: EntryFieldTypes.AssetLink;
};

type ContentfulBlogPostSkeleton = EntrySkeletonType<ContentfulBlogPostFields, 'post'>;
type ContentfulBlogPostEntry = Entry<ContentfulBlogPostSkeleton>;

function mapBlogPost(entry: ContentfulBlogPostEntry): BlogPost | null {
  const { sys, fields } = entry;

  const title = resolveLocalizedField<string>(fields.title);
  const publishDate = resolveLocalizedField<string>(fields.publishDate);

  if (!title || !publishDate) {
    return null;
  }

  const externalUrl = resolveLocalizedField<string>(fields.externalUrl);
  const slug = resolveLocalizedField<string>(fields.slug);

  const url = externalUrl ?? (slug ? `https://taulantsela.com/blog/${slug}` : 'https://taulantsela.com/blog');

  const heroImage = resolveLocalizedField<Asset | null>(fields.heroImage) ?? null;

  return {
    id: sys.id,
    title,
    excerpt: resolveLocalizedField<string>(fields.excerpt) ?? '',
    date: publishDate,
    readTime: resolveLocalizedField<string>(fields.readTime) ?? '',
    category: resolveLocalizedField<string>(fields.category) ?? 'General',
    image: extractAssetUrl(heroImage),
    imageFit: resolveLocalizedField<'cover' | 'contain'>(fields.imageFit),
    author: resolveLocalizedField<string>(fields.author) ?? 'Taulant Sela',
    url,
  };
}

export const fetchBlogPosts = cache(async (): Promise<BlogPost[]> => {
  if (!isContentfulConfigured) {
    return [];
  }

  try {
    const client = getContentfulClient();
    const entries = await client.getEntries<ContentfulBlogPostSkeleton>({
      content_type: 'post',
      order: ['-fields.publishDate'],
      include: 2,
    });

    return entries.items.map(mapBlogPost).filter((post): post is BlogPost => Boolean(post));
  } catch (error) {
    console.error('Failed to fetch blog posts from Contentful', error);
    return [];
  }
});

export async function fetchLatestBlogPosts(count = 3) {
  const posts = await fetchBlogPosts();
  return posts.slice(0, count);
}
