"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal, flushSync } from "react-dom";
import Image, { type StaticImageData } from "next/image";
import { animateSpring, project, rubberband, type SpringHandle } from "@/components/spring";

interface LightboxProps {
  index:    number;
  images:   StaticImageData[];
  onClose:  () => void;
  setIndex: (i: number) => void;
  /** The exact URL the grid already fetched for the photo being opened, read
      off the thumbnail's `currentSrc`. Painted immediately so the viewer opens
      from cache instead of waiting on a full-size request. */
  preview?: string | null;
}

/* Warm the neighbouring photo into the HTTP cache. The quality must match the
   <Image quality> below and the width must be one of Next's deviceSizes —
   otherwise this requests a different variant to the one actually rendered and
   we pay for the bytes twice instead of saving a round trip.

   QUALITY must also be a value the optimizer is willing to serve. Next 16 only
   honours the qualities listed in `images.qualities` (default: [75]) and
   answers anything else with a flat 400 — so this was 85, every request for a
   full-size photo failed, and the viewer sat on its blur placeholder forever
   waiting for bytes that were never coming. Keep this in step with
   next.config.ts. */
const QUALITY = 75;
const DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

/* ── Requested density ───────────────────────────────────────────────────────
   The photo is laid out at ~100vw, but we deliberately ask for ~64vw worth of
   pixels. On a 3x phone that lands on a 828px-wide variant instead of a
   1200px one — about 2x device density rather than 3x.

   The reason is cost. Measured cold, at 1.6Mbps: the 1200px variant is 123KB
   and takes 0.76s to transform and transfer; the 828px variant is 48KB and
   takes 0.30s. Two and a half times faster to first sight of the photograph,
   against a density difference that is invisible on a photograph at arm's
   length — there is no text or hairline detail here to give it away. It also
   pulls desktop down from a pointless 3840px request (the masters are only
   2560px wide) to 1920px.

   `sizes` and this constant must agree, or the prefetch below warms a variant
   the browser then declines to use. */
const VIEW_DENSITY = 0.64;
const SIZES = "64vw";

const optimisedUrl = (src: StaticImageData) => {
  const target = window.innerWidth * VIEW_DENSITY * (window.devicePixelRatio || 1);
  const width =
    DEVICE_SIZES.find((w) => w >= target) ?? DEVICE_SIZES[DEVICE_SIZES.length - 1];
  return `/_next/image?url=${encodeURIComponent(src.src)}&w=${width}&q=${QUALITY}`;
};

const AXIS_LOCK      = 10;   // px of travel before committing to a direction
const SNAP_FRACTION  = 0.35; // share of the viewport the projection must cross
const DISMISS_RATIO  = 0.22; // share of viewport height that dismisses
const FLICK_VELOCITY = 500;  // px/s that counts as a flick regardless of distance
const SAMPLE_WINDOW  = 120;  // ms of pointer history used to measure velocity

interface Sample { t: number; x: number; y: number }

