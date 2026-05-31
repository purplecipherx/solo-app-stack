import type {Category, Comparison, Post, ToolkitItem, Tool} from "./types";

const author = {name: "Solo App Stack Editorial", role: "Tool testing and buyer guides"};

export const categoryImages: Record<string, {src: string; alt: string}> = {
  "AI Tools": {src: "/images/posts/ai-tools-cover.webp", alt: "AI assistant workspace for a one-person business"},
  "Scheduling & Booking": {src: "/images/posts/scheduling-cover.webp", alt: "Scheduling app workspace with calendar and booking tools"},
  "Taxes & Mileage": {src: "/images/posts/mileage-tax-cover.webp", alt: "Mileage tracking and tax app workspace for gig workers"},
  "Invoicing & Payments": {src: "/images/posts/invoicing-payments-cover.webp", alt: "Freelancer invoicing and payment software workspace"},
  "Websites & Hosting": {src: "/images/posts/website-crm-cover.webp", alt: "Website builder and CRM workspace for local service businesses"},
  "Business Apps": {src: "/images/posts/website-crm-cover.webp", alt: "CRM and lead tracking workspace for solo operators"},
  "Reviews & Comparisons": {src: "/images/posts/ai-tools-cover.webp", alt: "Software comparison workspace for solo operators"}
};

const postImages: Record<string, {src: string; alt: string}> = {
  "best-ai-tools-for-one-person-businesses": {src: "/images/posts/best-ai-tools-for-one-person-businesses.webp", alt: "Unique cover for best AI tools for one-person businesses"},
  "best-ai-email-assistants-for-freelancers": {src: "/images/posts/best-ai-email-assistants-for-freelancers.webp", alt: "Unique cover for AI email assistants for freelancers"},
  "chatgpt-vs-claude-for-solo-operators": {src: "/images/posts/chatgpt-vs-claude-for-solo-operators.webp", alt: "Unique cover for ChatGPT versus Claude for solo operators"},
  "best-scheduling-apps-for-solo-service-businesses": {src: "/images/posts/best-scheduling-apps-for-solo-service-businesses.webp", alt: "Unique cover for scheduling apps for solo service businesses"},
  "calendly-vs-acuity-for-service-pros": {src: "/images/posts/calendly-vs-acuity-for-service-pros.webp", alt: "Unique cover for Calendly versus Acuity for service pros"},
  "cheap-booking-stack-for-mobile-local-businesses": {src: "/images/posts/cheap-booking-stack-for-mobile-local-businesses.webp", alt: "Unique cover for cheap booking stacks for mobile local businesses"},
  "best-mileage-tracker-apps-for-gig-workers": {src: "/images/posts/best-mileage-tracker-apps-for-gig-workers.webp", alt: "Unique cover for mileage tracker apps for gig workers"},
  "best-tax-apps-for-side-hustlers": {src: "/images/posts/best-tax-apps-for-side-hustlers.webp", alt: "Unique cover for tax apps for side hustlers"},
  "mileiq-vs-everlance-for-drivers": {src: "/images/posts/mileiq-vs-everlance-for-drivers.webp", alt: "Unique cover for MileIQ versus Everlance for drivers"},
  "best-invoicing-software-for-freelancers": {src: "/images/posts/best-invoicing-software-for-freelancers.webp", alt: "Unique cover for invoicing software for freelancers"},
  "wave-vs-freshbooks-for-solo-operators": {src: "/images/posts/wave-vs-freshbooks-for-solo-operators.webp", alt: "Unique cover for Wave versus FreshBooks for solo operators"},
  "cheapest-payment-stack-for-one-person-businesses": {src: "/images/posts/cheapest-payment-stack-for-one-person-businesses.webp", alt: "Unique cover for cheapest payment stack for one-person businesses"},
  "best-website-builders-for-local-service-businesses": {src: "/images/posts/best-website-builders-for-local-service-businesses.webp", alt: "Unique cover for website builders for local service businesses"},
  "best-cheap-crm-for-solo-operators": {src: "/images/posts/best-cheap-crm-for-solo-operators.webp", alt: "Unique cover for cheap CRM for solo operators"},
  "website-builder-vs-wordpress-for-solo-service-businesses": {src: "/images/posts/website-builder-vs-wordpress-for-solo-service-businesses.webp", alt: "Unique cover for website builder versus WordPress for solo service businesses"}
};

