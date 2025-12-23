"use client";
import { motion } from "framer-motion";

export default function GalleryPage() {
  const personalImages = [
    "/Personal Event(s)/Personal (1).jpg",
    "/Personal Event(s)/Personal (2).jpg",
    "/Personal Event(s)/Personal (3).jpg",
    "/Personal Event(s)/Personal (4).jpg",
    "/Personal Event(s)/Personal (5).jpg",
    "/Personal Event(s)/Personal (6).jpg",
    "/Personal Event(s)/Personal (7).jpg",
    "/Personal Event(s)/Personal (8).jpg",
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <h1 className="font-anton text-5xl mb-10 uppercase">Corporate Portfolio</h1>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {personalImages.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="w-full bg-neutral-900 rounded-lg overflow-hidden"
            style={{ height: i % 2 === 0 ? "400px" : "250px" }}
          >
            <img src={src} className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}