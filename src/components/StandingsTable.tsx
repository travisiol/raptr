import { shortAddress } from "@/lib/identity";
import type { StandingRow } from "@/lib/standings";

export function StandingsTable({
  rows,
  detailLabel = "Breakdown",
  highlight,
}: {
  rows: StandingRow[];
  detailLabel?: string;
  highlight?: string | null;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            {["Rank", "Hunter", "Wallet", detailLabel, "Points"].map((h, i) => (
              <th
                key={h}
                className={
                  "py-3 font-mono text-[10px] tracking-[0.18em] text-faint uppercase " +
                  (i === 4 ? "text-right" : "")
                }
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const isMe = highlight && row.address.toLowerCase() === highlight.toLowerCase();
            return (
              <tr
                key={row.address}
                className={
                  "border-b border-line/60 transition-colors hover:bg-white/[0.03] " +
                  (isMe ? "bg-accent/10" : "")
                }
              >
                <td className="py-3 font-display text-lg">
                  <span className={row.rank <= 3 ? "text-accent" : "text-faint"}>
                    {String(row.rank).padStart(2, "0")}
                  </span>
                </td>
                <td className="py-3">
                  <span className="flex items-center gap-2.5">
                    <span
                      aria-hidden
                      className="flex h-7 w-7 items-center justify-center border border-line text-xs"
                      style={{ color: "hsl(" + row.hue + " 80% 62%)" }}
                    >
                      {row.crest}
                    </span>
                    <span className="text-sm">{row.callSign}</span>
                  </span>
                </td>
                <td className="py-3 font-mono text-xs text-faint">{shortAddress(row.address)}</td>
                <td className="py-3 font-mono text-xs text-muted">{row.detail}</td>
                <td className="py-3 text-right font-display text-lg">{row.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
