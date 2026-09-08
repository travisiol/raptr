import { rngFor } from "./deterministic";

/** Wallets get a generated call sign and crest until the player customises them. */
const PREFIX = [
  "Silent", "Iron", "Ashen", "Vermil", "Night", "Cobalt", "Feral", "Hollow",
  "Quick", "Amber", "Stark", "Bitter", "Pale", "Wired", "Gilded", "Cinder",
];

const CREATURE = [
  "Kestrel", "Harrier", "Falcon", "Shrike", "Osprey", "Merlin", "Buzzard",
  "Caracara", "Goshawk", "Kite", "Condor", "Owl", "Eagle", "Vulture",
];

const CRESTS = ["◤", "◈", "▲", "✦", "◇", "❖", "⬢", "◭"];

export type Identity = {
  callSign: string;
  crest: string;
  hue: number;
};

export function identityFor(seed: string): Identity {
  const rand = rngFor("identity:" + seed.toLowerCase());
  const prefix = PREFIX[Math.floor(rand() * PREFIX.length)];
  const creature = CREATURE[Math.floor(rand() * CREATURE.length)];
  const tag = String(Math.floor(rand() * 900) + 100);
  return {
    callSign: prefix + creature + tag,
    crest: CRESTS[Math.floor(rand() * CRESTS.length)],
    hue: Math.floor(rand() * 360),
  };
}

export function shortAddress(address: string): string {
  if (address.length < 10) return address;
  return address.slice(0, 6) + "…" + address.slice(-4);
}
