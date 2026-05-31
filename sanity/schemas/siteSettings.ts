import {defineField, defineType} from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({name: "siteName", type: "string", initialValue: "Solo App Stack"}),
    defineField({name: "tagline", type: "string"}),
    defineField({name: "affiliateDisclosure", type: "text"}),
    defineField({name: "newsletterCta", type: "text"}),
    defineField({name: "googleAnalyticsId", type: "string"}),
    defineField({name: "plausibleDomain", type: "string"})
  ]
});
