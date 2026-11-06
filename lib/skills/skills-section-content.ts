import { cache } from 'react';

export type SkillsSectionContent = {
  badgeLeading: string;
  badgeTrailing: string;
  heading: string;
  description: string;
  captionLeading: string;
  captionTrailing: string;
};

export const skillsSectionContent: SkillsSectionContent = {
  badgeLeading: 'Tech Arsenal',
  badgeTrailing: 'Core Stack',
  heading: 'What I work with.',
  description: 'The languages, frameworks and tools I use at work and on my own projects.',
  captionLeading: 'Featured stack',
  captionTrailing: 'Always evolving',
};

export const fetchSkillsSectionContent = cache(async (): Promise<SkillsSectionContent> => skillsSectionContent);
