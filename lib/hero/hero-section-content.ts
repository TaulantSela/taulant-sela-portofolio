import type { Asset, Entry, EntryFieldTypes, EntrySkeletonType } from 'contentful';
import { cache } from 'react';

import { extractAssetUrl, getContentfulClient, isContentfulConfigured, resolveLocalizedField } from '@/lib/contentful';

export type HeroSectionContent = {
  headlineHighlight: string;
  headlineSecondary: string;
  description: string;
  marqueeItems: string[];
  cvUrl: string;
};

type ContentfulHeroSectionFields = {
  headlineHighlight?: EntryFieldTypes.Symbol;
  headlineSecondary?: EntryFieldTypes.Symbol;
  description?: EntryFieldTypes.Text;
  marqueeItems?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  cv?: EntryFieldTypes.AssetLink;
};

type ContentfulHeroSectionSkeleton = EntrySkeletonType<ContentfulHeroSectionFields, string>;
type ContentfulHeroSectionEntry = Entry<ContentfulHeroSectionSkeleton>;

function mapHeroSection(entry: ContentfulHeroSectionEntry): HeroSectionContent {
  const headlineHighlight = resolveLocalizedField<string>(entry.fields.headlineHighlight)?.trim();
  const headlineSecondary = resolveLocalizedField<string>(entry.fields.headlineSecondary)?.trim();
  const description = resolveLocalizedField<string>(entry.fields.description)?.trim();

  const marqueeItemsRaw = resolveLocalizedField<string[]>(entry.fields.marqueeItems) ?? [];
  const marqueeItems = marqueeItemsRaw
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter((item): item is string => Boolean(item));

  const cvAsset = resolveLocalizedField<Asset | null>(entry.fields.cv) ?? null;
  const cvUrl = cvAsset ? extractAssetUrl(cvAsset) : '';

  if (!headlineHighlight || !headlineSecondary || !description || !marqueeItems || !cvUrl) {
    throw new Error('Hero section entry is missing required fields.');
  }

  return {
    headlineHighlight,
    headlineSecondary,
    description,
    marqueeItems,
    cvUrl,
  };
}

const heroSectionContentTypeId = process.env.CONTENTFUL_HERO_SECTION_CONTENT_TYPE_ID ?? 'heroSection';

export const fetchHeroSectionContent = cache(async (): Promise<HeroSectionContent | null> => {
  if (!isContentfulConfigured) {
    return null;
  }

  try {
    const client = getContentfulClient();
    const entries = await client.getEntries<ContentfulHeroSectionSkeleton>({
      content_type: heroSectionContentTypeId,
      limit: 1,
      include: 2,
    });

    const entry = entries.items[0];

    if (!entry) {
      return null;
    }

    return mapHeroSection(entry);
  } catch (error) {
    console.error(
      `Failed to fetch hero section content from Contentful (content_type="${heroSectionContentTypeId}")`,
      error,
    );
    return null;
  }
});
