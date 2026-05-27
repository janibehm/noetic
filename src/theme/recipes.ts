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
    },
    defaultVariants: { variant: "solid", size: "md" },
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
