import type { Entry, EntryFieldTypes, EntrySkeletonType } from 'contentful';
import { cache } from 'react';

import { getContentfulClient, isContentfulConfigured, resolveLocalizedField } from '@/lib/contentful';

export type ContactSectionContent = {
  eyebrow: string;
  heading: string;
  description: string;
  highlightLabel: string;
  highlightDescription: string;
};

type ContentfulContactSectionFields = {
  eyebrow?: EntryFieldTypes.Symbol;
  heading?: EntryFieldTypes.Symbol;
  description?: EntryFieldTypes.Text;
  highlightLabel?: EntryFieldTypes.Symbol;
  highlightDescription?: EntryFieldTypes.Text;
};

type ContentfulContactSectionSkeleton = EntrySkeletonType<ContentfulContactSectionFields, string>;
type ContentfulContactSectionEntry = Entry<ContentfulContactSectionSkeleton>;

function mapContactSection(entry: ContentfulContactSectionEntry): ContactSectionContent {
  const eyebrow = resolveLocalizedField<string>(entry.fields.eyebrow)?.trim();
  const heading = resolveLocalizedField<string>(entry.fields.heading)?.trim();
  const description = resolveLocalizedField<string>(entry.fields.description)?.trim();
  const highlightLabel = resolveLocalizedField<string>(entry.fields.highlightLabel)?.trim();
  const highlightDescription = resolveLocalizedField<string>(entry.fields.highlightDescription)?.trim();

  if (!eyebrow || !heading || !description || !highlightLabel || !highlightDescription) {
    throw new Error('Contact section entry is missing required fields.');
  }

  return {
    eyebrow,
    heading,
    description,
    highlightLabel,
    highlightDescription,
  };
}

const contactContentTypeId = process.env.CONTENTFUL_CONTACT_CONTENT_TYPE_ID ?? 'contactSection';

export const fetchContactSectionContent = cache(async (): Promise<ContactSectionContent | null> => {
  if (!isContentfulConfigured) {
    return null;
  }

  try {
    const client = getContentfulClient();
    const entries = await client.getEntries<ContentfulContactSectionSkeleton>({
      content_type: contactContentTypeId,
      limit: 1,
      include: 0,
    });

    const entry = entries.items[0];

    if (!entry) {
      return null;
    }

    return mapContactSection(entry);
  } catch (error) {
    console.error(
      `Failed to fetch contact section content from Contentful (content_type="${contactContentTypeId}")`,
      error,
    );
    return null;
  }
});
