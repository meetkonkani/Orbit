"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

// 1. INDIVIDUAL CARD COMPONENT
function Card({ 
  title, 
  subtitle, 
  colSpan = "col-span-1", 
  rowSpan = "row-span-1" 
}: { 
  title: string; 
  subtitle: string; 
  colSpan?: string;
  rowSpan?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // OPTIMIZATION: Update CSS variables directly instead of React State.
    // This prevents the entire component from re-rendering on every pixel move.
    div.style.setProperty("--mouse-x", `${x}px`);
    div.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleFocus = () => {
    setOpacity(1);
  };

  const handleBlur = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      // OPTIMIZATION: Removed 'backdrop-blur-md'. Using 'bg-black/90' is 10x faster.
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-black/90 p-8 ${colSpan} ${rowSpan}`}
    >
      {/* 2. THE SPOTLIGHT EFFECT */}
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          // We use the CSS variables we set in handleMouseMove
          background: `radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      
      {/* CONTENT */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="space-y-2">
          {/* Forced text to white for consistent Dark Mode look */}
          <h3 className="text-xl font-semibold text-white">
            {title}
          </h3>
          <p className="text-sm text-neutral-400">
            {subtitle}
          </p>
        </div>
        
        {/* Placeholder image */}
        <div className="mt-8 h-32 w-full rounded-xl bg-white/5 border border-white/10" />
      </div>
    </motion.div>
  );
}

// 3. THE MAIN GRID LAYOUT
export default function BentoGrid() {
  return (
    // OPTIMIZATION: Ensure z-index is correct so it sits above the 3D sphere
    <section className="bg-transparent py-32 px-6 relative z-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Everything you need.
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
             A suite of powerful tools designed for the future.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 h-[800px]">
          <Card 
            title="Analytics" 
            subtitle="Real-time data processing." 
            rowSpan="row-span-2" 
          />
          <Card 
            title="Global Scale" 
            subtitle="Deploy to 35+ regions instantly." 
            colSpan="md:col-span-2" 
          />
          <Card 
            title="Security" 
            subtitle="Enterprise grade encryption." 
          />
          <Card 
            title="Collaboration" 
            subtitle="Built for teams." 
          />
        </div>
      </div>
    </section>
  );
}