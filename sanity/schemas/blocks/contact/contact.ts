import { defineField, defineType } from "sanity";
import { blockNameField } from "../shared/_block-name";
import { headingLevelField } from "../shared/_heading-level";

export const contactBlock = defineType({
  name: "contactBlock",
  type: "object",
  title: "Contact",
  fieldsets: [{ name: "heading", title: "Heading", options: { columns: 2 } }],
  fields: [
    blockNameField,
    defineField({ name: "eyebrow", type: "string", title: "Eyebrow" }),
    defineField({ name: "heading", type: "string", title: "Heading", fieldset: "heading", validation: (r) => r.required() }),
    headingLevelField("h1"),
    defineField({ name: "lead", type: "text", title: "Lead", rows: 3 }),
    defineField({
      name: "channels",
      type: "array",
      title: "Contact channels",
      validation: (r) => r.min(1),
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "email", type: "string", validation: (r) => r.required().email() }),
          ],
          preview: { select: { title: "label", subtitle: "email" } },
        },
      ],
    }),
    defineField({ name: "submitLabel", type: "string", title: "Submit label", initialValue: "Send message" }),
    defineField({ name: "selectLabel", type: "string", title: "Select placeholder", initialValue: "Team size" }),
    defineField({ name: "selectOptions", type: "array", title: "Select options", of: [{ type: "string" }] }),
    defineField({ name: "messagePlaceholder", type: "string", title: "Message placeholder" }),
    defineField({ name: "successBadge", type: "string", title: "Success badge", initialValue: "Message sent" }),
    defineField({ name: "successTitle", type: "string", title: "Success title" }),
    defineField({ name: "successBody", type: "text", title: "Success body", rows: 2 }),
  ],
  preview: {
    select: { blockName: "blockName", title: "heading" },
    prepare: ({ blockName, title }) => ({ title: blockName || title || "Contact", subtitle: "Contact page block" }),
  },
});