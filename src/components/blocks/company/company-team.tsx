"use client";

import { useRef } from "react";
import { getHeadingLevel, headingLevelStyles, renderHeading, type HeadingLevel } from "../heading-level";
import { Reveal } from "../reveal";

type TeamMember = {
  _key: string;
  name?: string;
  role?: string;
  imageUrl?: string;
};

export type CompanyTeamBlockProps = {
  heading?: string;
  headingLevel?: HeadingLevel;
  members?: TeamMember[];
};

export default function CompanyTeamBlock({ heading, headingLevel, members = [] }: CompanyTeamBlockProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const headingTag = getHeadingLevel(headingLevel, "h2");

  const scrollByCard = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * Math.min(track.clientWidth * 0.75, 420), behavior: "smooth" });
  };

  if (!members.length) return null;

  return (
    <section className="py-[clamp(48px,7vw,96px)]">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--pad)]">
        <Reveal className="mb-[clamp(30px,4vw,52px)] flex flex-wrap items-end justify-between gap-6">
          {heading ? renderHeading(headingTag, headingLevelStyles[headingTag], heading) : null}
          <div className="flex gap-2">
            <CarouselButton label="Previous" onClick={() => scrollByCard(-1)}><path d="M15 6l-6 6 6 6" /></CarouselButton>
            <CarouselButton label="Next" onClick={() => scrollByCard(1)}><path d="M9 6l6 6-6 6" /></CarouselButton>
          </div>
        </Reveal>
      </div>
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--pad)]">
        <Reveal>
          <div ref={trackRef} className="no-scrollbar flex gap-[clamp(14px,1.6vw,20px)] overflow-x-auto scroll-smooth pb-2">
            {members.map((member) => (
              <article key={member._key} className="w-[clamp(200px,24vw,280px)] flex-none">
                <div className="photo mb-3.5 aspect-[3/4] overflow-hidden rounded-[var(--r-lg)] bg-[var(--void-soft)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05),var(--shadow-amb)]">
                  {member.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={member.imageUrl} alt="" className="h-full w-full object-cover" />
                  ) : null}
                </div>
                {member.name ? <h3 className="text-[1.05rem] font-semibold leading-[1.2] tracking-[-0.01em] text-[var(--ink)]">{member.name}</h3> : null}
                {member.role ? <span className="mt-0.5 block text-sm leading-normal text-[var(--gray)]">{member.role}</span> : null}
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CarouselButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="grid h-[46px] w-[46px] place-items-center rounded-full text-[var(--ink)] shadow-[inset_0_0_0_1px_var(--line)] transition-[background,box-shadow,color] duration-[250ms] hover:bg-[var(--ink)] hover:text-white hover:shadow-none">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden><g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{children}</g></svg>
    </button>
  );
}