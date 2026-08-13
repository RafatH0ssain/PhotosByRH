"use client";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24 pt-8">

      {/* Ghost label */}
      <div className="relative mb-0 select-none pointer-events-none" aria-hidden>
        <span
          className="absolute -top-2 -left-2 font-anton text-[clamp(6rem,22vw,18rem)] leading-none tracking-tighter uppercase text-white"
          style={{ opacity: 0.025 }}
        >
          00
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-10 items-start relative z-10 pt-6">

        {/* Portrait */}
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { clipPath: "inset(100% 0 0 0)" }}
          animate={reduceMotion ? { opacity: 1 } : { clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: reduceMotion ? 0.2 : 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="relative aspect-[3/4] w-full bg-neutral-950 overflow-hidden"
        >
          <Image
            src="/About/Me.webp"
            alt="Portrait of Rafat"
            fill
            className="object-cover transition-transform duration-700 hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {/* Corner label */}
          <div className="absolute bottom-4 left-4 pointer-events-none">
            <span className="text-[9px] text-white/30 tracking-[0.15em] font-sans">PHOTOGRAPHER</span>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 0.35, duration: reduceMotion ? 0.2 : 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-start md:pt-2"
        >
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={reduceMotion ? { opacity: 0 } : { y: "100%" }}
              animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
              transition={{ duration: reduceMotion ? 0.2 : 0.8, delay: reduceMotion ? 0 : 0.2, ease: [0.76, 0, 0.24, 1] }}
              className="font-anton text-[clamp(2.8rem,7vw,6.5rem)] uppercase leading-none tracking-tighter"
            >
              Behind<br />The Lens.
            </motion.h1>
          </div>

          <div className="space-y-5 text-[14px] text-white/40 font-light leading-relaxed">
            <p>
              Hi, I&apos;m <span className="text-white font-normal">Rafat</span>.
              Photography started as a way to hold onto moments that felt important,
              even if they were small. Over time, it became my way of speaking — capturing
              the honest energy of a sports match, the quiet personality of a pet, or the
              bold identity of a brand.
            </p>
            <p>
              My style is simple:{" "}
              <span className="text-white/70 italic">chasing good light and real emotion.</span>{" "}
              Whether I&apos;m in a studio or outdoors, my goal is to create images that feel
              authentic and timeless.
            </p>
            <p>
              When I&apos;m not shooting, I&apos;m probably editing with a good playlist on or
              scouting new locations. Thanks for stopping by.
            </p>
          </div>

          <div className="mt-10 border-t border-white/[0.06] pt-8">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 font-anton text-sm tracking-[0.18em] uppercase hover:text-[#585a5a] transition-colors duration-300"
            >
              LET&apos;S WORK TOGETHER
              <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
