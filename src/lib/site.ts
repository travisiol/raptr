/**
 * Every brand-bound string lives here. Renaming the product is a one-file edit.
 */
export const site = {
  name: "RAPTR",
  domain: "RAPTR.GG",
  url: "https://raptr.gg",
  token: "RAPTR",
  ticker: "$RAPTR",
  tagline: "Strike. Climb. Compete.",
  social: {
    handle: "@raptrdotgg",
    url: "https://x.com/raptrdotgg",
  },
} as const;

export const season = {
  number: 1,
  label: "Season 01",
  days: 7,
  /** Tokens the wallet must hold to enter the holder season. No burn, no lock. */
  holdRequirement: 250_000,
  /** Daily round boundary, in UTC hours. */
  roundStartHourUtc: 18,
  picksClose: "17:59 UTC",
  pointsPerGame: 100,
  gamesPerRound: 3,
  countedDays: 5,
  split: {
    daily: 0.4,
    weekly: 0.6,
  },
  /** Planned share of eligible trading volume routed to the reserve. */
  feeShare: 0.04,
} as const;

export const maxDailyPoints = season.pointsPerGame * season.gamesPerRound;
export const maxWeeklyPoints = maxDailyPoints * season.countedDays;

export const nav = [
  { href: "/play", label: "Play" },
  { href: "/season", label: "Season" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/rewards", label: "Rewards" },
  { href: "/war-chest", label: "War Chest" },
  { href: "/docs", label: "Docs" },
] as const;

/**
 * Reserve wallet. Deliberately empty until a real receiving address is issued —
 * the UI reports "not configured" rather than inventing a balance.
 */
export const warChest = {
  address: process.env.NEXT_PUBLIC_WAR_CHEST_ADDRESS ?? "",
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL ?? "",
  chainName: "Robinhood Chain",
  chainLabel: "Robinhood Chain · Mainnet",
} as const;

export const weeklyBrackets = [
  { rank: "Rank 1", share: 0.15, title: "The Champion", note: "Plus the season champion badge", places: 1 },
  { rank: "Rank 2", share: 0.1, title: "Second Place", note: "One finishing position", places: 1 },
  { rank: "Rank 3", share: 0.07, title: "Third Place", note: "One finishing position", places: 1 },
  { rank: "Ranks 4–10", share: 0.21, title: "The Elite", note: "3% per player · 7 places", places: 7 },
  { rank: "Ranks 11–25", share: 0.2, title: "The Contenders", note: "1⅓% per player · 15 places", places: 15 },
  { rank: "Ranks 26–100", share: 0.27, title: "The Top 100", note: "0.36% per player · 75 places", places: 75 },
] as const;
