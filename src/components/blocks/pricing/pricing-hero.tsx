"use client";

import { cn } from "@/lib/styles";
import { getHeadingLevel, headingLevelStyles, renderHeading, type HeadingLevel } from "../heading-level";
import { Reveal } from "../reveal";
import { setPricingBillingMode, usePricingBillingMode, type BillingMode } from "./billing-store";

export type PricingHeroBlockProps = {
  eyebrow?: string;
  heading?: string;
  headingLevel?: HeadingLevel;
  lead?: string;
  monthlyLabel?: string;
  annualLabel?: string;
  saveBadge?: string;
};

export default function PricingHeroBlock({
  eyebrow = "Pricing",
  heading = "Create at any scale.",
  headingLevel,
  lead,
  monthlyLabel = "Monthly",
  annualLabel = "Annual",
  saveBadge = "Save 20%",
}: PricingHeroBlockProps) {
  const billingMode = usePricingBillingMode();
  const headingTag = getHeadingLevel(headingLevel, "h1");

  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-h)+96px)] text-center">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[-12%] z-0 h-[70%] w-[120%] -translate-x-1/2 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(138,92,255,.14),rgba(59,162,255,.09)_42%,transparent_72%)] blur-[20px]" />
      <div className="relative z-[2] mx-auto w-full max-w-[var(--maxw)] px-[var(--pad)]">
        {eyebrow ? (
          <Reveal className="flex justify-center">
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase leading-normal tracking-[0.18em] text-[var(--gray)]">
              <span className="h-[7px] w-[7px] rounded-full bg-[var(--aurora-line)]" />
              {eyebrow}
            </span>
          </Reveal>
        ) : null}
        <Reveal delay={1}>
          {renderHeading(
            headingTag,
            cn(headingLevelStyles[headingTag], "mx-auto mt-[18px] max-w-[16ch] text-[clamp(2.6rem,5.6vw,5rem)] text-[var(--ink)]"),
            heading,
          )}
        </Reveal>
        {lead ? (
          <Reveal as="p" delay={2} className="mx-auto mt-[22px] max-w-[48ch] text-[clamp(1.1rem,1.5vw,1.45rem)] leading-[1.45] text-[var(--gray)] text-pretty">
            {lead}
          </Reveal>
        ) : null}
        <Reveal delay={2} className="mt-10 inline-flex items-center gap-3.5">
          <div className="relative inline-flex rounded-[var(--r-pill)] bg-white/50 p-[5px] shadow-[inset_0_0_0_1px_var(--line)] backdrop-blur-[36px] backdrop-saturate-[180%]">
            <span
              aria-hidden
              className={cn(
                "absolute left-[5px] top-[5px] z-[1] h-10 w-[calc(50%-5px)] rounded-[var(--r-pill)] bg-[var(--ink)] transition-transform duration-[450ms] ease-[var(--ease-spring)]",
                billingMode === "annual" && "translate-x-full",
              )}
            />
            <BillingButton mode="monthly" active={billingMode === "monthly"} onClick={() => setPricingBillingMode("monthly")}>{monthlyLabel}</BillingButton>
            <BillingButton mode="annual" active={billingMode === "annual"} onClick={() => setPricingBillingMode("annual")}>{annualLabel}</BillingButton>
          </div>
          {saveBadge ? <span className="rounded-[var(--r-pill)] bg-[rgba(29,138,91,.1)] px-3 py-1.5 text-[0.82rem] font-semibold text-[#1d8a5b]">{saveBadge}</span> : null}
        </Reveal>
      </div>
    </section>
  );
}

function BillingButton({ mode, active, onClick, children }: { mode: BillingMode; active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      data-bill={mode === "monthly" ? "m" : "a"}
      onClick={onClick}
      className={cn("relative z-[2] h-10 rounded-[var(--r-pill)] px-[22px] text-[0.95rem] font-medium transition-colors duration-300", active ? "text-white" : "text-[var(--gray)]")}
    >
      {children}
    </button>
  );
}