export default function Lightbox({ index, images, onClose, setIndex, preview }: LightboxProps) {
  const count = images.length;

  /* The neighbouring photos are not in the first paint. Mounting all three
     slides up front meant a click put three <Image> components — three blur
     placeholders, three srcset evaluations — between the click and the photo
     the user actually asked for. They arrive on the next frame instead, long
     before any swipe could need them. */
  /* The thumbnail stands in until the full-size photo has decoded. It is the
     same image at a smaller width and it is already in the HTTP cache, so it
     costs nothing and paints on the first frame. Only for the photo that was
     actually clicked — after that everything is warm anyway. */
  const [openIndex] = useState(index);
  const [fullLoaded, setFullLoaded] = useState(false);

  const [neighboursReady, setNeighboursReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setNeighboursReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const overlayRef = useRef<HTMLDivElement>(null);
  const scrimRef   = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const chromeRef  = useRef<HTMLDivElement>(null);
  const closeRef   = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<Element | null>(null);

  /* Offsets live in refs, not state: they change every frame during a drag and
     a re-render per frame would be the one thing guaranteed to drop them. */
  const ox = useRef(0);
  const oy = useRef(0);

  const anim     = useRef<SpringHandle | null>(null);
  const pending  = useRef(0);              // slide direction awaiting commit
  const indexRef = useRef(index);
  const closing  = useRef(false);
  const reduce   = useRef(false);

  const drag = useRef({
    active:  false,
    id:      -1,
    originX: 0,
    originY: 0,
    baseX:   0,
    baseY:   0,
    axis:    null as null | "x" | "y",
    samples: [] as Sample[],
  });

  useEffect(() => { indexRef.current = index; }, [index]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduce.current = mq.matches;
    const onChange = () => { reduce.current = mq.matches; };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* ── Paint ─────────────────────────────────────────────────────────────────
     One write of transform and opacity per frame, straight to the DOM. Both
     are compositor properties, so nothing here triggers layout or paint. */
  const render = useCallback(() => {
    const h = window.innerHeight || 1;
    const progress = Math.min(Math.abs(oy.current) / (h * 0.6), 1);

    const track = trackRef.current;
    if (track) {
      track.style.transform =
        `translate3d(${ox.current}px, ${oy.current}px, 0) scale(${1 - progress * 0.08})`;
    }
    const scrim = scrimRef.current;
    if (scrim) scrim.style.opacity = String(1 - progress * 0.65);

    // The chrome gets out of the way as soon as the photo starts leaving
    const chrome = chromeRef.current;
    if (chrome) chrome.style.opacity = String(Math.max(0, 1 - progress * 2));
  }, []);

  /* ── Commit a slide ────────────────────────────────────────────────────────
     Advancing the index shifts every photo one slot, which moves each of them
     a full viewport to the left (or right). The offset is rebased by the same
     amount so nothing changes position on screen: commit is a change of
     coordinates, not a change of appearance.

     Rebasing rather than zeroing matters because commit is not only reached at
     the end of a completed slide. Zeroing is correct only when the track has
     travelled exactly one full viewport; anywhere else it teleports the photo.

     The swap and the rebase happen inside one synchronous flush, so the
     browser never gets a chance to paint the intermediate state. */
  const commit = useCallback((dir: 1 | -1) => {
    const next = (indexRef.current + dir + count) % count;
    indexRef.current = next;
    flushSync(() => setIndex(next));
    ox.current += dir * window.innerWidth;
    render();
  }, [count, setIndex, render]);

  /* Change photo with no motion at all. Used for the arrow keys, which get
     held down and repeat: an animation there would queue up behind itself and
     turn a key repeat into a laggy slideshow. Instant is the right answer for
     a repeated, keyboard-initiated action. */
  const jump = useCallback((dir: 1 | -1) => {
    if (count < 2 || closing.current) return;
    if (anim.current) { anim.current.stop(); anim.current = null; }
    pending.current = 0;

    const next = (indexRef.current + dir + count) % count;
    indexRef.current = next;
    flushSync(() => setIndex(next));
    ox.current = 0;
    oy.current = 0;
    render();
  }, [count, setIndex, render]);

  /* Land any in-flight slide immediately, preserving its on-screen position,
     so a new gesture can start from a settled coordinate system. */
  const settle = useCallback(() => {
    if (anim.current) { anim.current.stop(); anim.current = null; }
    if (pending.current !== 0) {
      const dir = pending.current as 1 | -1;
      pending.current = 0;
      commit(dir);
    }
  }, [commit]);

  const requestClose = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    anim.current?.stop();

    const overlay = overlayRef.current;
    if (!overlay || reduce.current) { onClose(); return; }

    overlay.style.transition = "opacity 200ms cubic-bezier(0.23, 1, 0.32, 1)";
    overlay.style.opacity    = "0";
    window.setTimeout(onClose, 200);
  }, [onClose]);

  const go = useCallback((dir: 1 | -1) => {
    if (count < 2 || closing.current) return;
    settle();

    if (reduce.current) { commit(dir); return; }

    const width = window.innerWidth;
    pending.current = dir;
    anim.current = animateSpring({
      from: ox.current,
      to: -dir * width,
      response: 0.3,
      damping: 1,
      onUpdate: (v) => { ox.current = v; render(); },
      onComplete: () => {
        anim.current = null;
        pending.current = 0;
        commit(dir);
      },
    });
  }, [count, settle, commit, render]);

  /* ── Scroll lock ───────────────────────────────────────────────────────────
     globals.css sets `html { overflow-y: scroll }`. Because the root element's
     overflow is not `visible`, the root is what the viewport scrolls — body's
     overflow no longer propagates, so locking <body> here would do nothing.
     Lock <html> instead, and pad for the scrollbar so the page does not jump. */
  useEffect(() => {
    const el  = document.documentElement;
    const gap = window.innerWidth - el.clientWidth;
    const prevOverflow = el.style.overflow;
    const prevPadding  = el.style.paddingRight;

    el.style.overflow = "hidden";
    if (gap > 0) el.style.paddingRight = `${gap}px`;

    return () => {
      el.style.overflow     = prevOverflow;
      el.style.paddingRight = prevPadding;
    };
  }, []);

  /* Move focus in on open, hand it back to the trigger on close */
  useEffect(() => {
    restoreRef.current = document.activeElement;
    closeRef.current?.focus();
    return () => { (restoreRef.current as HTMLElement | null)?.focus?.(); };
  }, []);

  /* Keyboard: navigation, dismiss, and a focus trap so Tab cannot walk out
     into the page sitting behind the overlay. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     { e.preventDefault(); requestClose(); return; }
      if (e.key === "ArrowRight") { e.preventDefault(); jump(1);  return; }
      if (e.key === "ArrowLeft")  { e.preventDefault(); jump(-1); return; }

      if (e.key === "Tab") {
        const focusables = overlayRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables?.length) return;

        const first = focusables[0];
        const last  = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [jump, requestClose]);

  /* ── Warm the neighbours ───────────────────────────────────────────────────
     Deliberately gated on the clicked photo having arrived. Firing these on
     mount put three full-size transforms in flight at once, and the one the
     user was actually waiting for had to share the optimizer and the
     connection with two they could not see — measured at ~20x slower for the
     photo that mattered. Prefetching is a nicety; the photo under the finger
     is the whole point, so it goes first and alone.

     Low fetch priority for the same reason: even once these start, they must
     never outrank anything the user is looking at. */
  useEffect(() => {
    if (count < 2 || !fullLoaded) return;
    const neighbours = [(index + 1) % count, (index - 1 + count) % count];
    const timer = window.setTimeout(() => {
      neighbours.forEach((i) => {
        const img = new window.Image();
        img.fetchPriority = "low";
        img.src = optimisedUrl(images[i]);
      });
    }, 250);
    return () => window.clearTimeout(timer);
  }, [index, images, count, fullLoaded]);

  useEffect(() => () => { anim.current?.stop(); }, []);

  /* ── Gesture ───────────────────────────────────────────────────────────────
     Pointer Events with capture, so tracking survives the pointer leaving the
     element, and so a second finger arriving mid-drag cannot yank the photo to
     a new position. */
  const onPointerDown = (e: React.PointerEvent) => {
    if (drag.current.active || closing.current) return;

    /* Interrupt whatever is moving and keep its exact on-screen position. The
       pending commit is abandoned rather than applied: the photo the user just
       grabbed stays the current one, the offset stays where it is, and the
       three mounted slots stay centred on it, so a reversal has somewhere to
       go in both directions. Committing here instead would jump the photo out
       from under the finger that just caught it. */
    if (anim.current) { anim.current.stop(); anim.current = null; }
    pending.current = 0;

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

    drag.current = {
      active:  true,
      id:      e.pointerId,
      originX: e.clientX,
      originY: e.clientY,
      baseX:   ox.current,
      baseY:   oy.current,
      axis:    null,
      samples: [{ t: performance.now(), x: e.clientX, y: e.clientY }],
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active || e.pointerId !== d.id) return;

    const dx = e.clientX - d.originX;
    const dy = e.clientY - d.originY;

    d.samples.push({ t: performance.now(), x: e.clientX, y: e.clientY });
    if (d.samples.length > 8) d.samples.shift();

    // Hysteresis: hold both directions open until the intent is unambiguous,
    // then commit and stop guessing.
    if (!d.axis) {
      if (Math.hypot(dx, dy) < AXIS_LOCK) return;
      d.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }

    if (d.axis === "x") {
      const next = d.baseX + dx;
      // With a single photo there is nowhere to go, so resist instead of
      // sliding a blank panel into view.
      ox.current = count < 2 ? rubberband(next, window.innerWidth) : next;
      oy.current = 0;
    } else {
      const next = d.baseY + dy;
      // Only downward dismisses; upward has nothing behind it, so it resists.
      oy.current = next >= 0 ? next : -rubberband(-next, window.innerHeight);
      ox.current = 0;
    }

    render();
  };

  const endDrag = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active || e.pointerId !== d.id) return;
    d.active = false;

    const el = e.currentTarget as HTMLElement;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);

    // No axis was ever chosen, so this was a tap, not a drag.
    if (!d.axis) { requestClose(); return; }

    // Velocity from a short history window rather than the last two events —
    // a single pair is noisy enough to read a slow drag as a flick.
    const now  = performance.now();
    const last = d.samples[d.samples.length - 1];
    const ref  = d.samples.find((s) => now - s.t <= SAMPLE_WINDOW) ?? d.samples[0];
    const dt   = Math.max(now - ref.t, 8) / 1000;
    const vx   = (last.x - ref.x) / dt;
    const vy   = (last.y - ref.y) / dt;

    if (d.axis === "y") {
      const h = window.innerHeight;
      // Snap to where the gesture was going, not to where the finger stopped.
      const projected = oy.current + project(vy);
      const dismiss   = projected > h * DISMISS_RATIO || vy > FLICK_VELOCITY;

      if (reduce.current) {
        if (dismiss) { requestClose(); } else { oy.current = 0; render(); }
        return;
      }

      if (dismiss) {
        closing.current = true;

        /* The photo keeps travelling at the speed the finger left it, while
           the overlay fades underneath it. Fading the whole overlay rather
           than leaning on the scrim opacity in render() matters: that only
           reaches 35% before the photo is off screen, so the viewer would
           blink out while still visibly on top of the page. */
        const overlay = overlayRef.current;
        if (overlay) {
          overlay.style.transition = "opacity 260ms cubic-bezier(0.23, 1, 0.32, 1)";
          overlay.style.opacity    = "0";
        }

        anim.current = animateSpring({
          from: oy.current, to: h, velocity: vy, response: 0.4, damping: 1,
          onUpdate: (v) => { oy.current = v; render(); },
        });
        window.setTimeout(onClose, 260);
      } else {
        anim.current = animateSpring({
          from: oy.current, to: 0, velocity: vy, response: 0.35, damping: 0.85,
          onUpdate: (v) => { oy.current = v; render(); },
          onComplete: () => { anim.current = null; },
        });
      }
      return;
    }

    const w         = window.innerWidth;
    const projected = ox.current + project(vx);
    const target    = projected < -w * SNAP_FRACTION ? -w
                    : projected >  w * SNAP_FRACTION ?  w
                    : 0;

    if (count < 2 || target === 0) {
      if (reduce.current) { ox.current = 0; render(); return; }
      anim.current = animateSpring({
        from: ox.current, to: 0, velocity: vx, response: 0.4, damping: 1,
        onUpdate: (v) => { ox.current = v; render(); },
        onComplete: () => { anim.current = null; },
      });
      return;
    }

    const dir: 1 | -1 = target < 0 ? 1 : -1;

    if (reduce.current) { commit(dir); return; }

    pending.current = dir;
    anim.current = animateSpring({
      // Continue at exactly the velocity the finger left off at, so there is
      // no seam between dragging and animating.
      from: ox.current, to: target, velocity: vx, response: 0.4, damping: 1,
      onUpdate: (v) => { ox.current = v; render(); },
      onComplete: () => {
        anim.current = null;
        pending.current = 0;
        commit(dir);
      },
    });
  };

  // The three mounted slots. Keys are the slot, not the photo, so React swaps
  // the src on a stable node instead of reordering the DOM on every slide.
  const slots: [number, number][] = count < 2 || !neighboursReady
    ? [[0, index]]
    : [
        [-1, (index - 1 + count) % count],
        [ 0, index],
        [ 1, (index + 1) % count],
      ];

  return createPortal(
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[9999]"
    >
      <div
        ref={scrimRef}
        aria-hidden
        className="absolute inset-0 bg-black"
        style={{ animation: "lb-scrim 110ms linear both" }}
      />

      {/* .drag-surface asks for `pinch-zoom`: the browser keeps two-finger zoom
          on a photograph, while single-finger panning is left to us. */}
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="drag-surface absolute inset-0"
        style={{ willChange: "transform" }}
      >
        {slots.map(([slot, i]) => (
          <div
            key={slot}
            className="absolute top-0 h-full w-full p-4 md:p-10"
            style={{ left: `${slot * 100}%` }}
          >
            {/* No entrance animation on the photograph. It is the content the
                click asked for, and fading it in over 320ms was read — fairly —
                as the viewer being slow to open. */}
            <div className="relative h-full w-full">
              <Image
                src={images[i]}
                alt={`Photograph ${i + 1} of ${count}`}
                fill
                sizes={SIZES}
                quality={QUALITY}   /* see the note on QUALITY above */
                placeholder="blur"
                priority={slot === 0}
                draggable={false}
                onLoad={slot === 0 ? () => setFullLoaded(true) : undefined}
                className="select-none object-contain"
              />

              {/* Stacked above the <Image>, because next/image paints its blur
                  placeholder as the element's own background and would other-
                  wise cover a sharper stand-in sitting underneath it. */}
              {slot === 0 && preview && index === openIndex && (
                /* Intentionally a raw <img>: `preview` is already a fully
                   resolved, already-downloaded /_next/image URL. Handing it to
                   next/image would build a fresh srcset around it and defeat
                   the entire point, which is to paint from cache.

                   It stays mounted and cross-fades out once the full-size copy
                   has decoded. Unmounting it outright swapped a soft image for
                   a sharp one in a single frame, which reads as a flicker; a
                   short fade between two versions of the same photograph reads
                   as it coming into focus. */
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt=""
                  aria-hidden
                  draggable={false}
                  className={`pointer-events-none absolute inset-0 h-full w-full select-none object-contain transition-opacity duration-200 ease-out ${
                    fullLoaded ? "opacity-0" : "opacity-100"
                  }`}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Chrome sits above the track but does not swallow drags: only the
          controls themselves take pointer events. */}
      <div ref={chromeRef} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 md:p-5">
          <span className="pointer-events-none rounded-pill bg-white/10 px-3.5 py-1.5 text-caption tabular-nums text-white/80 backdrop-blur-md">
            {index + 1} of {count}
          </span>

          <button
            ref={closeRef}
            type="button"
            aria-label="Close photo viewer"
            onClick={requestClose}
            className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-pill bg-white/10 text-white/90 backdrop-blur-md transition-[transform,background-color] duration-150 ease-out hover:bg-white/20 active:scale-[0.92]"
          >
            <svg aria-hidden width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M1 1L14 14M14 1L1 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Desktop: flanking the photo. Touch: within thumb reach, since a
            control pinned to the screen edge over a photograph is clutter on a
            phone and unreachable one-handed. */}
        {count > 1 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center gap-4 md:inset-y-0 md:bottom-auto md:items-center md:justify-between md:px-5">
            <NavButton label="Previous photo" onClick={() => go(-1)} d="M9.5 2L4 8l5.5 6" />
            <NavButton label="Next photo"     onClick={() => go(1)}  d="M6.5 2L12 8l-5.5 6" />
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

function NavButton({ label, onClick, d }: { label: string; onClick: () => void; d: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-pill bg-white/10 text-white/90 backdrop-blur-md transition-[transform,background-color] duration-150 ease-out hover:bg-white/20 active:scale-[0.92]"
    >
      <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d={d} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
