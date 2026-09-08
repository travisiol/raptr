"use client";

import { useState } from "react";

export type AccordionItem = { q: string; a: React.ReactNode };

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className="font-display text-lg uppercase">{item.q}</span>
              <span
                aria-hidden
                className={"text-accent transition-transform " + (isOpen ? "rotate-45" : "")}
              >
                +
              </span>
            </button>
            {isOpen ? <div className="pb-6 text-sm text-muted">{item.a}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
