import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

/* No "use client": this page has no interactivity left. The entrance is a CSS
   animation, so it ships as pure markup with zero JavaScript. */
export default function About() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-24">

      <header className="pt-16 pb-12 text-center md:pt-28 md:pb-16">
        <h1 className="rise mx-auto max-w-[16ch] text-display text-balance">
          Behind the lens.
        </h1>
        <p
          className="rise mx-auto mt-6 max-w-[52ch] text-lead text-fg-2 text-balance"
          style={{ "--rise-delay": "90ms" } as CSSProperties}
        >
          Photography started as a way to hold onto moments that felt important,
          even if they were small.
        </p>
      </header>

      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16">
        <div
          className="rise relative aspect-[3/4] overflow-hidden rounded-sheet bg-elevated"
          style={{ "--rise-delay": "160ms" } as CSSProperties}
        >
          <Image
            src="/About/Me.webp"
            alt="Portrait of Rafat"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div
          className="rise flex flex-col md:pt-6"
          style={{ "--rise-delay": "240ms" } as CSSProperties}
        >
          <div className="space-y-6 text-lead text-fg-2">
            <p>
              Hi, I&apos;m <span className="font-medium text-fg">Rafat</span>. Over
              time photography became my way of speaking — capturing the honest
              energy of a sports match, the quiet personality of a pet, or the bold
              identity of a brand.
            </p>
            <p>
              My style is simple:{" "}
              <span className="text-fg">chasing good light and real emotion.</span>{" "}
              Whether I&apos;m in a studio or outdoors, my goal is to create images
              that feel authentic and timeless.
            </p>
            <p>
              When I&apos;m not shooting, I&apos;m probably editing with a good
              playlist on or scouting new locations. Thanks for stopping by.
            </p>
          </div>

          <div className="mt-12 border-t border-hairline pt-10">
            <Link
              href="/contact"
              className="inline-block rounded-pill bg-fg px-7 py-3 text-body font-medium text-canvas transition-[transform,background-color] duration-150 ease-out hover:bg-white active:scale-[0.97]"
            >
              Let&apos;s work together
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
