import {defineField, defineType} from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({name: "name", type: "string", validation: (Rule) => Rule.required()}),
    defineField({name: "slug", type: "slug", options: {source: "name"}, validation: (Rule) => Rule.required()}),
    defineField({name: "role", type: "string"}),
    defineField({name: "bio", type: "text"}),
    defineField({name: "image", type: "image", options: {hotspot: true}})
  ]
});
