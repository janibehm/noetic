import { defineField, defineType } from "sanity";
import { blockNameField } from "./_block-name";

/**
 * Rich-text block — body copy rendered through Portable Text and
 * constrained to a comfortable reading measure.
 */
export const richTextBlock = defineType({
  name: "richTextBlock",
  type: "object",
  title: "Rich text",
  fields: [
    blockNameField,
    defineField({
      name: "content",
      type: "portableText",
      title: "Content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tone",
      type: "string",
      title: "Tone",
      options: {
        list: [
          { title: "Canvas", value: "canvas" },
          { title: "Surface", value: "surface" },
          { title: "Subtle", value: "subtle" },
          { title: "Accent", value: "accent" },
        ],
      },
      initialValue: "canvas",
    }),
  ],
  preview: {
    select: { blockName: "blockName" },
    prepare: ({ blockName }) => ({ title: blockName || "Rich text block" }),
  },
});
