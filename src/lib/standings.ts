import { roster } from "@/data/roster";
import { rngFor, shuffle } from "./deterministic";
import { identityFor } from "./identity";
import { maxDailyPoints, season } from "./site";
import { seasonRounds, utcKey, type RoundWindow } from "./round";

/**
 * There is no results service behind this build, so standings are derived
 * deterministically from the round key. They are presented as sample data
 * everywhere they appear — nothing here is a settled result.
 */
export type StandingRow = {
  rank: number;
  callSign: string;
  crest: string;
  hue: number;
  address: string;
  points: number;
  detail: string;
};

function sampleAddress(seed: string): string {
  const rand = rngFor("addr:" + seed);
  let out = "0x";
  for (let i = 0; i < 40; i += 1) out += "0123456789abcdef"[Math.floor(rand() * 16)];
  return out;
}

export function dailyStandings(roundKey: string, count = 10): StandingRow[] {
  const rand = rngFor("daily:" + roundKey);
  const rows: StandingRow[] = [];
  let ceiling = maxDailyPoints;
  for (let i = 0; i < count; i += 1) {
    const address = sampleAddress(roundKey + ":" + i);
    const id = identityFor(address);
    const drop = Math.floor(rand() * 24) + (i === 0 ? 0 : 4);
    ceiling = Math.max(0, ceiling - drop);
    rows.push({
      rank: i + 1,
      callSign: id.callSign,
      crest: id.crest,
      hue: id.hue,
      address,
      points: ceiling,
      detail: [100, 50, 0][Math.floor(rand() * 3)] + " / " + [100, 50][Math.floor(rand() * 2)] + " / " + Math.floor(rand() * 101),
    });
  }
  return rows;
}

export function weeklyStandings(seedKey: string, count = 100): StandingRow[] {
  const rand = rngFor("weekly:" + seedKey);
  const rows: StandingRow[] = [];
  let ceiling = maxDailyPoints * season.countedDays;
  for (let i = 0; i < count; i += 1) {
    const address = sampleAddress(seedKey + ":w:" + i);
    const id = identityFor(address);
    const drop = Math.floor(rand() * 18) + (i === 0 ? 0 : 3);
    ceiling = Math.max(0, ceiling - drop);
    rows.push({
      rank: i + 1,
      callSign: id.callSign,
      crest: id.crest,
      hue: id.hue,
      address,
      points: ceiling,
      detail: season.countedDays + " days counted",
    });
  }
  return rows;
}

/** Four-token field frozen for a round, drawn from the eligible roster. */
export function lineupFor(roundKey: string) {
  const rand = rngFor("lineup:" + roundKey);
  const field = shuffle(roster, rand).slice(0, 4);
  const featured = field[Math.floor(rand() * field.length)];
  const tolerance = Number((4 + rand() * 6).toFixed(2));
  return { field, featured, tolerance };
}

/** Sample intra-round movement, so the board renders with live-looking numbers. */
export function sampleReturns(roundKey: string, symbols: string[]): Record<string, number> {
  const rand = rngFor("returns:" + roundKey);
  const out: Record<string, number> = {};
  for (const symbol of symbols) out[symbol] = Number(((rand() - 0.45) * 22).toFixed(2));
  return out;
}

export function seasonSchedule(now: Date = new Date()): Array<RoundWindow & { label: string }> {
  return seasonRounds(now).map((round) => ({
    ...round,
    label: "Round " + String(round.index).padStart(2, "0"),
  }));
}

export { utcKey };
