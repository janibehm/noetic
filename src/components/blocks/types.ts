/**
 * Shared types for Sanity block React components.
 *
 * Block component files in this folder are pure presentation: each
 * file exports one default component plus its `*Props` type. The
 * `BlockRenderer` in `./index.tsx` wires Sanity payloads to the
 * matching component via the registry.
 */

/** Minimal shape every block in a `blocks[]` array satisfies. */
export type Block = {
  _key: string;
  _type: string;
} & Record<string, unknown>;

/** Tone names accepted by `pageSection` recipe. */
export type Tone = "canvas" | "surface" | "subtle" | "inverse" | "accent";

/** Simple link/CTA pair used across several blocks. */
export type CtaLink = { label?: string; href?: string };

/** Aurora gradient tone for cinematic backgrounds. */
export type AuroraTone = "default" | "cool" | "warm";

/** Loose Sanity image reference. The `alt` is surfaced by GROQ
 *  projections that coalesce with `asset->altText`. */
export type SanityImageRef = { alt?: string } & Record<string, unknown>;
