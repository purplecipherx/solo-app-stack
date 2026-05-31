import {defineField, defineType} from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "object",
  fields: [
    defineField({name: "question", type: "string", validation: (Rule) => Rule.required()}),
    defineField({name: "answer", type: "text", validation: (Rule) => Rule.required()})
  ]
});
