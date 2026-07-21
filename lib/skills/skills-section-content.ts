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
  heading: 'The toolkit behind thoughtful digital experiences.',
  description:
    'A collection of frameworks and tools that help me craft dependable, well-designed software.',
  captionLeading: 'Featured stack',
  captionTrailing: 'Always evolving',
};

export const fetchSkillsSectionContent = cache(async (): Promise<SkillsSectionContent> => skillsSectionContent);
