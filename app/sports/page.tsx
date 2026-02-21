"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Lightbox from "@/components/Lightbox";

export default function SportsGallery() {
  const images = [
    "/Sports/Sports (1).webp", "/Sports/Sports (2).webp", "/Sports/Sports (3).webp",
    "/Sports/Sports (4).webp", "/Sports/Sports (5).webp", "/Sports/Sports (6).webp",
    "/Sports/Sports (7).webp", "/Sports/Sports (8).webp", "/Sports/Sports (9).webp",
  ];

  const [index, setIndex] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <h1 className="font-anton text-5xl md:text-7xl mb-10 uppercase tracking-tighter">
        Sports Portraits
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {images.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.6 }}
            className="aspect-[4/5] bg-neutral-900 overflow-hidden relative group rounded-sm cursor-pointer"
            onClick={() => setIndex(i)}
          >
            <Image
              src={src}
              alt={`Sports Photo ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 md:group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
              priority={i < 4}
            />
          </motion.div>
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