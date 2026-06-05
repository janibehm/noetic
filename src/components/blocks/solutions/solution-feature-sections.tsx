import { cinematicStage, cn } from "@/lib/styles";
import { Reveal } from "../reveal";
import type { AuroraTone } from "../types";

type FeatureSection = {
  _key: string;
  eyebrow?: string;
  heading?: string;
  body?: string;
  bullets?: string[];
  flip?: boolean;
  imageUrl?: string;
  auroraTone?: AuroraTone;
};

const AURORA_TONE = {
  default: "spectral",
  cool: "cool",
  warm: "warm",
} as const;

export type SolutionFeatureSectionsBlockProps = {
  sections?: FeatureSection[];
};

export default function SolutionFeatureSectionsBlock({ sections = [] }: SolutionFeatureSectionsBlockProps) {
  return (
    <>
      {sections.map((section) => (
        <section key={section._key} className="py-[clamp(72px,11vw,160px)]">
          <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--pad)]">
            <Reveal className="grid items-center gap-[clamp(30px,5vw,80px)] md:grid-cols-2">
              <div className={cn(section.flip && "md:order-2")}>
                {section.eyebrow ? <span className="text-xs font-semibold uppercase leading-normal tracking-[0.18em] text-[var(--gray)]">{section.eyebrow}</span> : null}
                {section.heading ? <h2 className="my-3.5 text-[clamp(1.8rem,3.4vw,2.8rem)] font-bold leading-[0.98] tracking-[-0.03em] text-[var(--ink)]">{section.heading}</h2> : null}
                {section.body ? <p className="text-[var(--gray)]">{section.body}</p> : null}
                {section.bullets?.length ? (
                  <ul className="mt-[22px] flex list-none flex-col p-0">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-3 border-t border-[var(--line)] py-4 text-[1.05rem] last:border-b">
                        <span className="h-[7px] w-[7px] rounded-full bg-[var(--aurora-line)]" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <div className="relative aspect-[4/3.2] overflow-hidden rounded-[var(--r-lg)] bg-[var(--void-soft)] shadow-[var(--shadow-amb)]">
                {section.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={section.imageUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div aria-hidden className={cn(cinematicStage({ tone: AURORA_TONE[section.auroraTone ?? "default"] }), "absolute inset-0")} />
                )}
              </div>
            </Reveal>
          </div>
        </section>
      ))}
    </>
  );
}