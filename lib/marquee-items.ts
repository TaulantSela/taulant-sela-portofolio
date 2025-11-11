import type { Entry, EntryFieldTypes, EntrySkeletonType } from 'contentful';
import { cache } from 'react';

import { getContentfulClient, isContentfulConfigured, resolveLocalizedField } from '@/lib/contentful';

export type MarqueeItem = {
  id: string;
  label: string;
  order?: number | null;
};

type ContentfulMarqueeItemFields = {
  label: EntryFieldTypes.Symbol;
  order?: EntryFieldTypes.Integer;
};

type ContentfulMarqueeItemSkeleton = EntrySkeletonType<ContentfulMarqueeItemFields, string>;
type ContentfulMarqueeItemEntry = Entry<ContentfulMarqueeItemSkeleton>;

function mapMarqueeItem(entry: ContentfulMarqueeItemEntry): MarqueeItem | null {
  const label = resolveLocalizedField<string>(entry.fields.label);

  if (!label) {
    return null;
  }

  const order = resolveLocalizedField<number | null>(entry.fields.order);

  return {
    id: entry.sys.id,
    label,
    order: typeof order === 'number' ? order : null,
  };
}

const marqueeContentTypeId = process.env.CONTENTFUL_MARQUEE_CONTENT_TYPE_ID ?? 'marqueeItem';

export const fetchMarqueeItems = cache(async (): Promise<string[]> => {
  if (!isContentfulConfigured) {
    return [];
  }

  try {
    const client = getContentfulClient();
    const entries = await client.getEntries<ContentfulMarqueeItemSkeleton>({
      content_type: marqueeContentTypeId,
      include: 0,
    });

    const items = entries.items.map(mapMarqueeItem).filter((value): value is MarqueeItem => Boolean(value));

    return items
      .sort((a, b) => {
        const aOrder = a.order ?? Number.POSITIVE_INFINITY;
        const bOrder = b.order ?? Number.POSITIVE_INFINITY;

        if (aOrder !== bOrder) {
          return aOrder - bOrder;
        }

        return a.label.localeCompare(b.label);
      })
      .map((item) => item.label);
  } catch (error) {
    console.error(`Failed to fetch marquee items from Contentful (content_type="${marqueeContentTypeId}")`, error);
    return [];
  }
});
