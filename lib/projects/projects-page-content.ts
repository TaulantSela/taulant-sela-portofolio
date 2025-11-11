import type { Entry, EntryFieldTypes, EntrySkeletonType } from 'contentful';
import { cache } from 'react';

import { getContentfulClient, isContentfulConfigured, resolveLocalizedField } from '@/lib/contentful';

export type ProjectsPageContent = {
  heading: string;
  description: string;
};

type ContentfulProjectsPageFields = {
  heading?: EntryFieldTypes.Symbol;
  description?: EntryFieldTypes.Text;
};

type ContentfulProjectsPageSkeleton = EntrySkeletonType<ContentfulProjectsPageFields, string>;
type ContentfulProjectsPageEntry = Entry<ContentfulProjectsPageSkeleton>;

function mapProjectsPage(entry: ContentfulProjectsPageEntry): ProjectsPageContent {
  const heading = resolveLocalizedField<string>(entry.fields.heading)?.trim();
  const description = resolveLocalizedField<string>(entry.fields.description)?.trim();

  if (!heading || !description) {
    throw new Error('Projects page entry is missing required fields.');
  }

  return {
    heading,
    description,
  };
}

const projectsPageContentTypeId = process.env.CONTENTFUL_PROJECTS_PAGE_CONTENT_TYPE_ID ?? 'projectsPage';

export const fetchProjectsPageContent = cache(async (): Promise<ProjectsPageContent | null> => {
  if (!isContentfulConfigured) {
    return null;
  }

  try {
    const client = getContentfulClient();
    const entries = await client.getEntries<ContentfulProjectsPageSkeleton>({
      content_type: projectsPageContentTypeId,
      limit: 1,
      include: 0,
    });

    const entry = entries.items[0];

    if (!entry) {
      return null;
    }

    return mapProjectsPage(entry);
  } catch (error) {
    console.error(
      `Failed to fetch projects page content from Contentful (content_type="${projectsPageContentTypeId}")`,
      error,
    );
    return null;
  }
});
