import type { Asset, Entry, EntryFieldTypes, EntrySkeletonType } from 'contentful';
import { cache } from 'react';

import { extractAssetUrl, getContentfulClient, isContentfulConfigured, resolveLocalizedField } from '@/lib/contentful';

export type ProjectLink = { label: string; href: string; icon?: 'github' | 'external' };

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  links?: ProjectLink[];
  imageFit?: 'cover' | 'contain';
  role: 'company' | 'personal' | 'oss';
  context: string;
  featuredIndex?: number | null;
};

type ContentfulProjectLinkFields = {
  label: string | null;
  href: string | null;
  icon: string | null;
};

type ContentfulProjectFields = {
  title: EntryFieldTypes.Symbol;
  slug?: EntryFieldTypes.Symbol;
  description: EntryFieldTypes.Text;
  context: EntryFieldTypes.Text;
  tags?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  role?: EntryFieldTypes.Symbol<'company' | 'personal' | 'oss'>;
  links?: EntryFieldTypes.Object<Array<ContentfulProjectLinkFields | null>>;
  imageFit?: EntryFieldTypes.Symbol<'cover' | 'contain'>;
  heroImage?: EntryFieldTypes.AssetLink;
  featuredIndex?: EntryFieldTypes.Integer;
};

type ContentfulProjectSkeleton = EntrySkeletonType<ContentfulProjectFields, 'project'>;
type ContentfulProjectEntry = Entry<ContentfulProjectSkeleton>;

function mapProject(entry: ContentfulProjectEntry): Project | null {
  const { sys, fields } = entry;

  const title = resolveLocalizedField<string>(fields.title);
  const description = resolveLocalizedField<string>(fields.description);
  const context = resolveLocalizedField<string>(fields.context);

  if (!title || !description || !context) {
    return null;
  }

  let links: ProjectLink[] | undefined;
  const linkEntries = resolveLocalizedField<Array<ContentfulProjectLinkFields | null>>(fields.links);

  if (Array.isArray(linkEntries)) {
    links = linkEntries
      .map((link): ProjectLink | null => {
        if (!link) {
          return null;
        }

        const rawLabel = typeof link.label === 'string' ? link.label : '';
        const rawHref = typeof link.href === 'string' ? link.href : '';

        const label = rawLabel.trim();
        const href = rawHref.trim();

        if (!label || !href) {
          return null;
        }

        const icon =
          typeof link.icon === 'string' && link.icon === 'github'
            ? 'github'
            : typeof link.icon === 'string' && link.icon === 'external'
              ? 'external'
              : undefined;

        return { label, href, icon };
      })
      .filter((link): link is ProjectLink => Boolean(link && link.href && link.label));
  }

  const heroImage = resolveLocalizedField<Asset | null>(fields.heroImage) ?? null;
  const tags = resolveLocalizedField<string[]>(fields.tags) ?? [];
  const role = resolveLocalizedField<'company' | 'personal' | 'oss'>(fields.role) ?? 'personal';
  const imageFit = resolveLocalizedField<'cover' | 'contain'>(fields.imageFit);
  const featuredIndex = resolveLocalizedField<number | null>(fields.featuredIndex);

  return {
    id: sys.id,
    title,
    description,
    context,
    tags,
    role,
    image: extractAssetUrl(heroImage),
    imageFit,
    links,
    featuredIndex: typeof featuredIndex === 'number' ? featuredIndex : null,
  };
}

export const fetchProjects = cache(async (): Promise<Project[]> => {
  if (!isContentfulConfigured) {
    return [];
  }

  try {
    const client = getContentfulClient();
    const entries = await client.getEntries<ContentfulProjectSkeleton>({
      content_type: 'project',
      order: ['fields.featuredIndex', '-sys.createdAt'],
      include: 2,
    });

    const mapped = entries.items.map(mapProject).filter((project): project is Project => Boolean(project));

    return mapped.sort((a, b) => {
      const aIndex = a.featuredIndex ?? Number.POSITIVE_INFINITY;
      const bIndex = b.featuredIndex ?? Number.POSITIVE_INFINITY;

      if (aIndex !== bIndex) {
        return aIndex - bIndex;
      }

      return a.title.localeCompare(b.title);
    });
  } catch (error) {
    console.error('Failed to fetch projects from Contentful', error);
    return [];
  }
});

export async function fetchFeaturedProjects(count = 3) {
  const projects = await fetchProjects();
  return projects.slice(0, count);
}
