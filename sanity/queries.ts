import { groq } from "next-sanity";

export const pageBlocksProjection = groq`
  blocks[]{
    _key,
    _type,
    _type == "heroBlock" => {
      eyebrow,
      heading,
      lead,
      tone,
      image{..., "alt": coalesce(alt, asset->altText)},
      primaryCta
    },
    _type == "richTextBlock" => {
      tone,
      content
    },
    _type == "calloutBlock" => {
      intent,
      title,
      body
    },
    _type == "featureGridBlock" => {
      heading,
      lead,
      columns,
      items[]{
        _key,
        title,
        body,
        image
      }
    },
    _type == "mediaBlock" => {
      width,
      caption,
      image{..., "alt": coalesce(alt, asset->altText)}
    }
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    seoDescription,
    ${pageBlocksProjection}
  }
`;

export const homePageQuery = groq`
  *[_type == "page" && slug.current == "home"][0]{
    _id,
    title,
    seoDescription,
    ${pageBlocksProjection}
  }
`;
