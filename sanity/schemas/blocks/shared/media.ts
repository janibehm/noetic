import { defineField, defineType } from "sanity";
import { blockNameField } from "./_block-name";

/**
 * Media block — image with optional caption, contained or full-bleed.
 */
export const mediaBlock = defineType({
  name: "mediaBlock",
  type: "object",
  title: "Media",
  fields: [
    blockNameField,
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({ name: "caption", type: "string", title: "Caption" }),
    defineField({
      name: "width",
      type: "string",
      title: "Width",
      options: {
        list: [
          { title: "Measure (text width)", value: "measure" },
          { title: "Container", value: "container" },
          { title: "Full bleed", value: "full" },
        ],
      },
      initialValue: "container",
    }),
  ],
  preview: {
    select: { blockName: "blockName", title: "caption", media: "image" },
    prepare: ({ blockName, title, media }) => ({
      title: blockName || title || "Media",
      media,
    }),
  },
});
