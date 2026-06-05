import { defineField, defineType } from "sanity";
import { blockNameField } from "../shared/_block-name";
import { headingLevelField } from "../shared/_heading-level";

export const companyPartnersBlock = defineType({
  name: "companyPartnersBlock",
  type: "object",
  title: "Company · Partners logo wall",
  fieldsets: [{ name: "heading", title: "Heading", options: { columns: 2 } }],
  fields: [
    blockNameField,
    defineField({ name: "heading", type: "string", title: "Heading", fieldset: "heading", validation: (r) => r.required() }),
    headingLevelField("h2"),
    defineField({ name: "logos", type: "array", title: "Logo names", of: [{ type: "string" }], validation: (r) => r.min(1) }),
  ],
  preview: {
    select: { blockName: "blockName", title: "heading" },
    prepare: ({ blockName, title }) => ({ title: blockName || title || "Company partners", subtitle: "Logo wall" }),
  },
});