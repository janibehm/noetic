import { defineField, defineType } from "sanity";
import { blockNameField } from "../shared/_block-name";
import { headingLevelField } from "../shared/_heading-level";

export const labSpotlightBlock = defineType({
  name: "labSpotlightBlock",
  type: "object",
  title: "Lab · Spotlight",
  fieldsets: [{ name: "heading", title: "Heading", options: { columns: 2 } }],
  fields: [
    blockNameField,
    defineField({ name: "eyebrow", type: "string", title: "Eyebrow" }),
    defineField({ name: "heading", type: "string", title: "Heading", fieldset: "heading", validation: (r) => r.required() }),
    headingLevelField("h2"),
    defineField({ name: "body", type: "text", title: "Body", rows: 2 }),
    defineField({
      name: "cta",
      type: "object",
      title: "CTA",
      fields: [
        defineField({ name: "label", type: "string" }),
        defineField({ name: "href", type: "string" }),
      ],
    }),
    defineField({
      name: "backgroundVideo",
      type: "file",
      title: "Background video",
      description: "Optional. Plays muted/looping behind the spotlight, over the aurora wash.",
      options: { accept: "video/*" },
    }),
  ],
  preview: {
    select: { blockName: "blockName", title: "heading" },
    prepare: ({ blockName, title }) => ({ title: blockName || title || "Lab spotlight", subtitle: "Lab block" }),
  },
});