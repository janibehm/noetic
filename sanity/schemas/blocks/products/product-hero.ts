import { defineField, defineType } from "sanity";
import { blockNameField } from "../shared/_block-name";
import { headingLevelField } from "../shared/_heading-level";

const auroraToneList = [
  { title: "Default", value: "default" },
  { title: "Cool", value: "cool" },
  { title: "Warm", value: "warm" },
];

export const productHeroBlock = defineType({
  name: "productHeroBlock",
  type: "object",
  title: "Products · Hero dashboard",
  fieldsets: [{ name: "heading", title: "Heading", options: { columns: 2 } }],
  fields: [
    blockNameField,
    defineField({ name: "eyebrow", type: "string", title: "Eyebrow" }),
    defineField({ name: "heading", type: "string", title: "Heading", fieldset: "heading", validation: (r) => r.required() }),
    headingLevelField("h1"),
    defineField({ name: "lead", type: "text", title: "Lead", rows: 3 }),
    defineField({ name: "promptText", type: "string", title: "Dashboard prompt" }),
    defineField({
      name: "primaryCta",
      type: "object",
      title: "Primary CTA",
      fields: [defineField({ name: "label", type: "string", title: "Label" }), defineField({ name: "href", type: "string", title: "URL" })],
    }),
    defineField({
      name: "secondaryCta",
      type: "object",
      title: "Secondary CTA",
      fields: [defineField({ name: "label", type: "string", title: "Label" }), defineField({ name: "href", type: "string", title: "URL" })],
    }),
    defineField({
      name: "dashboardItems",
      type: "array",
      title: "Dashboard navigation items",
      of: [{ type: "object", fields: [defineField({ name: "label", type: "string" }), defineField({ name: "color", type: "string" })], preview: { select: { title: "label" } } }],
    }),
    defineField({
      name: "thumbnails",
      type: "array",
      title: "Dashboard thumbnails",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "featured", type: "boolean", initialValue: false }),
            defineField({ name: "auroraTone", type: "string", options: { list: auroraToneList }, initialValue: "default" }),
            defineField({ name: "image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt text" })] }),
          ],
          preview: { select: { title: "auroraTone", media: "image" } },
        },
      ],
    }),
  ],
  preview: { select: { blockName: "blockName", title: "heading" }, prepare: ({ blockName, title }) => ({ title: blockName || title || "Products hero", subtitle: "Hero dashboard" }) },
});