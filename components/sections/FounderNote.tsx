import type { CSSProperties, ReactNode } from "react";

export function FounderNote({
  quote,
  attribution,
  section,
  style,
}: {
  quote: string;
  attribution: ReactNode;
  section: string;
  style?: CSSProperties;
}) {
  return (
    <section className="founder-note rv" data-sec={section} style={style}>
      <div className="fn-inner">
        <p className="fn-q">&ldquo;{quote}&rdquo;</p>
        <p className="fn-attr">{attribution}</p>
      </div>
    </section>
  );
}
