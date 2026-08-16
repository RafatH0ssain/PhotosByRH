# PhotosByRH

Photography portfolio for Rafat Hossain — wildlife, sports, pets, film, brands, and event work.

![The About page of PhotosByRH, showing a black-and-white self-portrait beside the "Behind The Lens." introduction](public/About/GitHub_Img.jpeg)

**Live:** [photosbyrh.vercel.app](https://photosbyrh.vercel.app)

Built with Next.js 16, React 19, and Tailwind CSS v4. No animation library —
motion is CSS transitions plus a small spring/gesture layer in
`components/spring.ts`, so it runs on the compositor rather than the main
thread.

## Design

Type is the system font (SF Pro on Apple platforms), with tracking and leading
set per size rather than one value everywhere — large text tightens, small text
opens up. Anton is kept for the wordmark only. Tokens live in the `@theme` block
of `app/globals.css`, which is the single source of truth; there is no
`tailwind.config.ts`.

Chrome is a translucent material that fades in once content scrolls under it,
and honours `prefers-reduced-transparency` and `prefers-contrast`. The lightbox
tracks the pointer 1:1, projects flick momentum to pick its landing photo, and
hands the release velocity to a spring, so a gesture can be caught and reversed
mid-flight.

## Development

```bash
npm install
npm run dev
```

Set `NEXT_PUBLIC_SITE_URL` if the site is served from a domain other than the
default in `app/site.ts` — it drives the sitemap, robots.txt, and Open Graph URLs.

## Images

Photos live in `public/`, one folder per gallery, and are referenced through
static imports so Next can generate blur placeholders and intrinsic dimensions.
After adding new photos, run:

```bash
node scripts/optimize-images.mjs --dry-run   # preview
node scripts/optimize-images.mjs             # resize to 2560px long edge
```
