"use client";
import { motion } from "framer-motion";

export default function GalleryPage() {
  const images = [
    "/Brand(s)/Brands (1).jpg",
    "/Brand(s)/Brands (2).jpg",
    "/Brand(s)/Brands (3).jpg",
    "/Brand(s)/Brands (4).jpg",
    "/Brand(s)/Brands (5).jpg",
    "/Brand(s)/Brands (6).jpg",
    "/Brand(s)/Brands (7).jpg",
    "/Brand(s)/Brands (8).jpg",
    "/Brand(s)/Brands (9).jpg",
    "/Brand(s)/Brands (10).jpg",
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <h1 className="font-anton text-5xl mb-10 uppercase">Corporate Portfolio</h1>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((src, i) => (
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