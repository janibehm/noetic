import { defineField, defineType } from "sanity";
import { blockNameField } from "./_block-name";

/**
 * Shared — Article carousel.
 *
 * Horizontally scrolling list of article cards. Used by the home page
 * "Stories from the canvas" (featured) and "Latest from the Lab" sections,
 * and reusable on any other page that surfaces blog/lab content.
 *
 * Source modes:
 *  - `latest`: front-end fetches the N most recent articles (optionally filtered
 *    by category). Use this for "Latest from the Lab".
 *  - `manual`: editors hand-pick references. Use this for curated "Featured"
 *    rails.
 *
 * NOTE: this block references an `article` document type. When that document
 * type is introduced, no schema migration is needed here.
 */
export const articleCarouselBlock = defineType({
  name: "articleCarouselBlock",
  type: "object",
  title: "Article carousel",
  fields: [
    blockNameField,
    defineField({ name: "eyebrow", type: "string", title: "Eyebrow" }),
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "viewAllCta",
      type: "object",
      title: "View-all link",
      description: "Optional link rendered next to the heading (e.g. 'Visit the Lab →').",
      fields: [
        defineField({ name: "label", type: "string", title: "Label" }),
        defineField({ name: "href", type: "string", title: "URL" }),
      ],
    }),
    defineField({
      name: "source",
      type: "string",
      title: "Source",
      options: {
        list: [
          { title: "Latest (automatic)", value: "latest" },
          { title: "Manual selection", value: "manual" },
        ],
        layout: "radio",
      },
      initialValue: "latest",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "limit",
      type: "number",
      title: "Max items",
      description: "Used when source is 'Latest'.",
      initialValue: 6,
      validation: (r) => r.min(1).max(24),
      hidden: ({ parent }) => parent?.source !== "latest",
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Filter by category",
      description:
        "Optional category slug filter when source is 'Latest' (e.g. 'lab', 'marketing').",
      hidden: ({ parent }) => parent?.source !== "latest",
    }),
    defineField({
      name: "articles",
      type: "array",
      title: "Articles",
      description: "Hand-picked articles, rendered in order.",
      hidden: ({ parent }) => parent?.source !== "manual",
      of: [
        {
          type: "reference",
          to: [{ type: "article" }],
        },
      ],
      validation: (r) =>
        r.custom((value, ctx) => {
          const parent = ctx.parent as { source?: string } | undefined;
          if (parent?.source !== "manual") return true;
          if (!value || (value as unknown[]).length === 0) {
            return "Pick at least one article when source is 'Manual'.";
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: { blockName: "blockName", title: "heading", source: "source" },
    prepare: ({ blockName, title, source }) => ({
      title: blockName || title || "Article carousel",
      subtitle: source === "manual" ? "Manual selection" : "Latest (auto)",
    }),
  },
});
