import type { Entry, EntryFieldTypes, EntrySkeletonType } from 'contentful';
import { cache } from 'react';

import { getContentfulClient, isContentfulConfigured, resolveLocalizedField } from '@/lib/contentful';

export type BlogPageContent = {
  heading: string;
  description: string;
};

type ContentfulBlogPageFields = {
  heading?: EntryFieldTypes.Symbol;
  description?: EntryFieldTypes.Text;
};

type ContentfulBlogPageSkeleton = EntrySkeletonType<ContentfulBlogPageFields, string>;
type ContentfulBlogPageEntry = Entry<ContentfulBlogPageSkeleton>;

function mapBlogPage(entry: ContentfulBlogPageEntry): BlogPageContent {
  const heading = resolveLocalizedField<string>(entry.fields.heading)?.trim();
  const description = resolveLocalizedField<string>(entry.fields.description)?.trim();

  if (!heading || !description) {
    throw new Error('Blog page entry is missing required fields.');
  }

  return {
    heading,
    description,
  };
}

const blogPageContentTypeId = process.env.CONTENTFUL_BLOG_PAGE_CONTENT_TYPE_ID ?? 'blogPage';

export const fetchBlogPageContent = cache(async (): Promise<BlogPageContent | null> => {
  if (!isContentfulConfigured) {
    return null;
  }

  try {
    const client = getContentfulClient();
    const entries = await client.getEntries<ContentfulBlogPageSkeleton>({
      content_type: blogPageContentTypeId,
      limit: 1,
      include: 0,
    });

    const entry = entries.items[0];

    if (!entry) {
      return null;
    }

    return mapBlogPage(entry);
  } catch (error) {
    console.error(`Failed to fetch blog page content from Contentful (content_type="${blogPageContentTypeId}")`, error);
    return null;
  }
});
