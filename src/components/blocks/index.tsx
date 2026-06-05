import type { ComponentType } from "react";

import HeroBlock from "./shared/hero";
import RichTextBlock from "./shared/rich-text";
import CalloutBlock from "./shared/callout";
import FeatureGridBlock from "./shared/feature-grid";
import MediaBlock from "./shared/media";
import ArticleCarouselBlock from "./shared/article-carousel";
import CtaBannerBlock from "./shared/cta-banner";
import PullQuoteBlock from "./shared/pull-quote";
import LogoMarqueeBlock from "./shared/logo-marquee";
import DemoFormBlock from "./shared/demo-form";
import HowItWorksBlock from "./shared/how-it-works";

import HomeHeroPromptBlock from "./home/hero-prompt";
import HomeScrubWordsBlock from "./home/scrub-words";
import HomeBentoShowcaseBlock from "./home/bento-showcase";

import ProductHeroBlock from "./products/product-hero";
import ProductCardGridBlock from "./products/product-card-grid";
import ProductStickyStackBlock from "./products/sticky-stack";
import ProductTrustGridBlock from "./products/trust-grid";
import {
  PricingHeroBlock,
  PricingTiersBlock,
  PricingComparisonBlock,
  PricingFaqBlock,
} from "./pricing";
import {
  SolutionHeroBlock,
  SolutionAccordionBlock,
  SolutionFeatureSectionsBlock,
} from "./solutions";
import {
  LabHeroBlock,
  LabArticleGridBlock,
  LabSpotlightBlock,
} from "./lab";
import {
  ResourcesFeaturedBlock,
  ResourcesLibraryBlock,
  ResourcesApiBlock,
} from "./resources";
import {
  CompanyHeroBlock,
  CompanyTeamBlock,
  CompanyPartnersBlock,
  CompanyJobsBlock,
} from "./company";
import { ContactBlock } from "./contact";

import type { Block } from "./types";

/**
 * Registry mapping Sanity `_type` to the React component that
 * renders it. Add a new entry here when introducing a new block.
 *
 * The components accept loose props (their internal types narrow
 * them) so the registry is typed as `ComponentType<any>` — the
 * `BlockRenderer` is the only place that needs this widening.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const REGISTRY: Record<string, ComponentType<any>> = {
  // Shared
  heroBlock: HeroBlock,
  richTextBlock: RichTextBlock,
  calloutBlock: CalloutBlock,
  featureGridBlock: FeatureGridBlock,
  mediaBlock: MediaBlock,
  articleCarouselBlock: ArticleCarouselBlock,
  ctaBannerBlock: CtaBannerBlock,
  pullQuoteBlock: PullQuoteBlock,
  logoMarqueeBlock: LogoMarqueeBlock,
  demoFormBlock: DemoFormBlock,
  howItWorksBlock: HowItWorksBlock,
  // Home
  heroPromptBlock: HomeHeroPromptBlock,
  scrubWordsBlock: HomeScrubWordsBlock,
  bentoShowcaseBlock: HomeBentoShowcaseBlock,
  // Products
  productHeroBlock: ProductHeroBlock,
  productLogoMarqueeBlock: LogoMarqueeBlock,
  productCardGridBlock: ProductCardGridBlock,
  productStickyStackBlock: ProductStickyStackBlock,
  productTrustGridBlock: ProductTrustGridBlock,
  productDemoFormBlock: DemoFormBlock,
  // Pricing
  pricingHeroBlock: PricingHeroBlock,
  pricingTiersBlock: PricingTiersBlock,
  pricingComparisonBlock: PricingComparisonBlock,
  pricingFaqBlock: PricingFaqBlock,
  // Solutions
  solutionHeroBlock: SolutionHeroBlock,
  solutionAccordionBlock: SolutionAccordionBlock,
  solutionFeatureSectionsBlock: SolutionFeatureSectionsBlock,
  // Lab
  labHeroBlock: LabHeroBlock,
  labArticleGridBlock: LabArticleGridBlock,
  labSpotlightBlock: LabSpotlightBlock,
  // Resources
  resourcesFeaturedBlock: ResourcesFeaturedBlock,
  resourcesLibraryBlock: ResourcesLibraryBlock,
  resourcesApiBlock: ResourcesApiBlock,
  // Company
  companyHeroBlock: CompanyHeroBlock,
  companyTeamBlock: CompanyTeamBlock,
  companyPartnersBlock: CompanyPartnersBlock,
  companyJobsBlock: CompanyJobsBlock,
  // Contact
  contactBlock: ContactBlock,
};

/** Top-level dispatcher. Iterates `blocks[]` and renders each entry
 *  through its registered component. Unknown types are surfaced as
 *  a soft warning in development. */
export function BlockRenderer({
  blocks,
}: {
  blocks: Block[] | null | undefined;
}) {
  if (!blocks?.length) return null;
  return (
    <>
      {blocks.map((block) => {
        const Component = REGISTRY[block._type];
        if (Component) {
          return <Component key={block._key} {...block} />;
        }
        if (process.env.NODE_ENV !== "production") {
          return (
            <div
              key={block._key}
              className="rounded-lg border border-[var(--line)] p-6 text-[var(--gray)]"
            >
              Unknown block type: <code>{block._type}</code>
            </div>
          );
        }
        return null;
      })}
    </>
  );
}

export type { Block } from "./types";
