"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Lightbox from "@/components/Lightbox";

export default function FilmGallery() {
  const images = [
    "/Film/Film (1).webp", "/Film/Film (2).webp", "/Film/Film (3).webp",
    "/Film/Film (4).webp", "/Film/Film (5).webp", "/Film/Film (6).webp",
  ];

  const [index, setIndex] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <h1 className="font-anton text-5xl md:text-7xl mb-10 uppercase tracking-tighter">
        Film
      </h1>
      <p className="font-sans text-gray-400 mb-8 tracking-wide">
        Embracing the traditional analog process. I primarily shoot black and white film and hand-develop every roll at home, bringing a raw, timeless, and tactile quality to my images.
      </p>
      
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
              alt={`Film Photo ${i + 1}`}
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
