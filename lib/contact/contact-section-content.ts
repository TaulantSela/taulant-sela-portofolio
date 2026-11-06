import { cache } from 'react';

export type ContactSectionContent = {
  eyebrow: string;
  heading: string;
  description: string;
  highlightLabel: string;
  highlightDescription: string;
};

export const contactSectionContent: ContactSectionContent = {
  eyebrow: "Let's build something amazing",
  heading: 'Ready to bring your next idea to life?',
  description: "Tell me what you're building, what's holding it back, and when it needs to ship.",
  highlightLabel: 'How I work',
  highlightDescription: 'I start with the problem, show progress in regular demos, and ship in small steps.',
};

export const fetchContactSectionContent = cache(async (): Promise<ContactSectionContent> => contactSectionContent);
