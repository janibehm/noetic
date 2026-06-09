import { defineField, defineType } from "sanity";
import { blockNameField } from "./_block-name";

export const demoFormBlock = defineType({
  name: "demoFormBlock",
  type: "object",
  title: "Demo form",
  fields: [
    blockNameField,
    defineField({ name: "heading", type: "string", title: "Heading", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", title: "Body", rows: 3 }),
    defineField({ name: "bullets", type: "array", title: "Bullets", of: [{ type: "string" }] }),
    defineField({ name: "submitLabel", type: "string", title: "Submit label", initialValue: "Request demo" }),
    defineField({ name: "showCompanyField", type: "boolean", title: "Show company field", initialValue: true }),
    defineField({ name: "selectLabel", type: "string", title: "Select placeholder", initialValue: "Team size" }),
    defineField({ name: "selectOptions", type: "array", title: "Select options", of: [{ type: "string" }], initialValue: ["1-10", "11-50", "51-200", "200+"] }),
    defineField({ name: "messagePlaceholder", type: "string", title: "Message placeholder", initialValue: "What would you like to generate?" }),
    defineField({ name: "successTitle", type: "string", title: "Success title" }),
    defineField({ name: "successBody", type: "text", title: "Success body", rows: 2 }),
    defineField({
      name: "backgroundVideo",
      type: "file",
      title: "Background video",
      description: "Optional. Plays muted/looping behind the heading panel.",
      options: { accept: "video/*" },
    }),
  ],
  preview: {
    select: { blockName: "blockName", title: "heading" },
    prepare: ({ blockName, title }) => ({ title: blockName || title || "Demo form", subtitle: "Shared block" }),
  },
});