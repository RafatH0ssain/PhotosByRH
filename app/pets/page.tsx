"use client";
import { useState } from "react"; 
import { motion } from "framer-motion";
import Image from "next/image";
import Lightbox from "@/components/Lightbox";

export default function PetsGallery() {
  const images = [
    "/Pets/Pets (1).jpg", "/Pets/Pets (2).jpg", "/Pets/Pets (3).jpg",
    "/Pets/Pets (4).jpg", "/Pets/Pets (5).jpg", "/Pets/Pets (6).jpg",
  ];

  // State to track which image is open (null = closed)
  const [index, setIndex] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <h1 className="font-anton text-5xl md:text-7xl mb-10 uppercase tracking-tighter">
        Pet Portraits
      </h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {images.map((src, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.6 }}
            // Cursor pointer tells user it's clickable
            className="aspect-[4/5] bg-neutral-900 overflow-hidden relative group rounded-sm cursor-pointer"
            onClick={() => setIndex(i)} // Opens Lightbox at this index
          >
            <Image 
              src={src}
              alt={`Pet Portrait ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 md:group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw" // Optimized sizes
              priority={i < 4}
            />
            
            {/* Optional: Hover overlay icon (Desktop only) */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
               <span className="text-white text-3xl font-light">+</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Render Lightbox only if an index is selected */}
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