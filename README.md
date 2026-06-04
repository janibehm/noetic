# Noetic

A Next.js 16 (App Router) starter wired to **Sanity** (embedded Studio + block-architecture schema) and **Tailwind CSS** (token-driven global CSS with fluid typography).

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Sanity v5** embedded studio at `/studio`
- **Tailwind CSS v4** with shared class helpers and global component layers
- **next-sanity** + **@portabletext/react** for content rendering

## Getting started

```bash
cp .env.example .env.local
# fill in NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET

npm run dev
```

Open <http://localhost:3000> for the site and <http://localhost:3000/studio> for the embedded Studio. Without credentials the home page renders a design-system showcase.

## Project layout

```
postcss.config.cjs      # Tailwind PostCSS plugin
sanity.config.ts         # Sanity Studio config
sanity.cli.ts            # Sanity CLI (deploy, dataset import, etc.)
sanity/
  env.ts                 # Lazy env reading (does not throw at module load)
  client.ts              # Lazy Sanity client wrapper
  image.ts               # urlFor() helper
  queries.ts             # GROQ queries / projections
  schemas/
    index.ts             # Schema registry
    portable-text.ts     # Shared Portable Text type
    code-block.ts        # Inline code block
    blocks.ts            # heroBlock, richTextBlock, calloutBlock, featureGridBlock, mediaBlock
    page.ts              # Page document composed from blocks
src/
  app/
    layout.tsx, page.tsx, globals.css
    studio/[[...tool]]/  # Embedded Studio route (dynamic-imported, browser-only)
  components/
    block-renderer.tsx   # Maps Sanity blocks -> React components
    prose-renderer.tsx   # PortableText -> global prose styles
  lib/
    styles.ts            # cn(), pageContainer, pageSection, stackY, button, cinematicStage
```

## Design system

### Fluid typography (text folding)

Global CSS variables and Tailwind arbitrary utilities use a Utopia-style `clamp()`:

```
clamp(min, preferred, max)
```

`preferred` interpolates linearly between a min viewport (320 px) and a max viewport (1440 px). The result is type and rhythm that *folds smoothly* across screen sizes without explicit breakpoints — and respects user zoom because the values are rem-based.

Example utility:

```tsx
className="text-[clamp(1rem,.91rem+.45vw,1.25rem)]"
```

The ramp (`2xs` → `6xl`) uses a ~1.25 ratio at the small end and ~1.333 at the large end, so display sizes feel proportionally larger on wide canvases.

### Text styles

Shared heading classes live in `src/components/blocks/heading-level.ts`, and common prose/card styles live in `src/app/globals.css`:

- `display.{lg,xl,2xl}` — hero copy with `text-wrap: balance`
- `heading.{h1..h6}`
- `body.{sm,md,lg}` — `text-wrap: pretty` for readable paragraphs
- `label.{sm,md}` — uppercase eyebrow / small-caps style
- `code.md`

Use via `cn(headingLevelStyles[Heading], "...")` in block components.

### Semantic colors + dark mode

Components reference shared CSS variables (`--void`, `--ink`, `--gray`, `--line`, `--a1`…`--a5`) through Tailwind arbitrary utilities and global component classes.

### Reading measure & layout primitives

- `sizes.measure` (65ch), `measureNarrow` (45ch), `measureWide` (78ch) — for constraining paragraph width.
- `pageContainer({ size: "prose" | "sm" | "md" | "lg" | "xl" | "full" })` — fluid-gutter Tailwind class helper.
- `pageSection({ space, tone })` — vertical region with tone-aware class helper.
- `stackY({ gap, align })` — vertical rhythm class helper.

### Prose styles

`.prose-root` in `globals.css` styles rendered Portable Text:

- measure-constrained reading column,
- vertical rhythm via `& > * + * { margin-block-start: md }`,
- heading top spacing tightened when followed by a sibling,
- styled links, lists, blockquotes, code, images, figures and tables.

The `<ProseRenderer />` component in `src/components/prose-renderer.tsx` wires PortableText to this class.

### Motion & a11y

- Tokenized `durations` and `easings` for consistent transitions.
- Global `prefers-reduced-motion` override neutralizes transitions and scroll behaviour.
- Interactive elements use a tokenized `shadows.focus` ring.

## Block architecture (Sanity)

Pages are composed by stacking blocks in the `page.blocks` array. Each block is its own schema:

- `heroBlock` — eyebrow, heading, lead, optional image + CTA, tonal background.
- `richTextBlock` — measure-constrained Portable Text rendered through the `prose` recipe.
- `calloutBlock` — short emphasized note with intent (info/success/warning/danger).
- `featureGridBlock` — 2/3/4-column responsive grid of features.
- `mediaBlock` — image with optional caption, width `measure | container | full bleed`.

Add a new block in two steps:

1. Define the Sanity schema in `sanity/schemas/blocks.ts` and register it in `sanity/schemas/index.ts` and the `page.blocks` array.
2. Add a `case` to `BlockRenderer` in `src/components/block-renderer.tsx` and project the fields in `sanity/queries.ts` (`pageBlocksProjection`).

## Scripts

```bash
npm run dev      # next dev
npm run build    # next build
npm run start    # next start
npm run lint
```
# nextjs-sanity-tailwind-template
# noetic
