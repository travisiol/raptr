"use client";

import { useState } from "react";
import { StandingsTable } from "./StandingsTable";
import { YourStanding } from "./YourStanding";
import { useWallet } from "./WalletProvider";
import type { StandingRow } from "@/lib/standings";

type Tab = "daily" | "earlier" | "weekly";

export function LeaderboardTabs({
  daily,
  earlier,
  weekly,
  earlierKeys,
}: {
  daily: StandingRow[];
  earlier: Record<string, StandingRow[]>;
  weekly: StandingRow[];
  earlierKeys: string[];
}) {
  const [tab, setTab] = useState<Tab>("daily");
  const [roundKey, setRoundKey] = useState(earlierKeys[0] ?? "");
  const { address } = useWallet();

  const tabs: Array<{ id: Tab; label: string }> = [
    { id: "daily", label: "Daily top 10" },
    { id: "earlier", label: "Earlier rounds" },
    { id: "weekly", label: "Weekly top 100" },
  ];

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-1 border-b border-line">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={
              "-mb-px border-b-2 px-4 py-3 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors " +
              (tab === t.id ? "border-accent text-accent" : "border-transparent text-muted hover:text-fg")
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="panel p-5">
          {tab === "daily" ? <StandingsTable rows={daily} detailLabel="Chase / podium / precision" highlight={address} /> : null}

          {tab === "earlier" ? (
            <>
              <label className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">Round</span>
                <select
                  value={roundKey}
                  onChange={(e) => setRoundKey(e.target.value)}
                  className="border border-line bg-bg px-3 py-2 font-mono text-xs text-fg focus:border-accent focus:outline-none"
                >
                  {earlierKeys.map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </label>
              <div className="mt-5">
                <StandingsTable
                  rows={earlier[roundKey] ?? []}
                  detailLabel="Chase / podium / precision"
                  highlight={address}
                />
              </div>
            </>
          ) : null}

          {tab === "weekly" ? (
            <StandingsTable rows={weekly} detailLabel="Counted days" highlight={address} />
          ) : null}

          <p className="mt-4 border-l-2 border-accent-dim/50 pl-3 font-mono text-[11px] leading-relaxed text-faint">
            Sample standings, generated locally so the board renders. No results service is connected, so no row
            here is a settled score.
          </p>
        </div>

        <div className="grid content-start gap-4">
          <YourStanding />
          <div className="panel p-5">
            <p className="eyebrow">Refresh</p>
            <p className="mt-2 text-sm text-muted">
              A live board refreshes on its own once a round settles. Nothing is polling here yet.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
