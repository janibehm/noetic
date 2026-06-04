type ClassValue = string | false | null | undefined;

export function cn(...values: ClassValue[]) {
  return values.filter(Boolean).join(" ");
}

type ContainerSize = "prose" | "sm" | "md" | "lg" | "xl" | "full";

export function pageContainer(input: ContainerSize | { size?: ContainerSize } = "lg") {
  const size = typeof input === "string" ? input : input.size ?? "lg";
  const sizes = {
    prose: "max-w-[65ch]",
    sm: "max-w-[40rem]",
    md: "max-w-[56rem]",
    lg: "max-w-[72rem]",
    xl: "max-w-[var(--maxw)]",
    full: "max-w-full",
  } as const;
  return cn("mx-auto w-full px-[var(--pad)]", sizes[size]);
}

export function pageSection({
  space = "lg",
  tone = "canvas",
}: {
  space?: "sm" | "md" | "lg" | "xl";
  tone?: "canvas" | "surface" | "subtle" | "inverse" | "accent";
} = {}) {
  const spaces = {
    sm: "py-[clamp(2rem,1.82rem+0.89vw,2.5rem)]",
    md: "py-[clamp(3rem,2.73rem+1.34vw,3.75rem)]",
    lg: "py-[clamp(4rem,3.55rem+2.23vw,5.25rem)]",
    xl: "py-[clamp(6rem,5.36rem+3.21vw,7.8rem)]",
  } as const;
  const tones = {
    canvas: "bg-[var(--void)] text-[var(--ink)]",
    surface: "bg-white text-[var(--ink)]",
    subtle: "bg-[var(--void-soft)] text-[var(--ink)]",
    inverse: "bg-[var(--ink)] text-white",
    accent: "bg-[#eef4ff] text-[var(--ink)]",
  } as const;
  return cn("relative w-full", spaces[space], tones[tone]);
}

export function stackY({
  gap = "md",
  align = "stretch",
}: {
  gap?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  align?: "start" | "center" | "end" | "stretch";
} = {}) {
  const gaps = {
    xs: "gap-[clamp(.75rem,.68rem+.36vw,1rem)]",
    sm: "gap-[clamp(1rem,.91rem+.45vw,1.25rem)]",
    md: "gap-[clamp(1.5rem,1.36rem+.71vw,2rem)]",
    lg: "gap-[clamp(2rem,1.82rem+.89vw,2.5rem)]",
    xl: "gap-[clamp(3rem,2.73rem+1.34vw,3.75rem)]",
    "2xl": "gap-[clamp(4rem,3.55rem+2.23vw,5.25rem)]",
  } as const;
  const aligns = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  } as const;
  return cn("flex flex-col", gaps[gap], aligns[align]);
}

export function button({
  variant = "solid",
  size = "md",
  shape = "rounded",
}: {
  variant?: "solid" | "inverse" | "onCinematic" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  shape?: "rounded" | "pill";
} = {}) {
  const variants = {
    solid: "bg-[#365cf5] text-white hover:brightness-95",
    inverse: "bg-[var(--ink)] text-white shadow-[var(--shadow-amb-s)] hover:shadow-[var(--shadow-amb)]",
    onCinematic: "bg-white text-[var(--ink)] shadow-[var(--shadow-amb-s)] hover:shadow-[var(--shadow-amb)]",
    outline: "border border-[var(--line)] text-[var(--ink)] hover:bg-[var(--void-soft)]",
    ghost: "text-[var(--ink)] hover:bg-[var(--void-soft)]",
    link: "p-0 text-[#2543d8] underline underline-offset-[.2em] hover:text-[#1f37ad]",
  } as const;
  const sizes = {
    sm: "min-h-8 px-4 py-2 text-sm",
    md: "min-h-10 px-6 py-3 text-base",
    lg: "min-h-12 px-8 py-4 text-lg",
  } as const;
  const shapes = { rounded: "rounded-lg", pill: "rounded-full" } as const;
  return cn(
    "inline-flex items-center justify-center gap-2 font-medium leading-none transition-[background-color,color,border-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#365cf559] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    variant === "link" ? undefined : sizes[size],
    variant === "link" ? undefined : shapes[shape],
  );
}

export function cinematicStage({
  tone = "spectral",
  radius = "none",
}: {
  tone?: "spectral" | "cool" | "warm";
  radius?: "none" | "lg" | "xl" | "2xl";
} = {}) {
  const tones = {
    spectral: "",
    cool: "cinematic-stage-cool",
    warm: "cinematic-stage-warm",
  } as const;
  const radii = {
    none: "rounded-none",
    lg: "rounded-3xl",
    xl: "rounded-[2rem]",
    "2xl": "rounded-[2.75rem]",
  } as const;
  return cn("cinematic-stage", tones[tone], radii[radius]);
}