import {existsSync, readFileSync} from "node:fs";
import path from "node:path";
import {createClient} from "@sanity/client";
import matter from "gray-matter";
import {toMarkdown} from "mdast-util-to-markdown";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import {unified} from "unified";
import {z} from "zod";
import {slugify} from "../lib/utils";

type PortableTextBlock = Record<string, unknown>;

const statusSchema = z.enum(["draft", "published"]);
const intentSchema = z.enum(["informational", "commercial", "transactional", "comparison", "local-business"]);
const funnelStageSchema = z.enum(["top", "middle", "bottom"]);
const schemaTypeSchema = z.enum(["BlogPosting", "FAQPage", "BreadcrumbList", "SoftwareApplication", "Product"]);

const dateString = z.string().refine((value) => !Number.isNaN(Date.parse(value)), "Invalid date string");

const blogPostSeedSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase kebab-case"),
  status: statusSchema.optional(),
  title: z.string().min(1),
  seoTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  excerpt: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()).default([]),
  intent: intentSchema,
  funnelStage: funnelStageSchema,
  monetization: z.array(z.string()).default([]),
  featuredImage: z.object({
    url: z.string().url(),
    alt: z.string().min(1),
    credit: z.string().optional(),
    license: z.string().optional()
  }),
  dates: z.object({
    publishedAt: dateString.nullable().optional(),
    updatedAt: dateString.nullable().optional()
  }).default({}),
  seo: z.object({
    canonicalUrl: z.string().url(),
    noindex: z.boolean().default(false),
    schema: z.array(schemaTypeSchema).default(["BlogPosting", "BreadcrumbList"])
  }),
  affiliate: z.object({
    hasAffiliateLinks: z.boolean().default(false),
    disclosureRequired: z.boolean().default(false)
  }),
  internalLinks: z.array(z.string()).default([]),
  body: z.object({
    format: z.enum(["markdown", "mdx"]),
    sourceType: z.literal("file"),
    source: z.string()
      .min(1)
      .max(300)
      .refine((value) => !value.includes("\n"), "body.source must be a file path, not inline article body")
      .refine((value) => /\.(md|mdx)$/i.test(value), "body.source must point to a .md or .mdx file"),
    checksum: z.string().optional(),
    wordCount: z.number().int().positive().optional()
  })
});

const blogBatchSchema = z.object({
  batchId: z.string().min(1),
  site: z.literal("Solo App Stack"),
  defaultAuthor: z.string().default("Solo App Stack Editorial"),
  defaultStatus: statusSchema.default("draft"),
  schedule: z.object({
    startAfterLastPublished: z.boolean().default(true),
    fallbackStartDate: dateString,
    spacingDays: z.number().int().positive().default(2)
  }),
  posts: z.array(blogPostSeedSchema)
}).superRefine((batch, context) => {
  const seen = new Set<string>();
  for (const post of batch.posts) {
    if (seen.has(post.slug)) {
      context.addIssue({code: "custom", message: `Duplicate slug inside batch: ${post.slug}`});
    }
    seen.add(post.slug);
  }
});

type BlogBatch = z.infer<typeof blogBatchSchema>;
type BlogPostSeed = z.infer<typeof blogPostSeedSchema>;

function loadEnvFile(filePath: string) {
  if (!existsSync(filePath)) return;
  const lines = readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.trim().startsWith("#") || !line.includes("=")) continue;
    const [key, ...rest] = line.split("=");
    if (!process.env[key]) {
      process.env[key] = rest.join("=").trim();
    }
  }
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function toIsoDate(value: string | Date) {
  return new Date(value).toISOString();
}

let keyCounter = 0;

function key(prefix = "k") {
  keyCounter += 1;
  return `${prefix}${keyCounter.toString(36)}`;
}

function span(text: string, marks: string[] = []) {
  return {_key: key("s"), _type: "span", text, marks};
}

function textFromNode(node: any): string {
  if (!node) return "";
  if (node.type === "text" || node.type === "inlineCode") return node.value || "";
  if (Array.isArray(node.children)) return node.children.map(textFromNode).join("");
  return "";
}

function inlineChildren(nodes: any[] = [], marks: string[] = [], markDefs: any[] = []): any[] {
  return nodes.flatMap((node) => {
    if (node.type === "text") return [span(node.value || "", marks)];
    if (node.type === "inlineCode") return [span(node.value || "", marks)];
    if (node.type === "strong") return inlineChildren(node.children, [...marks, "strong"], markDefs);
    if (node.type === "emphasis") return inlineChildren(node.children, [...marks, "em"], markDefs);
    if (node.type === "delete") return inlineChildren(node.children, [...marks, "strike-through"], markDefs);
    if (node.type === "link") {
      const markKey = key("link");
      markDefs.push({_key: markKey, _type: "link", href: node.url});
      return inlineChildren(node.children, [...marks, markKey], markDefs);
    }
    if (node.type === "break") return [span("\n", marks)];
    return inlineChildren(node.children || [], marks, markDefs);
  });
}

