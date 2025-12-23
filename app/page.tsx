"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const images = [
    "/Landing/Home (1).jpeg", "/Landing/Home (1).jpg", "/Landing/Home (2).JPG",
    "/Landing/Home (3).JPG", "/Landing/Home (4).JPG", "/Landing/Home (5).jpg",
    "/Landing/Home (6).jpg", "/Landing/Home (7).jpg", "/Landing/Home (8).jpg",
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <section className="py-10 md:py-24 border-b border-white/5 mb-12 md:mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-anton text-5xl sm:text-7xl md:text-9xl mb-8 md:mb-10 uppercase leading-[0.9] tracking-tighter"
        >
          Capturing <br /> Moments.
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl"
        >
          <p className="text-base md:text-xl text-gray-300 leading-relaxed font-light italic mb-6">
            Hi! I’m a photographer who loves chasing good light and honest moments. 
            I’m drawn to the small details — expressions, textures, colors, and the 
            way a single photo can hold an entire story.
          </p>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-8">
            I like keeping things simple... Photography is my way of slowing down.
          </p>
          <Link 
            href="/contact" 
            className="w-full md:w-auto text-center inline-block border border-white px-8 py-4 font-anton hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-sm"
          >
            Reach out for quotes
          </Link>
        </motion.div>
      </section>
      
      {/* RESPONSIVE GRID: 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {images.map((src, i) => (
          <motion.div 
            key={src + i}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.6 }}
            className="aspect-[4/5] bg-neutral-900 overflow-hidden relative group rounded-sm"
          >
            <Image 
              src={src}
              alt={`Featured Work ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 md:group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={i < 2}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}