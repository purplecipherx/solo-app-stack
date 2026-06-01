export const site = {
  name: "Solo App Stack",
  domain: "soloappstack.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://soloappstack.com",
  tagline: "AI tools, apps, and cheap systems for one-person businesses.",
  description:
    "Practical software stacks, AI tools, automation guides, and app comparisons for freelancers, gig workers, and solo local service businesses.",
  email: "hello@soloappstack.com",
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
};

export function absoluteUrl(path = "") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${cleanPath}`;
}
