import { defineField, defineType } from "sanity";
import { blockNameField } from "./_block-name";

/**
 * Feature grid block — list of cards with icon/image, heading, body.
 */
export const featureGridBlock = defineType({
  name: "featureGridBlock",
  type: "object",
  title: "Feature grid",
  fields: [
    blockNameField,
    defineField({ name: "heading", type: "string", title: "Heading" }),
    defineField({ name: "lead", type: "text", title: "Lead", rows: 2 }),
    defineField({
      name: "columns",
      type: "number",
      title: "Columns",
      options: { list: [2, 3, 4] },
      initialValue: 3,
    }),
    defineField({
      name: "items",
      type: "array",
      title: "Items",
      of: [
        {
          type: "object",
          name: "feature",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "body", type: "text", title: "Body", rows: 3 }),
            defineField({
              name: "image",
              type: "image",
              title: "Image",
              options: { hotspot: true },
            }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
  ],
  preview: {
    select: { blockName: "blockName", title: "heading" },
    prepare: ({ blockName, title }) => ({
      title: blockName || title || "Feature grid",
      subtitle: "Feature grid block",
    }),
  },
});
