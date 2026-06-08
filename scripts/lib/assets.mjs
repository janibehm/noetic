// Shared asset resolver for seed scripts.
//
// The media binaries live in the (git-ignored) PHOTOS_AND_VIDEOS folder and
// are pushed to Sanity once by `scripts/seed-media-assets.mjs`. Seed scripts
// resolve a binary to its uploaded Sanity asset *by original filename* — they
// never need the local folder themselves.
//
// Every getter returns `undefined` when the asset hasn't been uploaded, so a
// seed run on a machine that never ran the uploader still succeeds (the media
// field is simply omitted and the component falls back to its aurora gradient).

/**
 * @param {import("@sanity/client").SanityClient} client
 * @returns {Promise<{
 *   image: (filename: string, alt?: string) => object | undefined,
 *   file:  (filename: string) => object | undefined,
 *   url:   (filename: string) => string | undefined,
 *   missing: string[],
 * }>}
 */
export async function createAssetResolver(client) {
  const rows = await client.fetch(
    `*[_type in ["sanity.imageAsset", "sanity.fileAsset"] && defined(originalFilename)]{
      _id, _type, originalFilename, url
    }`,
  );

  /** @type {Map<string, { id: string, url: string, type: string }>} */
  const byName = new Map();
  for (const row of rows) {
    // First upload wins; identical-byte re-uploads keep the original filename.
    if (!byName.has(row.originalFilename)) {
      byName.set(row.originalFilename, {
        id: row._id,
        url: row.url,
        type: row._type,
      });
    }
  }

  const missing = new Set();
  const lookup = (filename) => {
    const hit = byName.get(filename);
    if (!hit) missing.add(filename);
    return hit;
  };

  return {
    image(filename, alt) {
      const hit = lookup(filename);
      if (!hit) return undefined;
      return {
        _type: "image",
        asset: { _type: "reference", _ref: hit.id },
        ...(alt ? { alt } : {}),
      };
    },
    file(filename) {
      const hit = lookup(filename);
      if (!hit) return undefined;
      return {
        _type: "file",
        asset: { _type: "reference", _ref: hit.id },
      };
    },
    url(filename) {
      return lookup(filename)?.url;
    },
    get missing() {
      return [...missing];
    },
  };
}
