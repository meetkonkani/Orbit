"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <footer className="w-full bg-black text-white relative overflow-hidden border-t border-white/10 z-20">
      
      {/* 1. PRIMARY GRID SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
        
        {/* COL 1: BRAND IDENTITY */}
        <div className="p-10 flex flex-col justify-between h-full min-h-[350px]">
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-6">
              Orbit Studios
            </h2>
            <p className="text-neutral-500 font-medium text-xs leading-relaxed uppercase tracking-tight max-w-[200px]">
              Defining the aesthetic of the post-digital nomadic entity. <br/><br/>
              Tokyo // Ahmedabad <br/>
              Operating Worldwide.
            </p>
          </div>
          
          <div className="font-mono text-[10px] text-neutral-700 tracking-[0.2em] uppercase">
            <p>Est. 2024</p>
            <p>All Rights Reserved</p>
          </div>
        </div>

        {/* COL 2: COLLECTIONS */}
        <div className="p-10 flex flex-col gap-6">
          <h3 className="text-neutral-700 uppercase tracking-[0.4em] text-[10px] font-black italic mb-6">
            Collections
          </h3>
          {[
            { name: "New Arrivals", slug: "new-arrivals" },
            { name: "Best Sellers", slug: "best-sellers" },
            { name: "Archive", slug: "archive" },
            { name: "Protocol", slug: "protocol" },
          ].map((link) => (
            <Link 
              key={link.name} 
              href={`/shop/${link.slug}`} 
              className="group flex items-center gap-4 text-2xl font-black italic uppercase tracking-tighter hover:text-red-600 transition-all"
            >
              <span className="text-[10px] text-neutral-800 group-hover:text-red-600 transition-colors">0{link.name.length}</span>
              {link.name}
            </Link>
          ))}
        </div>

        {/* COL 3: CLIENT SERVICE */}
        <div className="p-10 flex flex-col gap-6">
          <h3 className="text-neutral-700 uppercase tracking-[0.4em] text-[10px] font-black italic mb-6">
            Client Service
          </h3>
          {[
            { name: "Track Order", path: "/support/track" },
            { name: "Shipping & Returns", path: "/support/shipping" },
            { name: "Contact", path: "/support/contact" },
            { name: "Sizing Guide", path: "/support/sizing" },
          ].map((link) => (
            <Link 
              key={link.name} 
              href={link.path} 
              className="text-neutral-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest flex justify-between group"
            >
              {link.name}
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
            </Link>
          ))}
        </div>

        {/* COL 4: NEWSLETTER (Refined) */}
        <div className="p-10 flex flex-col justify-between bg-zinc-950/30">
          <div>
            <h3 className="font-black text-white uppercase text-3xl mb-4 italic tracking-tighter leading-none">
              Newsletter
            </h3>
            <p className="text-neutral-500 text-[11px] uppercase tracking-tight leading-relaxed font-medium">
              Join for priority access to seasonal deployments and limited edition drops.
            </p>
          </div>

          <form onSubmit={handleJoin} className="mt-12">
            <div className="border-b border-white/20 pb-2 group-focus-within:border-white transition-colors">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-transparent py-2 text-white font-bold text-xs placeholder-zinc-800 focus:outline-none uppercase tracking-widest"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full mt-6 bg-white text-black py-4 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all"
            >
              {subscribed ? "Subscribed" : "Join the Archive"}
            </button>
          </form>
        </div>
      </div>

      {/* 2. MASSIVE TYPOGRAPHY (Brutalist) */}
      <div className="border-t border-white/5 overflow-hidden">
        <motion.h1 
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[15vw] leading-[0.7] font-black tracking-tighter text-center uppercase py-8 select-none mix-blend-difference opacity-20"
        >
          ORBIT_STUDIOS
        </motion.h1>
      </div>

      {/* 3. FINAL FOOTER BAR */}
      <div className="border-t border-white/5 p-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-neutral-600 uppercase tracking-[0.4em]">
        <div className="flex gap-8">
          <span>© ORBIT STUDIOS 2026</span>
          <span className="hidden md:block italic text-neutral-800">Kinetic Architecture</span>
        </div>
        
        <div className="flex gap-8 mt-6 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors underline decoration-neutral-800 underline-offset-4">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors underline decoration-neutral-800 underline-offset-4">Terms</Link>
        </div>
      </div>

    </footer>
  );
}