import { createClient, type Asset, type AssetFile, type LinkType, type UnresolvedLink } from 'contentful';

const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_DELIVERY_TOKEN ?? process.env.CONTENTFUL_ACCESS_TOKEN;
const environment = process.env.CONTENTFUL_ENVIRONMENT ?? 'master';

export const isContentfulConfigured = Boolean(space && accessToken);

let client: ReturnType<typeof createClient> | null = null;

export function getContentfulClient() {
  if (!isContentfulConfigured) {
    throw new Error('Contentful environment variables are not configured');
  }

  if (!client) {
    client = createClient({
      space: space!,
      accessToken: accessToken!,
      environment,
    });
  }
  return client;
}

type AssetFileField = Asset['fields'] extends { file?: infer File } ? File : never;

function isAssetFile(value: unknown): value is AssetFile {
  return (
    Boolean(value) &&
    typeof value === 'object' &&
    'url' in (value as Record<string, unknown>) &&
    typeof (value as { url?: unknown }).url === 'string'
  );
}

function resolveAssetFile(fileField: AssetFileField | undefined): AssetFile | null {
  if (!fileField) {
    return null;
  }

  if (isAssetFile(fileField)) {
    return fileField;
  }

  if (Array.isArray(fileField)) {
    for (const candidate of fileField) {
      if (isAssetFile(candidate)) {
        return candidate;
      }
    }
    return null;
  }

  if (typeof fileField === 'object') {
    for (const candidate of Object.values(fileField as Record<string, unknown>)) {
      if (isAssetFile(candidate)) {
        return candidate;
      }
    }
  }

  return null;
}

export type LocalizedField<T> =
  | T
  | Record<string, T | UnresolvedLink<LinkType> | null | undefined>
  | UnresolvedLink<LinkType>
  | undefined
  | null;

function isEntityWithFields(value: unknown): value is { fields: unknown } {
  return Boolean(value) && typeof value === 'object' && 'fields' in (value as Record<string, unknown>);
}

function isUnresolvedLink(value: unknown): value is UnresolvedLink<LinkType> {
  if (!value || typeof value !== 'object') {
    return false;
  }

  if (!('sys' in (value as Record<string, unknown>))) {
    return false;
  }

  return !('fields' in (value as Record<string, unknown>));
}

export function resolveLocalizedField<T>(field: LocalizedField<T>): T | undefined {
  if (field == null) {
    return undefined;
  }

  if (Array.isArray(field)) {
    return field as T;
  }

  if (isEntityWithFields(field)) {
    return field as T;
  }

  if (isUnresolvedLink(field)) {
    return undefined;
  }

  if (typeof field === 'object') {
    for (const value of Object.values(field as Record<string, unknown>)) {
      if (value == null || isUnresolvedLink(value)) {
        continue;
      }

      return value as T;
    }

    return undefined;
  }

  return field;
}

export function extractAssetUrl(asset?: Asset | null) {
  if (!asset || !asset.fields) {
    return '';
  }

  const file = resolveAssetFile((asset.fields as { file?: AssetFileField }).file);

  if (!file?.url) {
    return '';
  }

  const url = file.url;

  if (url.startsWith('//')) {
    return `https:${url}`;
  }

  if (!url.startsWith('http')) {
    return `https://${url}`;
  }

  return url;
}
