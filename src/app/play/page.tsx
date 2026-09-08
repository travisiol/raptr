import type { Metadata } from "next";
import Link from "next/link";
import { RoundBoard } from "@/components/RoundBoard";
import { ButtonLink } from "@/components/ui/Bits";
import { nextRound, currentRound } from "@/lib/round";
import { lineupFor } from "@/lib/standings";
import { season, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Play",
  description: "One daily round. Three picks. Lock them in before the window opens.",
};

export default function PlayPage() {
  const upcoming = nextRound();
  const running = currentRound();
  const { field, featured, tolerance } = lineupFor(upcoming.key);

  return (
    <div className="shell py-12">
      <div className="panel flex flex-wrap items-center justify-between gap-4 p-4">
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase">
          <span className="text-accent">{season.label}</span>
          <span className="mx-2 text-faint">·</span>
          <span className="text-muted">Entry open · holdings checked on submit</span>
        </p>
        <Link href="/docs#entry" className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase hover:underline">
          Entry details
        </Link>
      </div>

      <p className="mt-4 font-mono text-[11px] text-faint">
        Season entry and prize funding are separate. Cash prizes are not active. See the{" "}
        <Link href="/rewards" className="text-accent-dim underline underline-offset-2">
          approved reward pool
        </Link>
        .
      </p>

      <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="display text-[clamp(38px,7vw,72px)]">Play rounds.</h1>
          <p className="mt-3 text-[15px] text-muted">One daily round. Three picks.</p>
        </div>
        <ButtonLink href="/rewards" variant="ghost">
          Daily &amp; weekly rewards
        </ButtonLink>
      </div>

      <div className="mt-8">
        <RoundBoard
          mode="season"
          roundKey={upcoming.key}
          field={field}
          featured={featured}
          tolerance={tolerance}
          picksCloseIso={upcoming.picksClose.toISOString()}
          startIso={upcoming.start.toISOString()}
          endIso={upcoming.end.toISOString()}
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="panel p-5">
          <p className="eyebrow">Round in progress</p>
          <p className="mt-2 text-sm text-muted">
            Round {running.index ?? "—"} of {season.days} is running now and settles when its window closes. You
            enter tomorrow&apos;s round while today&apos;s runs.
          </p>
        </div>
        <div className="panel p-5">
          <p className="eyebrow">Open play</p>
          <p className="mt-2 text-sm text-muted">
            Prefer to try the format first? Open-play rounds need no {site.ticker} and never touch season
            standings.
          </p>
          <Link
            href="/play/practice"
            className="mt-3 inline-flex font-mono text-[11px] tracking-[0.16em] text-accent uppercase hover:underline"
          >
            Open-play rounds →
          </Link>
        </div>
      </div>

      <p className="mt-6 font-mono text-[11px] text-faint">
        Rules &amp; scoring:{" "}
        <Link href="/docs#formats" className="text-accent-dim underline underline-offset-2">
          read the format rules
        </Link>
      </p>
    </div>
  );
}
