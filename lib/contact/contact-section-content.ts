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
  description:
    "Ready to ship your next big thing? Tell me the vision, the constraints, or the gap you need to close, and I'll chart the path from idea to launch.",
  highlightLabel: 'How I work',
  highlightDescription:
    'I stay close to product, design, and engineering partners—listening first, iterating thoughtfully, and shipping software that feels personal and dependable.',
};

export const fetchContactSectionContent = cache(async (): Promise<ContactSectionContent> => contactSectionContent);
