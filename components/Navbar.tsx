"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { name: "About",     href: "/about",     num: "00" },
  { name: "Wildlife",  href: "/wildlife",  num: "01" },
  { name: "Sports",    href: "/sports",    num: "02" },
  { name: "Pets",      href: "/pets",      num: "03" },
  { name: "Film",      href: "/film",      num: "04" },
  { name: "Brands",    href: "/brands",    num: "05" },
  { name: "Corporate", href: "/corporate", num: "06" },
  { name: "Personal",  href: "/personal",  num: "07" },
  { name: "Contact",   href: "/contact",   num: "08" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="relative max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

      {/* Logo */}
      <Link
        href="/"
        onClick={() => setOpen(false)}
        className="font-anton text-xl tracking-tighter text-white z-[100] relative group"
      >
        PHOTOSBYRH
        <span className="absolute -bottom-0.5 left-0 h-[1px] bg-[#585a5a] w-0 group-hover:w-full transition-[width] duration-300 ease-out" />
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center">
        {NAV.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-3 py-1 text-[11px] uppercase tracking-[0.12em] transition-colors duration-200 ${
                active ? "text-white" : "text-white/35 hover:text-white/80"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-[#585a5a] rounded-[2px]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden z-[100] flex flex-col gap-[5px] p-2 focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation menu"
      >
        <motion.span animate={open ? { rotate: 45,  y: 7  } : { rotate: 0,   y: 0 }} className="h-px w-6 bg-white block origin-center" />
        <motion.span animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}    className="h-px w-6 bg-white block" />
        <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0,   y: 0 }} className="h-px w-6 bg-white block origin-center" />
      </button>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)"   }}
            exit={{   clipPath: "inset(0 0 100% 0)"  }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-black z-[90] md:hidden flex flex-col justify-between px-8 pt-28 pb-10"
          >
            <div className="flex flex-col gap-0">
              {NAV.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -24, opacity: 0 }}
                  animate={{ x: 0,   opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.055, ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
                  className="flex items-baseline gap-5 border-b border-white/[0.05] py-3"
                >
                  <span className="text-[10px] text-white/15 font-sans w-5 shrink-0">{link.num}</span>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`font-anton text-[2.5rem] uppercase tracking-tighter leading-none transition-colors ${
                      pathname === link.href ? "text-[#585a5a]" : "text-white/50 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            <p className="text-[10px] text-white/15 tracking-[0.25em] uppercase font-sans">
              © {new Date().getFullYear()} PhotosByRH
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
