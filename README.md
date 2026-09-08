# RAPTR.GG

A daily-round market picking game with seven-day seasons, built as a Next.js 16 app.

Modelled on the structure and mechanics of huntr.gg, rebuilt under its own name with
original code, copy and artwork.

## The game

One shared 24-hour round runs 18:00 UTC → 18:00 UTC. Picks for a round close one minute
before it opens, so you enter tomorrow's round while today's runs. Three games, 100 points
each:

| Game | Call | Points |
| --- | --- | --- |
| The Chase | Highest return of a four-token field | 100 |
| Podium Pick | First and second place, in order | 50 + 50 |
| Precision Strike | Closing % change of the featured token | 0–100, linear to tolerance |

Seasons run seven days. Your best five daily scores set the weekly rank. An approved season
budget would divide 40% across ten daily places and 60% across the weekly top 100.

## Routes

`/` · `/play` · `/play/practice` · `/season` · `/leaderboard` · `/rewards` · `/war-chest`
· `/docs` · `/privacy` · `/terms`

## Running it

```bash
npm install
npm run dev
```

## What is real and what is not

Real: the round schedule and countdowns, the pick flow with its validation and entry lock,
wallet sign-in over EIP-1193, generated call signs and crests, and the War Chest balance
reader — it queries a live RPC whenever one is configured.

Not real: there is no settlement service, price feed or results database. Standings shown
anywhere on the site are generated locally from a seeded PRNG and labelled as samples,
saved picks live in browser storage, and entries stay unsettled. No reserve address is
configured, so no balance is read and no prize is payable.

## Configuration

Brand strings and season parameters live in one file, [`src/lib/site.ts`](src/lib/site.ts) —
renaming the product or changing the hold requirement is a single edit there.

Copy `.env.example` to `.env.local` to point the War Chest panel at a real wallet:

```
NEXT_PUBLIC_WAR_CHEST_ADDRESS=
NEXT_PUBLIC_RPC_URL=
```

With both set, the reserve panel reads the balance on load and every 30 seconds.

## Layout

```
src/
  app/         routes, metadata, icon and OG image
  components/  chrome, the round board, standings, wallet
  lib/         round schedule, scoring, standings, identity, storage
  data/        token roster
```
