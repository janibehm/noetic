import { defineField, defineType } from "sanity";

/**
 * Article — blog / lab post composed of structured metadata and a
 * Portable Text body. Used both as a standalone document (rendered
 * on its own slug route) and as the data source for the shared
 * `articleCarouselBlock`.
 */
export const article = defineType({
  name: "article",
  type: "document",
  title: "Article",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Metadata" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      group: "content",
      validation: (r) => r.required().max(140),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      title: "Excerpt",
      group: "content",
      rows: 3,
      description:
        "Short summary used in carousels and link previews. ~160 chars.",
      validation: (r) => r.max(240),
    }),
    defineField({
      name: "coverImage",
      type: "image",
      title: "Cover image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
      ],
    }),
    defineField({
      name: "body",
      type: "portableText",
      title: "Body",
      group: "content",
    }),
    defineField({
      name: "category",
      type: "reference",
      title: "Category",
      group: "meta",
      to: [{ type: "articleCategory" }],
    }),
    defineField({
      name: "author",
      type: "object",
      title: "Author",
      group: "meta",
      fields: [
        defineField({
          name: "name",
          type: "string",
          title: "Name",
          validation: (r) => r.required(),
        }),
        defineField({ name: "role", type: "string", title: "Role" }),
        defineField({
          name: "avatar",
          type: "image",
          title: "Avatar",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt text" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published at",
      group: "meta",
      validation: (r) => r.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "readingTimeMinutes",
      type: "number",
      title: "Reading time (minutes)",
      group: "meta",
      validation: (r) => r.min(1).max(120).integer(),
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured",
      group: "meta",
      description: "Surface this article in 'Featured' rails.",
      initialValue: false,
    }),
    defineField({
      name: "seoTitle",
      type: "string",
      title: "SEO title",
      group: "seo",
      validation: (r) => r.max(70),
    }),
    defineField({
      name: "seoDescription",
      type: "text",
      title: "SEO description",
      group: "seo",
      rows: 3,
      validation: (r) => r.max(180),
    }),
  ],
  orderings: [
    {
      name: "publishedDesc",
      title: "Published — newest first",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      name: "publishedAsc",
      title: "Published — oldest first",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category.title",
      media: "coverImage",
      date: "publishedAt",
    },
    prepare: ({ title, subtitle, media, date }) => ({
      title: title || "Untitled article",
      subtitle: [subtitle, date ? new Date(date).toLocaleDateString() : null]
        .filter(Boolean)
        .join(" · "),
      media,
    }),
  },
});
