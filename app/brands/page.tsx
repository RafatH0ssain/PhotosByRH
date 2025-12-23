"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export const metadata = {
  title: "Brands",
};

export default function GalleryPage() {
  const images = [
    "/Brand(s)/Brands (1).jpeg",
    "/Brand(s)/Brands (1).jpg",
    "/Brand(s)/Brands (2).JPG",
    "/Brand(s)/Brands (3).JPG",
    "/Brand(s)/Brands (4).JPG",
    "/Brand(s)/Brands (5).JPG",
    "/Brand(s)/Brands (6).jpg",
    "/Brand(s)/Brands (7).jpg",
    "/Brand(s)/Brands (8).jpg",
    "/Brand(s)/Brands (9).jpg",
    "/Brand(s)/Brands (10).jpg",
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }} // Triggers slightly before the image is visible
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative w-full break-inside-avoid rounded-lg overflow-hidden bg-neutral-900"
          >
            <Image
              src={src}
              alt={`Gallery image ${i}`}
              width={800} // Set a base width
              height={1200} // Set a base height (it will auto-adjust with sizes)
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={i < 3} // Loads the first 3 images immediately
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}