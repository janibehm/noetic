"use client";

import { useEffect, useRef, useState } from "react";
import { cinematicStage, cn } from "@/lib/styles";
import { sanityImageProps } from "@/lib/sanity-image";
import { Reveal } from "../reveal";
import type { StackStep } from "./sticky-stack";

const AURORA_TONE = {
  default: "spectral",
  cool: "cool",
  warm: "warm",
} as const;

export function StickyStackSync({ steps }: { steps: StackStep[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const mediaRefs = useRef<Array<HTMLDivElement | null>>([]);
  const frameRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const updateActiveStep = () => {
      const viewportCenter = window.innerHeight / 2;
      let nextActiveIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      mediaRefs.current.forEach((node, index) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const center = (rect.top + rect.bottom) / 2;
        const distance = Math.abs(center - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          nextActiveIndex = index;
        }
      });

      if (nextActiveIndex !== activeIndexRef.current) {
        activeIndexRef.current = nextActiveIndex;
        setActiveIndex(nextActiveIndex);
      }
    };

    const loop = () => {
      updateActiveStep();
      frameRef.current = window.requestAnimationFrame(loop);
    };

    frameRef.current = window.requestAnimationFrame(loop);
    intervalRef.current = window.setInterval(updateActiveStep, 120);

    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div ref={stackRef} data-stack-sync className="grid items-start gap-[clamp(30px,6vw,90px)] lg:grid-cols-2">
      <div className="top-[calc(var(--nav-h)+60px)] self-start lg:sticky">
        {steps.map((step, index) => {
          const isActive = index === activeIndex;
          return (
            <Reveal
              key={step._key}
              data-step
              data-active={isActive ? "true" : undefined}
              aria-current={isActive ? "step" : undefined}
              delay={(index % 4) as 0 | 1 | 2 | 3}
              className={cn("border-t border-[var(--line)] py-5 first:border-t-0", !isActive && "dim")}
            >
              {step.title ? (
                <h3
                  className={cn(
                    "text-[clamp(1.8rem,3.4vw,3rem)] font-bold leading-[1.02] tracking-[-0.04em] transition-[color,opacity] duration-[400ms]",
                    isActive ? "text-[var(--ink)] opacity-100" : "text-[var(--gray-soft)] opacity-50 lg:opacity-50 max-lg:text-[var(--ink)] max-lg:opacity-100",
                  )}
                >
                  {step.title}
                </h3>
              ) : null}
              <div className={cn("grid transition-[grid-template-rows] duration-[400ms] ease-[var(--ease-out)]", isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr] max-lg:grid-rows-[1fr]")}>
                <div className="overflow-hidden">
                  {step.body ? (
                    <p className={cn("mt-3.5 max-w-[40ch] text-[var(--gray)] transition-opacity duration-[400ms]", isActive ? "opacity-100" : "opacity-0 max-lg:opacity-100")}>
                      {step.body}
                    </p>
                  ) : null}
                </div>
              </div>
              {/* On mobile each step's media sits right under its own text; the
                  separate sticky media column is hidden below lg. */}
              <div className="mt-5 lg:hidden">
                <StackMedia step={step} />
              </div>
            </Reveal>
          );
        })}
      </div>
      <div className="hidden flex-col gap-[clamp(40px,9vh,110px)] lg:flex">
        {steps.map((step, index) => (
          <Reveal key={`${step._key}-media`} delay={(index % 4) as 0 | 1 | 2 | 3}>
            <StackMedia
              step={step}
              refCallback={(node) => {
                mediaRefs.current[index] = node;
              }}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function StackMedia({
  step,
  refCallback,
}: {
  step: StackStep;
  refCallback?: (node: HTMLDivElement | null) => void;
}) {
  const image = step.image ? sanityImageProps(step.image, 1200) : null;
  return (
    <div
      ref={refCallback}
      data-pic
      className="relative aspect-[4/3.1] overflow-hidden rounded-[var(--r-lg)] bg-[var(--void-soft)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05),var(--shadow-amb)]"
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
      ) : (
        <div aria-hidden className={cn(cinematicStage({ tone: AURORA_TONE[step.auroraTone ?? "default"] }), "absolute inset-0")} />
      )}
    </div>
  );
}