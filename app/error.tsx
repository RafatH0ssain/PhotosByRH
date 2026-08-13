"use client";
import { useEffect } from "react";
import Link from "next/link";

/* Route-level error boundary. Keeps the header, footer and visual language
   instead of dropping the visitor onto Next's stock error screen. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24 pt-8">

      <div className="relative select-none pointer-events-none" aria-hidden>
        <span
          className="absolute -top-4 -left-2 font-anton text-[clamp(6rem,22vw,18rem)] leading-none tracking-tighter uppercase text-white"
          style={{ opacity: 0.03 }}
        >
          ERR
        </span>
      </div>

      <div className="relative z-10 pt-8 max-w-xl">
        <h1 className="font-anton text-[clamp(2.5rem,7vw,6rem)] uppercase leading-none tracking-tighter mb-4">
          Something<br />Broke.
        </h1>
        <p className="text-[13px] text-white/35 leading-relaxed font-light mb-10">
          This page failed to load. Trying again usually sorts it — if it keeps
          happening, get in touch and let me know what you were looking at.
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={reset}
            className="group inline-flex items-center gap-3 border border-white/20 px-6 py-3 font-anton text-xs tracking-[0.2em] uppercase hover:border-[#585a5a] hover:text-[#585a5a] transition-colors duration-300"
          >
            TRY AGAIN
            <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 font-anton text-xs tracking-[0.2em] uppercase text-white/35 hover:text-white transition-colors duration-300"
          >
            BACK TO WORK
          </Link>
        </div>

        {error.digest && (
          <p className="mt-10 text-[10px] tracking-[0.15em] text-white/15 font-sans">
            REF {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
