import type { Metadata } from "next";
import Link from "next/link";
import { maxDailyPoints, maxWeeklyPoints, season, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Documentation",
  description: "How to play, how picks are saved, how results settle and how season prizes are funded.",
};

type Section = { id: string; index: string; kicker: string; title: string; body: React.ReactNode };

const sections: Section[] = [
  {
    id: "overview",
    index: "01",
    kicker: "Introduction",
    title: "How " + site.name + " works",
    body: (
      <>
        <p>
          Make three picks in one shared 24-hour round. The Chase rewards naming the strongest token, Podium Pick
          rewards correct finishing positions, and Precision Strike rewards closeness to the closing change — up
          to {season.pointsPerGame} points each. Everyone plays the same published field and the same price
          window.
        </p>
        <p>
          Open play: sign in with your wallet and submit all three picks. Picks and results are saved, but
          open-play scores never count toward season standings or prizes.
        </p>
        <p>
          {season.label}: a {season.days}-day season worth up to {maxDailyPoints} points a day. Your best{" "}
          {season.countedDays} daily scores set your weekly rank. Eligible entry needs at least{" "}
          {season.holdRequirement.toLocaleString("en-US")} {site.ticker} in your signed-in wallet, an open season
          and a successful check. There is no pass to buy, no burn and no lock, and holding alone guarantees
          nothing.
        </p>
      </>
    ),
  },
  {
    id: "sign-in",
    index: "02",
    kicker: "Wallet sign-in",
    title: "Your wallet stays yours",
    body: (
      <>
        <p>
          Connect your wallet from the header. {site.name} never requests a deposit, a token approval or a
          transaction to sign in or to enter — your tokens stay where they are.
        </p>
        <p>
          Each wallet gets a generated call sign and crest until you customise them. Saved picks, receipts and
          wallet-linked standings all hang off that account.
        </p>
      </>
    ),
  },
  {
    id: "formats",
    index: "03",
    kicker: "Formats",
    title: "Choose your edge",
    body: (
      <>
        <p>
          <strong className="text-fg">The Chase / 24 hours.</strong> Pick the highest return from a rotating field
          of four. The eligible roster is the top ten verified chain-native contracts ranked by 24-hour volume.
          Each round freezes its field and pricing pools before entries open, so a later ranking change only
          affects future rounds.
        </p>
        <p>
          <strong className="text-fg">Podium Pick / 24 hours.</strong> Name first and second place, in order. Each
          correct position scores {season.pointsPerGame / 2}. Tied tokens may occupy any position inside their
          tied group, but the two picks must differ.
        </p>
        <p>
          <strong className="text-fg">Precision Strike / 24 hours.</strong> Predict the closing percentage change
          in 0.01% steps. An exact match scores {season.pointsPerGame}; points fall linearly with absolute error
          and round down. The tolerance is published before entry and never moves during the round. Predict the
          coming round&apos;s return — not the token&apos;s trailing 24-hour figure.
        </p>
        <p>
          Liquidity, trading-activity and pool-age checks apply to the roster. A stale or incomplete ranking
          pauses new entries without touching saved picks.
        </p>
      </>
    ),
  },
  {
    id: "entry",
    index: "04",
    kicker: "Entries",
    title: "Pick once. Make it count.",
    body: (
      <>
        <p>
          A season runs {season.days} days, 18:00 UTC to 18:00 UTC. You may submit one three-game entry per daily
          round. All three picks save together after a fresh holding check, and the round&apos;s UTC date decides
          which daily allowance it uses even when you submit the evening before.
        </p>
        <p>
          Entry closes one minute before the price window opens, at {season.picksClose}. While today&apos;s round
          runs you submit tomorrow&apos;s picks. A confirmed entry cannot be changed, and selling later does not
          erase it — though your next entry must still pass the check.
        </p>
        <p>
          Times display in your own timezone; the server clock enforces every deadline.
        </p>
      </>
    ),
  },
  {
    id: "results",
    index: "05",
    kicker: "Results",
    title: "Settlement and standings",
    body: (
      <>
        <p>
          Settlement waits for published prices and compares recorded boundary observations. A chart is
          provisional, never a final result. Missing evidence delays settlement, and a round left unsettled after
          24 hours voids and scores zero.
        </p>
        <p>
          Daily scoring keys off the round&apos;s UTC start date and freezes once every accepted result settles or
          voids. Weekly scores take each player&apos;s best {season.countedDays} daily totals — up to{" "}
          {maxWeeklyPoints} points — and missed days score zero.
        </p>
        <p>
          {site.name} operates the database and settlement service. Results are not blockchain transactions, a
          trustless protocol or audited oracle attestations. Published receipts show each round&apos;s rules and
          the evidence recorded against them.
        </p>
      </>
    ),
  },
  {
    id: "token",
    index: "06",
    kicker: "Token & entry",
    title: "What holding does",
    body: (
      <>
        <p>
          {season.label} entry requires {season.holdRequirement.toLocaleString("en-US")} {site.ticker} in the
          signed-in wallet at submission. Nothing is burned, locked or transferred, and later seasons may set
          different requirements.
        </p>
        <p>
          Holding unlocks eligible rounds. It is not an investment, it pays no return on its own, and it never
          guarantees a prize.
        </p>
      </>
    ),
  },
  {
    id: "prizes",
    index: "07",
    kicker: "Prizes",
    title: "Funding comes before payouts",
    body: (
      <>
        <p>
          The published split — {Math.round(season.split.daily * 100)}% daily, {Math.round(season.split.weekly * 100)}%
          weekly — divides an approved season budget, not trading volume and not the reserve balance.
        </p>
        <p>
          Cash prizes are not currently active. Prize availability depends on an approved, funded budget and a
          verified payout process; allocation and payment are separate steps, and a reward counts as paid only
          when its transfer is confirmed.
        </p>
      </>
    ),
  },
  {
    id: "status",
    index: "08",
    kicker: "Build status",
    title: "What this build does and does not do",
    body: (
      <>
        <p>
          This site is the product front end. It runs the full round schedule, the pick flow, wallet sign-in and
          the published rules, and it saves your picks in your own browser.
        </p>
        <p>
          It has no settlement service, no price feed and no results database behind it. Standings shown anywhere
          on the site are locally generated samples, entries stay unsettled, and no reserve address is configured
          — so no balance is read and no prize is payable.
        </p>
      </>
    ),
  },
];

