"use client";
import { motion } from "framer-motion";

export default function Home() {
  const images = Array(9).fill(null); // Replace with your image paths

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-anton text-6xl md:text-8xl mb-12 uppercase"
      >
        Capturing <br /> Moments.
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((_, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="aspect-square bg-neutral-900 overflow-hidden group relative"
          >
             <div className="absolute inset-0 flex items-center justify-center text-neutral-700">Image {i+1}</div>
             {/* Replace div above with: <img src={`/img${i}.jpg`} className="object-cover w-full h-full group-hover:scale-110 transition duration-500" /> */}
          </motion.div>
        ))}
      </div>
    </div>
  );
}