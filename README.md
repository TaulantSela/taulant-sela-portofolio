<p align="center">
  <img src="app/favicon.ico" alt="Taulant Sela logo" width="96" height="96" />
</p>

<h1 align="center">👨‍💻 Taulant Sela — Portfolio</h1>

<p align="center">
  The source of my personal site: the client platforms I've worked on, the products I build on the side, and the articles I've written about them.
</p>

<p align="center">
  <strong><a href="https://taulantsela.com">▶ Visit taulantsela.com →</a></strong>
</p>

---

Everything on the site (projects, posts, bio, tech stack) lives in typed TypeScript modules in this
repo. There is no CMS: adding a project or a post is a code change and a redeploy. Project dates
and commit counts come live from GitHub, so the projects page stays current without manual edits.

## What's on the site

| Route | What you'll find |
|-------|------------------|
| `/` | Hero with current role and links, a GitHub contribution calendar with a year picker, three highlighted projects, the tech stack grid, the latest three posts, and a contact form |
| `/projects` | Every project as a card (company, personal, open source), sortable by **Latest**, **Oldest** or **Most notable** |
| `/projects/master-thesis` | The nine deployed apps from my React state-management study, grouped by application type |
| `/blog` | Posts written here (MDX, rendered at `/blog/<slug>`) and posts published elsewhere, such as the Hoyo Tech blog |
| `/blog/rss.xml` | RSS feed of the on-site posts |

Also included: light, dark and system themes, a generated Open Graph image, `sitemap.xml` and
`robots.txt`, a CV linked from the hero, and Vercel Analytics + Speed Insights.

## How it works

1. **Next.js 15 App Router** with React 19 Server Components and TypeScript. Styling is
   Tailwind CSS v4 with shadcn/ui primitives in `components/ui/`, the Geist font, and Lucide /
   react-icons.
2. **Content modules** in `lib/` each export a typed constant plus a `fetch*` accessor wrapped in
   React's `cache`. The pages read them on the server and render statically.
3. **GitHub metrics** (`lib/github/repo-metrics.ts`): for every project with a GitHub link, the
   site fetches the repo's creation date, last push, stars and the number of commits I authored.
   Responses are cached for 24 hours. If a request fails (private repo without a token, rate
   limit, renamed repo), that project falls back to its hand-written dates.
4. **Most notable** blends an editorial `weight` (0–100) with measured activity: commits count
   most, then recency, then stars. Client work with no public repo keeps its authored values.
5. **Blog posts** are MDX files in `content/blog/`, compiled by `@next/mdx` and styled with
   `mdx-components.tsx` and Tailwind Typography. Posts published elsewhere can keep an on-site
   mirror. The mirror's `rel=canonical` points at the original and it stays out of the sitemap
   and the feed, so the two copies never compete in search.
6. **Contact form** posts to `/api/contact`, which sends the message through Gmail SMTP with
   Nodemailer and sets `Reply-To` to the sender.

`docs/project-overview.md` holds the longer architecture notes and the update log. Update it with
every noticeable change.

## Adding content

### A project

1. Put the logo in `public/projects/` (e.g. `my-app_logo.svg`).
2. Add an entry to the `projects` array in `lib/projects/projects.ts`:

   ```ts
   {
     id: 'my-app',
     startedAt: '2026-11', // YYYY-MM, fallback only when there is a GitHub link
     updatedAt: '2026-11',
     weight: 60, // 0–100, keep values distinct
     title: 'My App - Short Tagline',
     role: 'personal', // 'company' | 'personal' | 'oss'
     tags: ['Next.js', 'TypeScript'],
     imageFit: 'contain',
     image: '/projects/my-app_logo.svg',
     links: [
       { label: 'Live Demo', href: 'https://my-app.vercel.app' },
       { label: 'GitHub', href: 'https://github.com/TaulantSela/my-app', icon: 'github' },
     ],
     description: 'One or two sentences for the card.',
     context: 'What I did on it, shown under the description.',
   },
   ```

3. Position matters: the array order is the homepage order, and the first three entries are the
   highlights. `/projects` ignores it and sorts on its own.

### A blog post

- **Written here:** add `content/blog/<slug>.mdx`, register it in `postBodies` in
  `lib/blog/blog-posts.ts`, and add a `kind: 'local'` entry to the list (newest first). Set
  `draft: true` to see it in `npm run dev` only.
- **Published elsewhere:** add a `kind: 'external'` entry with the original `url`. Cards link out.
  To keep an on-site copy, add the MDX file and a `mirror: { slug }`. If the original ever
  disappears, set `mirror.primary: true` and the on-site copy takes over.

Cover images go in `public/blog/`.

### Everything else

- `lib/hero/`, `lib/skills/`, `lib/contact/` and the `*-section-content.ts` /
  `*-page-content.ts` modules: section and archive-page copy.
- `lib/skills/tech-stack.ts`: the tech stack grid.
- `lib/projects/thesis-demos.ts`: the master-thesis demo links.
- `public/cv/`: the CV linked from the hero.

Reference assets in `public/` with an absolute path, e.g. `/projects/my-app_logo.svg`.

## Run locally

```bash
npm install
cp .env.example .env   # then fill in the values you need
npm run dev            # http://localhost:3000 (Turbopack)
```

Other scripts: `npm run lint`, `npm run build`, `npm run start`.

| Variable | Needed for |
|----------|------------|
| `GMAIL_USER` | Contact form: the Gmail account that sends the messages |
| `GMAIL_APP_PASSWORD` | Contact form: a Gmail App Password for that account |
| `CONTACT_RECIPIENT_EMAIL` | Optional: the inbox that receives messages (defaults to `GMAIL_USER`) |
| `GITHUB_TOKEN` | Optional: GitHub metrics on `/projects`. Needs the `repo` scope, because some linked repos are private |

Without `GITHUB_TOKEN`, requests go out anonymously: private repos (and anything past GitHub's
60-requests-per-hour limit) fall back to the dates in `lib/projects/projects.ts`.

### Contact form email setup

1. Turn on 2-Step Verification for the Gmail account you'll send from.
2. Create an App Password (Google Account → Security → App passwords).
3. Set `GMAIL_USER` and `GMAIL_APP_PASSWORD` in `.env` and in your Vercel project.
4. Restart `npm run dev` or redeploy so the new values are picked up.

If either variable is missing, `/api/contact` returns a 500 and logs a configuration warning.

## Deploy

The site runs on Vercel. Content lives in code, so every change ships with a redeploy. Set the
same environment variables in the Vercel project as in your local `.env`.
