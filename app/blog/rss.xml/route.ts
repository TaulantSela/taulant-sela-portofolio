import { fetchLocalBlogPosts } from '@/lib/blog/blog-posts';

const siteUrl = 'https://taulantsela.com';
const feedUrl = `${siteUrl}/blog/rss.xml`;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Only on-site posts are syndicated — the Hoyo Tech articles are published (and have a feed) there.
 */
export async function GET() {
  const posts = (await fetchLocalBlogPosts()).filter((post) => !post.draft);
  const lastBuildDate = new Date(posts[0]?.date ?? Date.now()).toUTCString();

  const items = posts
    .map((post) => {
      const url = `${siteUrl}/blog/${post.slug}`;

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <category>${escapeXml(post.category)}</category>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`;
    })
    .join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Taulant Sela — Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Write-ups on shipping side projects, front-end decisions, and modern tooling.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
