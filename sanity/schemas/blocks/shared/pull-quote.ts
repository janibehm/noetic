import { defineField, defineType } from "sanity";
import { blockNameField } from "./_block-name";

/**
 * Shared — Pull quote / testimonial.
 *
 * Used on the home page (customer quote) and the solutions page
 * (industry testimonial). Author block is optional so the same
 * schema can render anonymous editorial quotes.
 */
export const pullQuoteBlock = defineType({
  name: "pullQuoteBlock",
  type: "object",
  title: "Pull quote",
  fields: [
    blockNameField,
    defineField({
      name: "quote",
      type: "text",
      title: "Quote",
      rows: 3,
      validation: (r) => r.required().max(280),
    }),
    defineField({
      name: "author",
      type: "object",
      title: "Author",
      fields: [
        defineField({
          name: "name",
          type: "string",
          title: "Name",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "role",
          type: "string",
          title: "Role / company",
        }),
        defineField({
          name: "avatar",
          type: "image",
          title: "Avatar",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt text" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "alignment",
      type: "string",
      title: "Alignment",
      options: {
        list: [
          { title: "Center", value: "center" },
          { title: "Start", value: "start" },
        ],
        layout: "radio",
      },
      initialValue: "center",
    }),
  ],
  preview: {
    select: {
      blockName: "blockName",
      title: "quote",
      subtitle: "author.name",
      media: "author.avatar",
    },
    prepare: ({ blockName, title, subtitle, media }) => ({
      title:
        blockName ||
        (title
          ? `“${title.slice(0, 60)}${title.length > 60 ? "…" : ""}”`
          : "Pull quote"),
      subtitle,
      media,
    }),
  },
});
