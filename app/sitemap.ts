import { blogPostSlug, fetchRenderableBlogPosts, isLocalPost } from '@/lib/blog/blog-posts';
import type { MetadataRoute } from 'next';

const siteUrl = 'https://taulantsela.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  // Mirrors are canonicalised to their publisher, so they only belong here once promoted.
  const posts = (await fetchRenderableBlogPosts()).filter((post) =>
    isLocalPost(post) ? !post.draft : Boolean(post.mirror?.primary),
  );

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${blogPostSlug(post)}`,
      lastModified: new Date(post.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
