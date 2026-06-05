import { defineField, defineType } from "sanity";
import { blockNameField } from "../shared/_block-name";
import { headingLevelField } from "../shared/_heading-level";

const auroraToneList = [
  { title: "Default", value: "default" },
  { title: "Cool", value: "cool" },
  { title: "Warm", value: "warm" },
];

export const labArticleGridBlock = defineType({
  name: "labArticleGridBlock",
  type: "object",
  title: "Lab · Article grid",
  fieldsets: [{ name: "heading", title: "Heading", options: { columns: 2 } }],
  fields: [
    blockNameField,
    defineField({ name: "heading", type: "string", title: "Heading", fieldset: "heading", validation: (r) => r.required() }),
    headingLevelField("h2"),
    defineField({ name: "countLabel", type: "string", title: "Count / label" }),
    defineField({
      name: "layout",
      type: "string",
      title: "Layout",
      options: {
        list: [
          { title: "Featured", value: "featured" },
          { title: "Masonry", value: "masonry" },
        ],
        layout: "radio",
      },
      initialValue: "masonry",
      validation: (r) => r.required(),
    }),
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
            defineField({ name: "tag", type: "string", title: "Floating tag" }),
            defineField({ name: "category", type: "string" }),
            defineField({ name: "meta", type: "string", title: "Meta text" }),
            defineField({ name: "href", type: "string", title: "URL" }),
            defineField({ name: "imageUrl", type: "url", title: "External image URL" }),
            defineField({ name: "auroraTone", type: "string", options: { list: auroraToneList }, initialValue: "default" }),
          ],
          preview: { select: { title: "title", subtitle: "tag" } },
        },
      ],
    }),
  ],
  preview: {
    select: { blockName: "blockName", title: "heading", layout: "layout" },
    prepare: ({ blockName, title, layout }) => ({ title: blockName || title || "Lab article grid", subtitle: layout === "featured" ? "Featured layout" : "Masonry layout" }),
  },
});