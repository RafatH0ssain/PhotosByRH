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
    <div className="fixed inset-0 z-[9999] bg-black/98 flex items-center justify-center">
      
      {/* 1. Background Click Zone to Close */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* 2. Image Container */}
      <div className="absolute inset-0 p-0 md:p-8 pointer-events-none flex items-center justify-center">
        <motion.img
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          src={images[index]}
          alt="Expanded view"
          className="pointer-events-auto drop-shadow-2xl"
          // THE MAGIC FIX: This forces the image to perfectly fit the screen without cropping
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain"
          }}
          onClick={(e) => e.stopPropagation()} 
        />
      </div>

      {/* 3. Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 text-white text-5xl font-light hover:text-gray-300 z-[10000] p-2"
      >
        &times;
      </button>

      {/* 4. Desktop Navigation */}
      <button 
        onClick={(e) => { e.stopPropagation(); showPrev(); }}
        className="hidden md:block absolute left-4 text-white text-6xl font-thin hover:text-gray-400 p-8 z-[10000]"
      >
        &#8249;
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); showNext(); }}
        className="hidden md:block absolute right-4 text-white text-6xl font-thin hover:text-gray-400 p-8 z-[10000]"
      >
        &#8250;
      </button>

      {/* 5. Mobile Navigation Hint & Tap Zones */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-xs text-gray-500 md:hidden z-[10000] pointer-events-none">
        Tap edges to navigate
      </div>
      <div className="absolute inset-y-0 left-0 w-1/3 z-[10000] md:hidden cursor-pointer" onClick={(e) => { e.stopPropagation(); showPrev(); }} />
      <div className="absolute inset-y-0 right-0 w-1/3 z-[10000] md:hidden cursor-pointer" onClick={(e) => { e.stopPropagation(); showNext(); }} />

    </div>
  );
}