import Link from "next/link";
import { HeroArt } from "@/components/HeroArt";
import { ButtonLink } from "@/components/ui/Bits";
import { Countdown } from "@/components/Countdown";
import { currentRound, nextRound } from "@/lib/round";
import { season, site } from "@/lib/site";

const cards = [
  {
    href: "/play",
    eyebrow: "Play now",
    title: "Enter the round.",
    body: "One shared daily round. Lock three picks before " + season.picksClose + ", then follow the next 24 hours.",
    cta: "Play rounds",
  },
  {
    href: "/season",
    eyebrow: "Seven-day seasons",
    title: "Climb the standings.",
    body:
      "Daily top 10. Weekly top 100. Your best five days count. Holder entry asks for " +
      season.holdRequirement.toLocaleString("en-US") +
      " " +
      site.token +
      " in your wallet.",
    cta: "Explore the season",
  },
  {
    href: "/war-chest",
    eyebrow: "On-chain / prize reserve",
    title: "Inside the War Chest.",
    body: "Follow the receiving wallet and read the seven-day prize plan before you commit a single pick.",
    cta: "View the War Chest",
  },
];

export default function HomePage() {
  const running = currentRound();
  const upcoming = nextRound();

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="grid-texture absolute inset-0 opacity-60" />
        <div
          aria-hidden
          className="absolute -top-40 -right-24 h-[520px] w-[520px] rounded-full bg-accent/10 blur-3xl"
        />

        <div className="shell relative grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 border border-line px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
              <span className="animate-pulse-dot h-1.5 w-1.5 bg-accent" />
              The hunt starts here
            </span>

            <p className="mt-8 font-mono text-[11px] tracking-[0.24em] text-faint uppercase">{site.domain}</p>

            <h1 className="display mt-3 text-[clamp(46px,9vw,104px)]">
              Strike.
              <br />
              <span className="text-accent">Climb.</span>
              <br />
              Compete.
            </h1>

            <p className="mt-6 max-w-md text-[15px] text-muted">
              One daily round. Three picks.
              <br />
              Connect your wallet and make the call.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/play">Play rounds</ButtonLink>
              <ButtonLink href="/season" variant="ghost">
                Explore the season
              </ButtonLink>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-5 font-mono text-[11px] tracking-[0.14em] text-faint uppercase">
              <span className="text-accent-dim">◆</span>
              <span>{season.label}</span>
              <span aria-hidden>/</span>
              <span>
                Hold {season.holdRequirement.toLocaleString("en-US")} {site.ticker}
              </span>
              <span aria-hidden>/</span>
              <span>One daily round</span>
              <span aria-hidden>/</span>
              <span>
                Picks close in{" "}
                <Countdown target={upcoming.picksClose.toISOString()} className="text-accent" />
              </span>
            </div>
          </div>

          <div className="relative">
            <p className="absolute top-2 right-2 z-10 font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
              {site.domain}
            </p>
            <HeroArt className="mx-auto h-auto w-full max-w-[560px]" />
          </div>
        </div>
      </section>

      <section aria-label={"Explore " + site.name} className="shell py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="panel group flex flex-col p-7 transition-colors hover:border-accent/50"
            >
              <p className="eyebrow">{card.eyebrow}</p>
              <h2 className="display mt-4 text-[26px]">{card.title}</h2>
              <p className="mt-3 flex-1 text-sm text-muted">{card.body}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-accent uppercase">
                {card.cta}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-6 font-mono text-[11px] text-faint">
          Round {String(running.index ?? "—")} of {season.days} is running now · settles{" "}
          {running.end.toUTCString().slice(5, 22)} UTC
        </p>
      </section>
    </>
  );
}
