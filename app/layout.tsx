import { Anton, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";
import { SITE_URL } from "./site";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton-src", display: "swap" });
const geist  = Geist({ subsets: ["latin"], variable: "--font-geist-src", display: "swap" });


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
  robots: {
    index: true,
    follow: true,
  },
  // No `icons` key: app/favicon.ico, app/icon.png and app/apple-icon.png are
  // picked up automatically by the file convention. The previous explicit
  // `icon: "/icon.png"` overrode that and pointed at a file that did not exist.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning style={{ colorScheme: "dark", backgroundColor: "black" }}>
      <body className={`${anton.variable} ${geist.variable} font-sans bg-black text-white`} suppressHydrationWarning>

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-black focus:border focus:border-white/40 focus:px-4 focus:py-2 focus:font-anton focus:text-xs focus:tracking-[0.2em] focus:uppercase"
        >
          Skip to content
        </a>

        <header className="fixed top-0 w-full z-50">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm border-b border-white/[0.06]" />
          <Navbar />
        </header>

        <main id="main" className="pt-24 min-h-screen bg-black">
          {children}
        </main>

        <footer className="border-t border-white/[0.06] bg-black py-8">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <span className="font-anton text-xs tracking-[0.2em] text-white/15 uppercase">
              PhotosByRH
            </span>
            <span className="text-[10px] text-white/15 tracking-widest">
              © {new Date().getFullYear()}
            </span>
          </div>
        </footer>

      </body>
    </html>
  );
}
