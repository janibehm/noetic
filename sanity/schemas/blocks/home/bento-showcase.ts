import { defineField, defineType } from "sanity";
import { blockNameField } from "../shared/_block-name";

/**
 * Home — Bento showcase grid.
 *
 * Mosaic of feature cards with optional column/row spans. Matches
 * `noetic_CLAUDE_DESIGN/index.html` → section (3) "BENTO SHOWCASE".
 */
export const bentoShowcaseBlock = defineType({
  name: "bentoShowcaseBlock",
  type: "object",
  title: "Home · Bento showcase",
  fields: [
    blockNameField,
    defineField({ name: "eyebrow", type: "string", title: "Eyebrow" }),
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      validation: (r) => r.required(),
    }),
    defineField({ name: "lead", type: "text", title: "Lead", rows: 2 }),
    defineField({
      name: "items",
      type: "array",
      title: "Bento items",
      validation: (r) => r.min(1).max(12),
      of: [
        {
          type: "object",
          name: "bentoItem",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Title",
              validation: (r) => r.required(),
            }),
            defineField({ name: "body", type: "text", title: "Body", rows: 2 }),
            defineField({
              name: "tag",
              type: "string",
              title: "Tag",
              description: "Optional pill shown in the corner (e.g. 'Flagship').",
            }),
            defineField({
              name: "media",
              type: "object",
              title: "Media",
              fields: [
                defineField({
                  name: "kind",
                  type: "string",
                  title: "Kind",
                  options: {
                    list: [
                      { title: "Image", value: "image" },
                      { title: "Aurora gradient", value: "aurora" },
                    ],
                    layout: "radio",
                  },
                  initialValue: "image",
                }),
                defineField({
                  name: "image",
                  type: "image",
                  title: "Image",
                  options: { hotspot: true },
                  hidden: ({ parent }) => parent?.kind !== "image",
                  fields: [
                    defineField({
                      name: "alt",
                      type: "string",
                      title: "Alt text",
                    }),
                  ],
                }),
                defineField({
                  name: "auroraTone",
                  type: "string",
                  title: "Aurora tone",
                  options: {
                    list: [
                      { title: "Default", value: "default" },
                      { title: "Cool", value: "cool" },
                      { title: "Warm", value: "warm" },
                    ],
                    layout: "radio",
                  },
                  initialValue: "default",
                  hidden: ({ parent }) => parent?.kind !== "aurora",
                }),
              ],
            }),
            defineField({
              name: "span",
              type: "object",
              title: "Grid span",
              description: "Optional layout hints for larger viewports.",
              fields: [
                defineField({
                  name: "columns",
                  type: "number",
                  title: "Columns",
                  options: { list: [1, 2, 3, 4] },
                  initialValue: 1,
                }),
                defineField({
                  name: "rows",
                  type: "number",
                  title: "Rows",
                  options: { list: [1, 2] },
                  initialValue: 1,
                }),
              ],
            }),
            defineField({
              name: "href",
              type: "string",
              title: "Link URL",
              description: "Optional — turns the card into a link.",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "tag", media: "media.image" },
            prepare: ({ title, subtitle, media }) => ({
              title,
              subtitle,
              media,
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: { blockName: "blockName", title: "heading", items: "items" },
    prepare: ({ blockName, title, items }) => ({
      title: blockName || title || "Bento showcase",
      subtitle: items?.length ? `${items.length} item(s)` : "Bento showcase",
    }),
  },
});
