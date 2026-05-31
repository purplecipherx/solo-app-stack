import {defineField, defineType} from "sanity";

export const toolkitItem = defineType({
  name: "toolkitItem",
  title: "Toolkit Item",
  type: "document",
  fields: [
    defineField({name: "section", type: "string", options: {list: ["Website stack", "AI writing stack", "Scheduling stack", "Payments/invoicing stack", "Mileage/tax stack", "Marketing stack", "Automation stack"]}}),
    defineField({name: "name", type: "string"}),
    defineField({name: "description", type: "text"}),
    defineField({name: "tool", type: "reference", to: [{type: "tool"}]}),
    defineField({name: "ctaUrl", type: "url"}),
    defineField({name: "ctaText", type: "string"})
  ]
});