export const categories: Category[] = [
  {title: "AI Tools", slug: "ai-tools", description: "AI writing, research, automation, and assistant tools for solo work."},
  {title: "Business Apps", slug: "business-apps", description: "Simple operating software for freelancers and one-person businesses."},
  {title: "Gig Worker Apps", slug: "gig-worker-apps", description: "Apps for drivers, delivery workers, contractors, and side hustlers."},
  {title: "Websites & Hosting", slug: "websites-hosting", description: "Website builders, hosting, landing pages, and domain basics."},
  {title: "Scheduling & Booking", slug: "scheduling-booking", description: "Booking pages, calendars, reminders, and appointment workflows."},
  {title: "Invoicing & Payments", slug: "invoicing-payments", description: "Invoices, estimates, online payments, and lightweight accounting."},
  {title: "Taxes & Mileage", slug: "taxes-mileage", description: "Mileage tracking, deductions, quarterly taxes, and receipt systems."},
  {title: "Local Business Marketing", slug: "local-business-marketing", description: "Lead generation, reviews, maps, and local promotion systems."},
  {title: "Automation", slug: "automation", description: "Cheap automations that remove repetitive admin work."},
  {title: "Reviews & Comparisons", slug: "reviews-comparisons", description: "Plain-English tool reviews and head-to-head buying guides."}
];

