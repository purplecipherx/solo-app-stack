import {createClient} from "@sanity/client";
import {categories, comparisons, posts, toolkitItems, tools} from "../lib/seed";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;

if (!projectId || !token) {
  throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before seeding.");
}

const client = createClient({projectId, dataset, token, apiVersion: "2026-05-30", useCdn: false});

async function main() {
  const tx = client.transaction();

  tx.createIfNotExists({_id: "author-editorial", _type: "author", name: "Solo App Stack Editorial", role: "Tool testing and buyer guides"});

  for (const category of categories) {
    tx.createIfNotExists({_id: `category-${category.slug}`, _type: "category", title: category.title, slug: {current: category.slug}, description: category.description});
  }

  for (const tool of tools) {
    tx.createOrReplace({
      _id: `tool-${tool.slug}`,
      _type: "tool",
      ...tool,
      slug: {current: tool.slug},
      alternatives: [],
      relatedPosts: []
    });
  }

  for (const post of posts) {
    tx.createOrReplace({
      _id: `post-${post.slug}`,
      _type: "post",
      title: post.title,
      slug: {current: post.slug},
      seoTitle: post.seoTitle,
      metaDescription: post.metaDescription,
      excerpt: post.excerpt,
      author: {_type: "reference", _ref: "author-editorial"},
      category: {_type: "reference", _ref: `category-${categories.find((category) => category.title === post.category)?.slug || "business-apps"}`},
      tags: post.tags,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      tableOfContents: post.tableOfContents,
      affiliateDisclosure: post.affiliateDisclosure,
      faqs: post.faqs,
      canonicalUrl: post.canonicalUrl,
      noindex: post.noindex || false
    });
  }

  for (const comparison of comparisons) {
    tx.createOrReplace({_id: `comparison-${comparison.slug}`, _type: "comparison", ...comparison, slug: {current: comparison.slug}});
  }

  for (const [index, item] of toolkitItems.entries()) {
    tx.createOrReplace({_id: `toolkit-${index}`, _type: "toolkitItem", ...item});
  }

  await tx.commit();
  console.log("Seed content imported.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
