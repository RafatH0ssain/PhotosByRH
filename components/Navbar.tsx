"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { name: "Brands", href: "/brands" },
    { name: "Personal", href: "/personal" },
    { name: "Corporate", href: "/corporate" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">
      <Link href="/" className="font-anton text-2xl tracking-tighter text-white z-[60]">
        PHOTOSBYRH
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`transition-colors duration-300 ${
              isActive(link.href) ? "text-white border-b border-white" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Hamburger Button */}
      <button 
        className="md:hidden z-[60] flex flex-col gap-1.5" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`h-0.5 w-6 bg-white transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`h-0.5 w-6 bg-white transition-opacity ${isOpen ? "opacity-0" : ""}`} />
        <span className={`h-0.5 w-6 bg-white transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`font-anton text-4xl uppercase ${
                  isActive(link.href) ? "text-white" : "text-neutral-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}