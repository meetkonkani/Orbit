"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function BrandManifesto() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Sophisticated transforms for a "deep" feel
  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.5], [0.8, 1]);
  const textBlur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  return (
    <section 
      ref={containerRef} 
      className="h-[150vh] bg-transparent relative z-10 flex items-center justify-center"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* BACKGROUND DATA WATERMARK */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none uppercase font-black italic text-[30vw] select-none">
          ORBIT
        </div>

        <motion.div 
          style={{ opacity, scale, filter: textBlur }}
          className="text-center px-6"
        >
          {/* TOP DECORATION */}
          <div className="mb-10 flex flex-col items-center gap-4">
            <div className="w-px h-20 bg-gradient-to-t from-red-600 to-transparent" />
            <span className="text-[10px] font-mono text-zinc-600 tracking-[0.6em] uppercase italic">
              // Philosophy_Protocol
            </span>
          </div>

          <h2 className="text-6xl md:text-[10vw] font-black italic uppercase tracking-tighter leading-[0.85] mb-12">
            Relentless<br/>
            <span className="text-white">By_Design.</span>
          </h2>

          {/* STRUCTURAL CONTENT BLOCK */}
          <div className="max-w-xl mx-auto border-l border-white/10 pl-8 text-left">
            <p className="text-zinc-500 text-sm md:text-base font-medium uppercase tracking-tight leading-relaxed">
              We do not build for the masses. We engineer identity for the 
              nomadic entity—those who find stability in motion and 
              precision in the void.
            </p>
            <div className="mt-8 flex gap-10 items-center">
                <span className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest">Ver_4.0.0</span>
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest italic">Est_Tokyo_Ahmedabad</span>
            </div>
          </div>
        </motion.div>

        {/* HUD ELEMENT: BOTTOM RIGHT */}
        <div className="absolute bottom-12 right-12 text-right">
          <p className="text-[8px] font-mono text-zinc-800 uppercase tracking-[1em] mb-2">Core_Philosophy</p>
          <div className="w-32 h-px bg-zinc-900 ml-auto" />
        </div>
      </div>
    </section>
  );
}