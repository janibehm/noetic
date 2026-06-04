import { defineField, defineType } from "sanity";

/**
 * Home page — singleton document representing the marketing home.
 *
 * Curated subset of blocks: the home-specific compositions (hero with
 * prompt, scrub words, bento, how-it-works, pull quote, CTA banner)
 * plus the shared article carousel for "Stories from the canvas" /
 * "Latest from the Lab".
 *
 * Enforced as a singleton via the desk structure in `sanity.config.ts`
 * and via document actions that hide create/duplicate/delete.
 */
export const homePage = defineType({
  name: "homePage",
  type: "document",
  title: "Home page",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Internal title",
      description: "Editor-facing label. Not rendered on the site.",
      initialValue: "Home",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "seoTitle",
      type: "string",
      title: "SEO title",
      validation: (r) => r.max(70),
    }),
    defineField({
      name: "seoDescription",
      type: "text",
      title: "SEO description",
      rows: 3,
      validation: (r) => r.max(180),
    }),
    defineField({
      name: "blocks",
      type: "array",
      title: "Content blocks",
      of: [
        { type: "heroPromptBlock" },
        { type: "scrubWordsBlock" },
        { type: "bentoShowcaseBlock" },
        { type: "howItWorksBlock" },
        { type: "articleCarouselBlock" },
        { type: "pullQuoteBlock" },
        { type: "ctaBannerBlock" },
      ],
      options: { insertMenu: { views: [{ name: "list" }] } },
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({
      title: title || "Home page",
      subtitle: "Singleton",
    }),
  },
});

/** Document `_id` used for the homePage singleton. */
export const HOME_PAGE_ID = "homePage";
