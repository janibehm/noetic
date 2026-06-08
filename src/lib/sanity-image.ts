import { urlFor } from "../../sanity/image";

/**
 * Build `{ src, alt }` for a Sanity image ref. Lives in a plain (non-"use
 * client") module so it can be called during server rendering as well as
 * from client components — `prose-renderer` is a client module, so importing
 * this from there would otherwise make it unusable on the server.
 */
export function sanityImageProps(value: unknown, width = 1600) {
  if (!value) return null;
  const src = urlFor(value as never)
    .width(width)
    .url();
  const alt = (value as { alt?: string }).alt ?? "";
  return { src, alt };
}
