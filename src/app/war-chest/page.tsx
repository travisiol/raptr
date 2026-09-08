import type { Metadata } from "next";
import Link from "next/link";
import { WarChestPanel } from "@/components/WarChestPanel";
import { Accordion } from "@/components/Accordion";
import { SectionHead } from "@/components/ui/Bits";
import { season, site, warChest } from "@/lib/site";

export const metadata: Metadata = {
  title: "War Chest",
  description: "The reserve wallet behind season rewards, and what separates a balance from a prize pool.",
};

const flow = [
  { label: "Trading fees", note: "Collected, not projected" },
  { label: "The War Chest", note: "Planned: " + Math.round(season.feeShare * 100) + "% of eligible volume" },
  { label: "Season leaderboard", note: "Compete over " + season.days + " days" },
  { label: "Daily & weekly rewards", note: "Verified results, reviewed allocations" },
];

const faq = [
  {
    q: "How does trading volume relate to the War Chest?",
    a: (
      <p>
        The plan routes {Math.round(season.feeShare * 100)}% of eligible {site.ticker} trading fees to the reserve.
        That routing still needs verification, and only ETH actually received can support a prize budget —
        projected volume never does.
      </p>
    ),
  },
  {
    q: "Does a balance mean prizes are funded?",
    a: (
      <p>
        No. Fee attribution, reserved commitments and approved payouts are reconciled separately. A season budget
        exists only once it is approved; until then the balance is just a balance.
      </p>
    ),
  },
];

export default function WarChestPage() {
  return (
    <div className="shell py-12">
      <p className="eyebrow">
        {site.name} treasury / the prize reserve
      </p>
      <h1 className="display mt-3 text-[clamp(38px,7vw,76px)]">The War Chest.</h1>

      <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionHead
            eyebrow="On-chain balance"
            title={
              <>
                The reserve.
                <br />
                Behind the rewards.
              </>
            }
            lead={
              "The War Chest holds ETH for approved season rewards. The planned allocation is " +
              Math.round(season.feeShare * 100) +
              "% of eligible " +
              site.ticker +
              " trading volume; fee routing still requires verification. Only funds actually received can support a prize budget."
            }
          />
          <p className="mt-6 font-mono text-[11px] leading-relaxed text-faint">
            Planned source: {Math.round(season.feeShare * 100)}% trading fee · network {warChest.chainName} · only
            confirmed ETH deposits can fund prizes.
          </p>
        </div>
        <WarChestPanel />
      </section>

      <section className="mt-16">
        <h2 className="display text-3xl">One budget. Two reward pools.</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          The published split applies to an approved season budget — never to the whole wallet balance.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="panel p-6">
            <div className="flex items-baseline justify-between">
              <p className="eyebrow">Daily top 10</p>
              <p className="display text-4xl text-accent">{Math.round(season.split.daily * 100)}%</p>
            </div>
            <p className="mt-3 text-sm text-muted">Split across {season.days} daily pools.</p>
          </div>
          <div className="panel p-6">
            <div className="flex items-baseline justify-between">
              <p className="eyebrow">Weekly top 100</p>
              <p className="display text-4xl text-accent">{Math.round(season.split.weekly * 100)}%</p>
            </div>
            <p className="mt-3 text-sm text-muted">Your best {season.countedDays} daily scores count.</p>
          </div>
        </div>
        <p className="mt-5 max-w-3xl font-mono text-[11px] leading-relaxed text-faint">
          A wallet balance is not the spendable prize pool. Fee attribution, reserved commitments and approved
          season payouts are reconciled separately.
        </p>
      </section>

      <section className="mt-16">
        <p className="eyebrow">Review before rewards</p>
        <h2 className="display mt-3 text-3xl">Daily results. Weekly standings.</h2>
        <div className="panel mt-6 p-6">
          <p className="text-sm text-muted">
            For a funded season, daily rewards are scheduled the following day for the previous day&apos;s round —
            after it closes at 18:00 UTC and its results are verified and reviewed. Nothing is paid while a round
            is still running.
          </p>
          <p className="mt-4 text-sm text-muted">
            Daily allocations follow round close and review; weekly allocations follow season close and review.
            Neither is a completed payment — a reward counts as paid only once a transfer is confirmed.
          </p>
          <Link
            href="/rewards"
            className="mt-5 inline-flex font-mono text-[11px] tracking-[0.16em] text-accent uppercase hover:underline"
          >
            Check funding &amp; payout status →
          </Link>
        </div>
      </section>

      <section className="mt-16">
        <ol className="grid gap-px bg-line md:grid-cols-4">
          {flow.map((step, i) => (
            <li key={step.label} className="bg-bg p-6">
              <p className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
                Step {String(i + 1).padStart(2, "0")}
              </p>
              <p className="display mt-3 text-lg">{step.label}</p>
              <p className="mt-2 font-mono text-[11px] text-muted">{step.note}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16">
        <h2 className="display text-3xl">Chest overview</h2>
        <div className="mt-6">
          <Accordion items={faq} />
        </div>
      </section>
    </div>
  );
}
