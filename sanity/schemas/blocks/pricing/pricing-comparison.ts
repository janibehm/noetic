import { defineField, defineType } from "sanity";
import { blockNameField } from "../shared/_block-name";
import { headingLevelField } from "../shared/_heading-level";

export const pricingComparisonBlock = defineType({
  name: "pricingComparisonBlock",
  type: "object",
  title: "Pricing · Comparison table",
  fieldsets: [{ name: "heading", title: "Heading", options: { columns: 2 } }],
  fields: [
    blockNameField,
    defineField({ name: "heading", type: "string", title: "Heading", fieldset: "heading", validation: (r) => r.required() }),
    headingLevelField("h2"),
    defineField({ name: "featuredPlanIndex", type: "number", title: "Featured plan index", initialValue: 2 }),
    defineField({ name: "plans", type: "array", title: "Plans", of: [{ type: "string" }] }),
    defineField({
      name: "groups",
      type: "array",
      title: "Feature groups",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "rows",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "feature", type: "string", validation: (r) => r.required() }),
                    defineField({ name: "values", type: "array", title: "Values, in plan order", of: [{ type: "string" }] }),
                  ],
                  preview: { select: { title: "feature" } },
                },
              ],
            }),
          ],
          preview: { select: { title: "name" } },
        },
      ],
    }),
  ],
  preview: {
    select: { blockName: "blockName", title: "heading" },
    prepare: ({ blockName, title }) => ({ title: blockName || title || "Pricing comparison", subtitle: "Pricing block" }),
  },
});