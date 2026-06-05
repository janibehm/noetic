"use client";

import { cinematicStage, cn } from "@/lib/styles";
import { Reveal } from "../reveal";
import type { CtaLink } from "../types";
import { usePricingBillingMode } from "./billing-store";

type PricingFeature = { _key?: string; highlight?: string; text?: string; muted?: boolean };
type PricingPlan = {
  _key: string;
  name?: string;
  description?: string;
  monthlyPrice?: number;
  annualPrice?: number;
  monthlyBillNote?: string;
  annualBillNote?: string;
  cta?: CtaLink;
  ctaVariant?: "solid" | "ghost";
  featured?: boolean;
  badge?: string;
  features?: PricingFeature[];
};

type EnterpriseStrip = { heading?: string; body?: string; cta?: CtaLink };

export type PricingTiersBlockProps = {
  plans?: PricingPlan[];
  creditsNote?: string;
  enterprise?: EnterpriseStrip;
};

export default function PricingTiersBlock({ plans = [], creditsNote, enterprise }: PricingTiersBlockProps) {
  return (
    <section className="py-[clamp(48px,7vw,96px)] pt-0">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--pad)]">
        <div className="mt-[clamp(44px,6vw,72px)] grid items-stretch gap-[clamp(14px,1.6vw,22px)] md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, index) => <PricingTierCard key={plan._key} plan={plan} index={index} />)}
        </div>
        {creditsNote ? (
          <Reveal as="p" className="mt-7 text-center text-[0.9rem] text-[var(--gray)]">
            {creditsNote}
          </Reveal>
        ) : null}
        {enterprise ? <EnterpriseStrip data={enterprise} /> : null}
      </div>
    </section>
  );
}

function PricingTierCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const billingMode = usePricingBillingMode();
  const price = billingMode === "annual" ? plan.annualPrice : plan.monthlyPrice;
  const billNote = billingMode === "annual" ? plan.annualBillNote : plan.monthlyBillNote;
  const ctaVariant = plan.ctaVariant ?? (plan.featured ? "solid" : "ghost");

  return (
    <Reveal
      as="article"
      delay={(index % 4) as 0 | 1 | 2 | 3}
      className={cn(
        "relative flex flex-col rounded-[var(--r-lg)] bg-[var(--void)] px-[26px] py-[30px] shadow-[inset_0_0_0_1px_var(--line)] transition-[box-shadow,transform] duration-500 ease-[var(--ease-spring)] hover:-translate-y-1 hover:shadow-[inset_0_0_0_1px_var(--line),var(--shadow-amb-s)]",
        plan.featured && "shadow-[inset_0_0_0_1.5px_transparent,var(--shadow-amb)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:p-[1.5px] before:bg-[var(--aurora-line)] before:[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] before:[mask-composite:exclude] after:absolute after:inset-[-1px] after:z-[-1] after:rounded-[inherit] after:bg-[radial-gradient(60%_40%_at_50%_0%,rgba(138,92,255,.16),transparent_70%)] after:blur-[10px]",
      )}
    >
      {plan.featured && plan.badge ? <span className="absolute left-1/2 top-[-13px] -translate-x-1/2 rounded-[var(--r-pill)] bg-[var(--ink)] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-white">{plan.badge}</span> : null}
      {plan.name ? <div className="text-[1.18rem] font-semibold tracking-[-0.02em] text-[var(--ink)]">{plan.name}</div> : null}
      {plan.description ? <div className="mt-[5px] min-h-[38px] text-[0.9rem] text-[var(--gray)]">{plan.description}</div> : null}
      <div className="mt-[18px] flex items-end gap-1">
        <span className="mt-2 self-start text-[1.4rem] font-semibold text-[var(--ink)]">$</span>
        <span className="text-5xl font-bold leading-none tracking-[-0.04em] text-[var(--ink)] transition-opacity duration-[250ms]">{price ?? 0}</span>
        <span className="mb-1.5 text-[0.92rem] text-[var(--gray)]">/mo</span>
      </div>
      <div className="mt-2 min-h-[18px] text-[0.8rem] text-[var(--gray-soft)]">{billNote}</div>
      {plan.cta?.label && plan.cta.href ? (
        <div className="mt-[22px]">
          <a href={plan.cta.href} className={cn("btn w-full justify-center", ctaVariant === "ghost" && "btn-ghost")}>{plan.cta.label}</a>
        </div>
      ) : null}
      {plan.features?.length ? (
        <ul className="mt-[26px] flex list-none flex-col gap-3 border-t border-[var(--line)] pt-6">
          {plan.features.map((feature, featureIndex) => (
            <li key={feature._key ?? `${plan._key}-feature-${featureIndex}`} className={cn("flex items-start gap-[11px] text-[0.9rem] leading-[1.35] text-[var(--ink-2)]", feature.muted && "text-[var(--gray-soft)]")}>
              <FeatureIcon muted={feature.muted} />
              <span>{feature.highlight ? <b className="font-semibold text-[var(--ink)]">{feature.highlight}</b> : null}{feature.highlight ? " " : null}{feature.text}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </Reveal>
  );
}

function EnterpriseStrip({ data }: { data: EnterpriseStrip }) {
  return (
    <Reveal className="relative mt-[clamp(40px,5vw,64px)] grid items-center gap-8 overflow-hidden rounded-[var(--r-xl)] p-[clamp(36px,5vw,60px)] md:grid-cols-[1.3fr_1fr]">
      <div aria-hidden className={cn(cinematicStage({ tone: "spectral" }), "absolute inset-0 z-0")} />
      <div className="relative z-[3]">
        {data.heading ? <h2 className="mb-3 text-[clamp(1.6rem,2.8vw,2.4rem)] font-bold leading-[1.02] tracking-[-0.03em] text-white">{data.heading}</h2> : null}
        {data.body ? <p className="max-w-[46ch] text-white/85">{data.body}</p> : null}
      </div>
      {data.cta?.label && data.cta.href ? (
        <div className="relative z-[3] flex justify-start md:justify-end">
          <a href={data.cta.href} className="btn btn-white btn-lg">
            {data.cta.label}
            <ArrowIcon />
          </a>
        </div>
      ) : null}
    </Reveal>
  );
}

function FeatureIcon({ muted }: { muted?: boolean }) {
  return (
    <span className={cn("mt-px flex-none", muted ? "text-[var(--gray-soft)]" : "text-[var(--ink)]")}>
      {muted ? <MinusIcon /> : <CheckIcon />}
    </span>
  );
}

function CheckIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function MinusIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M6 12h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>;
}

function ArrowIcon() {
  return <svg className="arr" width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}