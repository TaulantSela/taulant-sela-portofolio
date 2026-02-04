const API_BASE = 'https://github-contributions-api.jogruber.de/v4';

export const GITHUB_USERNAME = 'TaulantSela';
export const START_YEAR = 2017;
export const CURRENT_YEAR = new Date().getFullYear();
export const YEARS = Array.from({ length: CURRENT_YEAR - START_YEAR + 1 }, (_, idx) => CURRENT_YEAR - idx);

export type ContributionDay = {
  date: string;
  count: number;
};

export type ApiContributionDay = ContributionDay & {
  color?: string;
};

export type ContributionsResponse = {
  totalContributions?: number;
  total?: Record<string, number>;
  weeks?: Array<{
    contributionDays: ApiContributionDay[];
  }>;
  contributions?: ApiContributionDay[];
};

export type FetchContributionRangeArgs = {
  username?: string;
  fromYear?: number;
  toYear?: number;
  signal?: AbortSignal;
};

export async function fetchContributionsRange({
  username = GITHUB_USERNAME,
  fromYear = START_YEAR,
  toYear = CURRENT_YEAR,
  signal,
}: FetchContributionRangeArgs = {}) {
  const from = `${fromYear}-01-01`;
  const to = `${toYear}-12-31`;
  const url = `${API_BASE}/${username}?from=${from}&to=${to}`;

  const res = await fetch(url, { cache: 'no-store', signal });
  if (!res.ok) {
    throw new Error(`Status ${res.status}`);
  }

  return (await res.json()) as ContributionsResponse;
}
