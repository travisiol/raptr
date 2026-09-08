import type { Metadata } from "next";
import Link from "next/link";
import { LeaderboardTabs } from "@/components/LeaderboardTabs";
import { currentRound, seasonRounds } from "@/lib/round";
import { dailyStandings, weeklyStandings } from "@/lib/standings";
import { site } from "@/lib/site";
import type { StandingRow } from "@/lib/standings";

export const metadata: Metadata = {
  title: "Leaderboard",
  description: "Daily top 10 and weekly top 100 standings for the current season.",
};

export default function LeaderboardPage() {
  const running = currentRound();
  const past = seasonRounds().filter((r) => r.start.getTime() <= running.start.getTime());
  const earlierKeys = past.map((r) => r.key).reverse();
  const earlier: Record<string, StandingRow[]> = {};
  for (const key of earlierKeys) earlier[key] = dailyStandings(key);

  return (
    <div className="shell py-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">{site.name} // standings</p>
          <h1 className="display mt-3 text-[clamp(38px,7vw,72px)]">Hunter leaderboard</h1>
        </div>
        <Link
          href="/play"
          className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase hover:underline"
        >
          Play rounds →
        </Link>
      </div>

      <LeaderboardTabs
        daily={dailyStandings(running.key)}
        earlier={earlier}
        earlierKeys={earlierKeys}
        weekly={weeklyStandings(running.key, 100)}
      />

      <p className="mt-8 font-mono text-[11px] text-faint">
        Scoring &amp; prize rules:{" "}
        <Link href="/docs#results" className="text-accent-dim underline underline-offset-2">
          how points and ties are settled
        </Link>
      </p>
    </div>
  );
}
