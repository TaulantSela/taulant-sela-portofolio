export type ThesisDemo = {
  approach: string;
  href: string;
  note: string;
};

export type ThesisDemoGroup = {
  app: string;
  summary: string;
  demos: ThesisDemo[];
};

// The nine deployed variants behind the master-thesis study. They live here rather
// than in the project's `links` because a card can only carry a link or two before
// the icon row stops being readable.
export const thesisDemoGroups: ThesisDemoGroup[] = [
  {
    app: 'Catalog',
    summary: 'Read-heavy product listing with filtering — the widest spread of approaches in the study.',
    demos: [
      {
        approach: 'Local State',
        href: 'https://thesis-catalog-local-state-pink.vercel.app',
        note: 'Baseline: component-level useState, no shared store.',
      },
      {
        approach: 'Context API',
        href: 'https://thesis-catalog-context-chi.vercel.app',
        note: 'Multiple focused contexts, split to limit re-render scope.',
      },
      {
        approach: 'Context Hell',
        href: 'https://thesis-catalog-context-hell-henna.vercel.app',
        note: 'Deliberate anti-pattern: one wide context re-rendering the tree.',
      },
      {
        approach: 'Redux Toolkit',
        href: 'https://thesis-catalog-redux-rtk-ruddy.vercel.app',
        note: 'Normalized slices with selector-based subscriptions.',
      },
      {
        approach: 'Zustand',
        href: 'https://thesis-catalog-zustand.vercel.app',
        note: 'Minimal external store with per-slice subscriptions.',
      },
    ],
  },
  {
    app: 'Dashboard',
    summary: 'Real-time widgets updating on an interval — stresses frequent, partial state writes.',
    demos: [
      {
        approach: 'Context',
        href: 'https://thesis-dashboard-context.vercel.app',
        note: 'Context-driven updates across independent widgets.',
      },
      {
        approach: 'Redux Toolkit',
        href: 'https://thesis-dashboard-redux-opal.vercel.app',
        note: 'Store-driven updates with memoized selectors.',
      },
    ],
  },
  {
    app: 'Form',
    summary: 'Write-heavy multi-step form — stresses per-keystroke state churn.',
    demos: [
      {
        approach: 'Context',
        href: 'https://thesis-form-context.vercel.app',
        note: 'Form state held in context and consumed per field.',
      },
      {
        approach: 'Redux Toolkit',
        href: 'https://thesis-form-redux-livid.vercel.app',
        note: 'Field updates dispatched through the store.',
      },
    ],
  },
];

export const thesisDemoCount = thesisDemoGroups.reduce((total, group) => total + group.demos.length, 0);
