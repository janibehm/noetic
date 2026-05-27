import { defineTextStyles } from "@pandacss/dev";

/**
 * Text styles bundle font-size + line-height + tracking + weight.
 * All sizes use the fluid `clamp()` scale so type "folds" across
 * viewports without explicit breakpoints.
 *
 * Display variants use tighter tracking + line-height for
 * large-canvas hero copy; body variants prioritize readability.
 */
export const textStyles = defineTextStyles({
  display: {
    "2xl": {
      value: {
        fontSize: "6xl",
        lineHeight: "tight",
        letterSpacing: "tightest",
        fontWeight: "bold",
        fontFamily: "sans",
        textWrap: "balance",
      },
    },
    xl: {
      value: {
        fontSize: "5xl",
        lineHeight: "tight",
        letterSpacing: "tighter",
        fontWeight: "bold",
        fontFamily: "sans",
        textWrap: "balance",
      },
    },
    lg: {
      value: {
        fontSize: "4xl",
        lineHeight: "tight",
        letterSpacing: "tighter",
        fontWeight: "semibold",
        fontFamily: "sans",
        textWrap: "balance",
      },
    },
  },
  heading: {
    h1: {
      value: {
        fontSize: "4xl",
        lineHeight: "tight",
        letterSpacing: "tighter",
        fontWeight: "bold",
        fontFamily: "sans",
        textWrap: "balance",
      },
    },
    h2: {
      value: {
        fontSize: "3xl",
        lineHeight: "snug",
        letterSpacing: "tight",
        fontWeight: "semibold",
        fontFamily: "sans",
        textWrap: "balance",
      },
    },
    h3: {
      value: {
        fontSize: "2xl",
        lineHeight: "snug",
        letterSpacing: "tight",
        fontWeight: "semibold",
        fontFamily: "sans",
        textWrap: "balance",
      },
    },
    h4: {
      value: {
        fontSize: "xl",
        lineHeight: "snug",
        letterSpacing: "normal",
        fontWeight: "semibold",
        fontFamily: "sans",
      },
    },
    h5: {
      value: {
        fontSize: "lg",
        lineHeight: "snug",
        letterSpacing: "normal",
        fontWeight: "semibold",
        fontFamily: "sans",
      },
    },
    h6: {
      value: {
        fontSize: "md",
        lineHeight: "snug",
        letterSpacing: "wide",
        fontWeight: "semibold",
        fontFamily: "sans",
        textTransform: "uppercase",
      },
    },
  },
  body: {
    lg: {
      value: {
        fontSize: "lg",
        lineHeight: "relaxed",
        letterSpacing: "normal",
        fontWeight: "regular",
        fontFamily: "sans",
        textWrap: "pretty",
      },
    },
    md: {
      value: {
        fontSize: "md",
        lineHeight: "relaxed",
        letterSpacing: "normal",
        fontWeight: "regular",
        fontFamily: "sans",
        textWrap: "pretty",
      },
    },
    sm: {
      value: {
        fontSize: "sm",
        lineHeight: "normal",
        letterSpacing: "normal",
        fontWeight: "regular",
        fontFamily: "sans",
      },
    },
  },
  label: {
    md: {
      value: {
        fontSize: "sm",
        lineHeight: "normal",
        letterSpacing: "wide",
        fontWeight: "medium",
        fontFamily: "sans",
      },
    },
    sm: {
      value: {
        fontSize: "xs",
        lineHeight: "normal",
        letterSpacing: "wider",
        fontWeight: "semibold",
        fontFamily: "sans",
        textTransform: "uppercase",
      },
    },
  },
  code: {
    md: {
      value: {
        fontSize: "sm",
        lineHeight: "normal",
        fontFamily: "mono",
        fontWeight: "regular",
      },
    },
  },
});
