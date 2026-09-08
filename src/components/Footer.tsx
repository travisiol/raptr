import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { season, site } from "@/lib/site";

const explore = [
  { href: "/rewards", label: "Rewards guide" },
  { href: "/play", label: "Play rounds" },
  { href: "/war-chest", label: "War Chest" },
  { href: "/season", label: season.label },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/play#results", label: "Your results" },
  { href: "/play/practice", label: "Open-play rounds" },
  { href: "/docs", label: "Product docs" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="shell grid gap-12 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label={site.name + " home"}>
            <Wordmark />
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted">
            Market rounds. Seven-day seasons.
            <br />
            A hunter identity of your own.
          </p>
          <p className="mt-4 max-w-xs text-xs text-faint">
            {season.label} requires {season.holdRequirement.toLocaleString("en-US")} {site.ticker} in your wallet.
            No burn or lock. Later seasons may set different requirements.
          </p>
        </div>

        <nav aria-label="Footer game navigation">
          <h2 className="eyebrow">Explore {site.name}</h2>
          <ul className="mt-4 grid gap-2.5">
            {explore.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-sm text-muted transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow">Official updates</h2>
          <a
            href={site.social.url}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block font-display text-xl uppercase transition-colors hover:text-accent"
          >
            {site.social.handle}
          </a>
          <p className="mt-3 text-xs text-faint">
            Season dates, entry requirements and game updates.
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-wrap items-center justify-between gap-4 py-6">
          <p className="font-mono text-[11px] tracking-[0.16em] text-faint uppercase">
            {site.domain} / Make your mark.
          </p>
          <p className="font-mono text-[11px] text-faint">
            No cash prizes or token transactions are currently enabled.
          </p>
          <nav aria-label="Legal" className="flex gap-5">
            <Link href="/privacy" className="font-mono text-[11px] tracking-[0.16em] text-faint uppercase hover:text-fg">
              Privacy
            </Link>
            <Link href="/terms" className="font-mono text-[11px] tracking-[0.16em] text-faint uppercase hover:text-fg">
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
