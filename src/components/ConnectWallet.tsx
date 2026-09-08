"use client";

import { useState } from "react";
import { useWallet } from "./WalletProvider";
import { identityFor, shortAddress } from "@/lib/identity";

export function ConnectWallet({ compact = false }: { compact?: boolean }) {
  const { address, status, error, connect, disconnect } = useWallet();
  const [open, setOpen] = useState(false);

  if (address) {
    const id = identityFor(address);
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 border border-line bg-white/5 px-3 py-2 font-mono text-[11px] tracking-[0.14em] text-fg uppercase transition-colors hover:border-accent/60"
        >
          <span aria-hidden className="text-accent">{id.crest}</span>
          <span className="hidden sm:inline">{id.callSign}</span>
          <span className="sm:hidden">{shortAddress(address)}</span>
        </button>
        {open ? (
          <div className="absolute right-0 z-50 mt-2 w-64 border border-line bg-bg-raised p-4 shadow-2xl">
            <p className="eyebrow">Signed in</p>
            <p className="mt-2 font-mono text-xs break-all text-muted">{address}</p>
            <p className="mt-3 text-xs text-faint">
              A call sign and crest are assigned automatically until you customise them.
            </p>
            <button
              type="button"
              onClick={() => {
                disconnect();
                setOpen(false);
              }}
              className="mt-4 w-full border border-line px-3 py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors hover:border-danger hover:text-danger"
            >
              Disconnect
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={compact ? "" : "relative"}>
      <button
        type="button"
        onClick={() => void connect()}
        disabled={status === "connecting"}
        className="bg-accent px-3 py-2 font-display text-[11px] font-bold tracking-[0.02em] whitespace-nowrap text-bg uppercase transition-opacity hover:opacity-85 disabled:opacity-60 sm:px-4 sm:py-2.5 sm:text-[13px]"
      >
        {status === "connecting" ? "Connecting…" : "Connect wallet"}
      </button>
      {error ? (
        <p className="absolute top-full right-0 mt-2 w-64 border border-danger/40 bg-bg-raised p-2 text-[11px] text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
