import { defineField, defineType } from "sanity";
import { blockNameField } from "../shared/_block-name";
import { headingLevelField } from "../shared/_heading-level";

export const companyTeamBlock = defineType({
  name: "companyTeamBlock",
  type: "object",
  title: "Company · Team carousel",
  fieldsets: [{ name: "heading", title: "Heading", options: { columns: 2 } }],
  fields: [
    blockNameField,
    defineField({ name: "heading", type: "string", title: "Heading", fieldset: "heading", validation: (r) => r.required() }),
    headingLevelField("h2"),
    defineField({
      name: "members",
      type: "array",
      title: "Team members",
      validation: (r) => r.min(1),
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "role", type: "string", validation: (r) => r.required() }),
            defineField({ name: "imageUrl", type: "url", title: "External image URL" }),
          ],
          preview: { select: { title: "name", subtitle: "role" } },
        },
      ],
    }),
  ],
  preview: {
    select: { blockName: "blockName", title: "heading" },
    prepare: ({ blockName, title }) => ({ title: blockName || title || "Company team", subtitle: "Carousel" }),
  },
});