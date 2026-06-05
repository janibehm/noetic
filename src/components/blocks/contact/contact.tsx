"use client";

import { useState } from "react";
import { button } from "@/lib/styles";
import { getHeadingLevel, renderHeading, type HeadingLevel } from "../heading-level";
import { Reveal } from "../reveal";

type ContactChannel = {
  _key: string;
  label?: string;
  email?: string;
};

export type ContactBlockProps = {
  eyebrow?: string;
  heading?: string;
  headingLevel?: HeadingLevel;
  lead?: string;
  channels?: ContactChannel[];
  submitLabel?: string;
  selectLabel?: string;
  selectOptions?: string[];
  messagePlaceholder?: string;
  successBadge?: string;
  successTitle?: string;
  successBody?: string;
};

export default function ContactBlock({
  eyebrow,
  heading,
  headingLevel,
  lead,
  channels = [],
  submitLabel = "Send message",
  selectLabel = "Team size",
  selectOptions = ["Just me", "2-10", "11-50", "51-200", "200+"],
  messagePlaceholder = "Tell us a little about your project",
  successBadge = "Message sent",
  successTitle = "Thanks for reaching out.",
  successBody = "We've received your note and a member of the team will reply within one business day.",
}: ContactBlockProps) {
  const [sent, setSent] = useState(false);
  const headingTag = getHeadingLevel(headingLevel, "h1");
  const options = selectOptions?.length ? selectOptions : ["Just me", "2-10", "11-50", "51-200", "200+"];

  return (
    <section className="grid min-h-[100svh] md:grid-cols-2">
      <div className="relative flex flex-col px-[clamp(28px,5vw,80px)] pb-10 pt-[calc(var(--nav-h)+80px)] md:pb-[60px]">
        {eyebrow ? (
          <Reveal className="flex items-center gap-3">
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--aurora-line)]" />
            <span className="text-xs font-semibold uppercase leading-normal tracking-[0.18em] text-[var(--gray)]">{eyebrow}</span>
          </Reveal>
        ) : null}
        {heading ? (
          <Reveal delay={1}>
            {renderHeading(headingTag, "mt-[18px] max-w-[14ch] text-[clamp(2.6rem,5vw,5rem)] font-bold leading-[0.98] tracking-[-0.045em] text-[var(--ink)] text-balance", heading)}
          </Reveal>
        ) : null}
        {lead ? (
          <Reveal as="p" delay={2} className="mt-6 max-w-[34ch] text-[clamp(1.1rem,1.5vw,1.45rem)] leading-[1.45] text-[var(--gray)] text-pretty">
            {lead}
          </Reveal>
        ) : null}
        {channels.length ? (
          <Reveal delay={2} className="mt-auto flex flex-col gap-[22px] pt-9 md:pt-12">
            {channels.map((channel) => (
              <div key={channel._key} className="flex flex-col gap-[3px]">
                {channel.label ? <span className="text-sm leading-normal text-[var(--gray)]">{channel.label}</span> : null}
                {channel.email ? (
                  <a href={`mailto:${channel.email}`} className="w-fit border-b border-transparent text-[1.15rem] font-medium tracking-[-0.01em] text-[var(--ink)] no-underline transition-colors duration-300 hover:border-[var(--ink)]">
                    {channel.email}
                  </a>
                ) : null}
              </div>
            ))}
          </Reveal>
        ) : null}
      </div>
      <div className="flex flex-col justify-center bg-[var(--void-soft)] px-[clamp(28px,5vw,80px)] pb-[70px] pt-[calc(var(--nav-h)+80px)]">
        {sent ? (
          <div className="max-w-[480px]">
            <span className="inline-block rounded-full bg-[var(--ink)] px-[11px] py-1 text-[var(--t-micro)] font-semibold leading-normal tracking-[0.04em] text-white">{successBadge}</span>
            <h2 className="mb-3 mt-4 text-[clamp(2rem,4.6vw,3.8rem)] font-bold leading-none tracking-[-0.04em] text-[var(--ink)]">{successTitle}</h2>
            <p className="text-[var(--gray)]">{successBody}</p>
          </div>
        ) : (
          <Reveal delay={1}>
            <form
              className="w-full max-w-[480px]"
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid gap-x-6 md:grid-cols-2">
                <Field placeholder="Name" required />
                <Field placeholder="Company" required />
              </div>
              <Field type="email" placeholder="Email" required />
              <label className="relative mb-[30px] block">
                <select required defaultValue="" className="w-full border-0 border-b border-[var(--gray-soft)] bg-transparent px-0.5 py-3.5 text-[1.1rem] text-[var(--ink)] outline-none transition-colors focus:border-[var(--ink)]">
                  <option value="" disabled>{selectLabel}</option>
                  {options.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
              <label className="mb-[30px] block">
                <textarea required placeholder={messagePlaceholder} className="min-h-24 w-full resize-none border-0 border-b border-[var(--gray-soft)] bg-transparent px-0.5 py-3.5 text-[1.1rem] text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--gray-soft)] focus:border-[var(--ink)]" />
              </label>
              <button type="submit" className={button({ variant: "inverse", size: "lg", shape: "pill" }) + " mt-2"}>
                {submitLabel}
                <ArrowIcon />
              </button>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function Field({ type = "text", placeholder, required }: { type?: string; placeholder: string; required?: boolean }) {
  return (
    <label className="mb-[30px] block">
      <input type={type} placeholder={placeholder} required={required} className="w-full border-0 border-b border-[var(--gray-soft)] bg-transparent px-0.5 py-3.5 text-[1.1rem] text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--gray-soft)] focus:border-[var(--ink)]" />
    </label>
  );
}

function ArrowIcon() {
  return <svg className="arr" width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}