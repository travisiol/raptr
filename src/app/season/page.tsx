import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, SectionHead, Unverified } from "@/components/ui/Bits";
import { YourStanding } from "@/components/YourStanding";
import { StandingsTable } from "@/components/StandingsTable";
import { LocalTime } from "@/components/Countdown";
import { currentRound, seasonEnd, seasonStart } from "@/lib/round";
import { dailyStandings, seasonSchedule } from "@/lib/standings";
import { season, site, weeklyBrackets } from "@/lib/site";

export const metadata: Metadata = {
  title: "Season rewards",
  description: "Seven days, one daily round and two standings. See the schedule and the prize split.",
};

export default function SeasonPage() {
  const schedule = seasonSchedule();
  const running = currentRound();
  const start = seasonStart();
  const end = seasonEnd();

  return (
    <div className="shell py-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Season rewards / seven days</p>
          <h1 className="display mt-3 text-[clamp(38px,7vw,72px)]">Hunt for the top.</h1>
        </div>
        <ButtonLink href="/leaderboard" variant="ghost">
          Leaderboard
        </ButtonLink>
      </div>

      <div className="panel mt-8 flex flex-wrap items-center justify-between gap-4 p-4">
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase">
          <span className="text-accent">{season.label}</span>
          <span className="mx-2 text-faint">·</span>
          <span className="text-muted">
            Runs <LocalTime iso={start.toISOString()} /> → <LocalTime iso={end.toISOString()} />
          </span>
        </p>
        <Link href="/docs#entry" className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase hover:underline">
          Entry details
        </Link>
      </div>

      <section className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <SectionHead
            eyebrow="Season rewards"
            title={
              <>
                Seven days.
                <br />
                Climb the ranks.
              </>
            }
            lead={
              "One daily round. Three picks. Your best " +
              season.countedDays +
              " days count toward the weekly top 100. Prize availability follows the approved pool below."
            }
          />
          <div className="mt-6">
            <ButtonLink href="/play">Play rounds</ButtonLink>
          </div>
        </div>
        <YourStanding />
      </section>

      <section className="mt-16">
        <h2 className="eyebrow">Season schedule</h2>
        <ul className="mt-4 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {schedule.map((round) => {
            const isNow = round.key === running.key;
            return (
              <li key={round.key} className={"bg-bg p-4 " + (isNow ? "ring-1 ring-accent/60 ring-inset" : "")}>
                <p className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">{round.label}</p>
                <p className="mt-1 font-display text-lg">{round.key}</p>
                <p className="mt-1 font-mono text-[11px] text-muted">
                  {isNow ? <span className="text-accent">Running now</span> : "18:00 → 18:00 UTC"}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-16 grid gap-4 md:grid-cols-2">
        <div className="panel p-6">
          <p className="eyebrow">War Chest balance</p>
          <p className="display mt-2 text-4xl text-faint">— ETH</p>
          <Link
            href="/war-chest"
            className="mt-4 inline-flex font-mono text-[11px] tracking-[0.16em] text-accent uppercase hover:underline"
          >
            View reserve →
          </Link>
        </div>
        <div className="panel p-6">
          <p className="eyebrow">Approved season pool</p>
          <p className="display mt-2 text-4xl text-faint">None</p>
          <p className="mt-3 font-mono text-[11px] text-faint">
            A wallet balance is not an approved prize pool. No transfers are enabled.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="display text-3xl">How rewards work</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="panel p-6">
            <div className="flex items-baseline justify-between">
              <p className="eyebrow">Daily top 10</p>
              <p className="display text-4xl text-accent">{Math.round(season.split.daily * 100)}%</p>
            </div>
            <p className="mt-4 text-sm text-muted">
              Split across {season.days} days, ten equal shares each day. Ties share the covered places.
            </p>
            <p className="mt-3 font-mono text-[11px] text-faint">
              Next-day allocation for the previous day&apos;s completed round.
            </p>
          </div>
          <div className="panel p-6">
            <div className="flex items-baseline justify-between">
              <p className="eyebrow">Weekly top 100</p>
              <p className="display text-4xl text-accent">{Math.round(season.split.weekly * 100)}%</p>
            </div>
            <p className="mt-4 text-sm text-muted">
              Your best {season.countedDays} daily scores set your weekly rank. The brackets below divide this
              portion.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display text-3xl">Daily top 10.</h2>
          <p className="font-mono text-[11px] text-faint">Round start {running.key} (UTC)</p>
        </div>
        <div className="panel mt-5 p-5">
          <StandingsTable rows={dailyStandings(running.key)} detailLabel="Chase / podium / precision" />
          <Unverified>
            Sample standings. Nothing here is a settled result — this build has no results service behind it.
          </Unverified>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display text-3xl">Weekly top 100.</h2>
          <p className="font-mono text-[11px] tracking-[0.14em] text-accent-dim uppercase">Awaiting funded budget</p>
        </div>
        <ul className="mt-5 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
          {weeklyBrackets.map((bracket) => (
            <li key={bracket.rank} className="bg-bg p-6">
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{bracket.rank}</p>
                <p className="display text-3xl text-accent">{Math.round(bracket.share * 100)}%</p>
              </div>
              <p className="display mt-3 text-lg">{bracket.title}</p>
              <p className="mt-2 text-xs text-faint">Share of the weekly prize portion</p>
              <p className="mt-1 font-mono text-[11px] text-muted">{bracket.note}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-3xl font-mono text-[11px] leading-relaxed text-faint">
          These percentages divide the weekly {Math.round(season.split.weekly * 100)}% portion — not the whole
          season budget, trading volume or wallet balance. Amounts would be published after funding approval. No
          cash prizes are active.
        </p>
      </section>

      <div className="mt-14 flex flex-wrap gap-3">
        <ButtonLink href="/docs#results">Scoring, ties &amp; payouts</ButtonLink>
        <ButtonLink href="/play" variant="ghost">
          Your picks &amp; tools
        </ButtonLink>
      </div>

      <p className="mt-6 font-mono text-[11px] text-faint">
        {season.label} entry requires {season.holdRequirement.toLocaleString("en-US")} {site.ticker} held in your
        wallet at submission. No burn or lock.
      </p>
    </div>
  );
}
