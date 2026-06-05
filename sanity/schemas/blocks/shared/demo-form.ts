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
    defineField({ name: "successTitle", type: "string", title: "Success title" }),
    defineField({ name: "successBody", type: "text", title: "Success body", rows: 2 }),
  ],
  preview: {
    select: { blockName: "blockName", title: "heading" },
    prepare: ({ blockName, title }) => ({ title: blockName || title || "Demo form", subtitle: "Shared block" }),
  },
});