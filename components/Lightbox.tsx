"use client";
import { motion } from "framer-motion";
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
    <div className="fixed inset-0 z-[9999] bg-black/98">
      
      {/* 1. Background Click Zone to Close */}
      <div className="absolute inset-0 z-[10000] cursor-pointer" onClick={onClose} />

      {/* 2. THE IMAGE: Absolutely positioned directly to the screen edges. 
          No flex containers. No wrappers. Just the image locked to the viewport.
          The p-4 and md:p-12 give it breathing room so it doesn't touch the very edge.
      */}
      <motion.img
        key={index}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        src={images[index]}
        alt="Expanded view"
        // Force the image to act as a background cover layer natively
        className="absolute inset-0 w-full h-full object-contain p-0 pb-12 md:p-12 z-[10001] pointer-events-none drop-shadow-2xl"
      />

      {/* 3. Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 text-white text-5xl font-light hover:text-gray-300 z-[10005] p-2"
      >
        &times;
      </button>

      {/* 4. Desktop Navigation */}
      <button 
        onClick={(e) => { e.stopPropagation(); showPrev(); }}
        className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 text-white text-6xl font-thin hover:text-gray-400 p-8 z-[10005]"
      >
        &#8249;
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); showNext(); }}
        className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 text-white text-6xl font-thin hover:text-gray-400 p-8 z-[10005]"
      >
        &#8250;
      </button>

      {/* 5. Mobile Navigation Hint & Tap Zones */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-xs text-gray-500 md:hidden z-[10005] pointer-events-none">
        Tap edges to navigate
      </div>
      
      {/* Massive invisible buttons on the left/right for mobile tapping */}
      <div 
        className="absolute inset-y-0 left-0 w-1/3 z-[10005] md:hidden cursor-pointer" 
        onClick={(e) => { e.stopPropagation(); showPrev(); }} 
      />
      <div 
        className="absolute inset-y-0 right-0 w-1/3 z-[10005] md:hidden cursor-pointer" 
        onClick={(e) => { e.stopPropagation(); showNext(); }} 
      />

    </div>
  );
}