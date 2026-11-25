import type { Metadata } from "next";

/* Override with NEXT_PUBLIC_SITE_URL if the site moves to a custom domain.
   metadataBase uses this to turn relative Open Graph paths into the absolute
   URLs social platforms require; sitemap.ts and robots.ts use it too. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://photo.rafathossain.com";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} | PhotosByRH`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "PhotosByRH",
      title: fullTitle,
      description,
      url: path,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
