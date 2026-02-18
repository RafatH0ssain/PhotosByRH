"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function WildlifeGallery() {
  // Make sure you have a folder named 'Wildlife' in your public directory
  // and images named Wildlife (1).jpg, etc.
  const images = [
    "/Wildlife/Wildlife (1).jpg", 
    "/Wildlife/Wildlife (2).jpg", 
    "/Wildlife/Wildlife (3).jpg",
    "/Wildlife/Wildlife (4).jpg", 
    "/Wildlife/Wildlife (5).jpg", 
    "/Wildlife/Wildlife (6).jpg",
    "/Wildlife/Wildlife (7).jpg", 
    "/Wildlife/Wildlife (8).jpg", 
    "/Wildlife/Wildlife (9).jpg",
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <h1 className="font-anton text-5xl md:text-7xl mb-10 uppercase tracking-tighter">
        Wildlife Photography
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
              alt={`Wildlife Shot ${i + 1}`}
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