"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SportsFallery() {
  // Make sure to create a folder named "Sports" in your public directory
  const images = [
    "/Sports/Sports (1).jpg", "/Sports/Sports (2).jpg", "/Sports/Sports (3).jpg",
    "/Sports/Sports (4).jpg", "/Sports/Sports (5).jpg", "/Sports/Sports (6).jpg",
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <h1 className="font-anton text-5xl md:text-7xl mb-10 uppercase tracking-tighter">
        Sports Portraits
      </h1>
      {/* Responsive Grid: 1 col mobile, 3 col desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((src, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.6 }}
            className="aspect-[4/5] bg-neutral-900 overflow-hidden relative group rounded-sm"
          >
            <Image 
              src={src}
              alt={`Sports Photo ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 md:group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={i < 2}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}