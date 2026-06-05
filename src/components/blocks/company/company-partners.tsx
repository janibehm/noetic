import { getHeadingLevel, headingLevelStyles, renderHeading, type HeadingLevel } from "../heading-level";
import { Reveal } from "../reveal";

export type CompanyPartnersBlockProps = {
  heading?: string;
  headingLevel?: HeadingLevel;
  logos?: string[];
};

export default function CompanyPartnersBlock({ heading, headingLevel, logos = [] }: CompanyPartnersBlockProps) {
  const headingTag = getHeadingLevel(headingLevel, "h2");
  if (!logos.length) return null;

  return (
    <section className="bg-[var(--void-soft)] py-[clamp(72px,11vw,160px)]">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--pad)]">
        {heading ? (
          <Reveal className="mx-auto mb-[clamp(30px,4vw,52px)] max-w-[50ch] text-center">
            {renderHeading(headingTag, headingLevelStyles[headingTag], heading)}
          </Reveal>
        ) : null}
        <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--r-lg)] bg-[var(--line)] shadow-[inset_0_0_0_1px_var(--line)] min-[460px]:grid-cols-3 min-[780px]:grid-cols-5">
          {logos.map((logo) => (
            <div key={logo} className="grid aspect-[16/8] place-items-center bg-[var(--void)] text-[1.4rem] font-semibold tracking-[-0.03em] text-[var(--gray-soft)] transition-[background,color] duration-300 hover:bg-white hover:text-[var(--ink)]">
              {logo}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}