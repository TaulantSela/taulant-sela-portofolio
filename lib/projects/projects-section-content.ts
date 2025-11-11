import type { Entry, EntryFieldTypes, EntrySkeletonType } from 'contentful';
import { cache } from 'react';

import { getContentfulClient, isContentfulConfigured, resolveLocalizedField } from '@/lib/contentful';

export type ProjectsSectionContent = {
  badgeLeading: string;
  badgeTrailing: string;
  heading: string;
  description: string;
};

type ContentfulProjectsSectionFields = {
  badgeLeading?: EntryFieldTypes.Symbol;
  badgeTrailing?: EntryFieldTypes.Symbol;
  heading?: EntryFieldTypes.Symbol;
  description?: EntryFieldTypes.Text;
};

type ContentfulProjectsSectionSkeleton = EntrySkeletonType<ContentfulProjectsSectionFields, string>;
type ContentfulProjectsSectionEntry = Entry<ContentfulProjectsSectionSkeleton>;

function mapProjectsSection(entry: ContentfulProjectsSectionEntry): ProjectsSectionContent {
  const badgeLeading = resolveLocalizedField<string>(entry.fields.badgeLeading)?.trim();
  const badgeTrailing = resolveLocalizedField<string>(entry.fields.badgeTrailing)?.trim();
  const heading = resolveLocalizedField<string>(entry.fields.heading)?.trim();
  const description = resolveLocalizedField<string>(entry.fields.description)?.trim();

  if (!badgeLeading || !badgeTrailing || !heading || !description) {
    throw new Error('Projects section entry is missing required fields.');
  }

  return {
    badgeLeading,
    badgeTrailing,
    heading,
    description,
  };
}

const projectsSectionContentTypeId = process.env.CONTENTFUL_PROJECTS_SECTION_CONTENT_TYPE_ID ?? 'projectsSection';

export const fetchProjectsSectionContent = cache(async (): Promise<ProjectsSectionContent | null> => {
  if (!isContentfulConfigured) {
    return null;
  }

  try {
    const client = getContentfulClient();
    const entries = await client.getEntries<ContentfulProjectsSectionSkeleton>({
      content_type: projectsSectionContentTypeId,
      limit: 1,
      include: 0,
    });

    const entry = entries.items[0];

    if (!entry) {
      return null;
    }

    return mapProjectsSection(entry);
  } catch (error) {
    console.error(
      `Failed to fetch projects section content from Contentful (content_type="${projectsSectionContentTypeId}")`,
      error,
    );
    return null;
  }
});
