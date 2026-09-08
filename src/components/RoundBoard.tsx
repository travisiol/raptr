"use client";

import { useEffect, useMemo, useState } from "react";
import { useWallet } from "./WalletProvider";
import { Countdown, LocalTime } from "./Countdown";
import { loadHistory, loadPicks, savePicks, type SavedPicks } from "@/lib/picks";
import { maxRoundScore } from "@/lib/scoring";
import { season, site } from "@/lib/site";
import type { RosterToken } from "@/data/roster";

type Props = {
  mode: "season" | "open";
  roundKey: string;
  field: RosterToken[];
  featured: RosterToken;
  tolerance: number;
  picksCloseIso: string;
  startIso: string;
  endIso: string;
};

type Tab = "picks" | "results" | "detail";

export function RoundBoard({
  mode,
  roundKey,
  field,
  featured,
  tolerance,
  picksCloseIso,
  startIso,
  endIso,
}: Props) {
  const { address, connect, status } = useWallet();
  const [tab, setTab] = useState<Tab>("picks");
  const [chase, setChase] = useState<string | null>(null);
  const [podium, setPodium] = useState<[string | null, string | null]>([null, null]);
  const [precision, setPrecision] = useState("");
  const [saved, setSaved] = useState<SavedPicks | null>(null);
  const [history, setHistory] = useState<SavedPicks[]>([]);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!address) {
      setSaved(null);
      setHistory([]);
      return;
    }
    const existing = loadPicks(mode, roundKey, address);
    setSaved(existing);
    if (existing) {
      setChase(existing.chase);
      setPodium(existing.podium);
      setPrecision(existing.precision === null ? "" : String(existing.precision));
    }
    setHistory(loadHistory(mode, address));
  }, [address, mode, roundKey]);

  const precisionValue = precision === "" ? null : Number(precision);
  const complete =
    chase !== null &&
    podium[0] !== null &&
    podium[1] !== null &&
    podium[0] !== podium[1] &&
    precisionValue !== null &&
    Number.isFinite(precisionValue) &&
    precisionValue >= -50 &&
    precisionValue <= 50;

  const locked = saved !== null;

  function togglePodium(slot: 0 | 1, symbol: string) {
    setPodium((prev) => {
      const next: [string | null, string | null] = [prev[0], prev[1]];
      const other = slot === 0 ? 1 : 0;
      if (next[other] === symbol) next[other] = null;
      next[slot] = next[slot] === symbol ? null : symbol;
      return next;
    });
  }

  function submit() {
    if (!address || !complete || locked) return;
    const entry: SavedPicks = {
      roundKey,
      mode,
      chase,
      podium,
      precision: precisionValue,
      address,
      savedAt: new Date().toISOString(),
    };
    savePicks(entry);
    setSaved(entry);
    setHistory(loadHistory(mode, address));
    setNotice("Picks saved. A confirmed entry cannot be changed.");
    setTab("results");
  }

  const tabs: Array<{ id: Tab; label: string }> = useMemo(
    () => [
      { id: "picks", label: "Make your picks" },
      { id: "results", label: "My picks & results" },
      { id: "detail", label: "Round detail" },
    ],
    [],
  );

  return (
    <div className="panel">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line p-5">
        <div>
          <p className="eyebrow">{mode === "season" ? "Daily round" : "Open play"}</p>
          <p className="mt-1 font-mono text-xs text-muted">
            {mode === "season"
              ? "Saved picks · points leaderboard · prizes need an approved pool"
              : "Saved picks · points leaderboard · no prizes"}
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[11px] tracking-[0.14em] text-faint uppercase">Picks close in</p>
          <Countdown target={picksCloseIso} className="display text-2xl text-accent" />
        </div>
      </div>

      <div className="grid gap-px bg-line sm:grid-cols-3">
        {[
          { label: "Round window", value: "18:00 → 18:00 UTC" },
          { label: "Picks close", value: season.picksClose },
          { label: "Max score", value: maxRoundScore + " pts" },
        ].map((item) => (
          <div key={item.label} className="bg-bg p-4">
            <p className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">{item.label}</p>
            <p className="mt-1 font-mono text-sm text-fg">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1 border-b border-line p-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={
              "px-4 py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors " +
              (tab === t.id ? "bg-accent text-bg" : "text-muted hover:text-fg")
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "picks" ? (
        <div className="p-5 sm:p-7">
          {locked ? (
            <p className="mb-6 border border-accent/40 bg-accent/10 p-4 font-mono text-xs text-accent-soft">
              Your entry for this round is saved and can no longer be changed.
            </p>
          ) : null}

          <section>
            <div className="flex items-baseline gap-3">
              <span className="display text-accent">01</span>
              <h3 className="display text-xl">The Chase</h3>
              <span className="ml-auto font-mono text-[11px] text-faint">100 pts</span>
            </div>
            <p className="mt-2 text-sm text-muted">
              Pick the strongest percentage return of the field across the round.
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {field.map((token) => (
                <button
                  key={token.symbol}
                  type="button"
                  disabled={locked}
                  onClick={() => setChase((prev) => (prev === token.symbol ? null : token.symbol))}
                  className={
                    "border p-4 text-left transition-colors disabled:opacity-60 " +
                    (chase === token.symbol ? "border-accent bg-accent/10" : "border-line hover:border-line-strong")
                  }
                >
                  <p className="display text-lg">{token.symbol}</p>
                  <p className="mt-0.5 text-xs text-faint">{token.name}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <div className="flex items-baseline gap-3">
              <span className="display text-accent">02</span>
              <h3 className="display text-xl">Podium Pick</h3>
              <span className="ml-auto font-mono text-[11px] text-faint">50 + 50 pts</span>
            </div>
            <p className="mt-2 text-sm text-muted">Name first and second place, in order. Two different tokens.</p>
            {([0, 1] as const).map((slot) => (
              <div key={slot} className="mt-4">
                <p className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
                  {slot === 0 ? "First place" : "Second place"}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {field.map((token) => (
                    <button
                      key={token.symbol}
                      type="button"
                      disabled={locked}
                      onClick={() => togglePodium(slot, token.symbol)}
                      className={
                        "border px-4 py-2 font-mono text-xs uppercase transition-colors disabled:opacity-60 " +
                        (podium[slot] === token.symbol
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-line text-muted hover:border-line-strong hover:text-fg")
                      }
                    >
                      {token.symbol}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className="mt-10">
            <div className="flex items-baseline gap-3">
              <span className="display text-accent">03</span>
              <h3 className="display text-xl">Precision Strike</h3>
              <span className="ml-auto font-mono text-[11px] text-faint">0–100 pts</span>
            </div>
            <p className="mt-2 text-sm text-muted">
              Predict the closing percentage change for {featured.symbol}, in 0.01% steps.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <input
                type="number"
                step="0.01"
                min={-50}
                max={50}
                disabled={locked}
                value={precision}
                onChange={(e) => setPrecision(e.target.value)}
                placeholder="0.00"
                aria-label={"Predicted percentage change for " + featured.symbol}
                className="w-40 border border-line bg-bg px-4 py-3 font-mono text-lg text-fg focus:border-accent focus:outline-none disabled:opacity-60"
              />
              <span className="font-mono text-sm text-faint">%</span>
              <span className="font-mono text-[11px] text-faint">
                Tolerance ±{tolerance.toFixed(2)}% · fixed before entries open
              </span>
            </div>
          </section>

          <div className="mt-10 border-t border-line pt-6">
            {address ? (
              <button
                type="button"
                onClick={submit}
                disabled={!complete || locked}
                className="bg-accent px-7 py-3.5 font-display text-sm font-bold tracking-[0.02em] text-bg uppercase transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {locked ? "Entry saved" : "Confirm three picks"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void connect()}
                className="bg-accent px-7 py-3.5 font-display text-sm font-bold tracking-[0.02em] text-bg uppercase transition-opacity hover:opacity-85"
              >
                {status === "connecting" ? "Connecting…" : "Connect wallet to save picks"}
              </button>
            )}
            <p className="mt-3 font-mono text-[11px] text-faint">
              {mode === "season"
                ? "Holder entry needs " +
                  season.holdRequirement.toLocaleString("en-US") +
                  " " +
                  site.ticker +
                  " in your wallet. Sign-in never asks for a deposit, approval or transaction."
                : "Open-play points stay separate from season standings and earn no prizes."}
            </p>
            {!complete && !locked ? (
              <p className="mt-2 font-mono text-[11px] text-faint">
                All three picks save together. Podium needs two different tokens; precision accepts −50% to +50%.
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      {tab === "results" ? (
        <div className="p-5 sm:p-7" id="results">
          {notice ? <p className="mb-5 font-mono text-xs text-accent">{notice}</p> : null}
          {!address ? (
            <p className="text-sm text-muted">Connect your wallet to see saved picks and results.</p>
          ) : saved ? (
            <>
              <p className="eyebrow">Entry receipt · round {roundKey}</p>
              <dl className="mt-4 grid gap-px bg-line sm:grid-cols-3">
                {[
                  ["The Chase", saved.chase ?? "—"],
                  ["Podium", (saved.podium[0] ?? "—") + " → " + (saved.podium[1] ?? "—")],
                  ["Precision", saved.precision === null ? "—" : saved.precision.toFixed(2) + "%"],
                ].map(([label, value]) => (
                  <div key={label} className="bg-bg p-4">
                    <dt className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">{label}</dt>
                    <dd className="mt-1 font-display text-lg">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 font-mono text-[11px] text-faint">
                Saved <LocalTime iso={saved.savedAt} /> · window closes <LocalTime iso={endIso} />
              </p>
              <p className="mt-3 border-l-2 border-accent-dim/50 pl-3 font-mono text-[11px] text-faint">
                Settlement needs verified opening and closing prices. No price feed is connected to this build, so
                the entry stays unsettled and scores nothing.
              </p>

              {history.length > 1 ? (
                <div className="mt-8">
                  <p className="eyebrow">Earlier entries</p>
                  <ul className="mt-3 divide-y divide-line border-t border-line">
                    {history.map((h) => (
                      <li key={h.roundKey} className="flex items-center justify-between gap-4 py-3 font-mono text-xs">
                        <span className="text-muted">{h.roundKey}</span>
                        <span className="text-faint">
                          {h.chase} · {h.podium[0]}/{h.podium[1]} · {h.precision?.toFixed(2)}%
                        </span>
                        <span className="text-faint">Unsettled</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </>
          ) : (
            <p className="text-sm text-muted">No entry saved for this round yet.</p>
          )}
        </div>
      ) : null}

      {tab === "detail" ? (
        <div className="p-5 sm:p-7">
          <p className="eyebrow">Round {roundKey}</p>
          <dl className="mt-4 grid gap-px bg-line sm:grid-cols-2">
            <div className="bg-bg p-4">
              <dt className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">Opens</dt>
              <dd className="mt-1 font-mono text-sm">
                <LocalTime iso={startIso} /> <span className="text-faint">(your time)</span>
              </dd>
            </div>
            <div className="bg-bg p-4">
              <dt className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">Closes</dt>
              <dd className="mt-1 font-mono text-sm">
                <LocalTime iso={endIso} /> <span className="text-faint">(your time)</span>
              </dd>
            </div>
          </dl>
          <p className="eyebrow mt-6">Frozen field</p>
          <ul className="mt-3 divide-y divide-line border-t border-line">
            {field.map((token) => (
              <li key={token.symbol} className="flex items-center justify-between gap-4 py-3">
                <span className="font-display text-lg">{token.symbol}</span>
                <span className="text-xs text-faint">{token.name}</span>
                <span className="font-mono text-xs text-muted">
                  {token.symbol === featured.symbol ? "Precision target" : "In the chase"}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-l-2 border-accent-dim/50 pl-3 font-mono text-[11px] text-faint">
            Sample lineup. The live format freezes a four-token field from the top ten verified chain-native
            contracts by 24-hour volume; no ranking feed is connected here.
          </p>
        </div>
      ) : null}
    </div>
  );
}
