// theme-utils.ts
export function detectTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  if (storedTheme) return storedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
