import type { Entry, EntryFieldTypes, EntrySkeletonType } from 'contentful';
import { cache } from 'react';

import { getContentfulClient, isContentfulConfigured, resolveLocalizedField } from '@/lib/contentful';

export type BlogSectionContent = {
  eyebrow: string;
  heading: string;
  description: string;
};

type ContentfulBlogSectionFields = {
  eyebrow?: EntryFieldTypes.Symbol;
  heading?: EntryFieldTypes.Symbol;
  description?: EntryFieldTypes.Text;
};

type ContentfulBlogSectionSkeleton = EntrySkeletonType<ContentfulBlogSectionFields, string>;
type ContentfulBlogSectionEntry = Entry<ContentfulBlogSectionSkeleton>;

function mapBlogSection(entry: ContentfulBlogSectionEntry): BlogSectionContent {
  const eyebrow = resolveLocalizedField<string>(entry.fields.eyebrow)?.trim();
  const heading = resolveLocalizedField<string>(entry.fields.heading)?.trim();
  const description = resolveLocalizedField<string>(entry.fields.description)?.trim();

  if (!eyebrow || !heading || !description) {
    throw new Error('Blog section entry is missing required fields.');
  }

  return {
    eyebrow,
    heading,
    description,
  };
}

const blogSectionContentTypeId = process.env.CONTENTFUL_BLOG_SECTION_CONTENT_TYPE_ID ?? 'blogSection';

export const fetchBlogSectionContent = cache(async (): Promise<BlogSectionContent | null> => {
  if (!isContentfulConfigured) {
    return null;
  }

  try {
    const client = getContentfulClient();
    const entries = await client.getEntries<ContentfulBlogSectionSkeleton>({
      content_type: blogSectionContentTypeId,
      limit: 1,
      include: 0,
    });

    const entry = entries.items[0];

    if (!entry) {
      return null;
    }

    return mapBlogSection(entry);
  } catch (error) {
    console.error(
      `Failed to fetch blog section content from Contentful (content_type="${blogSectionContentTypeId}")`,
      error,
    );
    return null;
  }
});
