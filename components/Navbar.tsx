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
      {/* Logo - Keep z-index high so it stays above the drawer if needed */}
      <Link href="/" className="font-anton text-2xl tracking-tighter text-white z-[70]">
        PHOTOSBYRH
      </Link>

      {/* Desktop Menu - Hidden on mobile */}
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

      {/* Mobile Hamburger Button - Higher z-index to stay on top of the drawer */}
      <button 
        className="md:hidden z-[70] flex flex-col gap-1.5 p-2" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
        <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop to dim the main content */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] md:hidden"
            />

            {/* The Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-[#0a0a0a] border-l border-white/10 z-[60] md:hidden shadow-2xl"
            >
              {/* Vertically Centered List */}
              <div className="flex flex-col items-center justify-center h-full gap-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-anton text-3xl uppercase tracking-widest transition-colors ${
                      isActive(link.href) ? "text-white" : "text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}