/* Set NEXT_PUBLIC_SITE_URL in the deployment environment. metadataBase uses
   this to turn relative Open Graph paths into the absolute URLs that social
   platforms require; sitemap.ts and robots.ts use it too. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://photosbyrh.com";
