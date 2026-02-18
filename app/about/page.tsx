"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 pb-20 pt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        
        {/* Your Photo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[3/4] w-full md:max-w-md bg-neutral-900 overflow-hidden rounded-sm"
        >
          {/* Ensure you have a photo named 'Me.jpg' in a folder named 'About' inside public */}
          <Image 
            src="/About/Me.jpg" 
            alt="Portrait of the Photographer"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            priority
          />
        </motion.div>

        {/* The Text */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-col justify-center"
        >
          <h1 className="font-anton text-6xl md:text-8xl mb-8 uppercase leading-none tracking-tighter">
            Behind <br /> The Lens.
          </h1>
          
          <div className="space-y-6 text-lg text-gray-300 font-light leading-relaxed">
            <p>
              Hi, I’m <span className="text-white font-medium">Rafat</span>. 
              Photography started for me as a way to hold onto moments that felt important, 
              even if they were small. Over time, it became my way of speaking—capturing 
              the honest energy of a sports match, the quiet personality of a pet, or the 
              bold identity of a brand.
            </p>
            <p>
              My style is simple: <span className="text-white italic">chasing good light and real emotion.</span> 
              I don't like to overcomplicate things. Whether I'm in a studio or outdoors, 
              my goal is to create images that feel authentic and timeless.
            </p>
            <p>
              When I'm not shooting, I'm probably editing with a good playlist on or scouting 
              new locations. Thanks for stopping by my portfolio.
            </p>
          </div>

          <div className="mt-10">
            <a 
              href="/contact" 
              className="inline-block border-b border-white pb-1 font-anton text-xl tracking-wide hover:text-gray-400 transition-colors"
            >
              LET'S WORK TOGETHER!
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}