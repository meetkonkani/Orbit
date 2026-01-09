"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden">
      <Navbar />

      {/* 1. THE AGGRESSIVE HERO */}
      <section className="relative h-[60vh] flex items-center px-6 md:px-20 overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[35vw] font-black opacity-[0.02] leading-none select-none pointer-events-none italic">
          ORBIT_STU
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.h1 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-8xl md:text-[14vw] font-black uppercase leading-[0.75] tracking-tighter"
          >
            Get In <br /> <span className="text-neutral-800 italic">Touch.</span>
          </motion.h1>
        </div>
      </section>

      {/* 2. BRUTALIST GRID */}
      <section className="px-6 md:px-20 pb-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          
          {/* MINIMALIST FORM */}
          <div className="bg-black p-10 md:p-16 border-b md:border-b-0 md:border-r border-white/10">
            <form className="space-y-12">
              <div className="group">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-600 block mb-2">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter Name" 
                  className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-white transition-all text-sm uppercase placeholder:text-neutral-900"
                />
              </div>
              <div className="group">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-600 block mb-2">Email</label>
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-white transition-all text-sm uppercase placeholder:text-neutral-900"
                />
              </div>
              <div className="group">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-600 block mb-2">Inquiry</label>
                <textarea 
                  rows={4} 
                  placeholder="How can we help?" 
                  className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-white transition-all text-sm uppercase resize-none placeholder:text-neutral-900"
                />
              </div>
              <button className="w-full bg-white text-black py-6 font-black uppercase tracking-[0.2em] text-xs hover:bg-neutral-200 transition-colors">
                Send Message
              </button>
            </form>
          </div>

          {/* INFO BLOCK */}
          <div className="bg-black p-10 md:p-16 flex flex-col justify-between">
            <div className="space-y-20">
              <div className="group cursor-pointer">
                <p className="text-[10px] font-bold text-neutral-700 uppercase mb-4 tracking-[0.3em]">Business Inquiries</p>
                <p className="text-4xl font-bold group-hover:text-neutral-400 transition-all uppercase leading-none">studio@orbit.xyz</p>
              </div>
              
              <div className="group cursor-pointer">
                <p className="text-[10px] font-bold text-neutral-700 uppercase mb-4 tracking-[0.3em]">Social Media</p>
                <p className="text-4xl font-bold group-hover:text-neutral-400 transition-all uppercase leading-none">@orbit_studios</p>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-bold text-neutral-700 uppercase tracking-[0.3em]">Location</p>
                <p className="text-sm font-bold uppercase text-neutral-400">Sector 07 // Tokyo, JP</p>
              </div>
            </div>

            <div className="mt-24 pt-8 border-t border-white/5">
              <p className="text-[9px] text-neutral-800 uppercase leading-relaxed tracking-widest">
                All rights reserved © 2026 Orbit Studios <br />
                Responses generally dispatched within 24 hours.
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}