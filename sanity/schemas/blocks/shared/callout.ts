import { defineField, defineType } from "sanity";
import { blockNameField } from "./_block-name";

/**
 * Callout block — short, emphasized message.
 */
export const calloutBlock = defineType({
  name: "calloutBlock",
  type: "object",
  title: "Callout",
  fields: [
    blockNameField,
    defineField({
      name: "intent",
      type: "string",
      title: "Intent",
      options: {
        list: [
          { title: "Info", value: "info" },
          { title: "Success", value: "success" },
          { title: "Warning", value: "warning" },
          { title: "Danger", value: "danger" },
        ],
        layout: "radio",
      },
      initialValue: "info",
    }),
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "body", type: "portableText", title: "Body" }),
  ],
  preview: {
    select: { blockName: "blockName", title: "title", subtitle: "intent" },
    prepare: ({ blockName, title, subtitle }) => ({
      title: blockName || title || "Callout",
      subtitle,
    }),
  },
});
