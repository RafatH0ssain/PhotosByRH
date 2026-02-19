"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface LightboxProps {
  index: number;
  images: string[];
  onClose: () => void;
  setIndex: (newIndex: number) => void;
}

export default function Lightbox({ index, images, onClose, setIndex }: LightboxProps) {
  // Handle Keyboard Navigation
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
        onClick={onClose}
        className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-2 md:p-8"
      >
        {/* Close Button */}
        <button className="absolute top-4 right-4 md:top-6 md:right-6 text-white text-4xl font-light hover:text-gray-300 z-[210]">
          &times;
        </button>

        {/* Previous Button (Desktop) */}
        <button 
          onClick={(e) => { e.stopPropagation(); showPrev(); }}
          className="hidden md:block absolute left-4 text-white text-5xl font-thin hover:text-gray-400 p-4 z-[210]"
        >
          &#8249;
        </button>

        {/* Main Image Container */}
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative flex items-center justify-center w-full h-full max-h-[85vh] md:max-h-[90vh]"
          onClick={(e) => e.stopPropagation()} 
        >
          {/* FIX: Using a standard img tag with w-auto h-auto.
            This guarantees the image will NEVER crop, stretch, or squash,
            regardless of if it is horizontal or vertical on a phone.
          */}
          <img
            src={images[index]}
            alt="Expanded view"
            className="w-auto h-auto max-w-full max-h-full object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Next Button (Desktop) */}
        <button 
          onClick={(e) => { e.stopPropagation(); showNext(); }}
          className="hidden md:block absolute right-4 text-white text-5xl font-thin hover:text-gray-400 p-4 z-[210]"
        >
          &#8250;
        </button>

        {/* Mobile Navigation Hint */}
        <div className="absolute bottom-6 left-0 right-0 text-center text-xs text-gray-500 md:hidden z-[210]">
          Tap edges to navigate • Tap outside to close
        </div>
        
        {/* Invisible Click Zones for Mobile Nav */}
        <div className="absolute inset-y-0 left-0 w-1/4 z-[205] md:hidden" onClick={(e) => { e.stopPropagation(); showPrev(); }} />
        <div className="absolute inset-y-0 right-0 w-1/4 z-[205] md:hidden" onClick={(e) => { e.stopPropagation(); showNext(); }} />

      </motion.div>
    </AnimatePresence>
  );
}