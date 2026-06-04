import { defineTokens } from "@pandacss/dev";

/**
 * Core design tokens.
 *
 * Typography uses a fluid `clamp()` scale (Utopia-style):
 *   clamp(min, preferred, max)
 * where preferred is a linear interpolation between a min viewport
 * (320px) and max viewport (1440px). This produces smooth folding
 * across breakpoints without media queries.
 *
 * Scale ratio: 1.25 (major third) at min, 1.333 (perfect fourth) at max.
 */
export const tokens = defineTokens({
  fonts: {
    sans: {
      value:
        'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    serif: {
      value:
        'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    },
    mono: {
      value:
        'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
  },

  fontWeights: {
    regular: { value: "400" },
    medium: { value: "500" },
    semibold: { value: "600" },
    bold: { value: "700" },
  },

  letterSpacings: {
    tightest: { value: "-0.04em" },
    tighter: { value: "-0.02em" },
    tight: { value: "-0.01em" },
    normal: { value: "0" },
    wide: { value: "0.02em" },
    wider: { value: "0.06em" },
  },

  lineHeights: {
    none: { value: "1" },
    tight: { value: "1.15" },
    snug: { value: "1.3" },
    normal: { value: "1.5" },
    relaxed: { value: "1.65" },
    loose: { value: "1.85" },
  },

  /**
   * Fluid type scale. Each token interpolates between a small-screen
   * size (≥320px) and a large-screen size (≤1440px).
   *
   * Generated using:
   *   min + (max - min) * ((100vw - 320px) / (1440 - 320))
   */
  fontSizes: {
    "2xs": { value: "clamp(0.69rem, 0.66rem + 0.13vw, 0.75rem)" },
    xs:    { value: "clamp(0.75rem, 0.71rem + 0.18vw, 0.84rem)" },
    sm:    { value: "clamp(0.84rem, 0.79rem + 0.27vw, 0.98rem)" },
    md:    { value: "clamp(1.00rem, 0.91rem + 0.45vw, 1.25rem)" },
    lg:    { value: "clamp(1.20rem, 1.05rem + 0.72vw, 1.60rem)" },
    xl:    { value: "clamp(1.44rem, 1.20rem + 1.16vw, 2.07rem)" },
    "2xl": { value: "clamp(1.73rem, 1.37rem + 1.82vw, 2.74rem)" },
    "3xl": { value: "clamp(2.07rem, 1.55rem + 2.83vw, 3.65rem)" },
    "4xl": { value: "clamp(2.49rem, 1.74rem + 4.34vw, 4.86rem)" },
    "5xl": { value: "clamp(2.99rem, 1.94rem + 6.55vw, 6.50rem)" },
    "6xl": { value: "clamp(3.58rem, 2.13rem + 9.71vw, 8.66rem)" },
  },

  /**
   * Fluid spacing scale (Utopia-style). Use for padding/margin/gap.
   * Static (non-fluid) values are kept on the small end for fine control.
   */
  spacing: {
    "3xs": { value: "clamp(0.25rem, 0.23rem + 0.09vw, 0.31rem)" },
    "2xs": { value: "clamp(0.50rem, 0.46rem + 0.18vw, 0.63rem)" },
    xs:    { value: "clamp(0.75rem, 0.68rem + 0.36vw, 1.00rem)" },
    sm:    { value: "clamp(1.00rem, 0.91rem + 0.45vw, 1.25rem)" },
    md:    { value: "clamp(1.50rem, 1.36rem + 0.71vw, 2.00rem)" },
    lg:    { value: "clamp(2.00rem, 1.82rem + 0.89vw, 2.50rem)" },
    xl:    { value: "clamp(3.00rem, 2.73rem + 1.34vw, 3.75rem)" },
    "2xl": { value: "clamp(4.00rem, 3.55rem + 2.23vw, 5.25rem)" },
    "3xl": { value: "clamp(6.00rem, 5.36rem + 3.21vw, 7.80rem)" },
    "4xl": { value: "clamp(8.00rem, 7.05rem + 4.74vw, 10.66rem)" },
  },

  sizes: {
    // Reading measure constraints
    measureNarrow: { value: "45ch" },
    measure:       { value: "65ch" },
    measureWide:   { value: "78ch" },
    // Layout containers
    containerSm: { value: "40rem" },
    containerMd: { value: "56rem" },
    containerLg: { value: "72rem" },
    containerXl: { value: "84rem" },
  },

  radii: {
    none: { value: "0" },
    xs:   { value: "0.125rem" },
    sm:   { value: "0.25rem" },
    md:   { value: "0.5rem" },
    lg:   { value: "0.75rem" },
    xl:   { value: "1rem" },
    "2xl": { value: "1.5rem" },
    "3xl": { value: "2rem" },
    "4xl": { value: "2.75rem" },
    pill: { value: "9999px" },
    circle: { value: "50%" },
  },

  borders: {
    hairline: { value: "1px solid {colors.border.subtle}" },
    subtle:   { value: "1px solid {colors.border.muted}" },
    strong:   { value: "1px solid {colors.border.strong}" },
  },

  shadows: {
    xs: { value: "0 1px 2px 0 rgba(15, 17, 21, 0.06)" },
    sm: { value: "0 1px 3px 0 rgba(15, 17, 21, 0.08), 0 1px 2px -1px rgba(15, 17, 21, 0.08)" },
    md: { value: "0 4px 6px -1px rgba(15, 17, 21, 0.08), 0 2px 4px -2px rgba(15, 17, 21, 0.08)" },
    lg: { value: "0 10px 15px -3px rgba(15, 17, 21, 0.10), 0 4px 6px -4px rgba(15, 17, 21, 0.08)" },
    xl: { value: "0 20px 25px -5px rgba(15, 17, 21, 0.12), 0 8px 10px -6px rgba(15, 17, 21, 0.08)" },
    /** Diffused ambient shadows for cinematic surfaces (no harsh drops). */
    ambientSm: { value: "0 14px 40px -18px rgba(8, 8, 12, 0.16)" },
    ambient:   { value: "0 30px 80px -28px rgba(8, 8, 12, 0.18)" },
    float:     { value: "0 40px 120px -40px rgba(8, 8, 12, 0.28)" },
    focus:     { value: "0 0 0 3px {colors.accent.focusRing}" },
  },

  easings: {
    standard: { value: "cubic-bezier(0.2, 0, 0, 1)" },
    emphasized: { value: "cubic-bezier(0.3, 0, 0, 1)" },
    decelerate: { value: "cubic-bezier(0, 0, 0, 1)" },
    accelerate: { value: "cubic-bezier(0.3, 0, 1, 1)" },
  },

  durations: {
    instant: { value: "60ms" },
    fast:    { value: "120ms" },
    base:    { value: "200ms" },
    slow:    { value: "320ms" },
    slower:  { value: "480ms" },
  },

  zIndex: {
    base:    { value: "0" },
    raised:  { value: "10" },
    sticky:  { value: "100" },
    overlay: { value: "1000" },
    modal:   { value: "1100" },
    toast:   { value: "1200" },
  },

  /**
   * Raw color palette. Use semantic tokens (see semantic-tokens.ts)
   * in components instead of these directly.
   */
  colors: {
    ink: {
      50:  { value: "#f6f6f7" },
      100: { value: "#e7e8ea" },
      200: { value: "#c9ccd1" },
      300: { value: "#a3a8b0" },
      400: { value: "#777e88" },
      500: { value: "#525a65" },
      600: { value: "#3b424b" },
      700: { value: "#2a2f37" },
      800: { value: "#1b1f25" },
      900: { value: "#0f1115" },
      950: { value: "#08090c" },
    },
    accent: {
      50:  { value: "#eef4ff" },
      100: { value: "#dbe6ff" },
      200: { value: "#bcd0ff" },
      300: { value: "#8eaeff" },
      400: { value: "#5b82ff" },
      500: { value: "#365cf5" },
      600: { value: "#2543d8" },
      700: { value: "#1f37ad" },
      800: { value: "#1d3088" },
      900: { value: "#1c2c6c" },
    },
    success: {
      500: { value: "#1f9d55" },
      600: { value: "#137a40" },
    },
    warning: {
      500: { value: "#d4861f" },
      600: { value: "#a96712" },
    },
    danger: {
      500: { value: "#d93a3a" },
      600: { value: "#a82626" },
    },
    /**
     * Spectral aurora palette — the only accent color in the
     * cinematic surface system. Used in gradient washes behind
     * dark hero/CTA stages and as bento border glints.
     */
    aurora: {
      rose:   { value: "#ff6fae" },
      violet: { value: "#8a5cff" },
      azure:  { value: "#3ba2ff" },
      aqua:   { value: "#45e0c8" },
      lime:   { value: "#c6ff7a" },
      ink:    { value: "#0a0a0c" },
    },
  },
});
