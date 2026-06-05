import { defineField, defineType } from "sanity";
import { blockNameField } from "../shared/_block-name";
import { headingLevelField } from "../shared/_heading-level";

export const resourcesFeaturedBlock = defineType({
  name: "resourcesFeaturedBlock",
  type: "object",
  title: "Resources · Featured article",
  fieldsets: [{ name: "heading", title: "Heading", options: { columns: 2 } }],
  fields: [
    blockNameField,
    defineField({ name: "badge", type: "string", title: "Badge" }),
    defineField({ name: "heading", type: "string", title: "Heading", fieldset: "heading", validation: (r) => r.required() }),
    headingLevelField("h1"),
    defineField({ name: "lead", type: "text", title: "Lead", rows: 3 }),
    defineField({ name: "href", type: "string", title: "Article URL" }),
    defineField({ name: "imageUrl", type: "url", title: "External image URL" }),
    defineField({
      name: "auroraTone",
      type: "string",
      title: "Aurora tone",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Cool", value: "cool" },
          { title: "Warm", value: "warm" },
        ],
        layout: "radio",
      },
      initialValue: "cool",
    }),
    defineField({
      name: "author",
      type: "object",
      title: "Author",
      fields: [
        defineField({ name: "name", type: "string", validation: (r) => r.required() }),
        defineField({ name: "meta", type: "string", title: "Role / reading time" }),
        defineField({ name: "avatarUrl", type: "url", title: "External avatar URL" }),
      ],
    }),
  ],
  preview: {
    select: { blockName: "blockName", title: "heading", subtitle: "badge" },
    prepare: ({ blockName, title, subtitle }) => ({ title: blockName || title || "Featured resource", subtitle }),
  },
});