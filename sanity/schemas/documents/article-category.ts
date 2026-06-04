import { defineField, defineType } from "sanity";

/**
 * Article category — lightweight taxonomy used to filter article
 * carousels (e.g. "lab", "marketing", "research").
 */
export const articleCategory = defineType({
  name: "articleCategory",
  type: "document",
  title: "Article category",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title", maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
