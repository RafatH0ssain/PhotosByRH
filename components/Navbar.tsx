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
    <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      {/* Logo - Always visible and on top */}
      <Link 
        href="/" 
        className="font-anton text-2xl tracking-tighter text-white z-[100]"
        onClick={() => setIsOpen(false)}
      >
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

      {/* Mobile Hamburger Button - Locked to z-100 to stay above the blur */}
      <button 
        className="md:hidden z-[100] flex flex-col gap-1.5 p-2 focus:outline-none" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.span 
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          className="h-0.5 w-6 bg-white block" 
        />
        <motion.span 
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          className="h-0.5 w-6 bg-white block" 
        />
        <motion.span 
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          className="h-0.5 w-6 bg-white block" 
        />
      </button>

      {/* Full Screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-screen h-screen bg-black/90 backdrop-blur-xl z-[90] flex items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center justify-center gap-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-anton text-5xl uppercase tracking-tighter transition-all ${
                      isActive(link.href) 
                        ? "text-white scale-110" 
                        : "text-neutral-600 hover:text-neutral-200"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}