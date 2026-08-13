"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "@/components/Lightbox";

const images = [
  "/Wildlife/Wildlife (1).webp",
  "/Film/Film (8).webp",
  "/Landing/Home (3).webp",
  "/Personal Event(s)/Personal (6).webp",
  "/Landing/Home (5).webp",
  "/Brand(s)/Brands (8).webp",
  "/Corporate Event(s)/Corporate (3).webp",
  "/Pets/Pets (4).webp",
  "/Film/Film (9).webp",
  "/Sports/Sports (1).webp",
  "/Sports/Sports (3).webp",
  "/Sports/Sports (6).webp",
  "/Wildlife/Wildlife (2).webp",
  "/Landing/Home (14).webp",
  "/Wildlife/Wildlife (3).webp",
  "/Film/Film (5).webp",
  "/Pets/Pets (1).webp",
  "/Pets/Pets (8).webp",
  "/Landing/Home (19).webp",
  "/Film/Film (7).webp",
  "/Pets/Pets (2).webp",
];

/* 12-column asymmetric grid — [col-span class, aspect-ratio class, sizes hint] */
const GRID: [string, string, string][] = [
  ["col-span-12 md:col-span-7", "aspect-[3/4]",  "(max-width: 768px) 100vw, 58vw"],
  ["col-span-12 md:col-span-5", "aspect-[3/4]",  "(max-width: 768px) 100vw, 42vw"],
  ["col-span-6  md:col-span-4", "aspect-[4/3]",  "(max-width: 768px) 50vw, 33vw"],
  ["col-span-6  md:col-span-4", "aspect-[4/3]",  "(max-width: 768px) 50vw, 33vw"],
  ["col-span-12 md:col-span-4", "aspect-[4/3]",  "(max-width: 768px) 100vw, 33vw"],
  ["col-span-12 md:col-span-5", "aspect-[4/5]",  "(max-width: 768px) 100vw, 42vw"],
  ["col-span-12 md:col-span-7", "aspect-[4/5]",  "(max-width: 768px) 100vw, 58vw"],
  ["col-span-6  md:col-span-3", "aspect-square",  "(max-width: 768px) 50vw, 25vw"],
  ["col-span-6  md:col-span-5", "aspect-square",  "(max-width: 768px) 50vw, 42vw"],
  ["col-span-12 md:col-span-4", "aspect-[4/5]",  "(max-width: 768px) 100vw, 33vw"],
  ["col-span-12 md:col-span-8", "aspect-video",   "(max-width: 768px) 100vw, 66vw"],
  ["col-span-12 md:col-span-4", "aspect-[4/5]",  "(max-width: 768px) 100vw, 33vw"],
  ["col-span-6  md:col-span-4", "aspect-[4/5]",  "(max-width: 768px) 50vw, 33vw"],
  ["col-span-6  md:col-span-4", "aspect-[4/5]",  "(max-width: 768px) 50vw, 33vw"],
  ["col-span-12 md:col-span-4", "aspect-[4/3]",  "(max-width: 768px) 100vw, 33vw"],
  ["col-span-12 md:col-span-6", "aspect-video",   "(max-width: 768px) 100vw, 50vw"],
  ["col-span-12 md:col-span-6", "aspect-video",   "(max-width: 768px) 100vw, 50vw"],
  ["col-span-6  md:col-span-5", "aspect-[4/5]",  "(max-width: 768px) 50vw, 42vw"],
  ["col-span-6  md:col-span-7", "aspect-[4/5]",  "(max-width: 768px) 50vw, 58vw"],
  ["col-span-12 md:col-span-6", "aspect-[4/5]",  "(max-width: 768px) 100vw, 50vw"],
  ["col-span-12 md:col-span-6", "aspect-[4/5]",  "(max-width: 768px) 100vw, 50vw"],
];

const ticker = Array(6)
  .fill("WILDLIFE · SPORTS · BRANDS · PETS · FILM · CORPORATE · PERSONAL · ")
  .join("");

export default function Home() {
  const [lbIndex, setLbIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="pt-10 md:pt-16 pb-14 border-b border-white/[0.06]">

        {/* CAPTURING — text reveal wipe */}
        <div className="overflow-hidden">
          <motion.h1
            initial={reduceMotion ? { opacity: 0 } : { y: "105%" }}
            animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="font-anton text-[clamp(3.8rem,14.5vw,13rem)] leading-[0.85] tracking-tighter uppercase"
          >
            CAPTURING
          </motion.h1>
        </div>

        {/* MOMENTS. + right-side bio — staggered row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mt-1">
          <div className="overflow-hidden">
            <motion.h2
              initial={reduceMotion ? { opacity: 0 } : { y: "105%" }}
              animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
              transition={{ duration: reduceMotion ? 0.2 : 0.9, delay: reduceMotion ? 0 : 0.09, ease: [0.76, 0, 0.24, 1] }}
              className="font-anton text-[clamp(3rem,10.5vw,9.5rem)] leading-[0.85] tracking-tighter uppercase text-white/[0.18]"
            >
              MOMENTS.
            </motion.h2>
          </div>

          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.55, duration: reduceMotion ? 0.2 : 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="md:max-w-[280px] shrink-0"
          >
            <p className="text-[13px] text-white/35 font-light leading-relaxed mb-5">
              Hi! I&apos;m a photographer who loves chasing good light and honest moments.
              Drawn to the small details — expressions, textures, and the way a single
              photo can hold an entire story.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border border-white/20 px-6 py-3 font-anton text-xs tracking-[0.2em] uppercase hover:border-[#585a5a] hover:text-[#585a5a] transition-colors duration-300"
            >
              REACH OUT
              <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE TICKER ───────────────────────────────────────────────── */}
      <div className="overflow-hidden border-b border-white/[0.06] py-3 my-8">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee 35s linear infinite" }}
        >
          <span className="text-[9px] tracking-[0.32em] uppercase text-white/[0.18]">{ticker}</span>
          <span className="text-[9px] tracking-[0.32em] uppercase text-white/[0.18]" aria-hidden>{ticker}</span>
        </div>
      </div>

      {/* ── ASYMMETRIC 12-COLUMN GRID ─────────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-[2px] md:gap-[3px]">
        {images.map((src, i) => {
          const [colClass, aspectClass, imgSizes] = GRID[i];
          return (
            <motion.button
              key={src}
              type="button"
              onClick={() => setLbIndex(i)}
              aria-label={`Open featured work ${i + 1} of ${images.length} in the photo viewer`}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: reduceMotion ? 0.2 : 0.5,
                delay:    reduceMotion ? 0 : (i % 4) * 0.055,
                ease:     [0.22, 1, 0.36, 1],
              }}
              className={`${colClass} ${aspectClass} bg-neutral-950 overflow-hidden relative group cursor-pointer`}
            >
              <Image
                src={src}
                alt={`Featured work ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 md:group-hover:scale-[1.05]"
                sizes={imgSizes}
                priority={i < 2}
              />
              {/* Card index */}
              <div className="absolute top-3 left-3 z-10 pointer-events-none">
                <span className="text-[9px] text-white/25 tracking-[0.15em]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              {/* Hover vignette */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
            </motion.button>
          );
        })}
      </div>

      {lbIndex !== null && (
        <Lightbox
          index={lbIndex}
          images={images}
          onClose={() => setLbIndex(null)}
          setIndex={setLbIndex}
        />
      )}
    </div>
  );
}
