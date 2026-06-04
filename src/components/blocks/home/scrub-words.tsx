import { css } from "../../../../styled-system/css";
import { pageContainer, stackY, cinematicStage } from "../../../../styled-system/recipes";
import type { AuroraTone } from "../types";

export type HomeScrubWordsBlockProps = {
  label?: string;
  words?: string[];
  auroraTone?: AuroraTone;
};

/**
 * Server-rendered baseline for the scroll-scrub word sequence.
 *
 * Renders all words stacked on a cinematic stage; the sticky scroll
 * cycling behaviour (`noetic_CLAUDE_DESIGN/index.html`) is layered
 * in by a separate client island.
 */
export default function HomeScrubWordsBlock({
  label,
  words = [],
  auroraTone = "default",
}: HomeScrubWordsBlockProps) {
  const tone = auroraTone === "cool" || auroraTone === "warm" ? auroraTone : "spectral";
  return (
    <section
      className={cinematicStage({ tone })}
      style={{ minHeight: "100svh" }}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100svh",
          paddingBlock: "3xl",
          paddingInline: { base: "sm", md: "md", lg: "lg" },
        })}
      >
        <div className={pageContainer({ size: "lg" })}>
          <div className={stackY({ gap: "lg", align: "center" })}>
            {label ? (
              <span
                className={css({
                  textStyle: "label.sm",
                  color: "fg.onCinematicMuted",
                })}
              >
                {label}
              </span>
            ) : null}
            <ul
              className={css({
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2xs",
              })}
            >
              {words.map((word) => (
                <li
                  key={word}
                  className={css({
                    textStyle: "display.2xl",
                    color: "fg.onCinematic",
                    textAlign: "center",
                    lineHeight: "tight",
                  })}
                >
                  {word}
                </li>
              ))}
            </ul>
            <div
              className={css({
                display: "flex",
                gap: "2xs",
                marginBlockStart: "lg",
              })}
            >
              {words.map((word, i) => (
                <span
                  key={word}
                  aria-hidden
                  className={css({
                    width: "7",
                    height: "1",
                    borderRadius: "pill",
                    backgroundColor:
                      i === 0 ? "#ffffff" : "border.onCinematic",
                  })}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
