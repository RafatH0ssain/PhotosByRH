"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image, { type StaticImageData } from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface LightboxProps {
  index:    number;
  images:   StaticImageData[];
  onClose:  () => void;
  setIndex: (i: number) => void;
}

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
const SWIPE_THRESHOLD = 50; // px of horizontal travel that counts as a swipe

const imgVariants = {
  enter: (dir: number) => ({
    clipPath: dir >= 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
  }),
  center: {
    clipPath: "inset(0 0% 0 0%)",
  },
  exit: (dir: number) => ({
    clipPath: dir >= 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
  }),
};

/* Warm the neighbouring photo into the HTTP cache. The quality must match the
   <Image quality> below and the width must be one of Next's deviceSizes —
   otherwise this requests a different variant to the one actually rendered and
   we pay for the bytes twice instead of saving a round trip. */
const QUALITY = 85;
const DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

const optimisedUrl = (src: StaticImageData) => {
  const target = window.innerWidth * 0.9 * (window.devicePixelRatio || 1);
  const width =
    DEVICE_SIZES.find((w) => w >= target) ?? DEVICE_SIZES[DEVICE_SIZES.length - 1];
  return `/_next/image?url=${encodeURIComponent(src.src)}&w=${width}&q=${QUALITY}`;
};

export default function Lightbox({ index, images, onClose, setIndex }: LightboxProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [direction, setDirection] = useState(1);

  const overlayRef  = useRef<HTMLDivElement>(null);
  const closeRef    = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const restoreRef  = useRef<Element | null>(null);

  const reduceMotion = useReducedMotion();

  const go = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setIndex((index + dir + images.length) % images.length);
    },
    [index, images.length, setIndex],
  );

  /* ── Scroll lock ───────────────────────────────────────────────────────────
     globals.css sets `html { overflow-y: scroll }`. Because the root element's
     overflow is not `visible`, the root is what the viewport scrolls — body's
     overflow no longer propagates, so locking <body> here would do nothing.
     Lock <html> instead, and pad for the scrollbar so the page does not jump.
     ───────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const el = document.documentElement;
    const gap = window.innerWidth - el.clientWidth;
    const prevOverflow = el.style.overflow;
    const prevPadding  = el.style.paddingRight;

    el.style.overflow = "hidden";
    if (gap > 0) el.style.paddingRight = `${gap}px`;

    return () => {
      el.style.overflow    = prevOverflow;
      el.style.paddingRight = prevPadding;
    };
  }, []);

  /* Move focus in on open, hand it back to the trigger on close */
  useEffect(() => {
    restoreRef.current = document.activeElement;
    closeRef.current?.focus();
    return () => {
      (restoreRef.current as HTMLElement | null)?.focus?.();
    };
  }, []);

  /* Keyboard: navigation, dismiss, and a focus trap so Tab cannot walk out
     into the page sitting behind the overlay. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     { setIsVisible(false); return; }
      if (e.key === "ArrowRight") { go(1);  return; }
      if (e.key === "ArrowLeft")  { go(-1); return; }

      if (e.key === "Tab") {
        const focusables = overlayRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables?.length) return;

        const first = focusables[0];
        const last  = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  /* Warm the neighbours so arrowing / swiping does not stall on a cold fetch */
  useEffect(() => {
    if (images.length < 2) return;
    const next = (index + 1) % images.length;
    const prev = (index - 1 + images.length) % images.length;

    [next, prev].forEach((i) => {
      const img = new window.Image();
      img.src = optimisedUrl(images[i]);
    });
  }, [index, images]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    go(dx < 0 ? 1 : -1);
  };

  const counter = String(index + 1).padStart(2, "0");
  const total   = String(images.length).padStart(2, "0");
  const pct     = ((index + 1) / images.length) * 100;

  /* createPortal keeps us attached to document.body, escaping all layouts */
  return createPortal(
    <AnimatePresence onExitComplete={onClose}>
      {isVisible && (
        <motion.div
          key="lb"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{   opacity: 0 }}
          transition={{ duration: 0.3 }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="fixed inset-0 z-[99999] bg-black/[0.97]"
        >
          {/* Background dismiss */}
          <div
            className="absolute inset-0 z-[1]"
            onClick={() => setIsVisible(false)}
          />

          {/* ── THE IMAGE ─────────────────────────────────────────────────────
              Routed through next/image so the browser receives a sized, AVIF /
              WebP-negotiated variant instead of the multi-megabyte master that
              lives in public/. The clip-path wipe moved to this wrapper, since
              next/image needs to own the <img> element itself.
              ───────────────────────────────────────────────────────────────── */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={reduceMotion ? undefined : imgVariants}
              initial={reduceMotion ? { opacity: 0 } : "enter"}
              animate={reduceMotion ? { opacity: 1 } : "center"}
              exit={reduceMotion    ? { opacity: 0 } : "exit"}
              transition={{ duration: reduceMotion ? 0.15 : 0.48, ease: EASE }}
              className="absolute inset-x-[5vw] inset-y-[7vh] z-[2] pointer-events-none"
            >
              <Image
                src={images[index]}
                alt={`Photo ${index + 1} of ${images.length}`}
                fill
                sizes="90vw"
                quality={QUALITY}
                placeholder="blur"
                priority
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>

          {/* Counter — top left */}
          <div className="absolute top-6 left-7 z-10 flex items-baseline gap-[5px] pointer-events-none">
            <span className="font-anton text-[clamp(1.4rem,3.5vw,2.2rem)] leading-none tracking-[-0.02em] text-white">
              {counter}
            </span>
            <span className="font-sans text-[11px] tracking-[0.1em] text-white/25">
              / {total}
            </span>
          </div>

          {/* [ESC] close — top right */}
          <button
            ref={closeRef}
            type="button"
            aria-label="Close photo viewer"
            onClick={() => setIsVisible(false)}
            className="absolute top-5 right-6 z-10 flex items-center gap-[3px] p-2 leading-none"
          >
            <span className="font-sans text-[11px] tracking-[0.08em] text-[#585a5a]">[</span>
            <span className="font-sans text-[11px] tracking-[0.12em] text-white/55">ESC</span>
            <span className="font-sans text-[11px] tracking-[0.08em] text-[#585a5a]">]</span>
          </button>

          {/* ── Desktop hover zones ───────────────────────────────────────────
              Narrowed from 22% to 15% and hidden below md, so an edge tap on a
              phone dismisses (as expected) rather than silently navigating.
              ───────────────────────────────────────────────────────────────── */}
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            className="group absolute left-0 top-0 z-[5] hidden h-full w-[15%] cursor-w-resize md:flex items-end pl-6 pb-7"
          >
            <span className="font-anton text-[10px] tracking-[0.22em] text-white/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              PREV
            </span>
          </button>

          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => { e.stopPropagation(); go(1); }}
            className="group absolute right-0 top-0 z-[5] hidden h-full w-[15%] cursor-e-resize md:flex items-end justify-end pr-6 pb-7"
          >
            <span className="font-anton text-[10px] tracking-[0.22em] text-white/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              NEXT
            </span>
          </button>

          {/* ── Mobile controls ───────────────────────────────────────────────
              Hover does not exist on touch, so the desktop labels above were
              permanently invisible on a phone. These are always visible, and
              swipe is handled on the overlay.
              ───────────────────────────────────────────────────────────────── */}
          <div className="absolute bottom-7 left-0 right-0 z-10 flex items-center justify-center gap-10 md:hidden">
            <button
              type="button"
              aria-label="Previous photo"
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              className="flex h-11 w-11 items-center justify-center border border-white/20 text-white/70 active:border-white/50"
            >
              <span aria-hidden className="text-lg leading-none">&#8592;</span>
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={(e) => { e.stopPropagation(); go(1); }}
              className="flex h-11 w-11 items-center justify-center border border-white/20 text-white/70 active:border-white/50"
            >
              <span aria-hidden className="text-lg leading-none">&#8594;</span>
            </button>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-white/[0.07]">
            <motion.div
              animate={{ width: `${pct}%` }}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-full bg-[#585a5a]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
