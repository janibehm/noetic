import { defineField, defineType } from "sanity";

/** Inline code block, used inside Portable Text. */
export const codeBlock = defineType({
  name: "codeBlock",
  type: "object",
  title: "Code block",
  fields: [
    defineField({
      name: "language",
      type: "string",
      title: "Language",
      options: {
        list: [
          { title: "Text", value: "text" },
          { title: "TypeScript", value: "ts" },
          { title: "JavaScript", value: "js" },
          { title: "TSX", value: "tsx" },
          { title: "JSON", value: "json" },
          { title: "CSS", value: "css" },
          { title: "HTML", value: "html" },
          { title: "Bash", value: "bash" },
        ],
      },
      initialValue: "text",
    }),
    defineField({ name: "code", type: "text", title: "Code", rows: 8 }),
    defineField({ name: "filename", type: "string", title: "Filename" }),
  ],
  preview: {
    select: { title: "filename", subtitle: "language" },
    prepare({ title, subtitle }) {
      return { title: title || "Code", subtitle: subtitle || "text" };
    },
  },
});
