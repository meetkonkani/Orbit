"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function StudioPage() {
  return (
    <main className="min-h-screen w-full bg-[#050505] text-white selection:bg-white selection:text-black">
      <Navbar />

      {/* 1. ARCHITECTURAL HEADER */}
      <section className="pt-48 pb-24 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-12"
          >
            <h1 className="text-[12vw] leading-[0.8] font-bold tracking-tighter uppercase italic text-white">
              Studio <br /> Orbit.
            </h1>
            <div className="max-w-sm">
              <p className="text-xs font-bold uppercase tracking-widest mb-6 text-neutral-500">/// Protocol 001</p>
              <p className="text-xl leading-snug text-neutral-200">
                We view apparel as the primary environment for the body. Our studio focuses on the intersection of silhouette and utility.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. LARGE IMAGE SPLIT (MATERIALITY) */}
      <section className="px-6 md:px-20 pb-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="aspect-[4/5] bg-neutral-900 overflow-hidden border border-white/5">
            <motion.img 
              whileInView={{ scale: 1.1 }}
              transition={{ duration: 2 }}
              src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=2000"
              className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 transition-opacity duration-700"
            />
          </div>
          <div className="flex flex-col justify-center space-y-12 md:pl-20">
            <div>
              <h2 className="text-3xl font-bold uppercase tracking-tighter mb-4 text-white">The Materiality</h2>
              <p className="text-neutral-400 leading-relaxed">
                Utilizing bonded nylons, recycled carbon-polymers, and technical wools. Every fabric is stress-tested for environmental resilience.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold uppercase tracking-tighter mb-4 text-white">The Geometry</h2>
              <p className="text-neutral-400 leading-relaxed">
                Patterns are drafted with architectural precision. Our signature "Orbit Fit" allows for maximum range of motion without sacrificing the sharp silhouette.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. QUOTE SECTION (Inverted Contrast) */}
      <section className="py-40 bg-white text-black overflow-hidden">
        <motion.div 
          initial={{ x: "20%" }}
          whileInView={{ x: "-20%" }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap"
        >
          <span className="text-[20vw] font-black uppercase tracking-tighter opacity-100">
            DESIGNED_TO_ENDURE — DESIGNED_TO_ENDURE — 
          </span>
        </motion.div>
      </section>

      {/* 4. DATA POINTS (MINIMALIST GRID) */}
      <section className="py-40 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-12">
          {[
            { label: "Founded", val: "Tokyo_24" },
            { label: "Philosophy", val: "Utility" },
            { label: "Materials", val: "Tech_Grade" },
            { label: "Shipping", val: "Global" }
          ].map((item, i) => (
            <div key={i}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">{item.label}</p>
              <p className="text-2xl font-bold uppercase text-white">{item.val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. RETURN CTA */}
      <div className="pb-40 text-center">
        <Link href="/shop">
          <button className="px-12 py-5 bg-white text-black font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-neutral-200 transition-all">
            Browse The Collection
          </button>
        </Link>
      </div>
    </main>
  );
}