"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";

const editorialContent = [
  {
    id: 1,
    title: "Form & Function",
    desc: "A study in silhouettes that move with the body, not against it. Engineered for the modern nomad.",
    img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200",
    align: "left"
  },
  {
    id: 2,
    title: "The Materiality",
    desc: "Sourced from technical mills. Water-repellent, breathable, and designed to endure the elements.",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200",
    align: "right"
  }
];

export default function EditorialPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      <Navbar />
      
      {/* HERO: HIGH CONTRAST */}
      <section className="pt-60 pb-40 px-6 md:px-20 text-center relative overflow-hidden">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[15vw] font-bold tracking-tighter leading-[0.8] uppercase italic"
        >
          Series_04
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-[10px] uppercase tracking-[0.5em] text-neutral-500 font-bold"
        >
          An Architectural Exploration of Apparel
        </motion.p>
        
        {/* Subtle Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.02] whitespace-nowrap text-[30vw] font-black select-none pointer-events-none">
          ORBIT STUDIOS
        </div>
      </section>

      {/* EDITORIAL SECTIONS */}
      {editorialContent.map((item) => (
        <section key={item.id} className="py-40 px-6 md:px-20 border-t border-white/5">
          <div className={`max-w-7xl mx-auto flex flex-col ${item.align === "right" ? "md:flex-row-reverse" : "md:flex-row"} gap-20 items-center`}>
            
            {/* Image Container */}
            <div className="w-full md:w-1/2 overflow-hidden border border-white/5">
              <motion.div
                whileInView={{ scale: [1.1, 1] }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="aspect-[3/4] relative bg-neutral-900"
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 transition-opacity duration-1000" 
                />
              </motion.div>
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 space-y-8">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-[10px] font-bold text-neutral-600 uppercase tracking-[0.3em]"
              >
                Journal_Entry // 00{item.id}
              </motion.span>
              <h2 className="text-6xl font-bold tracking-tighter uppercase leading-none">{item.title}</h2>
              <p className="text-xl text-neutral-400 leading-relaxed max-w-md font-light">{item.desc}</p>
              <div className="pt-4">
                <button className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-white pb-2 hover:text-neutral-500 hover:border-neutral-500 transition-all">
                  Discover Piece
                </button>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* FOOTER CTA: CLEAN WHITE BLOCK FOR IMPACT */}
      <section className="py-60 bg-white text-black text-center">
        <motion.h2 
          whileInView={{ y: [20, 0], opacity: [0, 1] }}
          className="text-7xl md:text-9xl font-bold tracking-tighter uppercase mb-12 leading-[0.8]"
        >
          Elevate your <br/> everyday.
        </motion.h2>
        <button 
          onClick={() => router.push('/shop')}
          className="px-16 py-6 bg-black text-white font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-neutral-800 transition-all"
        >
          Enter Shop
        </button>
      </section>
    </main>
  );
}