export const tools: Tool[] = [
  {
    name: "ChatGPT",
    slug: "chatgpt",
    logoUrl: "https://www.google.com/s2/favicons?domain=chatgpt.com&sz=128",
    image: "/images/tools/chatgpt-review.webp",
    imageAlt: "AI assistant product review workspace for ChatGPT",
    shortDescription: "General-purpose AI assistant for writing, planning, coding, research, and operations.",
    bestFor: "Solo operators who need a flexible daily AI assistant",
    pricingSummary: "Free plan available; paid plans add stronger models and higher limits.",
    startingPrice: "Free",
    freePlan: true,
    affiliateUrl: "https://example.com/affiliate/chatgpt-placeholder",
    directUrl: "https://chatgpt.com",
    primaryCtaText: "Try ChatGPT",
    pros: ["Flexible across many solo business tasks", "Fast idea generation and editing", "Useful for templates and repeatable workflows"],
    cons: ["Can be wrong without fact-checking", "Best results need clear prompts", "Not a replacement for legal or tax advice"],
    features: ["Writing assistant", "Data analysis", "Image support", "Custom GPTs", "Workflow brainstorming"],
    alternatives: ["claude", "notion"],
    relatedPosts: ["best-ai-tools-for-one-person-businesses", "chatgpt-vs-claude-for-solo-operators"],
    ratings: {easeOfUse: 9, valueForMoney: 9, soloBusinessFit: 9, overallScore: 9.1},
    updatedAt: "2026-05-20"
  },
  {
    name: "Calendly",
    slug: "calendly",
    logoUrl: "https://www.google.com/s2/favicons?domain=calendly.com&sz=128",
    image: "/images/tools/calendly-review.webp",
    imageAlt: "Scheduling product review workspace for Calendly",
    shortDescription: "Scheduling pages, calendar rules, reminders, and booking links for appointments.",
    bestFor: "Freelancers and service businesses that book calls or appointments",
    pricingSummary: "Free basic scheduling; paid plans add routing, teams, and automations.",
    startingPrice: "Free",
    freePlan: true,
    affiliateUrl: "https://example.com/affiliate/calendly-placeholder",
    directUrl: "https://calendly.com",
    primaryCtaText: "Try Calendly",
    pros: ["Quick setup", "Clean booking experience", "Integrates with common calendars"],
    cons: ["Advanced routing costs more", "Branding controls vary by plan", "Can feel generic for local services"],
    features: ["Booking links", "Calendar sync", "Reminders", "Payment collection", "Routing forms"],
    alternatives: ["acuity-scheduling"],
    relatedPosts: ["best-scheduling-apps-for-solo-service-businesses", "calendly-vs-acuity-for-service-pros"],
    ratings: {easeOfUse: 9, valueForMoney: 8, soloBusinessFit: 8, overallScore: 8.4},
    updatedAt: "2026-05-18"
  },
  {
    name: "FreshBooks",
    slug: "freshbooks",
    logoUrl: "https://www.google.com/s2/favicons?domain=freshbooks.com&sz=128",
    image: "/images/tools/freshbooks-review.webp",
    imageAlt: "Invoicing product review workspace for FreshBooks",
    shortDescription: "Invoicing and light accounting software built for freelancers and small service businesses.",
    bestFor: "Freelancers who want polished invoices and client billing",
    pricingSummary: "Paid plans; often discounted for new users.",
    startingPrice: "Varies",
    freePlan: false,
    affiliateUrl: "https://example.com/affiliate/freshbooks-placeholder",
    directUrl: "https://freshbooks.com",
    primaryCtaText: "See FreshBooks",
    pros: ["Professional invoices", "Good client payment flow", "Time tracking and expenses in one place"],
    cons: ["Costs more than free invoice tools", "Accounting depth may be light for complex businesses", "Plan limits matter"],
    features: ["Invoices", "Payments", "Expenses", "Time tracking", "Reports"],
    alternatives: ["wave"],
    relatedPosts: ["best-invoicing-software-for-freelancers", "wave-vs-freshbooks-for-solo-operators"],
    ratings: {easeOfUse: 8, valueForMoney: 7, soloBusinessFit: 8, overallScore: 8.0},
    updatedAt: "2026-05-12"
  },
  {
    name: "Everlance",
    slug: "everlance",
    logoUrl: "https://www.google.com/s2/favicons?domain=everlance.com&sz=128",
    image: "/images/tools/everlance-review.webp",
    imageAlt: "Mileage tracking product review workspace for Everlance",
    shortDescription: "Mileage and expense tracking app for drivers, contractors, and self-employed workers.",
    bestFor: "Gig workers who need automatic mileage logs",
    pricingSummary: "Free tier available; paid plans unlock more automatic tracking and reports.",
    startingPrice: "Free",
    freePlan: true,
    affiliateUrl: "https://example.com/affiliate/everlance-placeholder",
    directUrl: "https://everlance.com",
    primaryCtaText: "Try Everlance",
    pros: ["Automatic trip tracking", "Useful tax reports", "Built for self-employed drivers"],
    cons: ["Battery and location permissions matter", "Reports still need review", "Paid plan may be needed for heavy use"],
    features: ["Mileage tracking", "Expense tracking", "Tax reports", "Trip classification", "Receipt storage"],
    alternatives: ["mileiq"],
    relatedPosts: ["best-mileage-tracker-apps-for-gig-workers", "mileiq-vs-everlance-for-drivers"],
    ratings: {easeOfUse: 8, valueForMoney: 8, soloBusinessFit: 9, overallScore: 8.5},
    updatedAt: "2026-05-10"
  },
  {
    name: "Carrd",
    slug: "carrd",
    logoUrl: "https://www.google.com/s2/favicons?domain=carrd.co&sz=128",
    image: "/images/tools/carrd-review.webp",
    imageAlt: "Website builder product review workspace for Carrd",
    shortDescription: "Low-cost one-page website builder for simple landing pages, service pages, and link hubs.",
    bestFor: "Solo operators who need a fast, cheap web presence",
    pricingSummary: "Free plan available; Pro plans are low cost.",
    startingPrice: "Free",
    freePlan: true,
    affiliateUrl: "https://example.com/affiliate/carrd-placeholder",
    directUrl: "https://carrd.co",
    primaryCtaText: "Build with Carrd",
    pros: ["Very affordable", "Fast to publish", "Good enough for many solo landing pages"],
    cons: ["Not ideal for large content sites", "Design flexibility has limits", "Blogging requires another tool"],
    features: ["Landing pages", "Forms", "Custom domains", "Embeds", "Templates"],
    alternatives: ["framer", "webflow"],
    relatedPosts: ["best-website-builders-for-local-service-businesses", "website-builder-vs-wordpress-for-solo-service-businesses"],
    ratings: {easeOfUse: 9, valueForMoney: 10, soloBusinessFit: 8, overallScore: 8.8},
    updatedAt: "2026-05-16"
  }
];

