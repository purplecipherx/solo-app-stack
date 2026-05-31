import {defineField, defineType} from "sanity";

export const comparison = defineType({
  name: "comparison",
  title: "Comparison",
  type: "document",
  fields: [
    defineField({name: "title", type: "string", validation: (Rule) => Rule.required()}),
    defineField({name: "slug", type: "slug", options: {source: "title"}, validation: (Rule) => Rule.required()}),
    defineField({name: "toolsCompared", type: "array", of: [{type: "reference", to: [{type: "tool"}]}], validation: (Rule) => Rule.min(2).max(5)}),
    defineField({name: "winner", type: "reference", to: [{type: "tool"}]}),
    defineField({name: "summary", type: "text"}),
    defineField({name: "body", type: "array", of: [{type: "block"}, {type: "cta"}]}),
    defineField({
      name: "comparisonTable",
      type: "object",
      fields: [
        {name: "headers", type: "array", of: [{type: "string"}]},
        {name: "rows", type: "array", of: [{type: "array", of: [{type: "string"}]}]}
      ]
    }),
    defineField({name: "faqs", type: "array", of: [{type: "faq"}]}),
    defineField({name: "publishedAt", type: "datetime"}),
    defineField({name: "updatedAt", type: "datetime"}),
    defineField({name: "seoTitle", type: "string"}),
    defineField({name: "metaDescription", type: "text"})
  ]
});
