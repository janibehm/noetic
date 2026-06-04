import { defineField, defineType } from "sanity";
import { blockNameField } from "../shared/_block-name";
import { headingLevelField } from "../shared/_heading-level";

/**
 * Home — How it works (numbered steps).
 *
 * Matches `noetic_CLAUDE_DESIGN/index.html` → section (4) "HOW IT WORKS".
 */
export const howItWorksBlock = defineType({
  name: "howItWorksBlock",
  type: "object",
  title: "Home · How it works",
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
    defineField({
      name: "steps",
      type: "array",
      title: "Steps",
      validation: (r) => r.min(2).max(6),
      of: [
        {
          type: "object",
          name: "step",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Title",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "body",
              type: "text",
              title: "Body",
              rows: 3,
              validation: (r) => r.required(),
            }),
            defineField({
              name: "icon",
              type: "string",
              title: "Icon key",
              description:
                "Identifier mapped to an SVG in the front-end icon registry (e.g. 'prompt', 'grid', 'export').",
            }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        },
      ],
    }),
  ],
  preview: {
    select: { blockName: "blockName", title: "heading", steps: "steps" },
    prepare: ({ blockName, title, steps }) => ({
      title: blockName || title || "How it works",
      subtitle: steps?.length ? `${steps.length} step(s)` : undefined,
    }),
  },
});
