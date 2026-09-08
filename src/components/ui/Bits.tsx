import Link from "next/link";
import type { ReactNode } from "react";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={"eyebrow " + className}>{children}</p>;
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="display mt-3 text-[clamp(30px,5vw,54px)]">{title}</h2>
      {lead ? <p className="mt-4 max-w-2xl text-[15px] text-muted">{lead}</p> : null}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 font-display text-[14px] font-bold uppercase tracking-[0.02em] transition-all";
  const styles =
    variant === "primary"
      ? "bg-accent text-bg hover:opacity-85"
      : "border border-line-strong text-fg hover:border-accent hover:text-accent";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={base + " " + styles + " " + className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={base + " " + styles + " " + className}>
      {children}
    </Link>
  );
}

export function Stat({ label, value, note }: { label: string; value: ReactNode; note?: string }) {
  return (
    <div className="panel p-5">
      <p className="eyebrow">{label}</p>
      <p className="display mt-2 text-3xl text-fg">{value}</p>
      {note ? <p className="mt-1 font-mono text-[11px] text-faint">{note}</p> : null}
    </div>
  );
}

/** Used wherever a figure has no verified source behind it yet. */
export function Unverified({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 flex items-start gap-2 border-l-2 border-accent-dim/50 pl-3 font-mono text-[11px] leading-relaxed text-faint">
      <span aria-hidden className="text-accent-dim">!</span>
      <span>{children}</span>
    </p>
  );
}

export function Rule({ className = "" }: { className?: string }) {
  return <hr className={"border-0 border-t border-line " + className} />;
}
