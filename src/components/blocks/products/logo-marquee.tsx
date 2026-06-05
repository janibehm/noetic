import { Reveal } from "../reveal";

export type ProductLogoMarqueeBlockProps = {
  heading?: string;
  highlightedText?: string;
  logos?: string[];
};

const DEFAULT_LOGOS = ["Helio", "Northwind", "Vantage", "Lumen", "Atlas", "Forge", "Quanta", "Nimbus", "Verve", "Orbital"];

export default function ProductLogoMarqueeBlock({
  heading = "Trusted to generate production imagery by teams at",
  highlightedText = "production imagery",
  logos = DEFAULT_LOGOS,
}: ProductLogoMarqueeBlockProps) {
  const row = [...logos, ...logos];
  const parts = highlightedText ? heading.split(highlightedText) : [heading];

  return (
    <section className="py-[clamp(48px,7vw,96px)]">
      <Reveal className="mx-auto mb-12 w-full max-w-[var(--maxw)] px-[var(--pad)] text-center">
        <p className="mx-auto max-w-[24ch] text-[var(--gray)] text-[clamp(1.4rem,2.4vw,2rem)] font-semibold leading-[1.12] tracking-[-0.03em]">
          {parts.length > 1 ? (
            <>
              {parts[0]}<span className="text-[var(--ink)]">{highlightedText}</span>{parts.slice(1).join(highlightedText)}
            </>
          ) : (
            heading
          )}
        </p>
      </Reveal>
      <Reveal delay={1} className="relative overflow-hidden [mask:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] [-webkit-mask:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max gap-[clamp(40px,6vw,90px)] motion-safe:animate-[productMarquee_38s_linear_infinite] hover:[animation-play-state:paused]">
          {row.map((logo, index) => (
            <span key={`${logo}-${index}`} className="flex h-7 items-center whitespace-nowrap text-[1.4rem] font-semibold tracking-[-0.03em] text-[var(--gray-soft)] grayscale transition-colors duration-300 hover:text-[var(--ink)]">
              {logo}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}