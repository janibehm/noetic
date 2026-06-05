import { defineField, defineType } from "sanity";
import { blockNameField } from "../shared/_block-name";
import { headingLevelField } from "../shared/_heading-level";

const auroraToneList = [
  { title: "Default", value: "default" },
  { title: "Cool", value: "cool" },
  { title: "Warm", value: "warm" },
];

export const productCardGridBlock = defineType({
  name: "productCardGridBlock",
  type: "object",
  title: "Products · Product cards",
  fieldsets: [{ name: "heading", title: "Heading", options: { columns: 2 } }],
  fields: [
    blockNameField,
    defineField({ name: "heading", type: "string", title: "Heading", fieldset: "heading" }),
    headingLevelField("h2"),
    defineField({ name: "lead", type: "text", title: "Lead", rows: 2 }),
    defineField({
      name: "items",
      type: "array",
      title: "Product cards",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", type: "text", rows: 3 }),
            defineField({ name: "href", type: "string", title: "Link URL" }),
            defineField({ name: "auroraTone", type: "string", options: { list: auroraToneList }, initialValue: "default" }),
            defineField({ name: "image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt text" })] }),
          ],
          preview: { select: { title: "title", subtitle: "body", media: "image" } },
        },
      ],
    }),
  ],
  preview: { select: { blockName: "blockName", title: "heading" }, prepare: ({ blockName, title }) => ({ title: blockName || title || "Product cards", subtitle: "Products block" }) },
});