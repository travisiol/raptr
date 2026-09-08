import type { Metadata } from "next";
import { season, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "The rules of play, and the limits of this build.",
};

const points = [
  {
    title: "What the product is",
    body:
      "A points game over published market rounds. You make three picks per round and earn points. Points are not currency, carry no fixed exchange rate and cannot be redeemed on demand.",
  },
  {
    title: "Entry",
    body:
      season.label +
      " entry requires " +
      season.holdRequirement.toLocaleString("en-US") +
      " " +
      site.ticker +
      " held in the signed-in wallet at submission. Nothing is burned, locked or transferred, and holding alone guarantees no prize.",
  },
  {
    title: "Prizes",
    body:
      "Cash prizes are not currently active. Any future prize depends on an approved, funded budget and a verified payout process. Published percentages divide such a budget — never trading volume or a wallet balance.",
  },
  {
    title: "Results",
    body:
      "Settlement uses recorded price observations. Rounds without sufficient evidence void and score zero. A confirmed entry cannot be changed or withdrawn.",
  },
  {
    title: "Limits of this build",
    body:
      "This deployment has no settlement service, price feed or results database. Standings shown on the site are locally generated samples, entries stay unsettled, and no funds are held or moved.",
  },
  {
    title: "Your responsibility",
    body:
      "You are responsible for your own wallet security and for whether taking part is lawful where you live. Nothing on this site is financial advice.",
  },
];

export default function TermsPage() {
  return (
    <div className="shell py-12">
      <p className="eyebrow">Legal</p>
      <h1 className="display mt-3 text-[clamp(38px,7vw,72px)]">Terms</h1>
      <p className="mt-5 max-w-2xl text-[15px] text-muted">
        Placeholder terms for a pre-launch build. They describe how the game is intended to work and are not legal
        advice — they need review before the product accepts real entries.
      </p>

      <div className="mt-12 grid gap-px bg-line">
        {points.map((point) => (
          <section key={point.title} className="bg-bg p-6">
            <h2 className="display text-xl">{point.title}</h2>
            <p className="mt-2 max-w-3xl text-sm text-muted">{point.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
