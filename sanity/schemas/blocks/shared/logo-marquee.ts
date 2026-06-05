import { defineField, defineType } from "sanity";
import { blockNameField } from "./_block-name";

export const logoMarqueeBlock = defineType({
  name: "logoMarqueeBlock",
  type: "object",
  title: "Logo marquee",
  fields: [
    blockNameField,
    defineField({ name: "heading", type: "string", title: "Heading" }),
    defineField({ name: "highlightedText", type: "string", title: "Highlighted phrase" }),
    defineField({ name: "logos", type: "array", title: "Logos", of: [{ type: "string" }], validation: (r) => r.min(1) }),
  ],
  preview: {
    select: { blockName: "blockName", title: "heading" },
    prepare: ({ blockName, title }) => ({ title: blockName || title || "Logo marquee", subtitle: "Shared block" }),
  },
});