"use client";
import { useEffect, useRef } from "react";

/**
 * Drives the scroll reveal defined in globals.css.
 *
 * One IntersectionObserver watches every `[data-reveal]` descendant of the
 * container, instead of mounting a motion component per card. The actual
 * animation is a CSS transition, so it runs off the main thread and stays
 * smooth while the browser is busy decoding the images it is revealing.
 *
 * Each element is unobserved the moment it lands, so this costs nothing after
 * the first pass down the page.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!targets.length) return;

    // No observer (or a browser that matched `scripting: enabled` but cannot
    // observe) must never leave the page blank — show everything instead.
    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => { el.dataset.reveal = "in"; });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "in";
          io.unobserve(entry.target);
        }
      },
      // Fire a little before the element is fully on screen so the motion has
      // finished by the time it reaches comfortable reading position.
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return ref;
}
