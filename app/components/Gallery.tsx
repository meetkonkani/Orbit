"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const assets = [
  { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800", code: "C_01", label: "KINETIC_SHELL" },
  { src: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=800", code: "S_02", label: "CARBON_PANT" },
  { src: "https://images.unsplash.com/photo-1550973886-98c535044d2b?q=80&w=800", code: "D_03", label: "NEURAL_KNIT" },
  { src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800", code: "U_04", label: "ORBIT_SPEC" },
];

export default function Gallery() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="bg-transparent py-60 px-6 md:px-12 relative z-10">
      <div className="max-w-screen-2xl mx-auto">
        
        {/* STRUCTURAL HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 border-b border-white/5 pb-12">
          <div className="space-y-4">
             <span className="text-[10px] font-mono text-zinc-600 tracking-[0.6em] uppercase italic">// VISUAL_ARCHIVE</span>
             <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">Campaign_</h2>
          </div>
          <div className="mt-8 md:mt-0 text-right">
             <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Render: 100%_Stable</p>
             <p className="text-[10px] font-mono text-zinc-800 uppercase tracking-widest leading-loose italic">Deployment: V4_INTERNAL</p>
          </div>
        </div>

        {/* ASYMMETRIC NODAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-y-40 items-start">
          {assets.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className={`relative group cursor-crosshair
                ${i % 2 === 0 ? "md:col-span-7" : "md:col-span-4 md:col-start-9 md:mt-60"}`}
            >
              {/* IMAGE WINDOW */}
              <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-zinc-950/20 backdrop-blur-md">
                <motion.div
                   whileHover={{ scale: 1.1 }}
                   transition={{ duration: 1.5, ease: "circOut" }}
                   className="w-full h-full"
                >
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
                  />
                </motion.div>

                {/* HUD OVERLAY - APPEARS ON HOVER */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                   <div className="flex justify-between items-start">
                      <span className="font-mono text-[9px] text-white bg-black px-2 py-1 italic tracking-widest">[ {item.code} ]</span>
                      <div className="w-10 h-[1px] bg-red-600 mt-2" />
                   </div>
                   <div>
                      <h4 className="text-3xl font-black italic uppercase tracking-tighter text-white drop-shadow-2xl">{item.label}</h4>
                      <p className="text-[8px] font-mono text-red-600 mt-2 tracking-[0.3em]">ACQUISITION_READY_</p>
                   </div>
                </div>
              </div>

              {/* FLOATING TEXT DETAIL (Outside the box) */}
              <div className={`mt-6 flex items-center gap-6 ${i % 2 !== 0 ? "flex-row-reverse" : ""}`}>
                  <span className="text-[9px] font-mono text-zinc-700">0{i + 1}</span>
                  <div className="h-px flex-1 bg-white/5" />
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest group-hover:text-red-600 transition-colors">
                    {item.label}
                  </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* BACKGROUND SCROLL INDICATOR */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-8 opacity-20 group">
          <span className="font-mono text-[8px] rotate-90 uppercase tracking-[1em]">SCROLL_INDEX</span>
          <div className="w-px h-40 bg-white/20 relative">
             <motion.div 
                className="absolute top-0 left-0 w-full bg-red-600 h-10"
                animate={{ y: [0, 120, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
             />
          </div>
      </div>
    </section>
  );
}