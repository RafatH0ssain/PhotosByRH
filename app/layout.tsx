"use client"; // Required to use usePathname

import { Anton, Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { name: "Brands", href: "/brands" },
    { name: "Personal", href: "/personal" },
    { name: "Corporate", href: "/corporate" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <html lang="en" className="bg-background text-foreground">
      <body className={`${anton.variable} ${geist.variable} font-sans`}>
        <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="font-anton text-5xl tracking-tighter">
              PhotosByRH
            </Link>
            
            <div className="flex gap-8 text-sm uppercase tracking-widest font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-300 ${
                    isActive(link.href) 
                      ? "text-white border-b border-white"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
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