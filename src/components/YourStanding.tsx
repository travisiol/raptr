"use client";

import { useWallet } from "./WalletProvider";
import { identityFor, shortAddress } from "@/lib/identity";

/**
 * Your own line in the standings. With no results service connected there is
 * nothing to rank, so the card reports that plainly rather than inventing a
 * position for the signed-in wallet.
 */
export function YourStanding({ compact = false }: { compact?: boolean }) {
  const { address, connect, status } = useWallet();

  if (!address) {
    return (
      <div className="panel p-5">
        <p className="eyebrow">Your standing</p>
        <p className="mt-3 text-sm text-muted">
          Connect your wallet to see your position. A call sign and crest are assigned automatically.
        </p>
        <button
          type="button"
          onClick={() => void connect()}
          className="mt-4 border border-line-strong px-5 py-2.5 font-display text-[13px] uppercase transition-colors hover:border-accent hover:text-accent"
        >
          {status === "connecting" ? "Connecting…" : "Connect wallet"}
        </button>
      </div>
    );
  }

  const id = identityFor(address);

  return (
    <div className="panel p-5">
      <p className="eyebrow">Your standing</p>
      <div className="mt-3 flex items-center gap-3">
        <span
          aria-hidden
          className="flex h-10 w-10 items-center justify-center border border-line text-lg"
          style={{ color: "hsl(" + id.hue + " 80% 62%)" }}
        >
          {id.crest}
        </span>
        <div>
          <p className="font-display text-lg">{id.callSign}</p>
          <p className="font-mono text-[11px] text-faint">{shortAddress(address)}</p>
        </div>
      </div>
      <dl className="mt-5 grid grid-cols-2 gap-px bg-line">
        <div className="bg-bg p-4">
          <dt className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">Rank</dt>
          <dd className="display mt-1 text-3xl text-faint">—</dd>
        </div>
        <div className="bg-bg p-4">
          <dt className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">Points</dt>
          <dd className="display mt-1 text-3xl text-faint">—</dd>
        </div>
      </dl>
      {!compact ? (
        <p className="mt-4 border-l-2 border-accent-dim/50 pl-3 font-mono text-[11px] text-faint">
          No settlement service is connected to this build, so no round has scored yet and there is nothing to
          rank.
        </p>
      ) : null}
    </div>
  );
}
