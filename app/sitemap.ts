import type { MetadataRoute } from "next";
import { SITE_URL } from "./site";

const ROUTES = [
  "",           // home
  "/about",
  "/wildlife",
  "/sports",
  "/pets",
  "/film",
  "/brands",
  "/corporate",
  "/personal",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
