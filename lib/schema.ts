import {absoluteUrl, site} from "./site";
import type {FAQ, Post, Tool} from "./types";

export function faqJsonLd(faqs: FAQ[]) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {"@type": "Answer", text: faq.answer}
    }))
  };
}

export function blogPostingJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.seoTitle || post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {"@type": "Person", name: post.author.name},
    publisher: {"@type": "Organization", name: site.name, url: site.url},
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    image: post.featuredImage ? [absoluteUrl(post.featuredImage)] : undefined
  };
}

export function softwareJsonLd(tool: Tool) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.shortDescription,
    url: absoluteUrl(`/tools/${tool.slug}`),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    image: tool.image ? absoluteUrl(tool.image) : undefined,
    offers: {"@type": "Offer", price: tool.startingPrice || tool.pricingSummary, url: tool.directUrl},
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tool.ratings.overallScore,
      bestRating: 10,
      ratingCount: 1
    }
  };
}

export function breadcrumbJsonLd(items: {name: string; path: string}[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}
