import { defineField, defineType } from "sanity";
import { blockNameField } from "../shared/_block-name";
import { headingLevelField } from "../shared/_heading-level";

export const productTrustGridBlock = defineType({
  name: "productTrustGridBlock",
  type: "object",
  title: "Products · Trust cards",
  fieldsets: [{ name: "heading", title: "Heading", options: { columns: 2 } }],
  fields: [
    blockNameField,
    defineField({ name: "heading", type: "string", title: "Heading", fieldset: "heading" }),
    headingLevelField("h2"),
    defineField({ name: "lead", type: "text", title: "Lead", rows: 2 }),
    defineField({
      name: "items",
      type: "array",
      title: "Trust cards",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "icon", type: "string", options: { list: [{ title: "Shield", value: "shield" }, { title: "Lock", value: "lock" }, { title: "License", value: "license" }] }, initialValue: "shield" }),
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        },
      ],
    }),
  ],
  preview: { select: { blockName: "blockName", title: "heading" }, prepare: ({ blockName, title }) => ({ title: blockName || title || "Trust cards", subtitle: "Products block" }) },
});