function blockFromInline(nodes: any[], style = "normal", extra: Record<string, unknown> = {}) {
  const markDefs: any[] = [];
  const children = inlineChildren(nodes, [], markDefs).filter((child) => child.text !== "");
  if (!children.length) return null;
  return {_key: key("b"), _type: "block", style, markDefs, children, ...extra};
}

function listItemBlocks(node: any, listItem: "bullet" | "number", level: number): PortableTextBlock[] {
  const blocks: PortableTextBlock[] = [];
  const paragraph = node.children?.find((child: any) => child.type === "paragraph");
  if (paragraph) {
    const block = blockFromInline(paragraph.children, "normal", {listItem, level});
    if (block) blocks.push(block);
  } else {
    const text = textFromNode(node);
    if (text) blocks.push({_key: key("b"), _type: "block", style: "normal", listItem, level, markDefs: [], children: [span(text)]});
  }

  for (const child of node.children || []) {
    if (child.type === "list") {
      blocks.push(...listBlocks(child, level + 1));
    }
  }
  return blocks;
}

function listBlocks(node: any, level = 1): PortableTextBlock[] {
  const listItem = node.ordered ? "number" : "bullet";
  return (node.children || []).flatMap((child: any) => listItemBlocks(child, listItem, level));
}

function markdownFallback(node: any) {
  return {_key: key("m"), _type: "markdownBlock", markdown: toMarkdown(node)};
}

function mdastToPortableText(root: any): PortableTextBlock[] {
  const blocks: PortableTextBlock[] = [];
  for (const node of root.children || []) {
    if (node.type === "heading") {
      const style = `h${Math.min(Math.max(node.depth || 2, 2), 4)}`;
      const block = blockFromInline(node.children, style);
      if (block) blocks.push(block);
      continue;
    }
    if (node.type === "paragraph") {
      const block = blockFromInline(node.children);
      if (block) blocks.push(block);
      continue;
    }
    if (node.type === "list") {
      blocks.push(...listBlocks(node));
      continue;
    }
    if (node.type === "blockquote") {
      for (const child of node.children || []) {
        if (child.type === "paragraph") {
          const block = blockFromInline(child.children, "blockquote");
          if (block) blocks.push(block);
        } else {
          blocks.push(markdownFallback(child));
        }
      }
      continue;
    }
    if (["table", "code", "html", "definition", "image"].includes(node.type)) {
      blocks.push(markdownFallback(node));
      continue;
    }
    if (node.type === "thematicBreak") continue;
    blocks.push(markdownFallback(node));
  }
  return blocks;
}

function markdownToPortableText(markdown: string) {
  const parsed = matter(markdown);
  const tree = unified().use(remarkParse).use(remarkGfm).parse(parsed.content);
  return mdastToPortableText(tree);
}

function validateBodySources(batch: BlogBatch, cwd: string) {
  for (const post of batch.posts) {
    const sourcePath = path.resolve(cwd, post.body.source);
    if (!existsSync(sourcePath)) {
      throw new Error(`Missing Markdown source for ${post.slug}: ${post.body.source}`);
    }
  }
}

function collectWarnings(batch: BlogBatch) {
  const warnings: string[] = [];
  for (const post of batch.posts) {
    if (post.metaDescription.length < 120 || post.metaDescription.length > 160) {
      warnings.push(`${post.slug}: metaDescription should be 120-160 characters; got ${post.metaDescription.length}.`);
    }
    if (post.seoTitle.length > 60) {
      warnings.push(`${post.slug}: seoTitle is over 60 characters; got ${post.seoTitle.length}.`);
    }
  }
  return warnings;
}

async function existingDocumentId(client: ReturnType<typeof createClient>, type: string, slug: string) {
  return client.fetch<string | null>(`*[_type == $type && slug.current == $slug][0]._id`, {type, slug});
}

async function upsertAuthor(client: ReturnType<typeof createClient>, name: string, dryRun: boolean) {
  const slug = slugify(name);
  const id = (await existingDocumentId(client, "author", slug)) || `author-${slug}`;
  if (!dryRun) {
    await client.createIfNotExists({_id: id, _type: "author", name, slug: {current: slug}, role: "Editorial"});
  }
  return {_type: "reference", _ref: id};
}

async function upsertCategory(client: ReturnType<typeof createClient>, title: string, dryRun: boolean) {
  const slug = slugify(title);
  const id = (await existingDocumentId(client, "category", slug)) || `category-${slug}`;
  if (!dryRun) {
    await client.createIfNotExists({_id: id, _type: "category", title, slug: {current: slug}, description: `${title} guides from Solo App Stack.`});
  }
  return {_type: "reference", _ref: id};
}

