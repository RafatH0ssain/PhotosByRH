"use client";
import { useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "@/components/Lightbox";
import { useReveal } from "@/components/useReveal";

import images from "./home-images";

/* 12-column asymmetric grid — [span classes, aspect hint, sizes hint].
   Row height resolves to the tallest cell in the row: a stretched grid item
   has a definite height, which makes `aspect-ratio` inert, so every row lines
   up and object-cover absorbs the difference. The aspect class is therefore a
   rhythm hint, not a hard ratio. */
const GRID: [string, string, string][] = [
  ["col-span-12 md:col-span-7", "aspect-[4/5]",   "(max-width: 768px) 100vw, 58vw"],
  ["col-span-12 md:col-span-5", "aspect-[4/5]",   "(max-width: 768px) 100vw, 42vw"],

  ["col-span-6  md:col-span-4", "aspect-square",  "(max-width: 768px) 50vw, 33vw"],
  ["col-span-6  md:col-span-4", "aspect-square",  "(max-width: 768px) 50vw, 33vw"],
  ["col-span-12 md:col-span-4", "aspect-square",  "(max-width: 768px) 100vw, 33vw"],

  ["col-span-12 md:col-span-8", "aspect-[16/10]", "(max-width: 768px) 100vw, 66vw"],
  ["col-span-12 md:col-span-4", "aspect-[16/10]", "(max-width: 768px) 100vw, 33vw"],

  ["col-span-6  md:col-span-5", "aspect-[4/5]",   "(max-width: 768px) 50vw, 42vw"],
  ["col-span-6  md:col-span-7", "aspect-[4/5]",   "(max-width: 768px) 50vw, 58vw"],

  ["col-span-6  md:col-span-4", "aspect-square",  "(max-width: 768px) 50vw, 33vw"],
  ["col-span-6  md:col-span-4", "aspect-square",  "(max-width: 768px) 50vw, 33vw"],
  ["col-span-12 md:col-span-4", "aspect-square",  "(max-width: 768px) 100vw, 33vw"],

  ["col-span-12 md:col-span-5", "aspect-[4/5]",   "(max-width: 768px) 100vw, 42vw"],
  ["col-span-12 md:col-span-7", "aspect-[4/5]",   "(max-width: 768px) 100vw, 58vw"],

  ["col-span-6  md:col-span-6", "aspect-[4/3]",   "(max-width: 768px) 50vw, 50vw"],
  ["col-span-6  md:col-span-6", "aspect-[4/3]",   "(max-width: 768px) 50vw, 50vw"],

  ["col-span-12 md:col-span-8", "aspect-[16/10]", "(max-width: 768px) 100vw, 66vw"],
  ["col-span-12 md:col-span-4", "aspect-[16/10]", "(max-width: 768px) 100vw, 33vw"],

  ["col-span-6  md:col-span-4", "aspect-square",  "(max-width: 768px) 50vw, 33vw"],
  ["col-span-6  md:col-span-4", "aspect-square",  "(max-width: 768px) 50vw, 33vw"],
  ["col-span-12 md:col-span-4", "aspect-square",  "(max-width: 768px) 100vw, 33vw"],
];

/* The first row paints straight from the HTML. Anything revealed on scroll is
   invisible until the observer runs, so keeping the LCP candidate out of that
   set means the largest image is not waiting on hydration. */
const EAGER = 4;

export default function Home() {
  const [lbIndex, setLbIndex] = useState<number | null>(null);
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <div className="mx-auto max-w-[1400px] px-6">

      {/* ── Hero ──────────────────────────────────────────────────────────────
          A CSS animation rather than a motion component: it begins at first
          paint instead of waiting for the JavaScript bundle, and runs on the
          compositor. */}
      <section className="pt-16 pb-16 text-center md:pt-28 md:pb-24">
        <h1 className="rise mx-auto max-w-[14ch] text-display text-balance">
          Capturing moments.
        </h1>

        <p
          className="rise mx-auto mt-6 max-w-[48ch] text-lead text-fg-2 text-balance"
          style={{ "--rise-delay": "90ms" } as CSSProperties}
        >
          Wildlife, sport, portraits and brand work — chasing good light and the
          small honest details that hold an entire story.
        </p>

        <div
          className="rise mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ "--rise-delay": "180ms" } as CSSProperties}
        >
          <Link
            href="/contact"
            className="rounded-pill bg-fg px-7 py-3 text-body font-medium text-canvas transition-[transform,background-color] duration-150 ease-out hover:bg-white active:scale-[0.97]"
          >
            Get in touch
          </Link>
          <Link
            href="/about"
            className="group inline-flex items-center gap-1.5 rounded-pill px-3 py-3 text-body font-medium text-fg transition-transform duration-150 ease-out active:scale-[0.97]"
          >
            About me
            <span
              aria-hidden
              className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
            >
              &rsaquo;
            </span>
          </Link>
        </div>
      </section>

      {/* ── Selected work ─────────────────────────────────────────────────── */}
      <section className="pb-24">
        <h2 className="mb-6 text-headline text-fg-2">Selected work</h2>

        <div ref={gridRef} className="grid grid-cols-12 gap-2.5 md:gap-4">
          {images.map((src, i) => {
            const [colClass, aspectClass, imgSizes] = GRID[i];
            const eager = i < EAGER;

            return (
              <button
                key={src.src}
                type="button"
                onClick={() => setLbIndex(i)}
                aria-label={`Open featured photograph ${i + 1} of ${images.length}`}
                {...(eager ? {} : { "data-reveal": "" })}
                style={eager ? undefined : ({ "--reveal-delay": `${(i % 3) * 40}ms` } as CSSProperties)}
                className={`${colClass} ${aspectClass} group relative overflow-hidden rounded-card bg-elevated transition-transform duration-200 ease-out active:scale-[0.985]`}
              >
                <Image
                  src={src}
                  alt={`Featured photograph ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  sizes={imgSizes}
                  placeholder="blur"
                  priority={eager}
                />
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Closing CTA ───────────────────────────────────────────────────── */}
      <section className="border-t border-hairline py-20 text-center md:py-28">
        <h2 className="mx-auto max-w-[18ch] text-title text-balance">
          Have something in mind?
        </h2>
        <p className="mx-auto mt-5 max-w-[42ch] text-lead text-fg-2 text-balance">
          Bookings, quotes, or just to say hi — I read everything that comes in.
        </p>
        <Link
          href="/contact"
          className="mt-9 inline-block rounded-pill bg-fg px-7 py-3 text-body font-medium text-canvas transition-[transform,background-color] duration-150 ease-out hover:bg-white active:scale-[0.97]"
        >
          Start a conversation
        </Link>
      </section>

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
