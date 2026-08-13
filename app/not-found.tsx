import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-6 pb-24 pt-8">

      {/* Ghost numeral, same device the galleries use */}
      <div className="relative select-none pointer-events-none" aria-hidden>
        <span
          className="absolute -top-4 -left-2 font-anton text-[clamp(6rem,22vw,18rem)] leading-none tracking-tighter uppercase text-white"
          style={{ opacity: 0.03 }}
        >
          404
        </span>
      </div>

      <div className="relative z-10 pt-8 max-w-xl">
        <h1 className="font-anton text-[clamp(2.5rem,7vw,6rem)] uppercase leading-none tracking-tighter mb-4">
          Nothing<br />Here.
        </h1>
        <p className="text-[13px] text-white/35 leading-relaxed font-light mb-10">
          That page does not exist — it may have moved, or the link may be wrong.
          The galleries are all still where you left them.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 border border-white/20 px-6 py-3 font-anton text-xs tracking-[0.2em] uppercase hover:border-[#585a5a] hover:text-[#585a5a] transition-colors duration-300"
          >
            BACK TO WORK
            <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 font-anton text-xs tracking-[0.2em] uppercase text-white/35 hover:text-white transition-colors duration-300"
          >
            GET IN TOUCH
          </Link>
        </div>
      </div>
    </div>
  );
}
