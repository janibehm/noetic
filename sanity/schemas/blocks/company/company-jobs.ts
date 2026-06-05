import { defineField, defineType } from "sanity";
import { blockNameField } from "../shared/_block-name";
import { headingLevelField } from "../shared/_heading-level";

export const companyJobsBlock = defineType({
  name: "companyJobsBlock",
  type: "object",
  title: "Company · Open positions",
  fieldsets: [{ name: "heading", title: "Heading", options: { columns: 2 } }],
  fields: [
    blockNameField,
    defineField({ name: "heading", type: "string", title: "Heading", fieldset: "heading", validation: (r) => r.required() }),
    headingLevelField("h2"),
    defineField({
      name: "jobs",
      type: "array",
      title: "Jobs",
      validation: (r) => r.min(1),
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "team", type: "string", validation: (r) => r.required() }),
            defineField({ name: "location", type: "string", validation: (r) => r.required() }),
            defineField({ name: "href", type: "string", title: "URL" }),
          ],
          preview: { select: { title: "title", subtitle: "team" } },
        },
      ],
    }),
  ],
  preview: {
    select: { blockName: "blockName", title: "heading" },
    prepare: ({ blockName, title }) => ({ title: blockName || title || "Company jobs", subtitle: "Open positions" }),
  },
});