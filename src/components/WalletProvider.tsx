"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type Eip1193Provider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, handler: (...args: never[]) => void) => void;
  removeListener?: (event: string, handler: (...args: never[]) => void) => void;
};

declare global {
  interface Window {
    ethereum?: Eip1193Provider;
  }
}

type WalletState = {
  address: string | null;
  chainId: string | null;
  status: "idle" | "connecting" | "connected" | "unavailable";
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
};

const WalletContext = createContext<WalletState | null>(null);

const REMEMBER_KEY = "raptr:wallet-remember";

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [status, setStatus] = useState<WalletState["status"]>("idle");
  const [error, setError] = useState<string | null>(null);

  // Silently restore a previously approved account; never prompts on load.
  useEffect(() => {
    const provider = window.ethereum;
    if (!provider) return;
    if (localStorage.getItem(REMEMBER_KEY) !== "1") return;
    void (async () => {
      try {
        const accounts = (await provider.request({ method: "eth_accounts" })) as string[];
        if (accounts?.[0]) {
          setAddress(accounts[0]);
          setStatus("connected");
        }
      } catch {
        /* a locked wallet is not an error worth surfacing */
      }
    })();
  }, []);

  useEffect(() => {
    const provider = window.ethereum;
    if (!provider?.on) return;
    const onAccounts = (...args: never[]) => {
      const accounts = args[0] as unknown as string[];
      if (accounts?.[0]) {
        setAddress(accounts[0]);
        setStatus("connected");
      } else {
        setAddress(null);
        setStatus("idle");
        localStorage.removeItem(REMEMBER_KEY);
      }
    };
    const onChain = (...args: never[]) => setChainId(args[0] as unknown as string);
    provider.on("accountsChanged", onAccounts);
    provider.on("chainChanged", onChain);
    return () => {
      provider.removeListener?.("accountsChanged", onAccounts);
      provider.removeListener?.("chainChanged", onChain);
    };
  }, []);

  const connect = useCallback(async () => {
    const provider = window.ethereum;
    if (!provider) {
      setStatus("unavailable");
      setError("No browser wallet detected. Install a wallet extension to sign in.");
      return;
    }
    setStatus("connecting");
    setError(null);
    try {
      const accounts = (await provider.request({ method: "eth_requestAccounts" })) as string[];
      const chain = (await provider.request({ method: "eth_chainId" })) as string;
      if (!accounts?.[0]) throw new Error("No account returned by the wallet.");
      setAddress(accounts[0]);
      setChainId(chain);
      setStatus("connected");
      localStorage.setItem(REMEMBER_KEY, "1");
    } catch (err) {
      setStatus("idle");
      const message = err instanceof Error ? err.message : "Wallet connection was rejected.";
      setError(message.includes("User rejected") ? "Connection rejected in your wallet." : message);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    setChainId(null);
    setStatus("idle");
    setError(null);
    localStorage.removeItem(REMEMBER_KEY);
  }, []);

  const value = useMemo<WalletState>(
    () => ({ address, chainId, status, error, connect, disconnect }),
    [address, chainId, status, error, connect, disconnect],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet(): WalletState {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used inside WalletProvider");
  return ctx;
}
