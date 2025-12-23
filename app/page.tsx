"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // Array of your 9 main landing page images
  const images = [
    "/Landing/Home (1).jepg",
    "/Landing/Home (1).jpg",
    "/Landing/Home (2).JPG",
    "/Landing/Home (3).JPG",
    "/Landing/Home (4).JPG",
    "/Landing/Home (5).jpg",
    "/Landing/Home (6).jpg",
    "/Landing/Home (7).jpg",
    "/Landing/Home (8).jpg",
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      {/* Hero Section */}
      <section className="py-12 md:py-20 border-b border-white/5 mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-anton text-7xl md:text-9xl mb-10 uppercase leading-none tracking-tighter"
        >
          Capturing <br /> Moments.
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl"
        >
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light italic mb-6">
            Hi! I’m a photographer who loves chasing good light and honest moments. 
            I’m drawn to the small details — expressions, textures, colors, and the 
            way a single photo can hold an entire story.
          </p>
          <p className="text-gray-400 leading-relaxed mb-8">
            I like keeping things simple, whether I’m shooting people, places, or everyday life. 
            Photography is my way of slowing down and noticing the things we usually rush past. 
            If my photos make you feel something or see the world a little differently, 
            that means a lot to me.
          </p>
          <Link 
            href="/contact" 
            className="inline-block border border-white px-8 py-3 font-anton hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-sm"
          >
            Reach out for quotes
          </Link>
        </motion.div>
      </section>
      
      {/* 9-Image Grid */}
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
              alt={`Featured Work ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={i < 3}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}