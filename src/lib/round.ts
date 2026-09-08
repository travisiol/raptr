import { season } from "./site";

const DAY_MS = 86_400_000;

export type RoundWindow = {
  /** 1-based index within the season, or null when outside the season. */
  index: number | null;
  start: Date;
  end: Date;
  /** Picks for this round close one minute before it opens. */
  picksClose: Date;
  /** UTC calendar date of the round start, e.g. "2026-09-08". */
  key: string;
};

/** The 18:00 UTC boundary on or before `at`. */
export function boundaryOnOrBefore(at: Date): Date {
  const b = new Date(
    Date.UTC(at.getUTCFullYear(), at.getUTCMonth(), at.getUTCDate(), season.roundStartHourUtc, 0, 0, 0),
  );
  if (b.getTime() > at.getTime()) b.setTime(b.getTime() - DAY_MS);
  return b;
}

/** Season 01 opens on the 18:00 UTC boundary of the current week's Monday. */
export function seasonStart(now: Date = new Date()): Date {
  const boundary = boundaryOnOrBefore(now);
  const dow = boundary.getUTCDay(); // 0 = Sunday
  const backToMonday = (dow + 6) % 7;
  return new Date(boundary.getTime() - backToMonday * DAY_MS);
}

export function seasonEnd(now: Date = new Date()): Date {
  return new Date(seasonStart(now).getTime() + season.days * DAY_MS);
}

export function utcKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function toWindow(start: Date, now: Date): RoundWindow {
  const s0 = seasonStart(now).getTime();
  const offset = Math.round((start.getTime() - s0) / DAY_MS);
  const inSeason = offset >= 0 && offset < season.days;
  return {
    index: inSeason ? offset + 1 : null,
    start,
    end: new Date(start.getTime() + DAY_MS),
    picksClose: new Date(start.getTime() - 60_000),
    key: utcKey(start),
  };
}

/** The round currently being played. */
export function currentRound(now: Date = new Date()): RoundWindow {
  return toWindow(boundaryOnOrBefore(now), now);
}

/** The round accepting picks right now — you enter tomorrow while today runs. */
export function nextRound(now: Date = new Date()): RoundWindow {
  return toWindow(new Date(boundaryOnOrBefore(now).getTime() + DAY_MS), now);
}

export function seasonRounds(now: Date = new Date()): RoundWindow[] {
  const s0 = seasonStart(now);
  return Array.from({ length: season.days }, (_, i) => toWindow(new Date(s0.getTime() + i * DAY_MS), now));
}

export type RoundState = "upcoming" | "picks-open" | "running" | "settling" | "settled";

export function roundState(round: RoundWindow, now: Date = new Date()): RoundState {
  const t = now.getTime();
  if (t < round.picksClose.getTime() - DAY_MS) return "upcoming";
  if (t < round.picksClose.getTime()) return "picks-open";
  if (t < round.end.getTime()) return "running";
  if (t < round.end.getTime() + 2 * 60_000) return "settling";
  return "settled";
}

export function msUntil(target: Date, now: Date = new Date()): number {
  return Math.max(0, target.getTime() - now.getTime());
}

export function splitDuration(ms: number) {
  const total = Math.floor(ms / 1000);
  return {
    hours: Math.floor(total / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

export function formatCountdown(ms: number): string {
  const { hours, minutes, seconds } = splitDuration(ms);
  const pad = (n: number) => String(n).padStart(2, "0");
  return hours + ":" + pad(minutes) + ":" + pad(seconds);
}

export function formatUtc(d: Date): string {
  return (
    d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", timeZone: "UTC" }).toUpperCase() +
    " " +
    d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" }) +
    " UTC"
  );
}
