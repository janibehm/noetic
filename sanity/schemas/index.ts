import type { SchemaTypeDefinition } from "sanity";
import { portableText } from "./portable-text";
import { codeBlock } from "./code-block";
import {
  heroBlock,
  richTextBlock,
  calloutBlock,
  featureGridBlock,
  mediaBlock,
  articleCarouselBlock,
  ctaBannerBlock,
  pullQuoteBlock,
  logoMarqueeBlock,
  demoFormBlock,
  howItWorksBlock,
} from "./blocks/shared";
import {
  heroPromptBlock,
  scrubWordsBlock,
  bentoShowcaseBlock,
} from "./blocks/home";
import {
  productHeroBlock,
  productCardGridBlock,
  productStickyStackBlock,
  productTrustGridBlock,
} from "./blocks/products";
import {
  pricingHeroBlock,
  pricingTiersBlock,
  pricingComparisonBlock,
  pricingFaqBlock,
} from "./blocks/pricing";
import { page } from "./page";
import { homePage } from "./documents/home-page";
import { article } from "./documents/article";
import { articleCategory } from "./documents/article-category";

/** Singleton document type ids. Excluded from generic document lists
 *  and pinned at the top of the studio sidebar. */
export const SINGLETON_TYPES = new Set<string>(["homePage"]);

/** Singleton _id assignments — one well-known id per singleton type. */
export const SINGLETON_IDS: Record<string, string> = {
  homePage: "homePage",
};

export const schemaTypes: SchemaTypeDefinition[] = [
  // Primitives & shared
  portableText,
  codeBlock,
  // Shared blocks (reusable across pages)
  heroBlock,
  richTextBlock,
  calloutBlock,
  featureGridBlock,
  mediaBlock,
  articleCarouselBlock,
  ctaBannerBlock,
  pullQuoteBlock,
  logoMarqueeBlock,
  demoFormBlock,
  howItWorksBlock,
  // Home-page blocks
  heroPromptBlock,
  scrubWordsBlock,
  bentoShowcaseBlock,
  // Products-page blocks
  productHeroBlock,
  productCardGridBlock,
  productStickyStackBlock,
  productTrustGridBlock,
  // Pricing-page blocks
  pricingHeroBlock,
  pricingTiersBlock,
  pricingComparisonBlock,
  pricingFaqBlock,
  // Documents
  homePage,
  page,
  article,
  articleCategory,
];
