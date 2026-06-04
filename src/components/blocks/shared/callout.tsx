import { pageContainer, pageSection } from "@/lib/styles";
import { ProseRenderer } from "../../prose-renderer";

export type CalloutBlockProps = {
  intent?: "info" | "success" | "warning" | "danger";
  title?: string;
  body?: Parameters<typeof ProseRenderer>[0]["value"];
};

const intentTone: Record<
  NonNullable<CalloutBlockProps["intent"]>,
  string
> = {
  info: "bg-[#eef4ff] text-[var(--ink)] border-[var(--line)]",
  success: "bg-[var(--void-soft)] text-[var(--ink)] border-[var(--line)]",
  warning: "bg-[var(--void-soft)] text-[var(--ink)] border-[var(--line)]",
  danger: "bg-[var(--void-soft)] text-[var(--ink)] border-[var(--line)]",
};

export default function CalloutBlock({ intent = "info", title, body }: CalloutBlockProps) {
  const t = intentTone[intent];
  return (
    <section className={pageSection({ space: "sm" })}>
      <div className={pageContainer({ size: "md" })}>
        <aside
          className={`rounded-lg border-l-[3px] p-6 ${t}`}
        >
          {title ? (
            <p className="mb-2 text-sm font-medium leading-normal tracking-[0.02em]">
              {title}
            </p>
          ) : null}
          <ProseRenderer value={body} />
        </aside>
      </div>
    </section>
  );
}
