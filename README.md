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
SANITY_API_WRITE_TOKEN=
NEXT_PUBLIC_SITE_URL=https://soloappstack.com
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=soloappstack.com
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

## Importing Blog Posts

Use JSON batch files for metadata and separate Markdown files for article bodies:

```text
content/
  batches/
    batch-001.json
  posts/
    batch-001/
      best-website-builder-for-cleaners.md
```

Run a dry run first:

```bash
npm run import:posts -- content/batches/batch-001.json --dry-run
```

Import into Sanity:

```bash
npm run import:posts -- content/batches/batch-001.json
```

The batch JSON `body.source` field points to the Markdown file. The importer reads the Markdown file programmatically, converts it to Sanity Portable Text, and upserts the post into Sanity by slug. Re-running the same batch updates existing posts instead of creating duplicates.

The importer also:

- validates batches with `zod`
- creates missing author/category documents
- preserves explicit `publishedAt` dates
- schedules missing `publishedAt` dates by batch schedule mode
- stores external featured image URL, alt, credit, and license
- stores affiliate, SEO, intent, funnel, monetization, and internal link metadata

Sanity is the source of truth for production. The live blog does not render directly from local Markdown.

### Scheduling Modes

Use `schedule.mode` in the batch JSON:

```json
"schedule": {
  "mode": "spreadSinceLastPublished",
  "startAfterLastPublished": true,
  "fallbackStartDate": "2026-06-01",
  "spacingDays": 2,
  "futureStartDate": "2026-06-10",
  "dailyTimes": ["08:00", "12:00", "16:00", "20:00"]
}
```

Modes:

- `fixedSpacing`: old behavior. Missing dates start after the latest Sanity post, or `fallbackStartDate`, then use `spacingDays`.
- `spreadSinceLastPublished`: backfills missing dates evenly between the latest Sanity `publishedAt` and the current import time. Good for importing a batch and making it look naturally spread out since the last import/post.
- `futureSlots`: schedules missing dates into future posting slots using `futureStartDate` and `dailyTimes`. Good for loading a queue of upcoming posts.

Explicit `dates.publishedAt` values on individual posts are always preserved. Only missing/null `publishedAt` values are auto-scheduled.

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