export default function DocsPage() {
  return (
    <div className="shell py-12">
      <nav aria-label="Breadcrumb" className="font-mono text-[11px] tracking-[0.16em] text-faint uppercase">
        <Link href="/" className="hover:text-fg">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-accent">Docs</span>
      </nav>

      <h1 className="display mt-6 text-[clamp(38px,7vw,76px)]">Documentation</h1>
      <p className="mt-4 max-w-2xl text-[15px] text-muted">
        How to play, how a pick is saved, how results are calculated, and how season prizes would be funded.
      </p>

      <dl className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Season", season.days + " days"],
          ["Sections", String(sections.length)],
          [season.label + " entry", "Hold " + season.holdRequirement.toLocaleString("en-US") + " " + site.ticker],
          ["Prizes", "None active"],
        ].map(([label, value]) => (
          <div key={label} className="bg-bg p-5">
            <dt className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">{label}</dt>
            <dd className="mt-1 font-display text-lg">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-14 grid gap-12 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Sections" className="lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow">On this page</p>
          <ul className="mt-4 grid gap-2 border-l border-line pl-4">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={"#" + s.id} className="font-mono text-[11px] text-muted uppercase hover:text-accent">
                  {s.index} · {s.kicker}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid gap-14">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-28">
              <p className="eyebrow">
                {s.index} / {s.kicker}
              </p>
              <h2 className="display mt-3 text-[clamp(24px,3.6vw,38px)]">{s.title}</h2>
              <div className="mt-4 grid gap-4 text-[15px] leading-relaxed text-muted">{s.body}</div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
