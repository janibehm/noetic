import { defineField, defineType } from "sanity";
import { blockNameField } from "./_block-name";

/**
 * Hero block — title, eyebrow, lead paragraph, optional image and CTA.
 * Generic hero used outside the home page.
 */
export const heroBlock = defineType({
  name: "heroBlock",
  type: "object",
  title: "Hero",
  fields: [
    blockNameField,
    defineField({ name: "eyebrow", type: "string", title: "Eyebrow" }),
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      validation: (r) => r.required(),
    }),
    defineField({ name: "lead", type: "text", title: "Lead", rows: 3 }),
    defineField({
      name: "tone",
      type: "string",
      title: "Tone",
      options: {
        list: [
          { title: "Canvas", value: "canvas" },
          { title: "Surface", value: "surface" },
          { title: "Subtle", value: "subtle" },
          { title: "Inverse", value: "inverse" },
          { title: "Accent", value: "accent" },
        ],
        layout: "radio",
      },
      initialValue: "canvas",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name: "primaryCta",
      type: "object",
      title: "Primary CTA",
      fields: [
        defineField({ name: "label", type: "string", title: "Label" }),
        defineField({ name: "href", type: "string", title: "URL" }),
      ],
    }),
  ],
  preview: {
    select: { blockName: "blockName", title: "heading", subtitle: "eyebrow" },
    prepare: ({ blockName, title, subtitle }) => ({
      title: blockName || title || "Hero",
      subtitle: subtitle || "Hero block",
    }),
  },
});