function buildPostDocument(post: BlogPostSeed, batch: BlogBatch, authorRef: unknown, categoryRef: unknown, body: PortableTextBlock[], publishedAt: string, updatedAt: string) {
  const status = post.status || batch.defaultStatus;
  return {
    _type: "post",
    title: post.title,
    slug: {current: post.slug},
    seoTitle: post.seoTitle,
    metaDescription: post.metaDescription,
    excerpt: post.excerpt,
    author: authorRef,
    category: categoryRef,
    tags: post.tags,
    status,
    publishedAt,
    updatedAt,
    body,
    tableOfContents: true,
    affiliateDisclosure: post.affiliate.disclosureRequired,
    affiliateDisclosureRequired: post.affiliate.disclosureRequired,
    hasAffiliateLinks: post.affiliate.hasAffiliateLinks,
    featuredImageUrl: post.featuredImage.url,
    // TODO: add optional remote image download/upload to Sanity assets if image ownership requirements change.
    featuredImageAlt: post.featuredImage.alt,
    featuredImageCredit: post.featuredImage.credit,
    featuredImageLicense: post.featuredImage.license,
    canonicalUrl: post.seo.canonicalUrl,
    noindex: post.seo.noindex,
    schemaTypes: post.seo.schema,
    intent: post.intent,
    funnelStage: post.funnelStage,
    monetization: post.monetization,
    internalLinks: post.internalLinks,
    originalMarkdownSource: post.body.source,
    importedBatchId: batch.batchId,
    importedAt: new Date().toISOString()
  };
}

async function main() {
  loadEnvFile(path.resolve(process.cwd(), ".env.local"));

  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const batchPath = args.find((arg) => !arg.startsWith("--"));
  if (!batchPath) {
    throw new Error("Usage: npm run import:posts -- content/batches/batch-001.json [--dry-run]");
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId || !token) {
    throw new Error("SANITY_API_WRITE_TOKEN, NEXT_PUBLIC_SANITY_PROJECT_ID, and NEXT_PUBLIC_SANITY_DATASET are required.");
  }

  const absoluteBatchPath = path.resolve(process.cwd(), batchPath);
  const rawBatch = JSON.parse(readFileSync(absoluteBatchPath, "utf8"));
  const batch = blogBatchSchema.parse(rawBatch);
  validateBodySources(batch, process.cwd());

  const warnings = collectWarnings(batch);
  for (const warning of warnings) console.warn(`Warning: ${warning}`);

  const client = createClient({projectId, dataset, token, apiVersion: "2026-05-30", useCdn: false});
  const latestPublishedAt = await client.fetch<string | null>(`*[_type == "post" && defined(publishedAt)] | order(publishedAt desc)[0].publishedAt`);
  const useLatest = Boolean(latestPublishedAt && batch.schedule.startAfterLastPublished);
  const firstScheduledDate = useLatest
    ? addDays(new Date(latestPublishedAt as string), batch.schedule.spacingDays)
    : new Date(batch.schedule.fallbackStartDate);

  console.log(`${dryRun ? "Dry run" : "Importing"} ${batch.posts.length} posts from ${batch.batchId}`);
  console.log(`Schedule start: ${firstScheduledDate.toISOString().slice(0, 10)} (${useLatest ? "after latest Sanity post" : "fallback start date"})`);

  const authorRef = await upsertAuthor(client, batch.defaultAuthor, dryRun);
  let autoScheduledIndex = 0;
  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const post of batch.posts) {
    const categoryRef = await upsertCategory(client, post.category, dryRun);
    const sourcePath = path.resolve(process.cwd(), post.body.source);
    const markdown = readFileSync(sourcePath, "utf8");
    const body = markdownToPortableText(markdown);

    const explicitPublishedAt = post.dates.publishedAt;
    const publishedAt = explicitPublishedAt
      ? toIsoDate(explicitPublishedAt)
      : toIsoDate(addDays(firstScheduledDate, autoScheduledIndex++ * batch.schedule.spacingDays));
    const updatedAt = post.dates.updatedAt ? toIsoDate(post.dates.updatedAt) : publishedAt;
    const existingId = await existingDocumentId(client, "post", post.slug);
    const document = buildPostDocument(post, batch, authorRef, categoryRef, body, publishedAt, updatedAt);

    if (dryRun) {
      console.log(`${existingId ? "Would update" : "Would create"} ${post.slug} (${post.status || batch.defaultStatus}) -> ${publishedAt.slice(0, 10)} from ${post.body.source}`);
      if (body.length === 0) {
        console.log(`Skipped ${post.slug}: Markdown body converted to 0 blocks.`);
        skipped += 1;
      }
      continue;
    }

    if (existingId) {
      await client.patch(existingId).set(document).commit();
      console.log(`Updated ${post.slug} -> ${publishedAt.slice(0, 10)}`);
      updated += 1;
    } else {
      await client.create({...document, _id: `post-${post.slug}`});
      console.log(`Created ${post.slug} -> ${publishedAt.slice(0, 10)}`);
      created += 1;
    }
  }

  console.log(`Done. created=${created} updated=${updated} skipped=${skipped} warnings=${warnings.length}`);
}

main().catch((error) => {
  if (error instanceof z.ZodError) {
    console.error("Batch validation failed:");
    console.error(JSON.stringify(error.issues, null, 2));
  } else {
    console.error(error);
  }
  process.exit(1);
});
