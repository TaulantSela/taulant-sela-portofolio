<div align="center">

  <img src="app/favicon.ico" alt="Taulant Sela logo" width="96" height="96" />

  <h1>Taulant Sela — Portfolio</h1>

  <p>
    <a href="https://taulantsela.com" target="_blank" rel="noopener noreferrer"><strong>Visit the Live Site ↗</strong></a>
  </p>

  <p>Personal portfolio built with Next.js and TypeScript.</p>

  <p>
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://taulantsela.com" alt="QR Code - Scan to visit portfolio" />
  </p>

  <p><em>Scan the QR code to visit my portfolio</em></p>

</div>

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project documentation

- `docs/project-overview.md` — architecture summary, integrations and update log. Update this file with every noticeable change.

## Content

All site content lives in code under `lib/`. Edit the relevant module and redeploy to publish changes:

- `lib/projects/projects.ts` — project cards (ordered by `featuredIndex`).
- `lib/blog/blog-posts.ts` — blog post cards (ordered newest first).
- `lib/hero/`, `lib/skills/`, `lib/contact/`, and the `*-section-content.ts` / `*-page-content.ts` files — section and archive-page copy.
- `lib/skills/tech-stack.ts` — the tech stack grid.

Images and the CV live in `public/` (`public/projects/`, `public/blog/`, `public/cv/`). Add an asset there and reference it with an absolute path (e.g. `/projects/my-logo.png`).

## Email setup (contact form)

The `/contact` form sends submissions through Gmail using Nodemailer.

1. Enable 2-Step Verification on the Gmail account you plan to send from.
2. Generate a Gmail App Password (Account settings → Security → App passwords) and copy it.
3. Add the following environment variables locally (`.env`) and in your deployment platform:
   - `_MAIL_USER`\_ the Gmail address used to send emails.
   - `GMAIL_APP_PASSWORD`: the 16-character app password generated above.
   - `CONTACT_RECIPIENT_EMAIL` _(optional)_: overrides the inbox that receives messages. Defaults to `GMAIL_USER`.
4. After updating the variables, restart the dev server (`npm run dev`) or redeploy so the new credentials are picked up.

If either `GMAIL_USER` or `GMAIL_APP_PASSWORD` is missing, the API will return a 500 error and log a configuration warning.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
