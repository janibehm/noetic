import { defineSemanticTokens } from "@pandacss/dev";

/**
 * Semantic tokens map intent (`bg.canvas`, `fg.default`) to raw
 * palette values, with automatic dark-mode variants via the `_dark`
 * condition. Components should reference these — never raw colors.
 */
export const semanticTokens = defineSemanticTokens({
  colors: {
    bg: {
      canvas: {
        value: { base: "{colors.ink.50}", _dark: "{colors.ink.950}" },
      },
      surface: {
        value: { base: "#ffffff", _dark: "{colors.ink.900}" },
      },
      subtle: {
        value: { base: "{colors.ink.100}", _dark: "{colors.ink.800}" },
      },
      muted: {
        value: { base: "{colors.ink.200}", _dark: "{colors.ink.700}" },
      },
      inverse: {
        value: { base: "{colors.ink.900}", _dark: "{colors.ink.50}" },
      },
      accent: {
        value: { base: "{colors.accent.500}", _dark: "{colors.accent.400}" },
      },
      accentSubtle: {
        value: { base: "{colors.accent.50}", _dark: "{colors.accent.900}" },
      },
    },
    fg: {
      default: {
        value: { base: "{colors.ink.900}", _dark: "{colors.ink.50}" },
      },
      muted: {
        value: { base: "{colors.ink.600}", _dark: "{colors.ink.300}" },
      },
      subtle: {
        value: { base: "{colors.ink.500}", _dark: "{colors.ink.400}" },
      },
      onAccent: {
        value: { base: "#ffffff", _dark: "{colors.ink.950}" },
      },
      inverse: {
        value: { base: "{colors.ink.50}", _dark: "{colors.ink.900}" },
      },
      link: {
        value: { base: "{colors.accent.600}", _dark: "{colors.accent.300}" },
      },
      linkHover: {
        value: { base: "{colors.accent.700}", _dark: "{colors.accent.200}" },
      },
    },
    border: {
      subtle: {
        value: { base: "{colors.ink.100}", _dark: "{colors.ink.800}" },
      },
      muted: {
        value: { base: "{colors.ink.200}", _dark: "{colors.ink.700}" },
      },
      strong: {
        value: { base: "{colors.ink.300}", _dark: "{colors.ink.600}" },
      },
    },
    accent: {
      focusRing: {
        value: {
          base: "rgba(54, 92, 245, 0.35)",
          _dark: "rgba(143, 174, 255, 0.40)",
        },
      },
    },
  },
});
