import { groq } from "next-sanity";

/* -------------------------------------------------------------------------- */
/*  Projections                                                                */
/* -------------------------------------------------------------------------- */

/** Compact projection used inside `articleCarouselBlock` and listing pages. */
export const articleCardProjection = groq`
  _id,
  "slug": slug.current,
  title,
  excerpt,
  publishedAt,
  readingTimeMinutes,
  "category": category->{title, "slug": slug.current},
  coverImage{..., "alt": coalesce(alt, asset->altText)},
  author{name, role, avatar{..., "alt": coalesce(alt, asset->altText)}}
`;

/**
 * Block projection — covers every block type referenced from any document.
 * `articleCarouselBlock` is resolved here: when `source == "latest"` the
 * most recent articles are fetched (optionally filtered by category),
 * when `source == "manual"` the editor's selection is dereferenced.
 */
export const blocksProjection = groq`
  blocks[]{
    _key,
    _type,

    _type == "heroBlock" => {
      eyebrow, heading, headingLevel, lead, tone, primaryCta,
      image{..., "alt": coalesce(alt, asset->altText)}
    },

    _type == "richTextBlock" => { tone, content },

    _type == "calloutBlock" => { intent, title, body },

    _type == "featureGridBlock" => {
      heading, headingLevel, lead, columns,
      items[]{ _key, title, body, image{..., "alt": coalesce(alt, asset->altText)} }
    },

    _type == "mediaBlock" => {
      width, caption,
      image{..., "alt": coalesce(alt, asset->altText)}
    },

    _type == "heroPromptBlock" => {
      eyebrow, heading, headingLevel, lead, promptIdeas, primaryCta, showScrollCue,
      background{
        "video": video.asset->url,
        poster{..., "alt": coalesce(alt, asset->altText)}
      }
    },

    _type == "scrubWordsBlock" => { label, words, auroraTone },

    _type == "bentoShowcaseBlock" => {
      eyebrow, heading, headingLevel, lead,
      "items": *[
        _type == "article" &&
        defined(slug.current) &&
        defined(publishedAt) &&
        publishedAt <= now() &&
        defined(category)
      ] | order(publishedAt desc) [0...100] {
        ${articleCardProjection}
      }
    },

    _type == "howItWorksBlock" => {
      eyebrow, heading, headingLevel,
      steps[]{ _key, title, body, icon }
    },

    _type == "pullQuoteBlock" => {
      quote,
      alignment,
      author{ name, role, avatar{..., "alt": coalesce(alt, asset->altText)} }
    },

    _type == "ctaBannerBlock" => {
      eyebrow, heading, headingLevel, body, bullets, alignment, tone,
      primaryCta, secondaryCta,
      background{
        auroraTone,
        image{..., "alt": coalesce(alt, asset->altText)}
      }
    },

    _type == "articleCarouselBlock" => {
      eyebrow, heading, headingLevel, viewAllCta, source, limit, category,
      // NOTE: GROQ slice endpoints must be integer literals, so we fetch
      // up to a generous cap (24) and let the renderer slice to "limit".
      "items": select(
        source == "manual" => articles[]->{ ${articleCardProjection} },
        // source == "latest" (default)
        *[
          _type == "article" &&
          defined(slug.current) &&
          defined(publishedAt) &&
          publishedAt <= now() &&
          (!defined(^.category) || category->slug.current == ^.category)
        ] | order(publishedAt desc) [0...24] {
          ${articleCardProjection}
        }
      )
    },

    _type == "productHeroBlock" => {
      eyebrow, heading, headingLevel, lead, primaryCta, secondaryCta, promptText,
      dashboardItems[]{ _key, label, color },
      thumbnails[]{ _key, featured, auroraTone, image{..., "alt": coalesce(alt, asset->altText)} }
    },

    _type == "productLogoMarqueeBlock" => { heading, highlightedText, logos },

    _type == "productCardGridBlock" => {
      heading, headingLevel, lead,
      items[]{ _key, title, body, href, auroraTone, image{..., "alt": coalesce(alt, asset->altText)} }
    },

    _type == "productStickyStackBlock" => {
      heading, headingLevel, lead,
      steps[]{ _key, title, body, auroraTone, image{..., "alt": coalesce(alt, asset->altText)} }
    },

    _type == "productTrustGridBlock" => {
      heading, headingLevel, lead,
      items[]{ _key, icon, title, body }
    },

    _type == "productDemoFormBlock" => {
      heading, body, bullets, submitLabel, successTitle, successBody
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*  Document queries                                                           */
/* -------------------------------------------------------------------------- */

/** Home page — singleton. Fetched by fixed `_id`. */
export const homePageQuery = groq`
  *[_type == "homePage" && _id == "homePage"][0]{
    _id,
    title,
    seoTitle,
    seoDescription,
    ${blocksProjection}
  }
`;

/** Legacy fallback: a generic `page` with slug "home". Renders if the
 *  singleton hasn't been created yet. */
export const legacyHomePageQuery = groq`
  *[_type == "page" && slug.current == "home"][0]{
    _id,
    title,
    seoDescription,
    ${blocksProjection}
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    seoDescription,
    ${blocksProjection}
  }
`;

export const pageSlugsQuery = groq`
  *[_type == "page" && defined(slug.current)].slug.current
`;

/* -------------------------------------------------------------------------- */
/*  Article queries                                                            */
/* -------------------------------------------------------------------------- */

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    readingTimeMinutes,
    seoTitle,
    seoDescription,
    "category": category->{title, "slug": slug.current},
    coverImage{..., "alt": coalesce(alt, asset->altText)},
    author{ name, role, avatar{..., "alt": coalesce(alt, asset->altText)} },
    body
  }
`;

export const articleSlugsQuery = groq`
  *[_type == "article" && defined(slug.current) && publishedAt <= now()].slug.current
`;

export const latestArticlesQuery = groq`
  *[_type == "article" && defined(slug.current) && publishedAt <= now()]
    | order(publishedAt desc) [0...$limit] {
      ${articleCardProjection}
    }
`;
