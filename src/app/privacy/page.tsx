import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What this site stores and what it does not.",
};

const points = [
  {
    title: "What is collected",
    body: "A wallet address when you choose to connect one, and the picks you submit. Connecting is always an explicit action you take from the header.",
  },
  {
    title: "Where it is kept",
    body: "In this build, saved picks live in your own browser's local storage. Clearing site data removes them, and they are not sent anywhere.",
  },
  {
    title: "What is never requested",
    body: "No deposit, token approval or transaction is ever requested to sign in or to enter a round. No private key, seed phrase or payment detail is ever asked for.",
  },
  {
    title: "Identity",
    body: "A call sign and crest are generated from your wallet address so standings have a readable name. They reveal nothing beyond the address itself.",
  },
  {
    title: "Analytics and third parties",
    body: "No analytics, advertising or third-party tracking is wired into this build. Web fonts are served with the site itself.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="shell py-12">
      <p className="eyebrow">Legal</p>
      <h1 className="display mt-3 text-[clamp(38px,7vw,72px)]">Privacy</h1>
      <p className="mt-5 max-w-2xl text-[15px] text-muted">
        A plain summary of what {site.domain} handles. This is a placeholder policy for a pre-launch build and is
        not legal advice — it needs review before the product accepts real entries.
      </p>

      <div className="mt-12 grid gap-px bg-line">
        {points.map((point) => (
          <section key={point.title} className="bg-bg p-6">
            <h2 className="display text-xl">{point.title}</h2>
            <p className="mt-2 max-w-3xl text-sm text-muted">{point.body}</p>
          </section>
        ))}
      </div>

      <p className="mt-10 font-mono text-[11px] text-faint">
        Questions go to {site.social.handle} until a contact address is published.
      </p>
    </div>
  );
}
