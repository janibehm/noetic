import { defineField, defineType } from "sanity";
import { blockNameField } from "../shared/_block-name";

const ctaVariantList = [
  { title: "Solid", value: "solid" },
  { title: "Ghost", value: "ghost" },
];

export const pricingTiersBlock = defineType({
  name: "pricingTiersBlock",
  type: "object",
  title: "Pricing · Tiers",
  fields: [
    blockNameField,
    defineField({ name: "creditsNote", type: "string", title: "Credits note" }),
    defineField({
      name: "plans",
      type: "array",
      title: "Plans",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", type: "text", rows: 2 }),
            defineField({ name: "monthlyPrice", type: "number", title: "Monthly price" }),
            defineField({ name: "annualPrice", type: "number", title: "Annual monthly-equivalent price" }),
            defineField({ name: "monthlyBillNote", type: "string", initialValue: "Billed monthly" }),
            defineField({ name: "annualBillNote", type: "string", initialValue: "Billed annually" }),
            defineField({ name: "cta", type: "object", fields: [defineField({ name: "label", type: "string" }), defineField({ name: "href", type: "string" })] }),
            defineField({ name: "ctaVariant", type: "string", options: { list: ctaVariantList }, initialValue: "solid" }),
            defineField({ name: "featured", type: "boolean", initialValue: false }),
            defineField({ name: "badge", type: "string", title: "Badge" }),
            defineField({
              name: "features",
              type: "array",
              title: "Features",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "highlight", type: "string" }),
                    defineField({ name: "text", type: "string", validation: (r) => r.required() }),
                    defineField({ name: "muted", type: "boolean", initialValue: false }),
                  ],
                  preview: { select: { title: "text", subtitle: "highlight" } },
                },
              ],
            }),
          ],
          preview: { select: { title: "name", subtitle: "description" } },
        },
      ],
    }),
    defineField({
      name: "enterprise",
      type: "object",
      title: "Enterprise strip",
      fields: [
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "body", type: "text", rows: 2 }),
        defineField({ name: "cta", type: "object", fields: [defineField({ name: "label", type: "string" }), defineField({ name: "href", type: "string" })] }),
      ],
    }),
  ],
  preview: {
    select: { blockName: "blockName" },
    prepare: ({ blockName }) => ({ title: blockName || "Pricing tiers", subtitle: "Pricing block" }),
  },
});