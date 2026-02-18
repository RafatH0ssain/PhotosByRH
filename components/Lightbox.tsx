"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

interface LightboxProps {
  index: number;
  images: string[];
  onClose: () => void;
  setIndex: (newIndex: number) => void;
}

export default function Lightbox({ index, images, onClose, setIndex }: LightboxProps) {
  // Handle Keyboard Navigation (Arrow Keys + Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index]); // eslint-disable-line

  const showNext = () => setIndex((index + 1) % images.length);
  const showPrev = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose} // Clicking background closes it
        className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
      >
        {/* Close Button */}
        <button className="absolute top-6 right-6 text-white text-4xl font-light hover:text-gray-300 z-[210]">&times;</button>

        {/* Previous Button (Hidden on tiny screens, tap edges instead) */}
        <button 
          onClick={(e) => { e.stopPropagation(); showPrev(); }}
          className="hidden md:block absolute left-4 text-white text-5xl font-thin hover:text-gray-400 p-4 z-[210]"
        >
          &#8249;
        </button>

        {/* Main Image */}
        <motion.div
          key={index} // Triggers animation when index changes
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl aspect-[3/4] md:aspect-[3/2]"
          onClick={(e) => e.stopPropagation()} // Clicking image DOES NOT close it
        >
          <Image
            src={images[index]}
            alt="Expanded view"
            fill
            className="object-contain"
            quality={100}
            priority
          />
        </motion.div>

        {/* Next Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); showNext(); }}
          className="hidden md:block absolute right-4 text-white text-5xl font-thin hover:text-gray-400 p-4 z-[210]"
        >
          &#8250;
        </button>

        {/* Mobile Navigation Hint (Bottom) */}
        <div className="absolute bottom-6 left-0 right-0 text-center text-xs text-gray-500 md:hidden">
          Tap edges to navigate • Tap outside to close
        </div>
        
        {/* Invisible Click Zones for Mobile Nav */}
        <div className="absolute inset-y-0 left-0 w-1/4 z-[205] md:hidden" onClick={(e) => { e.stopPropagation(); showPrev(); }} />
        <div className="absolute inset-y-0 right-0 w-1/4 z-[205] md:hidden" onClick={(e) => { e.stopPropagation(); showNext(); }} />

      </motion.div>
    </AnimatePresence>
  );
}