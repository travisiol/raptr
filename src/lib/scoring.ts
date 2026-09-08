import { season } from "./site";

export type GameId = "chase" | "podium" | "precision";

export type GameSpec = {
  id: GameId;
  order: string;
  eyebrow: string;
  name: string;
  blurb: string;
  points: string;
  pointsNote: string;
  rule: string;
};

export const games: GameSpec[] = [
  {
    id: "chase",
    order: "01",
    eyebrow: "Pick the winner",
    name: "The Chase",
    blurb: "Choose the strongest performer from a field of four, ranked by percentage return across the round.",
    points: "100",
    pointsNote: "points for a winning pick",
    rule: "The highest return wins even when every token falls. Exact first-place ties each score full points.",
  },
  {
    id: "podium",
    order: "02",
    eyebrow: "Call the order",
    name: "Podium Pick",
    blurb: "Name two different tokens to finish first and second, in that order.",
    points: "50 + 50",
    pointsNote: "points for correct positions",
    rule: "Both right scores 100. Tied tokens may fill either position inside their tied group.",
  },
  {
    id: "precision",
    order: "03",
    eyebrow: "Dial in your target",
    name: "Precision Strike",
    blurb: "Predict the featured token's percentage change from the opening price to the close.",
    points: "0–100",
    pointsNote: "points based on accuracy",
    rule: "Closer earns more. The tolerance is published before entries open and points are rounded down.",
  },
];

/** The Chase: full points for naming the best return of the field. */
export function scoreChase(pickSymbol: string, returns: Record<string, number>): number {
  const values = Object.values(returns);
  if (values.length === 0) return 0;
  const best = Math.max(...values);
  return returns[pickSymbol] === best ? season.pointsPerGame : 0;
}

/** Podium Pick: 50 points per correct finishing position. */
export function scorePodium(picks: [string, string], returns: Record<string, number>): number {
  const ranked = Object.entries(returns).sort((a, b) => b[1] - a[1]);
  const half = season.pointsPerGame / 2;
  let points = 0;
  for (const position of [0, 1] as const) {
    const target = ranked[position];
    if (!target) continue;
    const tiedGroup = ranked.filter(([, value]) => value === target[1]).map(([symbol]) => symbol);
    if (tiedGroup.includes(picks[position])) points += half;
  }
  return points;
}

/**
 * Precision Strike: linear decay from an exact hit to the published tolerance.
 * `tolerance` is the round's volatility estimate, fixed before entry.
 */
export function scorePrecision(prediction: number, actual: number, tolerance: number): number {
  if (tolerance <= 0) return 0;
  const error = Math.abs(prediction - actual);
  if (error >= tolerance) return 0;
  return Math.floor(season.pointsPerGame * (1 - error / tolerance));
}

export const maxRoundScore = season.pointsPerGame * season.gamesPerRound;
