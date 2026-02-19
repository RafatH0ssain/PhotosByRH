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
        className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl"
      >
        {/* Invisible background click zone to close */}
        <div className="absolute inset-0 z-[10000]" onClick={onClose} />

        {/* THE FIX: 
          1. h-[100dvh] forces the container to respect the true mobile screen size.
          2. pointer-events-none on the wrapper ensures the click passes through to the background.
        */}
        <div className="absolute inset-0 w-full h-[100dvh] p-4 md:p-12 pointer-events-none">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full h-full pointer-events-auto"
          >
            {/* object-contain guarantees the image shrinks to fit the container 
              WITHOUT cropping any edges.
            */}
            <Image
              src={images[index]}
              alt="Expanded view"
              fill
              className="object-contain drop-shadow-2xl"
              sizes="100vw"
              priority
            />
          </motion.div>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-white text-5xl font-light hover:text-gray-300 z-[10001] p-2"
        >
          &times;
        </button>

        {/* Previous Button (Desktop) */}
        <button 
          onClick={(e) => { e.stopPropagation(); showPrev(); }}
          className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl font-thin hover:text-gray-400 p-8 z-[10001]"
        >
          &#8249;
        </button>

        {/* Next Button (Desktop) */}
        <button 
          onClick={(e) => { e.stopPropagation(); showNext(); }}
          className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl font-thin hover:text-gray-400 p-8 z-[10001]"
        >
          &#8250;
        </button>

        {/* Mobile Navigation Hint */}
        <div className="absolute bottom-8 left-0 right-0 text-center text-xs text-gray-500 md:hidden z-[10001] pointer-events-none">
          Tap edges to navigate
        </div>
        
        {/* Invisible Click Zones for Mobile Nav */}
        <div className="absolute inset-y-0 left-0 w-1/3 z-[10001] md:hidden" onClick={(e) => { e.stopPropagation(); showPrev(); }} />
        <div className="absolute inset-y-0 right-0 w-1/3 z-[10001] md:hidden" onClick={(e) => { e.stopPropagation(); showNext(); }} />

      </motion.div>
    </AnimatePresence>
  );
}