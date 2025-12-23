import { Anton, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });


export const metadata: Metadata = {
  title: {
    default: "PhotosByRH",
    template: "%s | PhotosByRH",
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-background text-foreground">
      <body className={`${anton.variable} ${geist.variable} font-sans`}>
        <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
          <Navbar />
        </header>

        <main className="pt-24 min-h-screen">{children}</main>

        <footer className="py-10 text-center text-xs text-gray-500 border-t border-white/10">
          © {new Date().getFullYear()} PhotosByRH. All Rights Reserved.
        </footer>
      </body>
    </html>
  );
}