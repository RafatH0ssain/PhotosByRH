/* ─── Physical motion primitives ───────────────────────────────────────────────
   A spring rather than a fixed-duration tween, because a spring can be
   re-targeted mid-flight and carries its velocity across the change. That is
   what makes a gesture interruptible: the user can grab something that is
   already moving and reverse it without the motion snapping or restarting.

   Parameterised the way Apple exposes it — damping ratio and response — not as
   mass/stiffness/damping, because these two are the ones you can actually
   reason about.
   ───────────────────────────────────────────────────────────────────────────── */

export interface SpringHandle {
  /** Halt immediately, leaving `value` and `velocity` readable for a handoff */
  stop(): void;
  readonly value: number;
  readonly velocity: number;
}

interface SpringOptions {
  from: number;
  to: number;
  /** px/s, normally the pointer's velocity at release */
  velocity?: number;
  /** seconds to reach the target. Lower is snappier. Not a duration — a
      spring has no fixed duration; settle time emerges from the parameters. */
  response?: number;
  /** 1 = critically damped (no overshoot). Below 1 overshoots and oscillates.
      Stay at 1 unless the gesture itself carried momentum. */
  damping?: number;
  onUpdate(value: number): void;
  onComplete?(): void;
}

export function animateSpring({
  from,
  to,
  velocity = 0,
  response = 0.4,
  damping = 1,
  onUpdate,
  onComplete,
}: SpringOptions): SpringHandle {
  const omega = (2 * Math.PI) / response;

  let x = from;
  let v = velocity;
  let raf = 0;
  let last = performance.now();
  let running = true;

  const step = (now: number) => {
    if (!running) return;

    // Clamp dt so a backgrounded tab does not integrate one enormous step and
    // fling the value off screen when it comes back.
    const dt = Math.min((now - last) / 1000, 1 / 30);
    last = now;

    // Sub-step the integration so the result is frame-rate independent — the
    // same gesture must settle identically at 60Hz and at 120Hz.
    const count = Math.max(1, Math.ceil(dt * 240));
    const h = dt / count;

    for (let i = 0; i < count; i++) {
      const accel = -omega * omega * (x - to) - 2 * damping * omega * v;
      v += accel * h;
      x += v * h;
    }

    if (Math.abs(x - to) < 0.05 && Math.abs(v) < 0.5) {
      x = to;
      v = 0;
      running = false;
      onUpdate(x);
      onComplete?.();
      return;
    }

    onUpdate(x);
    raf = requestAnimationFrame(step);
  };

  raf = requestAnimationFrame(step);

  return {
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    },
    get value() { return x; },
    get velocity() { return v; },
  };
}

/**
 * Where a flick would come to rest if it decelerated naturally — the same
 * exponential-decay model the platform uses for scroll momentum.
 *
 * Snap to the target nearest this projection rather than to the one nearest
 * the release point; that is the difference between a flick that throws the
 * photo and a flick that merely nudges it.
 */
export function project(velocity: number, decelerationRate = 0.99): number {
  return (velocity / 1000) * decelerationRate / (1 - decelerationRate);
}

/**
 * Progressive resistance past a boundary. Real things slow before they stop —
 * a hard stop reads as "frozen", continuous resistance reads as "responsive,
 * but there is nothing more this way".
 */
export function rubberband(overshoot: number, dimension: number, constant = 0.55): number {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}
