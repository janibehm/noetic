import { defineField, defineType } from "sanity";
import { blockNameField } from "../shared/_block-name";
import { headingLevelField } from "../shared/_heading-level";

export const pricingHeroBlock = defineType({
  name: "pricingHeroBlock",
  type: "object",
  title: "Pricing · Hero",
  fieldsets: [{ name: "heading", title: "Heading", options: { columns: 2 } }],
  fields: [
    blockNameField,
    defineField({ name: "eyebrow", type: "string", title: "Eyebrow" }),
    defineField({ name: "heading", type: "string", title: "Heading", fieldset: "heading", validation: (r) => r.required() }),
    headingLevelField("h1"),
    defineField({ name: "lead", type: "text", title: "Lead", rows: 2 }),
    defineField({ name: "monthlyLabel", type: "string", title: "Monthly label", initialValue: "Monthly" }),
    defineField({ name: "annualLabel", type: "string", title: "Annual label", initialValue: "Annual" }),
    defineField({ name: "saveBadge", type: "string", title: "Save badge", initialValue: "Save 20%" }),
  ],
  preview: {
    select: { blockName: "blockName", title: "heading" },
    prepare: ({ blockName, title }) => ({ title: blockName || title || "Pricing hero", subtitle: "Pricing block" }),
  },
});