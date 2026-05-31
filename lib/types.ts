export type Category = {
  title: string;
  slug: string;
  description: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type Author = {
  name: string;
  role: string;
};

export type Tool = {
  name: string;
  slug: string;
  logo?: string;
  logoUrl?: string;
  image?: string;
  imageAlt?: string;
  shortDescription: string;
  bestFor: string;
  pricingSummary: string;
  startingPrice?: string;
  freePlan: boolean;
  affiliateUrl?: string;
  directUrl: string;
  primaryCtaText: string;
  pros: string[];
  cons: string[];
  features: string[];
  alternatives: string[];
  relatedPosts: string[];
  ratings: {
    easeOfUse: number;
    valueForMoney: number;
    soloBusinessFit: number;
    overallScore: number;
  };
  updatedAt: string;
};

export type BodyBlock =
  | {type: "heading"; text: string}
  | {type: "paragraph"; text: string}
  | {type: "list"; items: string[]}
  | {type: "cta"; title: string; text: string; href: string; label: string; sponsored?: boolean}
  | {type: "prosCons"; pros: string[]; cons: string[]}
  | {type: "table"; headers: string[]; rows: string[][]};

export type Post = {
  title: string;
  slug: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  category: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  popularity: number;
  body: BodyBlock[];
  tableOfContents: boolean;
  affiliateDisclosure: boolean;
  relatedTools: string[];
  relatedPosts: string[];
  faqs: FAQ[];
  canonicalUrl?: string;
  noindex?: boolean;
};

export type Comparison = {
  title: string;
  slug: string;
  tools: string[];
  winner: string;
  summary: string;
  body: BodyBlock[];
  comparisonTable: {headers: string[]; rows: string[][]};
  faqs: FAQ[];
  publishedAt: string;
  updatedAt: string;
  seoTitle: string;
  metaDescription: string;
};

export type ToolkitItem = {
  section: string;
  name: string;
  description: string;
  toolSlug?: string;
  ctaUrl?: string;
  ctaText: string;
};