const postPlan = [
  ["best-ai-tools-for-one-person-businesses", "Best AI tools for one-person businesses", "AI Tools", ["ChatGPT", "Claude", "Notion AI"]],
  ["best-ai-email-assistants-for-freelancers", "Best AI email assistants for freelancers", "AI Tools", ["ChatGPT", "Gemini", "Shortwave"]],
  ["chatgpt-vs-claude-for-solo-operators", "ChatGPT vs Claude for solo operators", "Reviews & Comparisons", ["ChatGPT", "Claude"]],
  ["best-scheduling-apps-for-solo-service-businesses", "Best scheduling apps for solo service businesses", "Scheduling & Booking", ["Calendly", "Acuity Scheduling"]],
  ["calendly-vs-acuity-for-service-pros", "Calendly vs Acuity for service pros", "Reviews & Comparisons", ["Calendly", "Acuity Scheduling"]],
  ["cheap-booking-stack-for-mobile-local-businesses", "Cheap booking stack for mobile local businesses", "Scheduling & Booking", ["Calendly", "Square", "Google Calendar"]],
  ["best-mileage-tracker-apps-for-gig-workers", "Best mileage tracker apps for gig workers", "Taxes & Mileage", ["Everlance", "MileIQ", "Stride"]],
  ["best-tax-apps-for-side-hustlers", "Best tax apps for side hustlers", "Taxes & Mileage", ["Keeper", "Everlance", "QuickBooks"]],
  ["mileiq-vs-everlance-for-drivers", "MileIQ vs Everlance for drivers", "Reviews & Comparisons", ["MileIQ", "Everlance"]],
  ["best-invoicing-software-for-freelancers", "Best invoicing software for freelancers", "Invoicing & Payments", ["FreshBooks", "Wave", "Square"]],
  ["wave-vs-freshbooks-for-solo-operators", "Wave vs FreshBooks for solo operators", "Reviews & Comparisons", ["Wave", "FreshBooks"]],
  ["cheapest-payment-stack-for-one-person-businesses", "Cheapest payment stack for one-person businesses", "Invoicing & Payments", ["Stripe", "Square", "Wave"]],
  ["best-website-builders-for-local-service-businesses", "Best website builders for local service businesses", "Websites & Hosting", ["Carrd", "Wix", "Squarespace"]],
  ["best-cheap-crm-for-solo-operators", "Best cheap CRM for solo operators", "Business Apps", ["HubSpot", "Airtable", "Notion"]],
  ["website-builder-vs-wordpress-for-solo-service-businesses", "Website builder vs WordPress for solo service businesses", "Websites & Hosting", ["Carrd", "Squarespace", "WordPress"]]
] as const;

export const posts: Post[] = postPlan.map(([slug, title, category, toolNames], index) => ({
  slug,
  title,
  seoTitle: `${title} | Solo App Stack`,
  metaDescription: `A practical, beginner-friendly guide to ${title.toLowerCase()} with picks, tradeoffs, pricing notes, and setup advice for solo operators.`,
  excerpt: `A no-fluff buyer guide for solo operators comparing ${toolNames.join(", ")} and the situations where each one makes sense.`,
  featuredImage: postImages[slug]?.src || "/images/tools/chatgpt-review.webp",
  featuredImageAlt: postImages[slug]?.alt || "Product image for software tools mentioned in this guide",
  category,
  tags: [category, "solo business", "software stack"],
  author,
  publishedAt: `2026-05-${String(1 + index).padStart(2, "0")}`,
  updatedAt: "2026-05-30",
  readingTime: `${6 + (index % 4)} min read`,
  popularity: 100 - index * 3,
  tableOfContents: true,
  affiliateDisclosure: true,
  relatedTools: toolNames.map((tool) => tool.toLowerCase().replace(/[^a-z0-9]+/g, "-")),
  relatedPosts: postPlan.filter((item) => item[0] !== slug).slice(index % 5, index % 5 + 3).map((item) => item[0]),
  faqs: [
    {question: `What is the best pick for ${title.toLowerCase()}?`, answer: `Start with the tool that solves your most expensive bottleneck first. For most solo operators, that means ease of setup and reliable daily use matter more than a huge feature list.`},
    {question: "Should I use the free plan first?", answer: "Yes. Use the free plan or trial until the tool saves enough time, wins enough work, or prevents enough admin pain to justify paying."},
    {question: "Are the affiliate links required?", answer: "No. Placeholder affiliate links are marked clearly, and every tool page also includes a direct non-affiliate URL where available."}
  ],
  body: [
    {type: "paragraph", text: `This guide is written for one-person businesses that need useful software without building an expensive stack. The goal is to pick tools that make money, save time, or reduce avoidable admin.`},
    {type: "heading", text: "Quick picks"},
    {type: "table", headers: ["Use case", "Best fit", "Why it works"], rows: [
      ["Fastest setup", toolNames[0], "Gets you moving without a long implementation project."],
      ["Best low-cost option", toolNames[1] || toolNames[0], "Good enough features before you commit to another subscription."],
      ["Best for scaling later", toolNames[2] || toolNames[0], "More room for automations, reporting, or advanced workflows."]
    ]},
    {type: "heading", text: "How to choose"},
    {type: "paragraph", text: "Do not start with the tool that has the longest feature page. Start with the job you repeat every week. Then judge each product by setup time, total monthly cost, mobile usability, export options, and whether it works with your current calendar, inbox, website, or payment flow."},
    {type: "heading", text: "What to avoid"},
    {type: "list", items: ["Paying for team features when you are still solo.", "Buying a tool before mapping the workflow it will replace.", "Ignoring export options for client, mileage, invoice, or booking data.", "Stacking overlapping apps that create more admin than they remove."]},
    {type: "prosCons", pros: ["Simple tools can pay for themselves quickly.", "A tight stack is easier to maintain.", "Free plans are useful for testing workflow fit."], cons: ["Cheap tools can hit limits fast.", "AI output still needs review.", "Too many apps can scatter customer data."]},
    {type: "cta", title: "Build the lean stack first", text: "Use the toolkit page to pick one tool per job before adding extras.", href: "/toolkit", label: "Open the toolkit"}
  ]
}));

