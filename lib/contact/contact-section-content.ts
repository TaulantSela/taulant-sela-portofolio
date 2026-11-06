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
    "Tell me what you're building, what's holding it back, and when it needs to ship. I'll reply with how I'd approach it.",
  highlightLabel: 'How I work',
  highlightDescription:
    'I stay close to product, design, and engineering partners—listening first, iterating thoughtfully, and shipping software that feels personal and dependable.',
};

export const fetchContactSectionContent = cache(async (): Promise<ContactSectionContent> => contactSectionContent);
