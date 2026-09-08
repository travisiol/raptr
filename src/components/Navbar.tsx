"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ConnectWallet } from "./ConnectWallet";
import { Wordmark } from "./Wordmark";
import { nav, season, site } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur-md">
        <div className="shell flex h-[68px] items-center justify-between gap-6">
          <Link href="/" aria-label={site.domain + " home"} className="shrink-0">
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    "font-mono text-[11px] tracking-[0.16em] uppercase transition-colors " +
                    (active ? "text-accent" : "text-muted hover:text-fg")
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <ConnectWallet />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center border border-line lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={
                    "absolute left-0 h-px w-4 bg-fg transition-transform " +
                    (open ? "top-1.5 rotate-45" : "top-0")
                  }
                />
                <span className={"absolute top-1.5 left-0 h-px w-4 bg-fg transition-opacity " + (open ? "opacity-0" : "")} />
                <span
                  className={
                    "absolute left-0 h-px w-4 bg-fg transition-transform " +
                    (open ? "top-1.5 -rotate-45" : "top-3")
                  }
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <nav
          aria-label="Mobile"
          className="fixed inset-x-0 top-[68px] bottom-0 z-40 overflow-y-auto border-t border-line bg-bg lg:hidden"
        >
          <div className="shell py-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between border-b border-line py-4 font-display text-2xl uppercase"
              >
                {item.label}
                <span aria-hidden className="text-accent">→</span>
              </Link>
            ))}
            <a
              href={site.social.url}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex font-mono text-[11px] tracking-[0.16em] text-muted uppercase"
            >
              Follow {site.social.handle}
            </a>
            <p className="mt-4 text-xs text-faint">
              {season.label}: hold {season.holdRequirement.toLocaleString("en-US")} {site.ticker}. No burn or lock.
              Check the season page for entry availability.
            </p>
          </div>
        </nav>
      ) : null}
    </>
  );
}
