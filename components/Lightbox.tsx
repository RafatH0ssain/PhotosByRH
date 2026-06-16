"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxProps {
  index:    number;
  images:   string[];
  onClose:  () => void;
  setIndex: (i: number) => void;
}

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const imgVariants = {
  enter: (dir: number) => ({
    clipPath: dir >= 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
  }),
  center: {
    clipPath: "inset(0 0% 0 0%)",
  },
  exit: (dir: number) => ({
    clipPath: dir >= 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
  }),
};

export default function Lightbox({ index, images, onClose, setIndex }: LightboxProps) {
  const [mounted,   setMounted]   = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [direction, setDirection] = useState(1);

  useEffect(() => { setMounted(true); }, []);

  /* Body scroll lock — restored only when component fully unmounts */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     { setIsVisible(false); return; }
      if (e.key === "ArrowRight") { setDirection(1);  setIndex((index + 1) % images.length); }
      if (e.key === "ArrowLeft")  { setDirection(-1); setIndex((index - 1 + images.length) % images.length); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, images.length, setIndex]);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setIndex((index + dir + images.length) % images.length);
  };

  if (!mounted) return null;

  const counter = String(index + 1).padStart(2, "0");
  const total   = String(images.length).padStart(2, "0");
  const pct     = ((index + 1) / images.length) * 100;

  /* ── createPortal keeps us attached to document.body, escaping all layouts ── */
  return createPortal(
    <AnimatePresence onExitComplete={onClose}>
      {isVisible && (
        <motion.div
          key="lb"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{   opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ position: "fixed", inset: 0, zIndex: 99999, backgroundColor: "rgba(0,0,0,0.97)" }}
        >
          {/* Background dismiss */}
          <div
            style={{ position: "absolute", inset: 0, zIndex: 1 }}
            onClick={() => setIsVisible(false)}
          />

          {/* ─────────────────────────────────────────────────────────────────
              THE IMAGE — skeleton constraints honoured:
              · Plain <img> (motion.img) — no Next/Image wrapper
              · Absolute positioning with translate(-50%,-50%) centering
              · objectFit: contain
              · NO flex / grid wrapper around this element
          ───────────────────────────────────────────────────────────────── */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={index}
              src={images[index]}
              alt={`Photo ${index + 1} of ${images.length}`}
              custom={direction}
              variants={imgVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.48, ease: EASE }}
              style={{
                position:      "absolute",
                top:           "50%",
                left:          "50%",
                transform:     "translate(-50%, -50%)",
                maxWidth:      "90vw",
                maxHeight:     "86vh",
                width:         "auto",
                height:        "auto",
                objectFit:     "contain",
                zIndex:        2,
                pointerEvents: "none",
              }}
            />
          </AnimatePresence>

          {/* Counter — top left */}
          <div
            style={{
              position:      "absolute",
              top:           "1.5rem",
              left:          "1.75rem",
              zIndex:        10,
              display:       "flex",
              alignItems:    "baseline",
              gap:           "5px",
              pointerEvents: "none",
            }}
          >
            <span style={{ fontFamily: "var(--font-anton)", fontSize: "clamp(1.4rem,3.5vw,2.2rem)", lineHeight: 1, color: "#fff", letterSpacing: "-0.02em" }}>
              {counter}
            </span>
            <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>
              / {total}
            </span>
          </div>

          {/* [ESC] close — top right */}
          <button
            onClick={() => setIsVisible(false)}
            style={{
              position:    "absolute",
              top:         "1.25rem",
              right:       "1.5rem",
              zIndex:      10,
              background:  "none",
              border:      "none",
              padding:     "0.5rem",
              display:     "flex",
              alignItems:  "center",
              gap:         "3px",
              lineHeight:  1,
            }}
          >
            <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "11px", color: "#585a5a",                    letterSpacing: "0.08em" }}>[</span>
            <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "11px", color: "rgba(255,255,255,0.55)",      letterSpacing: "0.12em" }}>ESC</span>
            <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "11px", color: "#585a5a",                    letterSpacing: "0.08em" }}>]</span>
          </button>

          {/* PREV zone — left 22% */}
          <button
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            className="group"
            style={{
              position:        "absolute",
              left:            0,
              top:             0,
              width:           "22%",
              height:          "100%",
              zIndex:          5,
              background:      "none",
              border:          "none",
              display:         "flex",
              alignItems:      "flex-end",
              paddingLeft:     "1.5rem",
              paddingBottom:   "1.75rem",
              cursor:          "w-resize",
            }}
          >
            <span
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ fontFamily: "var(--font-anton)", fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.22em" }}
            >
              PREV
            </span>
          </button>

          {/* NEXT zone — right 22% */}
          <button
            onClick={(e) => { e.stopPropagation(); go(1); }}
            className="group"
            style={{
              position:        "absolute",
              right:           0,
              top:             0,
              width:           "22%",
              height:          "100%",
              zIndex:          5,
              background:      "none",
              border:          "none",
              display:         "flex",
              alignItems:      "flex-end",
              justifyContent:  "flex-end",
              paddingRight:    "1.5rem",
              paddingBottom:   "1.75rem",
              cursor:          "e-resize",
            }}
          >
            <span
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ fontFamily: "var(--font-anton)", fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.22em" }}
            >
              NEXT
            </span>
          </button>

          {/* Chartreuse progress bar */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", backgroundColor: "rgba(255,255,255,0.07)", zIndex: 10 }}>
            <motion.div
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: "100%", backgroundColor: "#585a5a" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
