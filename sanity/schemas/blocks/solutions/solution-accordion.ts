import { defineField, defineType } from "sanity";
import { blockNameField } from "../shared/_block-name";
import { headingLevelField } from "../shared/_heading-level";

const auroraToneList = [
  { title: "Default", value: "default" },
  { title: "Cool", value: "cool" },
  { title: "Warm", value: "warm" },
];

export const solutionAccordionBlock = defineType({
  name: "solutionAccordionBlock",
  type: "object",
  title: "Solutions · Use-case accordion",
  fieldsets: [{ name: "heading", title: "Heading", options: { columns: 2 } }],
  fields: [
    blockNameField,
    defineField({ name: "heading", type: "string", title: "Heading", fieldset: "heading", validation: (r) => r.required() }),
    headingLevelField("h2"),
    defineField({
      name: "items",
      type: "array",
      title: "Items",
      validation: (r) => r.min(2),
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", type: "text", rows: 3 }),
            defineField({ name: "imageUrl", type: "url", title: "External image URL" }),
            defineField({ name: "auroraTone", type: "string", options: { list: auroraToneList }, initialValue: "default" }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        },
      ],
    }),
  ],
  preview: {
    select: { blockName: "blockName", title: "heading" },
    prepare: ({ blockName, title }) => ({ title: blockName || title || "Solutions accordion", subtitle: "Solutions block" }),
  },
});