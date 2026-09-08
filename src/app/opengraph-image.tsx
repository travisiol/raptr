import { ImageResponse } from "next/og";
import { season, site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.domain + " — " + site.tagline;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#070805",
          color: "#f1f3e9",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#90ad61" }}>
          {site.domain}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 118, fontWeight: 900, lineHeight: 1 }}>
          <span>STRIKE.</span>
          <span style={{ color: "#ccff00" }}>CLIMB.</span>
          <span>COMPETE.</span>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#9aa08c" }}>
          One daily round · three picks · {season.days}-day seasons
        </div>
      </div>
    ),
    size,
  );
}
