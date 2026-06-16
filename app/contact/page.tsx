"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SENDING...");

    const form     = e.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("https://formspree.io/f/mjgbljnl", {
      method:  "POST",
      body:    formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      setStatus("MESSAGE SENT. I WILL GET BACK TO YOU SHORTLY.");
      form.reset();
    } else {
      setStatus("ERROR. PLEASE TRY AGAIN OR EMAIL ME DIRECTLY.");
    }
  };

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
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-xl relative z-10 pt-6"
      >
        {/* Header */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="font-anton text-[clamp(2.8rem,8vw,6rem)] uppercase leading-none tracking-tighter"
          >
            Let&apos;s Connect
          </motion.h1>
        </div>
        <p className="text-[13px] text-white/35 mb-10 font-light">
          For bookings, quotes, or just to say hi.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8 font-sans">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group border-b border-white/15 focus-within:border-white transition-colors duration-300">
              <input
                name="name"
                placeholder="NAME"
                required
                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/20 tracking-[0.08em]"
              />
            </div>
            <div className="group border-b border-white/15 focus-within:border-white transition-colors duration-300">
              <input
                name="email"
                type="email"
                placeholder="EMAIL"
                required
                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/20 tracking-[0.08em]"
              />
            </div>
          </div>

          <div className="border-b border-white/15 focus-within:border-white transition-colors duration-300">
            <input
              name="phone"
              type="tel"
              placeholder="PHONE NUMBER"
              required
              className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/20 tracking-[0.08em]"
            />
          </div>

          <div className="border-b border-white/15 focus-within:border-white transition-colors duration-300">
            <textarea
              name="message"
              rows={5}
              placeholder="YOUR MESSAGE"
              required
              className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/20 tracking-[0.08em] resize-none"
            />
          </div>

          <button
            type="submit"
            className="group inline-flex items-center gap-4 border border-white/25 px-8 py-4 font-anton text-xs tracking-[0.22em] uppercase hover:border-[#585a5a] hover:text-[#585a5a] transition-colors duration-300 disabled:opacity-40"
            disabled={status === "SENDING..."}
          >
            {status === "SENDING..." ? "SENDING..." : "SUBMIT MESSAGE"}
            <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>

          {status && status !== "SENDING..." && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-[11px] tracking-[0.12em] font-sans ${
                status.includes("ERROR") ? "text-red-400" : "text-white/40"
              }`}
            >
              {status}
            </motion.p>
          )}
        </form>
      </motion.div>
    </div>
  );
}
