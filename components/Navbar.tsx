"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { name: "About",     href: "/about"     },
  { name: "Wildlife",  href: "/wildlife"  },
  { name: "Film",      href: "/film"      },
  { name: "Sports",    href: "/sports"    },
  { name: "Pets",      href: "/pets"      },
  { name: "Brands",    href: "/brands"    },
  { name: "Corporate", href: "/corporate" },
  { name: "Personal",  href: "/personal"  },
  { name: "Contact",   href: "/contact"   },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  /* The menu remembers which route it was opened on, and is open only while
     that is still the current route. Any navigation — a link, the back button,
     a redirect — therefore closes it as a consequence of the route changing,
     rather than needing an effect to chase the pathname and close it after the
     fact. */
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const setOpen = (next: boolean) => setMenuPath(next ? pathname : null);

  /* ── Scroll edge effect ────────────────────────────────────────────────────
     The bar is invisible over the top of the page and materialises only once
     content has actually slid under it, rather than drawing a permanent 1px
     divider across a photograph. Passive listener, and state only changes when
     the threshold is crossed, so this is one boolean flip per scroll session,
     not a re-render per frame. */
  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 8;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Escape dismisses, and the page behind must not scroll under the sheet.
     globals.css puts `overflow-y: scroll` on <html>, which makes the root the
     scrolling box — locking <body> here would do nothing. */
  useEffect(() => {
    if (!open) return;

    /* setMenuPath rather than setOpen: the state setter is referentially
       stable, so this effect stays keyed to `open` alone. */
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuPath(null); };
    window.addEventListener("keydown", onKey);

    const el   = document.documentElement;
    const gap  = window.innerWidth - el.clientWidth;
    const prevOverflow = el.style.overflow;
    const prevPadding  = el.style.paddingRight;
    el.style.overflow = "hidden";
    if (gap > 0) el.style.paddingRight = `${gap}px`;

    return () => {
      window.removeEventListener("keydown", onKey);
      el.style.overflow     = prevOverflow;
      el.style.paddingRight = prevPadding;
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* The material itself is a sibling layer so its opacity can cross-fade
          without dragging the logo and links through the transition. */}
      <div
        aria-hidden
        className={`material absolute inset-0 border-b bg-canvas/72 backdrop-blur-xl transition-[opacity,border-color] duration-300 ease-out ${
          scrolled || open
            ? "border-hairline opacity-100"
            : "border-transparent opacity-0"
        }`}
      />

      <nav
        aria-label="Primary"
        className="relative mx-auto flex h-14 max-w-[1400px] items-center justify-between px-6"
      >
        <Link
          href="/"
          className="font-mark text-[17px] tracking-tight text-fg transition-transform duration-150 ease-out active:scale-[0.97]"
        >
          PHOTOSBYRH
        </Link>

        {/* ── Desktop ─────────────────────────────────────────────────────────
            No sliding pill. Apple's own global nav marks the current section
            with weight and brightness alone — a travelling highlight is motion
            for its own sake on something you look at on every page. */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-lg px-3 py-1.5 text-caption transition-colors duration-200 ease-out ${
                    active
                      ? "font-medium text-fg"
                      : "text-fg-3 hover:text-fg"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Mobile trigger ───────────────────────────────────────────────── */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="-mr-2 flex h-10 w-10 items-center justify-center transition-transform duration-150 ease-out active:scale-[0.94] lg:hidden"
        >
          <span className="relative block h-[10px] w-[18px]">
            <span
              className={`absolute left-0 block h-px w-full bg-fg transition-transform duration-300 ease-out ${
                open ? "top-[5px] rotate-45" : "top-0 rotate-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-full bg-fg transition-transform duration-300 ease-out ${
                open ? "top-[5px] -rotate-45" : "top-[9px] rotate-0"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* ── Mobile sheet ────────────────────────────────────────────────────────
          Enters and exits along the same path — down from the bar it belongs
          to, back up into it — so dismissing feels like the reverse of opening
          rather than a different animation. `visibility` is in the transition
          list so the panel leaves the hit-testing and accessibility tree only
          after the fade has finished, and `inert` keeps it out of the tab order
          entirely while closed. */}
      <div
        id="mobile-nav"
        inert={!open}
        className={`material fixed inset-0 -z-10 overflow-y-auto bg-canvas/85 backdrop-blur-xl transition-[opacity,transform,visibility] duration-400 ease-sheet lg:hidden ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 pt-24 pb-12">
          {NAV.map((link, i) => {
            const active = pathname === link.href;
            return (
              <li
                key={link.href}
                /* Stagger on the way in only. On the way out everything leaves
                   together — the user has already decided, so making them wait
                   through a cascade reads as lag. */
                style={{ transitionDelay: open ? `${80 + i * 35}ms` : "0ms" }}
                className={`border-b border-hairline transition-[opacity,transform] duration-400 ease-out ${
                  open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`block py-4 text-[1.75rem] font-semibold tracking-[-0.03em] transition-colors duration-200 ease-out ${
                    active ? "text-fg" : "text-fg-3"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
