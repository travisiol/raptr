import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { ButtonLink, SectionHead } from "@/components/ui/Bits";
import { games } from "@/lib/scoring";
import { maxDailyPoints, maxWeeklyPoints, season, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rewards",
  description: "How points are scored, how the two pools divide an approved budget, and who qualifies.",
};

const qualifySteps = [
  {
    title: "Meet the season requirement",
    body:
      season.label +
      " asks for " +
      season.holdRequirement.toLocaleString("en-US") +
      " " +
      site.ticker +
      " in your connected wallet. Nothing is burned or locked. Later seasons may set a different bar.",
  },
  {
    title: "Enter the competitive round",
    body:
      "Submit your picks before the deadline while a season is open. Open play needs no " +
      site.ticker +
      " and never enters the daily or weekly standings.",
  },
  {
    title: "Finish in a qualifying position",
    body:
      "Rewards depend on your score, the full reviewed standings and an approved funded budget. Points are not cash and carry no fixed exchange rate.",
  },
];

const faq = [
  {
    q: "When would I get paid?",
    a: (
      <p>
        For a funded season, daily rewards are scheduled the day after a round closes, once results are verified
        and reviewed. Nothing is ever paid while a round is still running, and a delay in verification delays
        payment. No payouts are enabled today.
      </p>
    ),
  },
  {
    q: "Is the War Chest the prize pool?",
    a: (
      <p>
        No. The reserve wallet holds ETH; a prize pool is a separate approved budget. Fee attribution and reserved
        commitments are reconciled before any season budget exists.{" "}
        <Link href="/war-chest" className="text-accent underline underline-offset-2">
          See the reserve
        </Link>
        .
      </p>
    ),
  },
  {
    q: "Do I have to play every day?",
    a: (
      <p>
        No. Your best {season.countedDays} daily scores count toward the weekly rank, so two weaker days can drop
        out. Missed days simply score zero.
      </p>
    ),
  },
  {
    q: "What if prices or results are delayed?",
    a: (
      <p>
        Settlement waits for published prices. If the evidence never arrives, the round voids and scores zero for
        everyone rather than settling on a provisional chart.
      </p>
    ),
  },
];

