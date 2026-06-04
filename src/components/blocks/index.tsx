import type { ComponentType } from "react";
import { css } from "../../../styled-system/css";

import HeroBlock from "./shared/hero";
import RichTextBlock from "./shared/rich-text";
import CalloutBlock from "./shared/callout";
import FeatureGridBlock from "./shared/feature-grid";
import MediaBlock from "./shared/media";
import ArticleCarouselBlock from "./shared/article-carousel";
import CtaBannerBlock from "./shared/cta-banner";
import PullQuoteBlock from "./shared/pull-quote";

import HomeHeroPromptBlock from "./home/hero-prompt";
import HomeScrubWordsBlock from "./home/scrub-words";
import HomeBentoShowcaseBlock from "./home/bento-showcase";
import HomeHowItWorksBlock from "./home/how-it-works";

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
  // Home
  heroPromptBlock: HomeHeroPromptBlock,
  scrubWordsBlock: HomeScrubWordsBlock,
  bentoShowcaseBlock: HomeBentoShowcaseBlock,
  howItWorksBlock: HomeHowItWorksBlock,
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
              className={css({
                padding: "md",
                color: "fg.muted",
                border: "subtle",
                borderRadius: "md",
              })}
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
