export const postsQuery = `*[_type == "post" && !noindex] | order(publishedAt desc) {
  title, "slug": slug.current, seoTitle, metaDescription, excerpt, "category": category->title,
  tags, author->{name, role}, publishedAt, updatedAt, body, tableOfContents,
  affiliateDisclosure, "relatedTools": relatedTools[]->slug.current, "relatedPosts": relatedPosts[]->slug.current,
  faqs, canonicalUrl, noindex
}`;

export const toolsQuery = `*[_type == "tool"] | order(name asc) {
  name, "slug": slug.current, logo, shortDescription, bestFor, pricingSummary,
  startingPrice, freePlan, affiliateUrl, directUrl, primaryCtaText, pros, cons,
  features, "alternatives": alternatives[]->slug.current, "relatedPosts": relatedPosts[]->slug.current,
  ratings, updatedAt
}`;
