import { css } from "../../../../styled-system/css";
import { pageContainer, pageSection } from "../../../../styled-system/recipes";
import { ProseRenderer } from "../../prose-renderer";

export type CalloutBlockProps = {
  intent?: "info" | "success" | "warning" | "danger";
  title?: string;
  body?: Parameters<typeof ProseRenderer>[0]["value"];
};

const intentTone: Record<
  NonNullable<CalloutBlockProps["intent"]>,
  { bg: string; fg: string; border: string }
> = {
  info: { bg: "bg.accentSubtle", fg: "fg.default", border: "border.muted" },
  success: { bg: "bg.subtle", fg: "fg.default", border: "border.muted" },
  warning: { bg: "bg.subtle", fg: "fg.default", border: "border.muted" },
  danger: { bg: "bg.subtle", fg: "fg.default", border: "border.muted" },
};

export default function CalloutBlock({ intent = "info", title, body }: CalloutBlockProps) {
  const t = intentTone[intent];
  return (
    <section className={pageSection({ space: "sm" })}>
      <div className={pageContainer({ size: "md" })}>
        <aside
          className={css({
            backgroundColor: t.bg,
            color: t.fg,
            borderInlineStart: "3px solid",
            borderColor: t.border,
            padding: "md",
            borderRadius: "md",
          })}
        >
          {title ? (
            <p className={css({ textStyle: "label.md", marginBlockEnd: "2xs" })}>
              {title}
            </p>
          ) : null}
          <ProseRenderer value={body} />
        </aside>
      </div>
    </section>
  );
}
