import type { Entry, EntryFieldTypes, EntrySkeletonType } from 'contentful';
import { cache } from 'react';

import { getContentfulClient, isContentfulConfigured, resolveLocalizedField } from '@/lib/contentful';

export type SkillsSectionContent = {
  badgeLeading: string;
  badgeTrailing: string;
  heading: string;
  description: string;
  captionLeading: string;
  captionTrailing: string;
};

type ContentfulSkillsSectionFields = {
  badgeLeading?: EntryFieldTypes.Symbol;
  badgeTrailing?: EntryFieldTypes.Symbol;
  heading?: EntryFieldTypes.Symbol;
  description?: EntryFieldTypes.Text;
  captionLeading?: EntryFieldTypes.Symbol;
  captionTrailing?: EntryFieldTypes.Symbol;
};

type ContentfulSkillsSectionSkeleton = EntrySkeletonType<ContentfulSkillsSectionFields, string>;
type ContentfulSkillsSectionEntry = Entry<ContentfulSkillsSectionSkeleton>;

function mapSkillsSection(entry: ContentfulSkillsSectionEntry): SkillsSectionContent {
  const badgeLeading = resolveLocalizedField<string>(entry.fields.badgeLeading)?.trim();
  const badgeTrailing = resolveLocalizedField<string>(entry.fields.badgeTrailing)?.trim();
  const heading = resolveLocalizedField<string>(entry.fields.heading)?.trim();
  const description = resolveLocalizedField<string>(entry.fields.description)?.trim();
  const captionLeading = resolveLocalizedField<string>(entry.fields.captionLeading)?.trim();
  const captionTrailing = resolveLocalizedField<string>(entry.fields.captionTrailing)?.trim();

  if (!badgeLeading || !badgeTrailing || !heading || !description || !captionLeading || !captionTrailing) {
    throw new Error('Skills section entry is missing required fields.');
  }

  return {
    badgeLeading,
    badgeTrailing,
    heading,
    description,
    captionLeading,
    captionTrailing,
  };
}

const skillsSectionContentTypeId = process.env.CONTENTFUL_SKILLS_SECTION_CONTENT_TYPE_ID ?? 'skillsSection';

export const fetchSkillsSectionContent = cache(async (): Promise<SkillsSectionContent | null> => {
  if (!isContentfulConfigured) {
    return null;
  }

  try {
    const client = getContentfulClient();
    const entries = await client.getEntries<ContentfulSkillsSectionSkeleton>({
      content_type: skillsSectionContentTypeId,
      limit: 1,
      include: 0,
    });

    const entry = entries.items[0];

    if (!entry) {
      return null;
    }

    return mapSkillsSection(entry);
  } catch (error) {
    console.error(
      `Failed to fetch skills section content from Contentful (content_type="${skillsSectionContentTypeId}")`,
      error,
    );
    return null;
  }
});
