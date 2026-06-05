import { defineField, defineType } from "sanity";
import { blockNameField } from "../shared/_block-name";
import { headingLevelField } from "../shared/_heading-level";

export const companyHeroBlock = defineType({
  name: "companyHeroBlock",
  type: "object",
  title: "Company · Hero",
  fieldsets: [{ name: "heading", title: "Heading", options: { columns: 2 } }],
  fields: [
    blockNameField,
    defineField({ name: "eyebrow", type: "string", title: "Eyebrow" }),
    defineField({ name: "heading", type: "string", title: "Heading", fieldset: "heading", validation: (r) => r.required() }),
    defineField({ name: "highlight", type: "string", title: "Highlighted phrase" }),
    headingLevelField("h1"),
    defineField({ name: "lead", type: "text", title: "Lead", rows: 3 }),
    defineField({
      name: "stats",
      type: "array",
      title: "Stats",
      validation: (r) => r.max(4),
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", type: "string", validation: (r) => r.required() }),
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
    }),
  ],
  preview: {
    select: { blockName: "blockName", title: "heading" },
    prepare: ({ blockName, title }) => ({ title: blockName || title || "Company hero", subtitle: "Company block" }),
  },
});