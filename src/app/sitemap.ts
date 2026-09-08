import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = ["", "/play", "/play/practice", "/season", "/leaderboard", "/rewards", "/war-chest", "/docs", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: site.url + route,
    lastModified: now,
    changeFrequency: route === "" || route === "/play" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
