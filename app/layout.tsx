import { Anton } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";
import { SITE_URL } from "./site";

/* Anton is now the wordmark face only — one weight, one word, on every page.
   Everything else uses the system font, which ships better optical sizing and
   tracking than any webfont we could download, and costs nothing. */
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton-src",
  display: "swap",
});

const DESCRIPTION =
  "Photography by Rafat — wildlife, sports, pets, film, brands, and event work. " +
  "Chasing good light and honest moments.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:  "PhotosByRH",
    template: "%s | PhotosByRH",
  },
  description: DESCRIPTION,
  applicationName: "PhotosByRH",
  authors: [{ name: "Rafat Hossain" }],
  creator: "Rafat Hossain",
  keywords: [
    "photography", "photographer", "wildlife photography", "sports photography",
    "pet photography", "film photography", "brand photography", "event photography",
  ],
  openGraph: {
    type: "website",
    siteName: "PhotosByRH",
    title: "PhotosByRH",
    description: DESCRIPTION,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PhotosByRH",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
  // No `icons` key: app/favicon.ico, app/icon.png and app/apple-icon.png are
  // picked up automatically by the file convention.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      style={{ colorScheme: "dark", backgroundColor: "#000000" }}
    >
      <body className={`${anton.variable} font-sans bg-canvas text-fg`} suppressHydrationWarning>

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-pill focus:bg-raised focus:px-5 focus:py-2.5 focus:text-caption focus:font-medium"
        >
          Skip to content
        </a>

        <Navbar />

        {/* Chrome floats over the content rather than reserving a strip, so the
            page pads itself past the nav instead of sitting below a bar. */}
        <main id="main" className="min-h-screen pt-14">
          {children}
        </main>

        <footer className="mt-24 border-t border-hairline">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-mark text-base tracking-tight text-fg-3">
              PHOTOSBYRH
            </span>
            <span className="text-caption text-fg-4">
              &copy; {new Date().getFullYear()} Rafat Hossain
            </span>
          </div>
        </footer>

      </body>
    </html>
  );
}
