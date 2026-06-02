export const site = {
  name: "Jerf Supply",
  domain: "jerfsupply.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://jerfsupply.com",
  tagline: "Real goods. Weird finds. Studio favorites.",
  description:
    "Official product, sponsor, and brand link hub for Jerf: weird finds, studio favorites, stickers, incense, skate gear, food links, art, and court-safe lifestyle picks.",
  email: "sponsors@jerfsupply.com",
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
};

export function absoluteUrl(path = "") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${cleanPath}`;
}
