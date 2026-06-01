import {defineField, defineType} from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({name: "title", type: "string", validation: (Rule) => Rule.required()}),
    defineField({name: "slug", type: "slug", options: {source: "title"}, validation: (Rule) => Rule.required()}),
    defineField({name: "seoTitle", type: "string"}),
    defineField({name: "metaDescription", type: "text", validation: (Rule) => Rule.max(160)}),
    defineField({name: "excerpt", type: "text"}),
    defineField({name: "featuredImage", type: "image", options: {hotspot: true}}),
    defineField({name: "featuredImageUrl", type: "url", description: "External image URL used by batch imports. TODO: optionally upload remote images to Sanity assets later."}),
    defineField({name: "featuredImageAlt", type: "string"}),
    defineField({name: "featuredImageCredit", type: "string"}),
    defineField({name: "featuredImageLicense", type: "string"}),
    defineField({name: "author", type: "reference", to: [{type: "author"}]}),
    defineField({name: "category", type: "reference", to: [{type: "category"}]}),
    defineField({name: "tags", type: "array", of: [{type: "string"}]}),
    defineField({name: "status", type: "string", options: {list: ["draft", "published"]}, initialValue: "draft"}),
    defineField({name: "publishedAt", type: "datetime"}),
    defineField({name: "updatedAt", type: "datetime"}),
    defineField({
      name: "body",
      type: "array",
      of: [
        {type: "block"},
        {type: "image", options: {hotspot: true}},
        {type: "cta"},
        {
          type: "object",
          name: "markdownBlock",
          title: "Markdown Fallback Block",
          fields: [{name: "markdown", type: "text"}]
        },
        {
          type: "object",
          name: "prosCons",
          fields: [
            {name: "pros", type: "array", of: [{type: "string"}]},
            {name: "cons", type: "array", of: [{type: "string"}]}
          ]
        },
        {
          type: "object",
          name: "comparisonTable",
          fields: [
            {name: "headers", type: "array", of: [{type: "string"}]},
            {name: "rows", type: "array", of: [{type: "array", of: [{type: "string"}]}]}
          ]
        }
      ]
    }),
    defineField({name: "tableOfContents", type: "boolean", initialValue: true}),
    defineField({name: "affiliateDisclosure", type: "boolean", initialValue: true}),
    defineField({name: "relatedTools", type: "array", of: [{type: "reference", to: [{type: "tool"}]}]}),
    defineField({name: "relatedPosts", type: "array", of: [{type: "reference", to: [{type: "post"}]}]}),
    defineField({name: "faqs", type: "array", of: [{type: "faq"}]}),
    defineField({name: "canonicalUrl", type: "url"}),
    defineField({name: "noindex", type: "boolean", initialValue: false}),
    defineField({name: "schemaTypes", type: "array", of: [{type: "string"}]}),
    defineField({name: "intent", type: "string", options: {list: ["informational", "commercial", "transactional", "comparison", "local-business"]}}),
    defineField({name: "funnelStage", type: "string", options: {list: ["top", "middle", "bottom"]}}),
    defineField({name: "monetization", type: "array", of: [{type: "string"}]}),
    defineField({name: "affiliateDisclosureRequired", type: "boolean", initialValue: true}),
    defineField({name: "hasAffiliateLinks", type: "boolean", initialValue: false}),
    defineField({name: "internalLinks", type: "array", of: [{type: "string"}]}),
    defineField({name: "originalMarkdownSource", type: "string", readOnly: true}),
    defineField({name: "importedBatchId", type: "string", readOnly: true}),
    defineField({name: "importedAt", type: "datetime", readOnly: true})
  ],
  preview: {select: {title: "title", subtitle: "category.title"}}
});
