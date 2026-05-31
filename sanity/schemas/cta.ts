import {defineField, defineType} from "sanity";

export const cta = defineType({
  name: "cta",
  title: "CTA",
  type: "object",
  fields: [
    defineField({name: "title", type: "string"}),
    defineField({name: "text", type: "text"}),
    defineField({name: "buttonText", type: "string"}),
    defineField({name: "url", type: "url"}),
    defineField({name: "sponsored", type: "boolean", initialValue: true})
  ]
});
