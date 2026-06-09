import { defineField, defineType } from "sanity";
import { blockNameField } from "../shared/_block-name";
import { headingLevelField } from "../shared/_heading-level";

export const solutionHeroBlock = defineType({
  name: "solutionHeroBlock",
  type: "object",
  title: "Solutions · Hero",
  fieldsets: [{ name: "heading", title: "Heading", options: { columns: 2 } }],
  fields: [
    blockNameField,
    defineField({ name: "eyebrow", type: "string", title: "Eyebrow" }),
    defineField({ name: "heading", type: "string", title: "Heading", fieldset: "heading", validation: (r) => r.required() }),
    headingLevelField("h1"),
    defineField({ name: "lead", type: "text", title: "Lead", rows: 2 }),
    defineField({ name: "cardHeading", type: "string", title: "Card heading" }),
    defineField({ name: "cardBody", type: "text", title: "Card body", rows: 2 }),
    defineField({ name: "cta", type: "object", title: "CTA", fields: [defineField({ name: "label", type: "string" }), defineField({ name: "href", type: "string" })] }),
    defineField({
      name: "backgroundVideo",
      type: "file",
      title: "Background video",
      description: "Optional. Plays muted/looping inside the showcase card, over the aurora.",
      options: { accept: "video/*" },
    }),
  ],
  preview: {
    select: { blockName: "blockName", title: "heading" },
    prepare: ({ blockName, title }) => ({ title: blockName || title || "Solutions hero", subtitle: "Solutions block" }),
  },
});