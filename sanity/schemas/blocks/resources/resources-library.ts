import { defineField, defineType } from "sanity";
import { blockNameField } from "../shared/_block-name";
import { headingLevelField } from "../shared/_heading-level";

const auroraToneList = [
  { title: "Default", value: "default" },
  { title: "Cool", value: "cool" },
  { title: "Warm", value: "warm" },
];

export const resourcesLibraryBlock = defineType({
  name: "resourcesLibraryBlock",
  type: "object",
  title: "Resources · Filterable library",
  fieldsets: [{ name: "heading", title: "Heading", options: { columns: 2 } }],
  fields: [
    blockNameField,
    defineField({ name: "heading", type: "string", title: "Heading", fieldset: "heading", validation: (r) => r.required() }),
    headingLevelField("h2"),
    defineField({
      name: "items",
      type: "array",
      title: "Cards",
      validation: (r) => r.min(1),
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "category", type: "string", validation: (r) => r.required() }),
            defineField({ name: "href", type: "string", title: "URL" }),
            defineField({ name: "imageUrl", type: "url", title: "External image URL" }),
            defineField({ name: "auroraTone", type: "string", options: { list: auroraToneList }, initialValue: "default" }),
          ],
          preview: { select: { title: "title", subtitle: "category" } },
        },
      ],
    }),
  ],
  preview: {
    select: { blockName: "blockName", title: "heading" },
    prepare: ({ blockName, title }) => ({ title: blockName || title || "Resource library", subtitle: "Filterable resources" }),
  },
});