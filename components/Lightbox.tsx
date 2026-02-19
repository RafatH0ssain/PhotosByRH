"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface LightboxProps {
  index: number;
  images: string[];
  onClose: () => void;
  setIndex: (newIndex: number) => void;
}

export default function Lightbox({ index, images, onClose, setIndex }: LightboxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    
    // Lock the body from scrolling in the background while Lightbox is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset"; // Restore scrolling on close
    };
  }, [index, onClose]);

  const showNext = () => setIndex((index + 1) % images.length);
  const showPrev = () => setIndex((index - 1 + images.length) % images.length);

  // If not mounted yet (server-side rendering), return nothing to prevent errors
  if (!mounted) return null;

  // createPortal forces this HTML directly into the <body> tag, escaping the grid layout
  return createPortal(
    <div style={{ position: "fixed", inset: 0, zIndex: 99999, backgroundColor: "rgba(0, 0, 0, 0.98)" }}>
      
      {/* Background click zone to close */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }} onClick={onClose} />

      {/* The Image: Locked strictly to the center using classic absolute positioning */}
      <img
        src={images[index]}
        alt="Expanded view"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "100vw",
          maxHeight: "100vh",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          zIndex: 2,
          pointerEvents: "none",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
        }}
      />

      {/* Close Button */}
      <button 
        onClick={onClose}
        style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 10, color: "white", fontSize: "2.5rem", background: "none", border: "none", cursor: "pointer", padding: "1rem" }}
      >
        &times;
      </button>

      {/* Invisible Mobile Tap Zones (Left 33% and Right 33% of screen) */}
      <div 
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "33%", zIndex: 5, cursor: "pointer" }} 
        onClick={(e) => { e.stopPropagation(); showPrev(); }} 
      />
      <div 
        style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "33%", zIndex: 5, cursor: "pointer" }} 
        onClick={(e) => { e.stopPropagation(); showNext(); }} 
      />

      {/* Desktop Navigation Arrows */}
      <button 
        className="hidden md:block" 
        onClick={(e) => { e.stopPropagation(); showPrev(); }} 
        style={{ position: "absolute", left: "2rem", top: "50%", transform: "translateY(-50%)", zIndex: 10, color: "white", fontSize: "4rem", fontWeight: 200, background: "none", border: "none", cursor: "pointer" }}
      >
        &#8249;
      </button>
      <button 
        className="hidden md:block" 
        onClick={(e) => { e.stopPropagation(); showNext(); }} 
        style={{ position: "absolute", right: "2rem", top: "50%", transform: "translateY(-50%)", zIndex: 10, color: "white", fontSize: "4rem", fontWeight: 200, background: "none", border: "none", cursor: "pointer" }}
      >
        &#8250;
      </button>

    </div>,
    document.body
  );
}