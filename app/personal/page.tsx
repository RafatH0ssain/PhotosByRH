"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Lightbox from "@/components/Lightbox";

export default function PersonalGallery() {
  const personalImages = [
    "/Personal Event(s)/Personal (2).webp",
    "/Personal Event(s)/Personal (3).webp",
    "/Personal Event(s)/Personal (4).webp",
    "/Personal Event(s)/Personal (5).webp",
    "/Personal Event(s)/Personal (1).webp",
    "/Personal Event(s)/Personal (6).webp",
    "/Personal Event(s)/Personal (7).webp",
    "/Personal Event(s)/Personal (8).webp",
  ];

  const [index, setIndex] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <h1 className="font-anton text-5xl md:text-7xl mb-10 uppercase tracking-tighter">
        Personal Projects
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {personalImages.map((src, i) => (
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
              alt={`Personal ${i + 1}`}
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
          images={personalImages} 
          onClose={() => setIndex(null)} 
          setIndex={setIndex} 
        />
      )}
    </div>
  );
}