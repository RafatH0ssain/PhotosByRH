import type { Metadata } from "next";
import { Anton, Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "PhotosByRH",
  description: "Professional Photography Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-background text-foreground">
      <body className={`${anton.variable} ${geist.variable} font-sans`}>
        <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="font-anton text-2xl tracking-tighter">PHOTOSBYRH</Link>
            <div className="flex gap-8 text-sm uppercase tracking-widest font-medium">
              <Link href="/corporate" className="hover:text-gray-400 transition">Corporate</Link>
              <Link href="/brands" className="hover:text-gray-400 transition">Brands</Link>
              <Link href="/personal" className="hover:text-gray-400 transition">Personal</Link>
              <Link href="/contact" className="hover:text-gray-400 transition">Contact</Link>
            </div>
          </nav>
        </header>
        <main className="pt-24 min-h-screen">{children}</main>
        <footer className="py-10 text-center text-xs text-gray-500 border-t border-white/10">
          © {new Date().getFullYear()} PhotosByRH. All Rights Reserved.
        </footer>
      </body>
    </html>
  );
}