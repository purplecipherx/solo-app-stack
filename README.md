# Solo App Stack

Production-ready affiliate/content site for `soloappstack.com`.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Sanity Studio at `/studio`
- `next-sanity`
- Static generation/ISR-ready pages
- JSON-LD for posts, FAQs, tools, and breadcrumbs
- Sitemap and robots routes

## Install

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=
NEXT_PUBLIC_SITE_URL=https://soloappstack.com
NEXT_PUBLIC_GA_ID=
```

The site includes local fallback seed content, so pages render before Sanity is connected.

## Sanity setup

1. Create a Sanity project at `sanity.io/manage`.
2. Add the project ID to `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. Create a dataset named `production`.
4. Create a read token and set `SANITY_API_READ_TOKEN`.
5. Run the studio locally:

```bash
npm run dev
```

Then open `/studio`.

Optional seed import:

```bash
npm run seed:sanity
```

The seed data includes placeholder affiliate URLs. Replace them with approved partner URLs before launch.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add the environment variables above.
4. Deploy.
5. In Vercel project settings, add `soloappstack.com` and follow the DNS instructions.

No `vercel.json` is required for the default deployment.

## Content model

Sanity schemas are included for:

- Post
- Author
- Category
- Tool
- Comparison
- ToolkitItem
- FAQ
- CTA
- SiteSettings

## Verification

```bash
npm run typecheck
npm run build
```
