/**
 * Backwards-compatible re-export. The block components live under
 * `./blocks/` — one file per block, mirroring the Sanity schema
 * structure in `sanity/schemas/blocks/`. Import from `./blocks`
 * directly in new code.
 */
export { BlockRenderer, type Block } from "./blocks";
