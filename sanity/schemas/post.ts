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
    defineField({name: "author", type: "reference", to: [{type: "author"}]}),
    defineField({name: "category", type: "reference", to: [{type: "category"}]}),
    defineField({name: "tags", type: "array", of: [{type: "string"}]}),
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
    defineField({name: "noindex", type: "boolean", initialValue: false})
  ],
  preview: {select: {title: "title", subtitle: "category.title"}}
});
