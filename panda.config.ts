import { defineConfig } from "@pandacss/dev";
import { tokens } from "./src/theme/tokens";
import { semanticTokens } from "./src/theme/semantic-tokens";
import { textStyles } from "./src/theme/text-styles";
import { recipes, slotRecipes } from "./src/theme/recipes";

export default defineConfig({
  preflight: true,

  include: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./sanity/**/*.{js,jsx,ts,tsx}",
  ],
  exclude: [],

  jsxFramework: "react",
  outdir: "styled-system",

  // Class- or attribute-based dark mode
  conditions: {
    extend: {
      dark: ".dark &, [data-theme='dark'] &",
      light: ".light &, [data-theme='light'] &",
    },
  },

  globalCss: {
    "html, body": {
      backgroundColor: "bg.canvas",
      color: "fg.default",
      fontFamily: "sans",
      textStyle: "body.md",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
    "::selection": {
      backgroundColor: "bg.accent",
      color: "fg.onAccent",
    },
    "@media (prefers-reduced-motion: reduce)": {
      "*, *::before, *::after": {
        animationDuration: "0.001ms !important",
        animationIterationCount: "1 !important",
        transitionDuration: "0.001ms !important",
        scrollBehavior: "auto !important",
      },
    },
  },

  theme: {
    tokens,
    semanticTokens,
    textStyles,
    recipes,
    slotRecipes,
  },
});
