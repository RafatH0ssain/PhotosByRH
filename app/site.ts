/* Override with NEXT_PUBLIC_SITE_URL if the site moves to a custom domain.
   metadataBase uses this to turn relative Open Graph paths into the absolute
   URLs social platforms require; sitemap.ts and robots.ts use it too. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://photosbyrh.vercel.app";
