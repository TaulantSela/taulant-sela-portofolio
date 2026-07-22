import { cache } from 'react';

import { GITHUB_USERNAME } from '@/lib/github/contributions-api';

const API_BASE = 'https://api.github.com';

/** Repo metadata is refreshed daily; a stale month is harmless, a failed build is not. */
const REVALIDATE_SECONDS = 60 * 60 * 24;

export type RepoMetrics = {
  /** `owner/name` */
  repo: string;
  /** Repo creation, full ISO timestamp. */
  createdAt: string;
  /** Last push, full ISO timestamp — full precision so same-month repos still order correctly. */
  pushedAt: string;
  /** Commits authored by {@link GITHUB_USERNAME} on the default branch. */
  commits: number;
  stars: number;
};

/** Pulls `owner/name` out of a GitHub URL, or null if it isn't one. */
export function parseRepoSlug(href: string): string | null {
  const match = /^https?:\/\/(?:www\.)?github\.com\/([^/]+)\/([^/?#]+)/.exec(href);
  return match ? `${match[1]}/${match[2].replace(/\.git$/, '')}` : null;
}

function headers() {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    // GitHub rejects requests without one.
    'User-Agent': 'taulantsela.dev',
    // GITHUB_TOKEN needs the `repo` scope — several of the linked repos are private,
    // and anonymous requests are capped at 60/hour per IP anyway. Without it every
    // project quietly falls back to its authored dates.
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function fetchRepo(repo: string) {
  const res = await fetch(`${API_BASE}/repos/${repo}`, {
    headers: headers(),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`GitHub repo ${repo}: ${res.status}`);
  }

  return (await res.json()) as { created_at: string; pushed_at: string; stargazers_count: number };
}

/**
 * GitHub has no commit-count endpoint, so we ask for a single commit and read the
 * page number of the `rel="last"` link — with `per_page=1` that page number *is* the total.
 * No `Link` header means the result fits on one page: 0 or 1 commits.
 */
async function fetchCommitCount(repo: string) {
  const res = await fetch(`${API_BASE}/repos/${repo}/commits?author=${GITHUB_USERNAME}&per_page=1`, {
    headers: headers(),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`GitHub commits ${repo}: ${res.status}`);
  }

  const link = res.headers.get('link');
  const last = link ? /[?&]page=(\d+)>;\s*rel="last"/.exec(link) : null;
  if (last) {
    return Number(last[1]);
  }

  const commits = (await res.json()) as unknown[];
  return commits.length;
}

async function fetchOne(repo: string): Promise<RepoMetrics> {
  const [meta, commits] = await Promise.all([fetchRepo(repo), fetchCommitCount(repo)]);

  return {
    repo,
    createdAt: meta.created_at,
    pushedAt: meta.pushed_at,
    commits,
    stars: meta.stargazers_count,
  };
}

/**
 * Fetches metrics for every repo, tolerating partial failure — a rate-limited or
 * renamed repo simply drops out of the map and the caller falls back to authored data.
 */
export const fetchRepoMetrics = cache(async (repos: string[]): Promise<Map<string, RepoMetrics>> => {
  const unique = [...new Set(repos)];
  const results = await Promise.allSettled(unique.map(fetchOne));
  const metrics = new Map<string, RepoMetrics>();

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      metrics.set(result.value.repo, result.value);
    } else if (process.env.NODE_ENV !== 'production') {
      console.warn(`[github] ${unique[index]} metrics unavailable:`, result.reason);
    }
  });

  return metrics;
});
