"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Lightbox from "@/components/Lightbox";

export default function GalleryPage() {
  const images = [
    "/Brand(s)/Brands (1).webp",
    "/Brand(s)/Brands (2).webp",
    "/Brand(s)/Brands (4).webp",
    "/Brand(s)/Brands (5).webp",
    "/Brand(s)/Brands (6).webp",
    "/Brand(s)/Brands (7).webp",
    "/Brand(s)/Brands (8).webp",
    "/Brand(s)/Brands (9).webp",
    "/Brand(s)/Brands (10).webp",
  ];

  const [index, setIndex] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <h1 className="font-anton text-5xl md:text-7xl mb-10 uppercase tracking-tighter">
        Brand Portfolio
      </h1>
      <p className="font-sans text-gray-400 mb-8 tracking-wide">
        Helping businesses tell their visual story. I create clean, compelling images that showcase your products, services, and unique identity to connect with your audience.
      </p>

      {/* FIXED: grid-cols-2 for mobile, grid-cols-3 for desktop */}
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
              alt={`Brand Image ${i + 1}`}
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