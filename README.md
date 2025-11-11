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

## Contentful setup

1. Create a free [Contentful](https://www.contentful.com/) space and add a dataset (environment) – the default is `master`.
2. Define the content models used by the site:
   - `Post` (`post`) with fields for title, slug, excerpt, publishDate, readTime, category, author, externalUrl, imageFit (optional enum: `cover`, `contain`), and heroImage (asset).
   - `Project` (`project`) with fields for title, slug, description, context, tags (short text list), role (enum: `company`, `personal`, `oss`), links (JSON array of `{ label, href, icon }`), imageFit (optional enum), heroImage (asset), and featuredIndex (number for ordering highlights).
   - `Blog Page` (`blogPage`) with single-entry fields for heading (short text) and description (long text).
   - `Projects Page` (`projectsPage`) with single-entry fields for heading (short text) and description (long text).
3. Generate a Content Delivery API access token (and an optional Preview API token for draft previewing).
4. Add the following environment variables when running locally or deploying:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_ENVIRONMENT` (defaults to `master` if omitted)
   - `CONTENTFUL_DELIVERY_TOKEN`
   - `CONTENTFUL_PREVIEW_TOKEN` (only required if you enable preview mode)
   - `CONTENTFUL_BLOG_PAGE_CONTENT_TYPE_ID` (defaults to `blogPage`)
   - `CONTENTFUL_PROJECTS_PAGE_CONTENT_TYPE_ID` (defaults to `projectsPage`)
5. Trigger a rebuild (or run `npm run dev`) after updating CMS content so the latest entries are fetched.

The site expects the Contentful credentials to be present; without them the blog and projects sections will render empty states.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