export default function RewardsPage() {
  return (
    <div className="shell py-12">
      <p className="eyebrow">The rewards guide</p>
      <h1 className="display mt-3 text-[clamp(38px,7vw,76px)]">
        Good picks.
        <br />
        Real competition.
      </h1>
      <p className="mt-5 max-w-xl text-[15px] text-muted">
        Earn points. Climb the standings. Compete for a share of an approved prize pool.
      </p>
      <div className="mt-7">
        <ButtonLink href="/play">Make your picks</ButtonLink>
      </div>

      <section className="panel mt-14 p-6">
        <p className="eyebrow">Current prize status</p>
        <h2 className="display mt-3 text-3xl">Know the pool.</h2>
        <p className="mt-3 text-sm text-muted">
          No approved season budget exists, so no cash prize is payable right now. The split below describes how a
          budget would divide once one is approved and funded.
        </p>
      </section>

      <section className="mt-14">
        <SectionHead
          eyebrow="Daily payout schedule"
          title={
            <>
              Play today.
              <br />
              Next-day rewards.
            </>
          }
          lead="For a funded season, a round's daily rewards are scheduled the following day — after the round closes at 18:00 UTC and its results are verified and reviewed."
        />
        <div className="panel mt-6 p-6">
          <p className="text-sm text-muted">
            A Monday round runs from Monday 18:00 UTC to Tuesday 18:00 UTC. Its daily rewards would be scheduled
            on Tuesday, after closing, verification and review.
          </p>
          <p className="mt-4 font-mono text-[11px] leading-relaxed text-faint">
            If verification or review is delayed, payment is delayed with it. There is no guaranteed transfer
            time, and cash prizes stay inactive until funding and payouts are approved and enabled.
          </p>
        </div>
      </section>

      <section className="mt-20">
        <p className="eyebrow">01 / Score</p>
        <h2 className="display mt-3 text-[clamp(28px,4.5vw,48px)]">
          Three picks. {maxDailyPoints} points.
        </h2>
        <p className="mt-3 text-sm text-muted">
          Up to {season.pointsPerGame} points per game, in one shared round each day.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {games.map((game) => (
            <article key={game.id} className="panel flex flex-col p-6">
              <p className="eyebrow">{game.eyebrow}</p>
              <h3 className="display mt-3 text-2xl">{game.name}</h3>
              <p className="mt-3 flex-1 text-sm text-muted">{game.blurb}</p>
              <p className="display mt-6 text-4xl text-accent">{game.points}</p>
              <p className="font-mono text-[11px] text-faint">{game.pointsNote}</p>
              <p className="mt-4 border-t border-line pt-4 text-xs text-muted">{game.rule}</p>
            </article>
          ))}
        </div>

        <p className="mt-6 font-mono text-[11px] leading-relaxed text-faint">
          18:00 UTC → 18:00 UTC next day. Lock all three picks before {season.picksClose}. A confirmed entry
          cannot be changed, and results need verified opening and closing prices — not a trailing 24-hour chart.
        </p>
      </section>

      <section className="mt-20">
        <p className="eyebrow">02 / Climb</p>
        <h2 className="display mt-3 text-[clamp(28px,4.5vw,48px)]">
          Daily chances.
          <br />
          Weekly rewards.
        </h2>
        <p className="mt-3 text-sm text-muted">Two standings. One approved season budget.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="panel p-7">
            <div className="flex items-baseline justify-between">
              <p className="eyebrow">Daily top 10</p>
              <p className="display text-5xl text-accent">{Math.round(season.split.daily * 100)}%</p>
            </div>
            <p className="mt-4 text-sm text-muted">
              Of the season budget, split evenly across {season.days} daily pools.
            </p>
            <ul className="mt-5 grid gap-2 text-sm text-muted">
              <li>· Your three picks make a daily score of up to {maxDailyPoints} points.</li>
              <li>· Allocation follows the next day, for the completed round.</li>
              <li>· Each daily pool holds ten equal shares.</li>
              <li>· A new day is a new chance to place.</li>
            </ul>
            <p className="mt-5 border-t border-line pt-4 font-mono text-[11px] text-faint">
              Daily pool = season budget × {Math.round(season.split.daily * 100)}% ÷ {season.days}
            </p>
            <Link
              href="/season"
              className="mt-4 inline-flex font-mono text-[11px] tracking-[0.16em] text-accent uppercase hover:underline"
            >
              View daily standings →
            </Link>
          </article>

          <article className="panel p-7">
            <div className="flex items-baseline justify-between">
              <p className="eyebrow">Weekly top 100</p>
              <p className="display text-5xl text-accent">{Math.round(season.split.weekly * 100)}%</p>
            </div>
            <p className="mt-4 text-sm text-muted">
              Of the season budget, reserved for the final weekly standings.
            </p>
            <ul className="mt-5 grid gap-2 text-sm text-muted">
              <li>· Your best {season.countedDays} daily scores count across the season.</li>
              <li>· Up to {maxWeeklyPoints} points; two weaker days can drop out.</li>
              <li>· You can qualify for daily and weekly rewards at once.</li>
            </ul>
            <p className="mt-5 border-t border-line pt-4 font-mono text-[11px] text-faint">
              Weekly pool = season budget × {Math.round(season.split.weekly * 100)}%
            </p>
            <Link
              href="/leaderboard"
              className="mt-4 inline-flex font-mono text-[11px] tracking-[0.16em] text-accent uppercase hover:underline"
            >
              View the leaderboard →
            </Link>
          </article>
        </div>

        <Link
          href="/season"
          className="mt-6 inline-flex font-mono text-[11px] tracking-[0.16em] text-accent-dim uppercase hover:underline"
        >
          Weekly prize breakdown &amp; tie rules →
        </Link>
      </section>

      <section className="mt-20">
        <p className="eyebrow">03 / Qualify</p>
        <h2 className="display mt-3 text-[clamp(28px,4.5vw,48px)]">
          Hold. Play.
          <br />
          Earn your place.
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Holding {site.ticker} unlocks eligible season rounds. It does not guarantee a prize or pay a return just
          for holding.
        </p>

        <ol className="mt-8 grid gap-px bg-line md:grid-cols-3">
          {qualifySteps.map((step, i) => (
            <li key={step.title} className="bg-bg p-6">
              <p className="display text-3xl text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="display mt-3 text-lg">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20">
        <p className="eyebrow">Before you play</p>
        <h2 className="display mt-3 text-[clamp(28px,4.5vw,48px)]">The important part.</h2>
        <div className="mt-8">
          <Accordion items={faq} />
        </div>
      </section>

      <section className="panel mt-16 flex flex-wrap items-center justify-between gap-6 p-8">
        <div>
          <h2 className="display text-3xl">Your next move: three picks.</h2>
          <p className="mt-2 text-sm text-muted">Check the current round and season status before entering.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/play">Go play</ButtonLink>
          <ButtonLink href="/season" variant="ghost">
            Season overview
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
