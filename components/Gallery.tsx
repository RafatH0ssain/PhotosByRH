"use client";
import { useState, type CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import Lightbox from "@/components/Lightbox";
import { useReveal } from "@/components/useReveal";

interface GalleryProps {
  title:     string;
  blurb:     string;
  images:    StaticImageData[];
  /** Prefix for each image's alt text, e.g. "Wildlife" -> "Wildlife 3" */
  altPrefix: string;
}

/* First row paints from the HTML so the LCP image never waits on hydration */
const EAGER = 6;

/**
 * Shared gallery page. Previously this markup was copy-pasted across seven
 * route files that differed only in their data, which meant every fix had to
 * be applied seven times and kept in sync.
 */
export default function Gallery({ title, blurb, images, altPrefix }: GalleryProps) {
  const [index, setIndex] = useState<number | null>(null);
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-24">

      <header className="pt-16 pb-12 md:pt-24 md:pb-16">
        <h1 className="rise max-w-[16ch] text-title text-balance">{title}</h1>
        <p
          className="rise mt-5 max-w-[54ch] text-lead text-fg-2"
          style={{ "--rise-delay": "90ms" } as CSSProperties}
        >
          {blurb}
        </p>
      </header>

      {/* Each cell is a real <button>, so it is reachable by Tab and activates
          on Enter / Space without any extra key handling. */}
      <div ref={gridRef} className="grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-4">
        {images.map((src, i) => {
          const eager = i < EAGER;

          return (
            <button
              key={src.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Open ${altPrefix.toLowerCase()} photograph ${i + 1} of ${images.length}`}
              {...(eager ? {} : { "data-reveal": "" })}
              style={eager ? undefined : ({ "--reveal-delay": `${(i % 3) * 40}ms` } as CSSProperties)}
              className="group relative aspect-[4/5] overflow-hidden rounded-card bg-elevated transition-transform duration-200 ease-out active:scale-[0.985]"
            >
              <Image
                src={src}
                alt={`${altPrefix} ${i + 1}`}
                fill
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 50vw, 33vw"
                placeholder="blur"
                priority={eager}
              />
            </button>
          );
        })}
      </div>

      {index !== null && (
        <Lightbox
          index={index}
          images={images}
          onClose={() => setIndex(null)}
          setIndex={setIndex}
        />
      )}
    </div>
  );
}
