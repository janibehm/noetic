import { defineField, defineType } from "sanity";
import { blockNameField } from "../shared/_block-name";
import { headingLevelField } from "../shared/_heading-level";

export const resourcesApiBlock = defineType({
  name: "resourcesApiBlock",
  type: "object",
  title: "Resources · API documentation",
  fieldsets: [{ name: "heading", title: "Heading", options: { columns: 2 } }],
  fields: [
    blockNameField,
    defineField({ name: "heading", type: "string", title: "Heading", fieldset: "heading", validation: (r) => r.required() }),
    headingLevelField("h2"),
    defineField({ name: "lead", type: "text", title: "Lead", rows: 2 }),
    defineField({
      name: "codeSamples",
      type: "array",
      title: "Code samples",
      validation: (r) => r.min(1),
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "language", type: "string", validation: (r) => r.required() }),
            defineField({ name: "code", type: "text", rows: 10, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "label", subtitle: "language" } },
        },
      ],
    }),
    defineField({
      name: "endpointGroup",
      type: "object",
      title: "Endpoint group",
      fields: [
        defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
        defineField({ name: "baseUrl", type: "string", title: "Base URL" }),
        defineField({
          name: "rows",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "method", type: "string", options: { list: ["GET", "POST", "DEL"] }, validation: (r) => r.required() }),
                defineField({ name: "endpoint", type: "string", validation: (r) => r.required() }),
                defineField({ name: "description", type: "string", validation: (r) => r.required() }),
              ],
              preview: { select: { title: "endpoint", subtitle: "method" } },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "cards",
      type: "array",
      title: "API nav cards",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "href", type: "string", title: "URL" }),
            defineField({ name: "items", type: "array", of: [{ type: "string" }], validation: (r) => r.min(1) }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
  ],
  preview: {
    select: { blockName: "blockName", title: "heading" },
    prepare: ({ blockName, title }) => ({ title: blockName || title || "API documentation", subtitle: "Resources block" }),
  },
});