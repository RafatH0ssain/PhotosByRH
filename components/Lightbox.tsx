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
        className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl"
      >
        {/* Invisible background click zone to close */}
        <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

        {/* THE FIX: An absolute overlay just for centering. 
          pointer-events-none ensures you can still click the background through it.
        */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-2 pb-16 md:p-12">
          <motion.img
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            src={images[index]}
            alt="Expanded view"
            // Inline style forces 'contain' so it NEVER crops.
            style={{ objectFit: "contain" }}
            className="w-auto h-auto max-w-full max-h-full pointer-events-auto drop-shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-white text-4xl font-light hover:text-gray-300 z-[10000]"
        >
          &times;
        </button>

        {/* Previous Button (Desktop) */}
        <button 
          onClick={(e) => { e.stopPropagation(); showPrev(); }}
          className="hidden md:block absolute left-4 text-white text-5xl font-thin hover:text-gray-400 p-4 z-[10000]"
        >
          &#8249;
        </button>

        {/* Next Button (Desktop) */}
        <button 
          onClick={(e) => { e.stopPropagation(); showNext(); }}
          className="hidden md:block absolute right-4 text-white text-5xl font-thin hover:text-gray-400 p-4 z-[10000]"
        >
          &#8250;
        </button>

        {/* Mobile Navigation Hint */}
        <div className="absolute bottom-6 left-0 right-0 text-center text-xs text-gray-500 md:hidden z-[10000]">
          Tap edges to navigate • Tap outside to close
        </div>
        
        {/* Invisible Click Zones for Mobile Nav */}
        <div className="absolute inset-y-0 left-0 w-1/3 z-[10000] md:hidden" onClick={(e) => { e.stopPropagation(); showPrev(); }} />
        <div className="absolute inset-y-0 right-0 w-1/3 z-[10000] md:hidden" onClick={(e) => { e.stopPropagation(); showNext(); }} />

      </motion.div>
    </AnimatePresence>
  );
}