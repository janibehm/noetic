import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * `@sanity/image-url` accepts a wide range of source shapes
 * (asset reference, image object, etc.); we keep the parameter
 * loose and let the builder normalize at runtime.
 */
export function urlFor(source: unknown) {
  return builder.image(source as never).auto("format").fit("max");
}
