"use client";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const res = await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) setStatus("Message Sent!");
    else setStatus("Error. Please try again.");
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="font-anton text-5xl mb-8 uppercase">Let's Connect</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input name="name" placeholder="NAME" required className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition" />
        <input name="email" type="email" placeholder="EMAIL" required className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition" />
        <input name="phone" type="tel" placeholder="PHONE NUMBER" required className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition" />
        <textarea name="message" rows={4} placeholder="YOUR MESSAGE" required className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition" />
        <button className="bg-white text-black font-anton px-10 py-3 hover:bg-neutral-200 transition">SUBMIT</button>
        <p className="mt-4 text-sm">{status}</p>
      </form>
    </div>
  );
}