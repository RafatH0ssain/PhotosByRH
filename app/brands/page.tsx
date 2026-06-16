"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Lightbox from "@/components/Lightbox";

const images = [
  "/Brand(s)/Brands (1).webp", "/Brand(s)/Brands (2).webp", "/Brand(s)/Brands (3).webp",
  "/Brand(s)/Brands (4).webp", "/Brand(s)/Brands (5).webp", "/Brand(s)/Brands (6).webp",
  "/Brand(s)/Brands (7).webp", "/Brand(s)/Brands (8).webp", "/Brand(s)/Brands (9).webp",
];

export default function BrandsGallery() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24">

      {/* Ghost number */}
      <div className="relative select-none pointer-events-none" aria-hidden>
        <span
          className="absolute -top-4 -left-2 font-anton text-[clamp(6rem,22vw,18rem)] leading-none tracking-tighter uppercase text-white"
          style={{ opacity: 0.03 }}
        >
          05
        </span>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-8 mb-10">
        <div className="overflow-hidden mb-3">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.78, ease: [0.76, 0, 0.24, 1] }}
            className="font-anton text-[clamp(2.5rem,7vw,6rem)] uppercase leading-none tracking-tighter"
          >
            Brands
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-[13px] text-white/35 max-w-lg leading-relaxed font-light"
        >
          Helping businesses tell their visual story. Clean, compelling images that
          showcase products, services, and identity to connect with an audience.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-[2px] md:gap-[3px]">
        {images.map((src, i) => (
          <motion.div
            key={i}
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, margin: "200px" }}
            transition={{ duration: 0.72, delay: (i % 3) * 0.07, ease: [0.76, 0, 0.24, 1] }}
            className="gallery-card aspect-[4/5] bg-neutral-950 overflow-hidden relative group cursor-pointer"
            onClick={() => setIndex(i)}
          >
            <Image
              src={src}
              alt={`Brand image ${i + 1}`}
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
          </motion.div>
        ))}
      </div>

      {index !== null && (
        <Lightbox index={index} images={images} onClose={() => setIndex(null)} setIndex={setIndex} />
      )}
    </div>
  );
}
