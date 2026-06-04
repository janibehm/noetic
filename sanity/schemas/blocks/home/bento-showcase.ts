import { defineField, defineType } from "sanity";
import { blockNameField } from "../shared/_block-name";
import { headingLevelField } from "../shared/_heading-level";

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
  fieldsets: [{ name: "heading", title: "Heading", options: { columns: 2 } }],
  fields: [
    blockNameField,
    defineField({ name: "eyebrow", type: "string", title: "Eyebrow" }),
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      fieldset: "heading",
      validation: (r) => r.required(),
    }),
    headingLevelField("h2"),
    defineField({ name: "lead", type: "text", title: "Lead", rows: 2 }),
  ],
  preview: {
    select: { blockName: "blockName", title: "heading" },
    prepare: ({ blockName, title }) => ({
      title: blockName || title || "Bento showcase",
      subtitle: "Latest article from every category",
    }),
  },
});
