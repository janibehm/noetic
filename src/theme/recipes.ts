import { defineRecipe, defineSlotRecipe } from "@pandacss/dev";

/**
 * Single-element recipes (button, container, prose paragraph, etc.).
 */
export const recipes = {
  /**
   * Layout container with a fluid max-width and built-in gutters.
   * Use `size="prose"` for measure-constrained reading copy.
   */
  pageContainer: defineRecipe({
    className: "pageContainer",
    base: {
      width: "100%",
      marginInline: "auto",
      paddingInline: { base: "sm", md: "md", lg: "lg" },
    },
    variants: {
      size: {
        prose: { maxWidth: "measure" },
        sm:    { maxWidth: "containerSm" },
        md:    { maxWidth: "containerMd" },
        lg:    { maxWidth: "containerLg" },
        xl:    { maxWidth: "containerXl" },
        full:  { maxWidth: "100%" },
      },
    },
    defaultVariants: { size: "lg" },
  }),

  /**
   * Vertical rhythm helper for stacking blocks. Applies a fluid
   * gap between direct children — the foundation of block layout.
   */
  stackY: defineRecipe({
    className: "stackY",
    base: {
      display: "flex",
      flexDirection: "column",
    },
    variants: {
      gap: {
        xs:  { gap: "xs" },
        sm:  { gap: "sm" },
        md:  { gap: "md" },
        lg:  { gap: "lg" },
        xl:  { gap: "xl" },
        "2xl": { gap: "2xl" },
      },
      align: {
        start:   { alignItems: "flex-start" },
        center:  { alignItems: "center" },
        end:     { alignItems: "flex-end" },
        stretch: { alignItems: "stretch" },
      },
    },
    defaultVariants: { gap: "md", align: "stretch" },
  }),

  /**
   * Section wrapper providing vertical padding rhythm between
   * page-level regions.
   */
  pageSection: defineRecipe({
    className: "pageSection",
    base: {
      width: "100%",
    },
    variants: {
      space: {
        sm: { paddingBlock: "lg" },
        md: { paddingBlock: "xl" },
        lg: { paddingBlock: "2xl" },
        xl: { paddingBlock: "3xl" },
      },
      tone: {
        canvas:  { backgroundColor: "bg.canvas",  color: "fg.default" },
        surface: { backgroundColor: "bg.surface", color: "fg.default" },
        subtle:  { backgroundColor: "bg.subtle",  color: "fg.default" },
        inverse: { backgroundColor: "bg.inverse", color: "fg.inverse" },
        accent:  { backgroundColor: "bg.accentSubtle", color: "fg.default" },
      },
    },
    defaultVariants: { space: "lg", tone: "canvas" },
  }),

  button: defineRecipe({
    className: "button",
    base: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "2xs",
      borderRadius: "md",
      fontFamily: "sans",
      fontWeight: "medium",
      lineHeight: "none",
      cursor: "pointer",
      transitionProperty: "background-color, color, border-color, box-shadow, transform",
      transitionDuration: "fast",
      transitionTimingFunction: "standard",
      _focusVisible: { boxShadow: "focus", outline: "none" },
      _disabled: { opacity: 0.5, cursor: "not-allowed" },
    },
    variants: {
      variant: {
        solid: {
          backgroundColor: "bg.accent",
          color: "fg.onAccent",
          _hover: { filter: "brightness(0.95)" },
          _active: { transform: "translateY(1px)" },
        },
        /** Black pill button used across cinematic surfaces. */
        inverse: {
          backgroundColor: "bg.inverse",
          color: "fg.inverse",
          boxShadow: "ambientSm",
          _hover: { boxShadow: "ambient" },
          _active: { transform: "scale(0.97)" },
        },
        /** White-on-cinematic CTA used on dark hero/CTA cards. */
        onCinematic: {
          backgroundColor: "#ffffff",
          color: "{colors.ink.900}",
          boxShadow: "ambientSm",
          _hover: { boxShadow: "ambient" },
          _active: { transform: "scale(0.97)" },
        },
        outline: {
          backgroundColor: "transparent",
          color: "fg.default",
          border: "subtle",
          _hover: { backgroundColor: "bg.subtle" },
        },
        ghost: {
          backgroundColor: "transparent",
          color: "fg.default",
          _hover: { backgroundColor: "bg.subtle" },
        },
        link: {
          backgroundColor: "transparent",
          color: "fg.link",
          paddingInline: "0",
          textDecoration: "underline",
          textUnderlineOffset: "0.2em",
          _hover: { color: "fg.linkHover" },
        },
      },
      size: {
        sm: { fontSize: "sm", paddingInline: "sm", paddingBlock: "2xs", minHeight: "2rem" },
        md: { fontSize: "md", paddingInline: "md", paddingBlock: "xs",  minHeight: "2.5rem" },
        lg: { fontSize: "lg", paddingInline: "lg", paddingBlock: "sm",  minHeight: "3rem" },
      },
      /** Corner shape — default rounded; `pill` for marketing CTAs. */
      shape: {
        rounded: { borderRadius: "md" },
        pill:    { borderRadius: "pill" },
      },
    },
    defaultVariants: { variant: "solid", size: "md", shape: "rounded" },
  }),

  /**
   * Cinematic stage — a relatively positioned container that hosts
   * an aurora gradient + grain overlay behind its children. Use as
   * the wrapper for hero, scrub, and CTA card backgrounds.
   *
   * The aurora fill uses spectral tokens so it stays in sync with
   * the rest of the design system.
   */
  cinematicStage: defineRecipe({
    className: "cinematicStage",
    base: {
      position: "relative",
      overflow: "hidden",
      isolation: "isolate",
      backgroundColor: "bg.cinematic",
      color: "fg.onCinematic",
      // Aurora wash: layered radial gradients drifting on a dark canvas.
      _before: {
        content: '""',
        position: "absolute",
        inset: "-20%",
        zIndex: 0,
        filter: "blur(40px) saturate(135%)",
        background:
          "radial-gradient(40% 55% at 22% 30%, {colors.aurora.rose} 0%, transparent 60%)," +
          "radial-gradient(45% 50% at 78% 25%, {colors.aurora.violet} 0%, transparent 60%)," +
          "radial-gradient(50% 55% at 65% 75%, {colors.aurora.azure} 0%, transparent 62%)," +
          "radial-gradient(45% 50% at 25% 80%, {colors.aurora.aqua} 0%, transparent 60%)," +
          "radial-gradient(40% 45% at 50% 50%, {colors.aurora.lime} 0%, transparent 55%)",
        animation: "auroraDrift 26s ease-in-out infinite alternate",
      },
      // Vignette for text legibility.
      _after: {
        content: '""',
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, transparent 30%, transparent 55%, rgba(0,0,0,0.45) 100%)",
      },
      "& > *": { position: "relative", zIndex: 2 },
    },
    variants: {
      tone: {
        spectral: {},
        cool: {
          _before: {
            background:
              "radial-gradient(45% 55% at 25% 25%, #6aa9ff 0%, transparent 60%)," +
              "radial-gradient(50% 50% at 80% 35%, {colors.aurora.violet} 0%, transparent 60%)," +
              "radial-gradient(55% 60% at 60% 80%, {colors.aurora.aqua} 0%, transparent 62%)," +
              "radial-gradient(40% 45% at 18% 78%, {colors.aurora.azure} 0%, transparent 60%)",
          },
        },
        warm: {
          _before: {
            background:
              "radial-gradient(45% 55% at 25% 30%, #ff8a5c 0%, transparent 60%)," +
              "radial-gradient(50% 50% at 78% 28%, {colors.aurora.rose} 0%, transparent 60%)," +
              "radial-gradient(55% 60% at 62% 78%, #ffc46b 0%, transparent 62%)," +
              "radial-gradient(40% 45% at 20% 80%, #ff5e8a 0%, transparent 60%)",
          },
        },
      },
      radius: {
        none: { borderRadius: 0 },
        lg:   { borderRadius: "2xl" },
        xl:   { borderRadius: "3xl" },
        "2xl": { borderRadius: "4xl" },
      },
    },
    defaultVariants: { tone: "spectral", radius: "none" },
  }),
};

