import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="rise text-micro uppercase text-fg-3">Error 404</p>
      <h1 className="rise mt-4 max-w-[16ch] text-title text-balance">
        This page doesn&apos;t exist.
      </h1>
      <p className="rise mt-5 max-w-[44ch] text-lead text-fg-2 text-balance">
        It may have moved, or the link may be wrong. The galleries are all still
        where you left them.
      </p>

      <div className="rise mt-9 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-pill bg-accent-solid px-7 py-3 text-body font-medium text-white transition-[transform,filter] duration-150 ease-out hover:brightness-110 active:scale-[0.97]"
        >
          Back to the work
        </Link>
        <Link
          href="/contact"
          className="group inline-flex items-center gap-1.5 rounded-pill px-3 py-3 text-body font-medium text-accent transition-transform duration-150 ease-out active:scale-[0.97]"
        >
          Get in touch
          <span aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">
            &rsaquo;
          </span>
        </Link>
      </div>
    </div>
  );
}
