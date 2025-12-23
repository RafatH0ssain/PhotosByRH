"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
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
      <Link href="/" className="font-anton text-2xl tracking-tighter text-white">
        PHOTOSBYRH
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
  );
}