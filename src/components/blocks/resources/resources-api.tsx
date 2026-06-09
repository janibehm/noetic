"use client";

import { useState } from "react";
import { cn } from "@/lib/styles";
import { getHeadingLevel, renderHeading, type HeadingLevel } from "../heading-level";
import { Reveal } from "../reveal";

type CodeSample = {
  _key: string;
  label?: string;
  language?: string;
  code?: string;
};

type EndpointRow = {
  _key: string;
  method?: "GET" | "POST" | "DEL";
  endpoint?: string;
  description?: string;
};

type ApiCard = {
  _key: string;
  title?: string;
  href?: string;
  items?: string[];
};

export type ResourcesApiBlockProps = {
  heading?: string;
  headingLevel?: HeadingLevel;
  lead?: string;
  codeSamples?: CodeSample[];
  endpointGroup?: {
    heading?: string;
    baseUrl?: string;
    rows?: EndpointRow[];
  };
  cards?: ApiCard[];
};

export default function ResourcesApiBlock({ heading, headingLevel, lead, codeSamples = [], endpointGroup, cards = [] }: ResourcesApiBlockProps) {
  const [activeLanguage, setActiveLanguage] = useState(codeSamples[0]?._key ?? "");
  const headingTag = getHeadingLevel(headingLevel, "h2");
  const activeSample = codeSamples.find((sample) => sample._key === activeLanguage) ?? codeSamples[0];

  return (
    <section className="bg-[var(--void-soft)] py-[clamp(72px,11vw,160px)]">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--pad)]">
        <div className="mb-[clamp(40px,5vw,72px)] grid items-center gap-[clamp(30px,5vw,72px)] md:grid-cols-[1fr_1.1fr]">
          <Reveal>
            {heading ? renderHeading(headingTag, "mb-4 mt-3.5 text-[clamp(1.8rem,3.6vw,3rem)] font-bold leading-[1.04] tracking-[-0.04em] text-[var(--ink)] text-balance", heading) : null}
            {lead ? <p className="text-[clamp(1.1rem,1.5vw,1.45rem)] leading-[1.45] text-[var(--gray)] text-pretty">{lead}</p> : null}
          </Reveal>
          {codeSamples.length ? (
            <Reveal delay={1} className="overflow-hidden rounded-[var(--r-md)] bg-[var(--void-code)] shadow-[var(--shadow-amb-s)]">
              <div className="flex items-center gap-2 border-b border-[var(--line)] bg-[var(--void)] px-1.5">
                {codeSamples.map((sample) => (
                  <button
                    key={sample._key}
                    type="button"
                    onClick={() => setActiveLanguage(sample._key)}
                    className={cn(
                      "border-b-2 border-transparent px-4 py-3 font-mono text-[0.76rem] text-[var(--gray)] transition-colors",
                      activeSample?._key === sample._key && "border-[var(--ink)] text-[var(--ink)]",
                    )}
                  >
                    {sample.label || sample.language}
                  </button>
                ))}
              </div>
              <div className="overflow-x-auto px-6 py-[22px] font-mono text-[0.86rem] leading-[1.75] text-[var(--ink-2)]">
                <pre className="m-0 whitespace-pre">{activeSample?.code}</pre>
              </div>
            </Reveal>
          ) : null}
        </div>
        {endpointGroup ? (
          <Reveal className="mt-[clamp(40px,5vw,64px)]">
            <div className="mb-5 flex items-baseline gap-3.5">
              {endpointGroup.heading ? <h3 className="text-xl font-semibold tracking-[-0.02em] text-[var(--ink)]">{endpointGroup.heading}</h3> : null}
              {endpointGroup.baseUrl ? <span className="font-mono text-[0.8rem] text-[var(--gray)]">{endpointGroup.baseUrl}</span> : null}
            </div>
            {/* Desktop: a three-column table. */}
            <div className="hidden overflow-hidden rounded-[var(--r-md)] bg-[var(--void)] shadow-[inset_0_0_0_1px_var(--line)] md:block">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-[18px] py-4 text-left text-[var(--t-micro)] font-semibold uppercase tracking-[0.08em] text-[var(--gray)]">Method</th>
                    <th className="px-[18px] py-4 text-left text-[var(--t-micro)] font-semibold uppercase tracking-[0.08em] text-[var(--gray)]">Endpoint</th>
                    <th className="px-[18px] py-4 text-left text-[var(--t-micro)] font-semibold uppercase tracking-[0.08em] text-[var(--gray)]">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {endpointGroup.rows?.map((row) => (
                    <tr key={row._key} className="hover:bg-[var(--void-code)]">
                      <td className="border-t border-[var(--line)] px-[18px] py-4 align-top text-[0.95rem]"><MethodBadge method={row.method} /></td>
                      <td className="border-t border-[var(--line)] px-[18px] py-4 align-top font-mono text-[0.9rem] text-[var(--ink)]">{row.endpoint}</td>
                      <td className="border-t border-[var(--line)] px-[18px] py-4 align-top text-[0.95rem] text-[var(--ink-2)]">{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile: each endpoint reflows into a stacked card so nothing
                overflows or gets squeezed. */}
            <ul className="flex list-none flex-col gap-3 p-0 md:hidden">
              {endpointGroup.rows?.map((row) => (
                <li key={row._key} className="rounded-[var(--r-md)] bg-[var(--void)] p-4 shadow-[inset_0_0_0_1px_var(--line)]">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <MethodBadge method={row.method} />
                    {row.endpoint ? <code className="font-mono text-[0.9rem] break-all text-[var(--ink)]">{row.endpoint}</code> : null}
                  </div>
                  {row.description ? <p className="mt-2.5 text-[0.95rem] leading-[1.5] text-[var(--ink-2)]">{row.description}</p> : null}
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
        {cards.length ? (
          <Reveal className="mt-[clamp(40px,5vw,64px)] grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
            {cards.map((card) => <ApiCardLink key={card._key} card={card} />)}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

function MethodBadge({ method = "GET" }: { method?: "GET" | "POST" | "DEL" }) {
  const classes = {
    GET: "bg-[#1d8a5b1a] text-[#1d8a5b]",
    POST: "bg-[#3b6bff1a] text-[#3b6bff]",
    DEL: "bg-[#e0466b1a] text-[#e0466b]",
  } as const;

  return <span className={cn("rounded-[7px] px-[9px] py-1 font-mono text-[0.74rem] font-medium", classes[method])}>{method}</span>;
}

function ApiCardLink({ card }: { card: ApiCard }) {
  return (
    <a href={card.href || "#"} className="block rounded-[var(--r-md)] p-6 text-[var(--ink)] no-underline shadow-[inset_0_0_0_1px_var(--line)] transition-[transform,box-shadow] duration-500 ease-[var(--ease-spring)] hover:-translate-y-1 hover:shadow-[inset_0_0_0_1px_var(--line),var(--shadow-amb-s)]">
      <div className="mb-[18px] grid h-[38px] w-[38px] place-items-center rounded-[11px] bg-[var(--void-soft)]" aria-hidden>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M8 6l-5 6 5 6M16 6l5 6-5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      {card.title ? <h3 className="mb-2 text-[1.06rem] font-[550] leading-[1.2] tracking-[-0.02em]">{card.title}</h3> : null}
      {card.items?.length ? (
        <ul className="mt-3 flex list-none flex-col gap-1.5 p-0">
          {card.items.map((item) => <li key={item} className="text-[0.88rem] text-[var(--gray)]">{item}</li>)}
        </ul>
      ) : null}
    </a>
  );
}