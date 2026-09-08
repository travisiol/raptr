import Link from "next/link";
import { season, site } from "@/lib/site";

/** The lime entry strip that sits under the header on every page. */
export function EntryBanner() {
  return (
    <aside
      aria-label={season.label + " holding requirement"}
      className="bg-accent text-bg"
    >
      <div className="shell flex flex-wrap items-center gap-x-4 gap-y-1 py-2 font-mono text-[11px] tracking-[0.08em] uppercase">
        <Link href="/season" className="font-semibold whitespace-nowrap underline-offset-2 hover:underline">
          {season.label} · Picks open
        </Link>
        <span aria-hidden className="hidden opacity-40 sm:inline">|</span>
        <span className="font-semibold whitespace-nowrap">
          Hold {season.holdRequirement.toLocaleString("en-US")} {site.ticker} to enter
        </span>
        <span className="hidden opacity-70 md:inline">
          Wallet holdings verified when you submit. No burn or lock.
        </span>
        <Link
          href="/docs#token"
          className="ml-auto hidden whitespace-nowrap underline-offset-2 hover:underline lg:inline"
        >
          Entry details
        </Link>
      </div>
    </aside>
  );
}
