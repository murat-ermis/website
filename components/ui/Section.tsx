import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  lead,
  children,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 ${className}`}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
          {title}
        </h2>
      ) : null}
      {lead ? (
        <p className="mt-3 max-w-2xl text-pretty text-slate-400">{lead}</p>
      ) : null}
      {children ? <div className="mt-9">{children}</div> : null}
    </section>
  );
}
