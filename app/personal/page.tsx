"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PersonalGallery() {
  const personalImages = [
    "/Personal Event(s)/Personal (1).jpg",
    "/Personal Event(s)/Personal (2).jpg",
    "/Personal Event(s)/Personal (3).jpg",
    "/Personal Event(s)/Personal (4).jpg",
    "/Personal Event(s)/Personal (5).jpg",
    "/Personal Event(s)/Personal (6).jpg",
    "/Personal Event(s)/Personal (7).JPG",
    "/Personal Event(s)/Personal (8).JPG",
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <h1 className="font-anton text-5xl mb-10 uppercase">Personal Portfolio</h1>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {personalImages.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full bg-neutral-900 rounded-lg overflow-hidden relative"
            style={{ height: i % 2 === 0 ? "400px" : "250px" }}
          >
            <Image 
              src={src} 
              alt={`Personal ${i + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={i < 3}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}