import type { Metadata } from "next";
import Link from "next/link";
import { RoundBoard } from "@/components/RoundBoard";
import { nextRound } from "@/lib/round";
import { lineupFor } from "@/lib/standings";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Open-play rounds",
  description: "Play the format with no holding requirement. Scores stay out of the season standings.",
};

export default function PracticePage() {
  const upcoming = nextRound();
  const { field, featured, tolerance } = lineupFor("open:" + upcoming.key);

  return (
    <div className="shell py-12">
      <p className="panel p-4 text-sm text-muted">
        Connect your wallet, make three picks and follow your results. Open-play scores stay separate from the
        holder season and earn no prizes.
      </p>

      <div className="mt-10">
        <h1 className="display text-[clamp(38px,7vw,72px)]">Open play.</h1>
        <p className="mt-3 text-[15px] text-muted">
          Same three games, no {site.ticker} requirement.
        </p>
      </div>

      <div className="mt-8">
        <RoundBoard
          mode="open"
          roundKey={upcoming.key}
          field={field}
          featured={featured}
          tolerance={tolerance}
          picksCloseIso={upcoming.picksClose.toISOString()}
          startIso={upcoming.start.toISOString()}
          endIso={upcoming.end.toISOString()}
        />
      </div>

      <p className="mt-6 font-mono text-[11px] text-faint">
        Ready for the season?{" "}
        <Link href="/play" className="text-accent-dim underline underline-offset-2">
          Go to the competitive round
        </Link>
      </p>
    </div>
  );
}
