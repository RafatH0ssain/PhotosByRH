"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* Shown as a fallback when the form fails. Left empty deliberately — putting a
   personal address on a public page is your call, not mine. Set it and the
   error message turns into a mailto: link automatically. */
const FALLBACK_EMAIL: string = "";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjgbljnl";

type Status = "idle" | "sending" | "sent" | "error";

const MESSAGES: Record<Exclude<Status, "idle" | "sending">, string> = {
  sent:  "MESSAGE SENT. I WILL GET BACK TO YOU SHORTLY.",
  error: "SOMETHING WENT WRONG. PLEASE TRY AGAIN",
};

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const reduceMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form     = e.currentTarget;
    const formData = new FormData(form);

    /* A rejected fetch — offline, DNS failure, blocked by an extension — used
       to throw straight out of this handler as an unhandled rejection, leaving
       the button disabled on "SENDING..." forever with no way to retry. */
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method:  "POST",
        body:    formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const sending = status === "sending";

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24 pt-8">

      {/* Ghost label */}
      <div className="relative select-none pointer-events-none" aria-hidden>
        <span
          className="absolute -top-2 -left-2 font-anton text-[clamp(6rem,22vw,18rem)] leading-none tracking-tighter uppercase text-white"
          style={{ opacity: 0.025 }}
        >
          08
        </span>
      </div>

      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-xl relative z-10 pt-6"
      >
        {/* Header */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={reduceMotion ? { opacity: 0 } : { y: "100%" }}
            animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="font-anton text-[clamp(2.8rem,8vw,6rem)] uppercase leading-none tracking-tighter"
          >
            Let&apos;s Connect
          </motion.h1>
        </div>
        <p className="text-[13px] text-white/35 mb-10 font-light">
          For bookings, quotes, or just to say hi.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8 font-sans">

          {/* Honeypot — hidden from people, irresistible to bots. Formspree
              discards any submission that arrives with _gotcha filled in. */}
          <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden>
            <label htmlFor="_gotcha">Leave this field empty</label>
            <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group border-b border-white/15 focus-within:border-white transition-colors duration-300">
              <input
                name="name"
                placeholder="NAME"
                required
                maxLength={100}
                autoComplete="name"
                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/20 tracking-[0.08em]"
              />
            </div>
            <div className="group border-b border-white/15 focus-within:border-white transition-colors duration-300">
              <input
                name="email"
                type="email"
                placeholder="EMAIL"
                required
                maxLength={254}
                autoComplete="email"
                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/20 tracking-[0.08em]"
              />
            </div>
          </div>

          <div className="border-b border-white/15 focus-within:border-white transition-colors duration-300">
            <input
              name="phone"
              type="tel"
              placeholder="PHONE (OPTIONAL)"
              maxLength={32}
              autoComplete="tel"
              className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/20 tracking-[0.08em]"
            />
          </div>

          <div className="border-b border-white/15 focus-within:border-white transition-colors duration-300">
            <textarea
              name="message"
              rows={5}
              placeholder="YOUR MESSAGE"
              required
              maxLength={5000}
              className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/20 tracking-[0.08em] resize-none"
            />
          </div>

          <button
            type="submit"
            className="group inline-flex items-center gap-4 border border-white/25 px-8 py-4 font-anton text-xs tracking-[0.22em] uppercase hover:border-[#585a5a] hover:text-[#585a5a] transition-colors duration-300 disabled:opacity-40"
            disabled={sending}
          >
            {sending ? "SENDING..." : "SUBMIT MESSAGE"}
            <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>

          {/* aria-live so the outcome is announced, not just shown */}
          <div role="status" aria-live="polite">
            {(status === "sent" || status === "error") && (
              <motion.p
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-[11px] tracking-[0.12em] font-sans ${
                  status === "error" ? "text-red-400" : "text-white/40"
                }`}
              >
                {MESSAGES[status]}
                {status === "error" && FALLBACK_EMAIL && (
                  <>
                    {" OR EMAIL "}
                    <a href={`mailto:${FALLBACK_EMAIL}`} className="underline hover:text-red-300">
                      {FALLBACK_EMAIL.toUpperCase()}
                    </a>
                  </>
                )}
                {status === "error" && !FALLBACK_EMAIL && "."}
              </motion.p>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}
