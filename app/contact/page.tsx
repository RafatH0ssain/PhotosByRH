"use client";
import { useState, type CSSProperties } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjgbljnl";

type Status = "idle" | "sending" | "sent" | "error";

const MESSAGES: Record<Exclude<Status, "idle" | "sending">, string> = {
  sent:  "Message sent. I'll get back to you shortly.",
  error: "Something went wrong. Please try again.",
};

const FIELD =
  "w-full rounded-card border border-hairline bg-elevated px-4 py-3.5 text-body " +
  "text-fg outline-none transition-[border-color,background-color] duration-200 " +
  "ease-out placeholder:text-fg-4 focus:border-accent focus:bg-raised";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form     = e.currentTarget;
    const formData = new FormData(form);

    /* A rejected fetch — offline, DNS failure, blocked by an extension — used
       to throw straight out of this handler as an unhandled rejection, leaving
       the button disabled on "Sending…" forever with no way to retry. */
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
    <div className="mx-auto max-w-[1400px] px-6 pb-24">

      <header className="pt-16 pb-12 text-center md:pt-28 md:pb-16">
        <h1 className="rise mx-auto max-w-[14ch] text-display text-balance">
          Let&apos;s connect.
        </h1>
        <p
          className="rise mx-auto mt-6 max-w-[46ch] text-lead text-fg-2 text-balance"
          style={{ "--rise-delay": "90ms" } as CSSProperties}
        >
          For bookings, quotes, or just to say hi.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="rise mx-auto max-w-xl space-y-4"
        style={{ "--rise-delay": "160ms" } as CSSProperties}
      >
        {/* Honeypot — hidden from people, irresistible to bots. Formspree
            discards any submission that arrives with _gotcha filled in. */}
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
          <label htmlFor="_gotcha">Leave this field empty</label>
          <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              id="name"
              name="name"
              placeholder="Name"
              required
              maxLength={100}
              autoComplete="name"
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              maxLength={254}
              autoComplete="email"
              // type="email" on its own accepts "a@b" with no TLD
              pattern="[^@\s]+@[^@\s]+\.[A-Za-z]{2,}"
              title="Enter a valid email address, for example name@example.com"
              className={FIELD}
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="sr-only">Phone (optional)</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Phone (optional)"
            maxLength={32}
            autoComplete="tel"
            className={FIELD}
          />
        </div>

        <div>
          <label htmlFor="message" className="sr-only">Your message</label>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder="Your message"
            required
            maxLength={5000}
            className={`${FIELD} resize-none`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={sending}
            className="rounded-pill bg-accent px-7 py-3 text-body font-medium text-white transition-[transform,filter,opacity] duration-150 ease-out hover:brightness-110 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50"
          >
            {sending ? "Sending…" : "Send message"}
          </button>

          {/* aria-live so the outcome is announced, not just shown */}
          <div role="status" aria-live="polite" className="min-h-5">
            {(status === "sent" || status === "error") && (
              <p
                className={`text-body ${status === "error" ? "text-red-400" : "text-fg-2"}`}
                style={{ animation: "rise 400ms cubic-bezier(0.23, 1, 0.32, 1) both" }}
              >
                {MESSAGES[status]}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
