import { defineField, defineType } from "sanity";

/**
 * Page — a composable document built from a `blocks` array.
 * This is the block-architecture entry point: editors compose
 * pages by stacking heroBlock / richTextBlock / featureGridBlock
 * / calloutBlock / mediaBlock.
 */
export const page = defineType({
  name: "page",
  type: "document",
  title: "Page",
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
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "seoDescription",
      type: "text",
      title: "SEO description",
      rows: 3,
    }),
    defineField({
      name: "blocks",
      type: "array",
      title: "Content blocks",
      of: [
        // Shared blocks (reusable across pages)
        { type: "heroBlock" },
        { type: "richTextBlock" },
        { type: "featureGridBlock" },
        { type: "calloutBlock" },
        { type: "mediaBlock" },
        { type: "articleCarouselBlock" },
        { type: "ctaBannerBlock" },
        { type: "pullQuoteBlock" },
        // Home-page blocks (use sparingly outside the home page)
        { type: "heroPromptBlock" },
        { type: "scrubWordsBlock" },
        { type: "bentoShowcaseBlock" },
        { type: "howItWorksBlock" },
        // Product-page blocks
        { type: "productHeroBlock" },
        { type: "productLogoMarqueeBlock" },
        { type: "productCardGridBlock" },
        { type: "productStickyStackBlock" },
        { type: "productTrustGridBlock" },
        { type: "productDemoFormBlock" },
      ],
      options: { insertMenu: { views: [{ name: "list" }] } },
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