export const comparisons: Comparison[] = [
  {
    title: "ChatGPT vs Claude for solo operators",
    slug: "chatgpt-vs-claude",
    tools: ["ChatGPT", "Claude"],
    winner: "ChatGPT for broad daily utility; Claude for long-form drafting and document-heavy work.",
    summary: "Both are strong AI assistants. The right pick depends on whether your daily work is broad and mixed or deep and document-heavy.",
    publishedAt: "2026-05-21",
    updatedAt: "2026-05-30",
    seoTitle: "ChatGPT vs Claude for Solo Operators | Solo App Stack",
    metaDescription: "Compare ChatGPT and Claude for freelancers, gig workers, and solo business owners.",
    comparisonTable: {headers: ["Category", "ChatGPT", "Claude"], rows: [["Best for", "Mixed daily tasks", "Long drafts and document work"], ["Learning curve", "Easy", "Easy"], ["Solo fit", "Excellent", "Excellent"]]},
    faqs: [{question: "Can I use both?", answer: "Yes, but most solo operators should pay for one first and keep the other on a free plan if available."}],
    body: [
      {type: "paragraph", text: "For most solo operators, either assistant can improve writing, planning, and admin. The decision should come down to your real weekly workload."},
      {type: "heading", text: "Final recommendation"},
      {type: "paragraph", text: "Pick ChatGPT if you want a general daily assistant. Pick Claude if you spend more time turning long notes, interviews, or documents into finished writing."}
    ]
  }
];

export const toolkitItems: ToolkitItem[] = [
  {section: "Website stack", name: "Carrd", description: "Use a cheap one-page site when you only need a service page, lead form, and proof.", toolSlug: "carrd", ctaUrl: "https://example.com/affiliate/carrd-placeholder", ctaText: "Build the website"},
  {section: "AI writing stack", name: "ChatGPT", description: "Draft service pages, estimate templates, FAQs, emails, and repeatable checklists.", toolSlug: "chatgpt", ctaUrl: "https://example.com/affiliate/chatgpt-placeholder", ctaText: "Try the AI assistant"},
  {section: "Scheduling stack", name: "Calendly", description: "Give prospects one link to book without the back-and-forth.", toolSlug: "calendly", ctaUrl: "https://example.com/affiliate/calendly-placeholder", ctaText: "Set up booking"},
  {section: "Payments/invoicing stack", name: "FreshBooks", description: "Send clean invoices, take payments, and keep basic client billing organized.", toolSlug: "freshbooks", ctaUrl: "https://example.com/affiliate/freshbooks-placeholder", ctaText: "Review invoicing"},
  {section: "Mileage/tax stack", name: "Everlance", description: "Track trips and expenses before tax time turns into a cleanup project.", toolSlug: "everlance", ctaUrl: "https://example.com/affiliate/everlance-placeholder", ctaText: "Track mileage"},
  {section: "Marketing stack", name: "Google Business Profile", description: "Use the free local profile as the base layer for reviews, calls, and map visibility.", ctaUrl: "https://www.google.com/business/", ctaText: "Open Google Business"},
  {section: "Automation stack", name: "Zapier or Make", description: "Connect forms, calendars, spreadsheets, and email once a process repeats every week.", ctaUrl: "https://zapier.com", ctaText: "Plan automations"}
];
