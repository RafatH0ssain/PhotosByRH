"use client";
import { motion } from "framer-motion";

export default function GalleryPage() {
  const corporateImages = [
    "/Corporate Event(s)/Corporate (1).jpg",
    "/Corporate Event(s)/Corporate (2).jpg",
    "/Corporate Event(s)/Corporate (3).jpg",
    "/Corporate Event(s)/Corporate (4).jpg",
    "/Corporate Event(s)/Corporate (5).jpg",
    "/Corporate Event(s)/Corporate (6).jpg",
    "/Corporate Event(s)/Corporate (7).jpg",
    "/Corporate Event(s)/Corporate (8).jpg",
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <h1 className="font-anton text-5xl mb-10 uppercase">Corporate Portfolio</h1>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {corporateImages.map((src, i) => (
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