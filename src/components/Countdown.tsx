"use client";

import { useEffect, useState } from "react";
import { formatCountdown, msUntil } from "@/lib/round";

/**
 * Ticking countdown. Renders a stable placeholder on the server and starts
 * counting after mount, so the markup never mismatches during hydration.
 */
export function Countdown({
  target,
  className = "",
  placeholder = "--:--:--",
}: {
  target: string;
  className?: string;
  placeholder?: string;
}) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const deadline = new Date(target);
    const tick = () => setLabel(formatCountdown(msUntil(deadline)));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return (
    <span className={"font-mono tabular-nums " + className} suppressHydrationWarning>
      {label ?? placeholder}
    </span>
  );
}

/** Renders a date in the visitor's own timezone once mounted. */
export function LocalTime({ iso, className = "" }: { iso: string; className?: string }) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const d = new Date(iso);
    setLabel(
      d.toLocaleString(undefined, {
        weekday: "short",
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
    );
  }, [iso]);

  return (
    <span className={className} suppressHydrationWarning>
      {label ?? "—"}
    </span>
  );
}
