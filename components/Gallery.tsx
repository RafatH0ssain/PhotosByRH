"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Lightbox from "@/components/Lightbox";

interface GalleryProps {
  /** Ghost numeral behind the heading — matches the nav ordering */
  number:    string;
  title:     string;
  blurb:     string;
  images:    string[];
  /** Prefix for each image's alt text, e.g. "Wildlife" -> "Wildlife 3" */
  altPrefix: string;
}

/**
 * Shared gallery page. Previously this markup was copy-pasted across seven
 * route files that differed only in their data, which meant every fix had to
 * be applied seven times and kept in sync.
 */
export default function Gallery({ number, title, blurb, images, altPrefix }: GalleryProps) {
  const [index, setIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24">

      {/* Ghost number */}
      <div className="relative select-none pointer-events-none" aria-hidden>
        <span
          className="absolute -top-4 -left-2 font-anton text-[clamp(6rem,22vw,18rem)] leading-none tracking-tighter uppercase text-white"
          style={{ opacity: 0.03 }}
        >
          {number}
        </span>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-8 mb-10">
        <div className="overflow-hidden mb-3">
          <motion.h1
            initial={reduceMotion ? { opacity: 0 } : { y: "100%" }}
            animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.78, ease: [0.76, 0, 0.24, 1] }}
            className="font-anton text-[clamp(2.5rem,7vw,6rem)] uppercase leading-none tracking-tighter"
          >
            {title}
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduceMotion ? 0 : 0.35, duration: reduceMotion ? 0.2 : 0.6 }}
          className="text-[13px] text-white/35 max-w-lg leading-relaxed font-light"
        >
          {blurb}
        </motion.p>
      </div>

      {/* Grid — each cell is a real <button>, so it is reachable by Tab and
          activates on Enter / Space without any extra key handling. */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-[2px] md:gap-[3px]">
        {images.map((src, i) => (
          <motion.button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Open ${altPrefix} ${i + 1} of ${images.length} in the photo viewer`}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0.2 : 0.5,
              delay:    reduceMotion ? 0 : (i % 3) * 0.06,
              ease:     [0.22, 1, 0.36, 1],
            }}
            className="aspect-[4/5] bg-neutral-950 overflow-hidden relative group cursor-pointer"
          >
            <Image
              src={src}
              alt={`${altPrefix} ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 md:group-hover:scale-[1.05]"
              sizes="(max-width: 768px) 50vw, 33vw"
              priority={i < 3}
            />
            <div className="absolute top-3 left-3 z-10 pointer-events-none">
              <span className="text-[9px] text-white/25 tracking-[0.15em]">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
          </motion.button>
        ))}
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