/**
 * Slot recipes for compound components.
 */
export const slotRecipes = {
  /**
   * `prose` is the styling surface for rendered Sanity PortableText.
   * It establishes a measure-constrained reading column with
   * vertical rhythm between block elements (p, h*, ul, blockquote…).
   *
   * Render PortableText output inside <div className={prose()}>.
   */
  prose: defineSlotRecipe({
    className: "prose",
    slots: ["root", "lead"],
    base: {
      root: {
        color: "fg.default",
        fontFamily: "sans",
        maxWidth: "measure",
        marginInline: "auto",
        textStyle: "body.md",

        "& > * + *": { marginBlockStart: "md" },

        "& h1": { textStyle: "heading.h1", marginBlockStart: "2xl" },
        "& h2": { textStyle: "heading.h2", marginBlockStart: "xl" },
        "& h3": { textStyle: "heading.h3", marginBlockStart: "lg" },
        "& h4": { textStyle: "heading.h4", marginBlockStart: "lg" },
        "& h5": { textStyle: "heading.h5", marginBlockStart: "md" },
        "& h6": { textStyle: "heading.h6", marginBlockStart: "md" },

        "& :is(h1, h2, h3, h4, h5, h6) + *": { marginBlockStart: "sm" },

        "& a": {
          color: "fg.link",
          textDecoration: "underline",
          textUnderlineOffset: "0.2em",
          textDecorationThickness: "1px",
          _hover: { color: "fg.linkHover" },
        },

        "& strong": { fontWeight: "semibold", color: "fg.default" },
        "& em": { fontStyle: "italic" },

        "& code": {
          textStyle: "code.md",
          paddingInline: "3xs",
          paddingBlock: "0",
          borderRadius: "xs",
          backgroundColor: "bg.subtle",
        },

        "& pre": {
          textStyle: "code.md",
          padding: "md",
          borderRadius: "md",
          backgroundColor: "bg.subtle",
          overflowX: "auto",
          maxWidth: "measureWide",
        },

        "& pre code": {
          padding: 0,
          backgroundColor: "transparent",
        },

        "& blockquote": {
          borderInlineStart: "3px solid",
          borderColor: "border.strong",
          paddingInlineStart: "md",
          color: "fg.muted",
          fontStyle: "italic",
        },

        "& :is(ul, ol)": {
          paddingInlineStart: "md",
        },
        "& ul": { listStyle: "disc" },
        "& ol": { listStyle: "decimal" },
        "& li + li": { marginBlockStart: "2xs" },
        "& li > :is(ul, ol)": { marginBlockStart: "2xs" },

        "& hr": {
          border: "none",
          borderBlockStart: "subtle",
          marginBlock: "xl",
        },

        "& figure": {
          marginBlock: "lg",
          maxWidth: "measureWide",
        },
        "& figcaption": {
          textStyle: "body.sm",
          color: "fg.muted",
          marginBlockStart: "2xs",
          textAlign: "center",
        },

        "& img, & video": {
          display: "block",
          maxWidth: "100%",
          height: "auto",
          borderRadius: "md",
        },

        "& table": {
          width: "100%",
          borderCollapse: "collapse",
          textStyle: "body.sm",
        },
        "& :is(th, td)": {
          padding: "xs",
          borderBlockEnd: "hairline",
          textAlign: "start",
        },
        "& th": { fontWeight: "semibold" },
      },
      lead: {
        textStyle: "body.lg",
        color: "fg.muted",
      },
    },
  }),
};
