import { defineField, defineType } from "sanity";
import { blockNameField } from "../shared/_block-name";

const auroraToneList = [
  { title: "Default", value: "default" },
  { title: "Cool", value: "cool" },
  { title: "Warm", value: "warm" },
];

export const solutionFeatureSectionsBlock = defineType({
  name: "solutionFeatureSectionsBlock",
  type: "object",
  title: "Solutions · Feature sections",
  fields: [
    blockNameField,
    defineField({
      name: "sections",
      type: "array",
      title: "Sections",
      validation: (r) => r.min(1),
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "eyebrow", type: "string" }),
            defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", type: "text", rows: 2 }),
            defineField({ name: "bullets", type: "array", of: [{ type: "string" }] }),
            defineField({ name: "flip", type: "boolean", title: "Flip media/text", initialValue: false }),
            defineField({ name: "imageUrl", type: "url", title: "External image URL" }),
            defineField({ name: "auroraTone", type: "string", options: { list: auroraToneList }, initialValue: "default" }),
          ],
          preview: { select: { title: "heading", subtitle: "eyebrow" } },
        },
      ],
    }),
  ],
  preview: {
    select: { blockName: "blockName" },
    prepare: ({ blockName }) => ({ title: blockName || "Solution feature sections", subtitle: "Solutions block" }),
  },
});