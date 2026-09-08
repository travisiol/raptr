/** Saved picks live in the browser: there is no entry service behind this build. */
export type SavedPicks = {
  roundKey: string;
  mode: "season" | "open";
  chase: string | null;
  podium: [string | null, string | null];
  precision: number | null;
  address: string;
  savedAt: string;
};

const key = (mode: string, roundKey: string, address: string) =>
  "raptr:picks:" + mode + ":" + roundKey + ":" + address.toLowerCase();

export function loadPicks(mode: string, roundKey: string, address: string): SavedPicks | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key(mode, roundKey, address));
    return raw ? (JSON.parse(raw) as SavedPicks) : null;
  } catch {
    return null;
  }
}

export function savePicks(picks: SavedPicks): void {
  try {
    window.localStorage.setItem(key(picks.mode, picks.roundKey, picks.address), JSON.stringify(picks));
  } catch {
    /* storage can be unavailable in private windows; the UI reports it */
  }
}

export function loadHistory(mode: string, address: string): SavedPicks[] {
  if (typeof window === "undefined" || !address) return [];
  const prefix = "raptr:picks:" + mode + ":";
  const out: SavedPicks[] = [];
  try {
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const k = window.localStorage.key(i);
      if (!k?.startsWith(prefix) || !k.endsWith(address.toLowerCase())) continue;
      const raw = window.localStorage.getItem(k);
      if (raw) out.push(JSON.parse(raw) as SavedPicks);
    }
  } catch {
    return out;
  }
  return out.sort((a, b) => b.roundKey.localeCompare(a.roundKey));
}
