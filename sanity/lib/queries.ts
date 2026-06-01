export const categoriesQuery = `*[_type == "category"] | order(title asc) {
  title, "slug": slug.current, description
}`;

export const postsQuery = `*[_type == "post" && !noindex && coalesce(status, "published") == "published"] | order(publishedAt desc) {
  title, "slug": slug.current, seoTitle, metaDescription, excerpt, "featuredImage": coalesce(featuredImage.asset->url, featuredImageUrl), featuredImageAlt, featuredImageCredit, featuredImageLicense, "category": category->title,
  tags, author->{name, role}, status, publishedAt, updatedAt, body, tableOfContents,
  affiliateDisclosure, "relatedTools": coalesce(relatedTools[]->slug.current, []), "relatedPosts": coalesce(relatedPosts[]->slug.current, []),
  faqs, canonicalUrl, noindex, schemaTypes, intent, funnelStage, monetization, affiliateDisclosureRequired,
  hasAffiliateLinks, internalLinks, originalMarkdownSource, importedBatchId, importedAt,
  "readingTime": coalesce(readingTime, "6 min read"), "popularity": coalesce(popularity, 0)
}`;

export const toolsQuery = `*[_type == "tool"] | order(name asc) {
  name, "slug": slug.current, "logo": logo.asset->url, logoUrl, "image": image.asset->url, imageAlt, shortDescription, bestFor, pricingSummary,
  startingPrice, freePlan, affiliateUrl, directUrl, primaryCtaText, pros, cons,
  features, "alternatives": alternatives[]->slug.current, "relatedPosts": relatedPosts[]->slug.current,
  ratings, updatedAt
}`;

export const comparisonsQuery = `*[_type == "comparison"] | order(updatedAt desc) {
  title, "slug": slug.current, "tools": toolsCompared[]->name, "winner": winner->name,
  summary, body, comparisonTable, faqs, publishedAt, updatedAt, seoTitle, metaDescription
}`;

export const toolkitItemsQuery = `*[_type == "toolkitItem"] | order(section asc, name asc) {
  section, name, description, "toolSlug": tool->slug.current, ctaUrl, ctaText
}`;
