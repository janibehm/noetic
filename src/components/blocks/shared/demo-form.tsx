"use client";

import { useState } from "react";
import { button, cinematicStage } from "@/lib/styles";
import { Reveal } from "../reveal";

export type DemoFormBlockProps = {
  heading?: string;
  body?: string;
  bullets?: string[];
  submitLabel?: string;
  showCompanyField?: boolean;
  selectLabel?: string;
  selectOptions?: string[];
  messagePlaceholder?: string;
  successTitle?: string;
  successBody?: string;
};

export default function DemoFormBlock({
  heading = "See noetic on your assets.",
  body,
  bullets = [],
  submitLabel = "Request demo",
  showCompanyField = true,
  selectLabel = "Team size",
  selectOptions = ["1-10", "11-50", "51-200", "200+"],
  messagePlaceholder = "What would you like to generate?",
  successTitle = "Thanks - we'll be in touch within one business day.",
  successBody = "A product specialist will reach out to schedule your walkthrough.",
}: DemoFormBlockProps) {
  const [sent, setSent] = useState(false);
  const bulletItems = bullets ?? [];
  const optionItems = selectOptions?.length ? selectOptions : ["1-10", "11-50", "51-200", "200+"];
  const fieldSelectLabel = selectLabel || "Team size";
  const fieldMessagePlaceholder = messagePlaceholder || "What would you like to generate?";
  const shouldShowCompanyField = showCompanyField ?? true;

  return (
    <section className="relative py-[clamp(72px,11vw,160px)]">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--pad)]">
        <Reveal className="overflow-hidden rounded-[var(--r-xl)] bg-[var(--void-soft)] shadow-[var(--shadow-amb)]">
          <div className="grid lg:grid-cols-2">
            <div className="relative overflow-hidden p-[clamp(36px,5vw,72px)] text-white">
              <div aria-hidden className={cinematicStage({ tone: "spectral" }) + " absolute inset-0 z-0"} />
              <div className="relative z-[3]">
                <h2 className="mb-4 text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-[0.98] tracking-[-0.03em] text-white">{heading}</h2>
                {body ? <p className="max-w-[34ch] text-white/85">{body}</p> : null}
                {bulletItems.length ? (
                  <ul className="mt-7 flex list-none flex-col gap-3 p-0">
                    {bulletItems.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2.5 text-white/90">
                        <span className="h-[7px] w-[7px] rounded-full bg-[var(--aurora-line)]" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
            <div className="bg-[var(--void)] p-[clamp(36px,5vw,72px)]">
              {sent ? (
                <div className="flex flex-col gap-2.5">
                  <span className="self-start rounded-full bg-[var(--ink)] px-[11px] py-1 text-[0.72rem] font-semibold uppercase tracking-[0.04em] text-white">Received</span>
                  <h3 className="mt-2 text-[clamp(1.4rem,2.4vw,2rem)] font-semibold tracking-[-0.03em] text-[var(--ink)]">{successTitle}</h3>
                  <p className="text-[var(--gray)]">{successBody}</p>
                </div>
              ) : (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSent(true);
                  }}
                >
                  <div className="grid gap-x-5 md:grid-cols-2">
                    <Field placeholder="First name" required />
                    <Field placeholder="Last name" required />
                  </div>
                  <Field type="email" placeholder="Work email" required />
                  {shouldShowCompanyField ? <Field placeholder="Company" required /> : null}
                  <label className="relative mb-[30px] block">
                    <select required defaultValue="" className="w-full border-0 border-b border-[var(--line)] bg-transparent px-0.5 py-3 text-[1.06rem] text-[var(--ink)] outline-none transition-colors focus:border-[var(--ink)]">
                      <option value="" disabled>{fieldSelectLabel}</option>
                      {optionItems.map((option) => <option key={option}>{option}</option>)}
                    </select>
                  </label>
                  <label className="mb-[30px] block">
                    <textarea placeholder={fieldMessagePlaceholder} className="min-h-24 w-full resize-none border-0 border-b border-[var(--line)] bg-transparent px-0.5 py-3 text-[1.06rem] text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--gray-soft)] focus:border-[var(--ink)]" />
                  </label>
                  <button type="submit" className={button({ variant: "inverse", size: "lg", shape: "pill" }) + " w-full"}>
                    {submitLabel}
                  </button>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ type = "text", placeholder, required }: { type?: string; placeholder: string; required?: boolean }) {
  return (
    <label className="mb-[30px] block">
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full border-0 border-b border-[var(--line)] bg-transparent px-0.5 py-3 text-[1.06rem] text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--gray-soft)] focus:border-[var(--ink)]"
      />
    </label>
  );
}