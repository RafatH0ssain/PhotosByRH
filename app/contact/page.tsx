"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SENDING...");
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Using Formspree - Replace 'YOUR_FORM_ID' after following the steps below
    const response = await fetch("https://formspree.io/f/mjgbljnl", {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      setStatus("MESSAGE SENT! I WILL GET BACK TO YOU SHORTLY.");
      form.reset();
    } else {
      setStatus("ERROR. PLEASE TRY AGAIN OR EMAIL ME DIRECTLY.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto px-6 py-20"
    >
      <h1 className="font-anton text-5xl mb-2 uppercase">Let's Connect</h1>
      <p className="font-sans text-gray-400 mb-8 tracking-wide">
        For bookings, quotes, or just to say hi.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input 
            name="name" 
            placeholder="NAME" 
            required 
            className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition placeholder:text-neutral-600" 
          />
          <input 
            name="email" 
            type="email" 
            placeholder="EMAIL" 
            required 
            className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition placeholder:text-neutral-600" 
          />
        </div>
        
        <input 
          name="phone" 
          type="tel" 
          placeholder="PHONE NUMBER" 
          required 
          className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition placeholder:text-neutral-600" 
        />
        
        <textarea 
          name="message" 
          rows={4} 
          placeholder="YOUR MESSAGE" 
          required 
          className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition placeholder:text-neutral-600 resize-none" 
        />
        
        <button 
          type="submit"
          className="bg-white text-black font-anton px-12 py-4 hover:bg-neutral-200 transition-all active:scale-95 uppercase tracking-widest text-sm"
        >
          {status === "SENDING..." ? "SENDING..." : "Submit Message"}
        </button>
        
        {status && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-4 text-xs tracking-widest font-bold ${status.includes("ERROR") ? "text-red-500" : "text-gray-400"}`}
          >
            {status}
          </motion.p>
        )}
      </form>
    </motion.div>
  );
}