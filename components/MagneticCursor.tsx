"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticCursor() {
  const [mounted,  setMounted]  = useState(false);
  const [isTouch,  setIsTouch]  = useState(true);
  const [visible,  setVisible]  = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label,    setLabel]    = useState("");

  const cx = useMotionValue(0);
  const cy = useMotionValue(0);

  const ringX = useSpring(cx, { damping: 28, stiffness: 230, mass: 0.65 });
  const ringY = useSpring(cy, { damping: 28, stiffness: 230, mass: 0.65 });
  const dotX  = useSpring(cx, { damping: 45, stiffness: 800 });
  const dotY  = useSpring(cy, { damping: 45, stiffness: 800 });

  useEffect(() => {
    setMounted(true);
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (!mounted || isTouch) return;

    const onMove  = (e: MouseEvent) => { cx.set(e.clientX); cy.set(e.clientY); setVisible(true); };
    const onLeave = () => setVisible(false);
    const onOver  = (e: MouseEvent) => {
      const t = e.target as Element;
      if (t.closest(".gallery-card"))            { setHovering(true);  setLabel("VIEW"); }
      else if (t.closest("a, button, [role='button']")) { setHovering(true);  setLabel("");     }
      else                                              { setHovering(false); setLabel("");     }
    };

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseover",  onOver);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [mounted, isTouch, cx, cy]);

  if (!mounted || isTouch) return null;

  return (
    <>
      {/* Outer ring — spring-lagged */}
      <motion.div
        animate={{
          width:       hovering ? 72  : 36,
          height:      hovering ? 72  : 36,
          opacity:     visible  ? 1   : 0,
          borderColor: hovering ? "#585a5a" : "rgba(255,255,255,0.45)",
        }}
        transition={{ type: "tween", duration: 0.18 }}
        style={{
          position:       "fixed",
          left:           ringX,
          top:            ringY,
          x:              "-50%",
          y:              "-50%",
          pointerEvents:  "none",
          zIndex:         99999,
          border:         "1px solid rgba(255,255,255,0.45)",
          borderRadius:   "50%",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
        }}
      >
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              fontSize:      "8px",
              fontFamily:    "var(--font-geist-sans)",
              letterSpacing: "0.14em",
              color:         "#585a5a",
              textTransform: "uppercase" as const,
              pointerEvents: "none"      as const,
            }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>

      {/* Center dot — snappy */}
      <motion.div
        animate={{
          opacity:         visible  ? 1   : 0,
          scale:           hovering ? 0.5 : 1,
          backgroundColor: hovering ? "#585a5a" : "#ffffff",
        }}
        transition={{ type: "tween", duration: 0.12 }}
        style={{
          position:        "fixed",
          left:            dotX,
          top:             dotY,
          x:               "-50%",
          y:               "-50%",
          pointerEvents:   "none",
          zIndex:          99999,
          width:           6,
          height:          6,
          borderRadius:    "50%",
          backgroundColor: "#ffffff",
        }}
      />
    </>
  );
}
