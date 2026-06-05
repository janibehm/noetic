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
        { type: "logoMarqueeBlock" },
        { type: "demoFormBlock" },
        { type: "howItWorksBlock" },
        // Home-page blocks (use sparingly outside the home page)
        { type: "heroPromptBlock" },
        { type: "scrubWordsBlock" },
        { type: "bentoShowcaseBlock" },
        // Product-page blocks
        { type: "productHeroBlock" },
        { type: "productCardGridBlock" },
        { type: "productStickyStackBlock" },
        { type: "productTrustGridBlock" },
        // Pricing-page blocks
        { type: "pricingHeroBlock" },
        { type: "pricingTiersBlock" },
        { type: "pricingComparisonBlock" },
        { type: "pricingFaqBlock" },
        // Solutions-page blocks
        { type: "solutionHeroBlock" },
        { type: "solutionAccordionBlock" },
        { type: "solutionFeatureSectionsBlock" },
        // Lab-page blocks
        { type: "labHeroBlock" },
        { type: "labArticleGridBlock" },
        { type: "labSpotlightBlock" },
        // Resources-page blocks
        { type: "resourcesFeaturedBlock" },
        { type: "resourcesLibraryBlock" },
        { type: "resourcesApiBlock" },
        // Company-page blocks
        { type: "companyHeroBlock" },
        { type: "companyTeamBlock" },
        { type: "companyPartnersBlock" },
        { type: "companyJobsBlock" },
        // Contact-page block
        { type: "contactBlock" },
      ],
      options: { insertMenu: { views: [{ name: "list" }] } },
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
