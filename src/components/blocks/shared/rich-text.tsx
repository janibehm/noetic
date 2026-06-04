import { pageContainer, pageSection } from "../../../../styled-system/recipes";
import { ProseRenderer } from "../../prose-renderer";
import type { Tone } from "../types";

export type RichTextBlockProps = {
  tone?: Tone;
  content: Parameters<typeof ProseRenderer>[0]["value"];
};

export default function RichTextBlock({ tone = "canvas", content }: RichTextBlockProps) {
  return (
    <section className={pageSection({ space: "md", tone })}>
      <div className={pageContainer({ size: "lg" })}>
        <ProseRenderer value={content} />
      </div>
    </section>
  );
}
