"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  // 1. Physics Setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();

    // Calculate distance from center
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Move the button (0.3 = move 30% of the distance)
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    // TRIGGER AREA (Static - does not move)
    <div 
      ref={ref}
      onMouseMove={handleMouseMove} 
      onMouseLeave={reset}
      className="relative inline-block" // Keeps layout stable
    >
      {/* ANIMATED BUTTON (Moves freely) */}
      <motion.button
        style={{ x: springX, y: springY }}
        className={`
          relative z-10 rounded-full 
          bg-white text-black 
          px-8 py-4 text-lg font-bold 
          transition-colors duration-300 
          hover:bg-gray-200 
          ${className}
        `}
      >
        {children}
      </motion.button>
    </div>
  );
}