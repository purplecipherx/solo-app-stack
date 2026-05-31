import {defineField, defineType} from "sanity";

export const tool = defineType({
  name: "tool",
  title: "Tool",
  type: "document",
  fields: [
    defineField({name: "name", type: "string", validation: (Rule) => Rule.required()}),
    defineField({name: "slug", type: "slug", options: {source: "name"}, validation: (Rule) => Rule.required()}),
    defineField({name: "logo", type: "image", options: {hotspot: true}}),
    defineField({name: "shortDescription", type: "text"}),
    defineField({name: "bestFor", type: "string"}),
    defineField({name: "pricingSummary", type: "string"}),
    defineField({name: "startingPrice", type: "string"}),
    defineField({name: "freePlan", type: "boolean", initialValue: false}),
    defineField({name: "affiliateUrl", type: "url"}),
    defineField({name: "directUrl", type: "url"}),
    defineField({name: "primaryCtaText", type: "string", initialValue: "Visit site"}),
    defineField({name: "pros", type: "array", of: [{type: "string"}]}),
    defineField({name: "cons", type: "array", of: [{type: "string"}]}),
    defineField({name: "features", type: "array", of: [{type: "string"}]}),
    defineField({name: "alternatives", type: "array", of: [{type: "reference", to: [{type: "tool"}]}]}),
    defineField({name: "relatedPosts", type: "array", of: [{type: "reference", to: [{type: "post"}]}]}),
    defineField({
      name: "ratings",
      type: "object",
      fields: [
        {name: "easeOfUse", type: "number", validation: (Rule) => Rule.min(0).max(10)},
        {name: "valueForMoney", type: "number", validation: (Rule) => Rule.min(0).max(10)},
        {name: "soloBusinessFit", type: "number", validation: (Rule) => Rule.min(0).max(10)},
        {name: "overallScore", type: "number", validation: (Rule) => Rule.min(0).max(10)}
      ]
    }),
    defineField({name: "updatedAt", type: "datetime"})
  ]
});
