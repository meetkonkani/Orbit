"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function MagneticCursor() {
  const [isVisible, setIsVisible] = useState(false);

  // Spring physics for "heavy" movement
  const springConfig = { stiffness: 500, damping: 28, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY, isVisible]);

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? 1 : 0,
      }}
      className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center transition-opacity duration-300"
    >
      <div className="w-1 h-1 bg-white rounded-full" />
    </motion.div>
  );
}