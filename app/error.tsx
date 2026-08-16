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
    <div className="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="rise text-micro uppercase text-fg-3">Something went wrong</p>
      <h1 className="rise mt-4 max-w-[16ch] text-title text-balance">
        This page failed to load.
      </h1>
      <p className="rise mt-5 max-w-[46ch] text-lead text-fg-2 text-balance">
        Trying again usually sorts it. If it keeps happening, get in touch and
        let me know what you were looking at.
      </p>

      <div className="rise mt-9 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-pill bg-fg px-7 py-3 text-body font-medium text-canvas transition-[transform,background-color] duration-150 ease-out hover:bg-white active:scale-[0.97]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 rounded-pill px-3 py-3 text-body font-medium text-fg transition-transform duration-150 ease-out active:scale-[0.97]"
        >
          Back to the work
          <span aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">
            &rsaquo;
          </span>
        </Link>
      </div>

      {error.digest && (
        <p className="mt-12 text-caption text-fg-3 tabular-nums">Ref {error.digest}</p>
      )}
    </div>
  );
}
