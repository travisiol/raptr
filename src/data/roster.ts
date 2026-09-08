/**
 * Eligible-token roster.
 *
 * The live product ranks the top ten verified chain-native contracts by 24h
 * volume and freezes a four-token field per round. There is no price feed wired
 * up here, so the roster below is a fixed sample lineup and every figure derived
 * from it is marked as unverified in the UI.
 */
export type RosterToken = {
  symbol: string;
  name: string;
  /** Sample opening price, used to render the board. */
  open: number;
};

export const roster: RosterToken[] = [
  { symbol: "AERO", name: "Aerolith", open: 1.482 },
  { symbol: "TALON", name: "Talon Protocol", open: 0.0631 },
  { symbol: "QUILL", name: "Quill Network", open: 4.117 },
  { symbol: "VANE", name: "Vane Finance", open: 0.2849 },
  { symbol: "PLUME", name: "Plume Markets", open: 12.64 },
  { symbol: "CREST", name: "Crest Labs", open: 0.9153 },
  { symbol: "GYRE", name: "Gyre", open: 0.0417 },
  { symbol: "STOOP", name: "Stoop Exchange", open: 2.206 },
  { symbol: "MEWS", name: "Mews Protocol", open: 0.7382 },
  { symbol: "EYRIE", name: "Eyrie Chain", open: 6.031 },
];

export const rosterBySymbol = new Map(roster.map((t) => [t.symbol, t]));
