"use client";

import { useCallback, useEffect, useState } from "react";
import { warChest } from "@/lib/site";

type BalanceState =
  | { kind: "unconfigured" }
  | { kind: "loading" }
  | { kind: "ok"; eth: string; checkedAt: string }
  | { kind: "error"; message: string };

const configured = Boolean(warChest.address && warChest.rpcUrl);

/** Reads the reserve balance straight from an RPC when one is configured. */
async function fetchBalance(): Promise<string> {
  const res = await fetch(warChest.rpcUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "eth_getBalance",
      params: [warChest.address, "latest"],
    }),
  });
  if (!res.ok) throw new Error("RPC responded " + res.status);
  const json = (await res.json()) as { result?: string; error?: { message: string } };
  if (json.error) throw new Error(json.error.message);
  if (!json.result) throw new Error("No balance returned.");
  const wei = BigInt(json.result);
  const whole = wei / 10n ** 18n;
  const frac = (wei % 10n ** 18n).toString().padStart(18, "0").slice(0, 6);
  return whole.toString() + "." + frac;
}

export function WarChestPanel() {
  const [state, setState] = useState<BalanceState>(configured ? { kind: "loading" } : { kind: "unconfigured" });
  const [copied, setCopied] = useState(false);

  const refresh = useCallback(async () => {
    if (!configured) return;
    setState({ kind: "loading" });
    try {
      const eth = await fetchBalance();
      setState({ kind: "ok", eth, checkedAt: new Date().toLocaleTimeString() });
    } catch (err) {
      setState({ kind: "error", message: err instanceof Error ? err.message : "Balance unavailable." });
    }
  }, []);

  useEffect(() => {
    if (!configured) return;
    void refresh();
    const id = window.setInterval(() => void refresh(), 30_000);
    return () => window.clearInterval(id);
  }, [refresh]);

  async function copyAddress() {
    if (!warChest.address) return;
    try {
      await navigator.clipboard.writeText(warChest.address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard permission denied; the address stays visible on screen */
    }
  }

  return (
    <div className="panel p-7">
      <p className="eyebrow">War Chest wallet balance</p>

      {state.kind === "unconfigured" ? (
        <>
          <p className="display mt-3 text-[clamp(34px,6vw,60px)] text-faint">Not configured</p>
          <p className="mt-3 max-w-lg text-sm text-muted">
            No receiving address has been issued for this build, so there is no balance to read. Set{" "}
            <code className="font-mono text-xs text-accent-dim">NEXT_PUBLIC_WAR_CHEST_ADDRESS</code> and{" "}
            <code className="font-mono text-xs text-accent-dim">NEXT_PUBLIC_RPC_URL</code> and this panel reads the
            live balance every 30 seconds.
          </p>
        </>
      ) : null}

      {state.kind === "loading" ? (
        <p className="display mt-3 text-[clamp(34px,6vw,60px)] text-faint">Checking…</p>
      ) : null}

      {state.kind === "ok" ? (
        <>
          <p className="display mt-3 text-[clamp(34px,6vw,60px)]">
            {state.eth} <span className="text-accent">ETH</span>
          </p>
          <p className="mt-2 font-mono text-[11px] text-faint">
            {warChest.chainLabel} · checked {state.checkedAt}
          </p>
        </>
      ) : null}

      {state.kind === "error" ? (
        <>
          <p className="display mt-3 text-[clamp(34px,6vw,60px)] text-faint">Unavailable</p>
          <p className="mt-2 font-mono text-[11px] text-danger">{state.message}</p>
        </>
      ) : null}

      <div className="mt-6 border-t border-line pt-5">
        <p className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">Fee receiving wallet</p>
        <p className="mt-2 font-mono text-sm break-all text-muted">
          {warChest.address || "— no address published —"}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => void copyAddress()}
            disabled={!warChest.address}
            className="border border-line px-4 py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors hover:border-accent hover:text-accent disabled:opacity-40"
          >
            {copied ? "Copied" : "Copy address"}
          </button>
          <button
            type="button"
            onClick={() => void refresh()}
            disabled={!configured}
            className="border border-line px-4 py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors hover:border-accent hover:text-accent disabled:opacity-40"
          >
            Refresh balance
          </button>
        </div>
      </div>
    </div>
  );
}
