import { Anton, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MagneticCursor from "@/components/MagneticCursor";
import { Metadata } from "next";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const geist  = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: {
    default:  "PhotosByRH",
    template: "%s | PhotosByRH",
  },
  icons: { icon: "/icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning style={{ colorScheme: "dark", backgroundColor: "black" }}>
      <body className={`${anton.variable} ${geist.variable} font-sans bg-black text-white`} suppressHydrationWarning>

        <MagneticCursor />

        <header className="fixed top-0 w-full z-50">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl border-b border-white/[0.06]" />
          <Navbar />
        </header>

        <main className="pt-24 min-h-screen bg-black">
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
