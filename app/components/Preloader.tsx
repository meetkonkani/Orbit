"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [isFirstVisit, setIsFirstVisit] = useState(true); // <--- NEW STATE

  useEffect(() => {
    // 1. CHECK IF USER HAS VISITED BEFORE (In this session)
    const hasVisited = sessionStorage.getItem("orbit-visited");

    if (hasVisited) {
      // If they have visited, disable the loader immediately
      setIsFirstVisit(false);
      document.body.style.overflow = "auto"; // Ensure they can scroll
      return; 
    }

    // 2. IF IT IS THEIR FIRST TIME:
    sessionStorage.setItem("orbit-visited", "true"); // Mark them as visited
    document.body.style.overflow = "hidden"; // Lock scroll

    // 3. RUN THE COUNTER LOGIC
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const jump = Math.floor(Math.random() * 10) + 1;
        return Math.min(prev + jump, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // 4. UNLOCK SCROLL WHEN ANIMATION FINISHES
  useEffect(() => {
    if (count === 100) {
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 1000);
    }
  }, [count]);

  // 5. IF NOT FIRST VISIT, RENDER NOTHING (Instant Load)
  if (!isFirstVisit) return null;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: count === 100 ? "-100%" : 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black text-white"
    >
      <div className="flex items-end overflow-hidden">
        <motion.h1 
          className="text-9xl font-bold tracking-tighter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {count}
        </motion.h1>
        <span className="mb-4 text-4xl font-thin opacity-50">%</span>
      </div>

      <div className="absolute bottom-10 w-64 h-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-white"
          style={{ width: `${count}%` }}
        />
      </div>
    </motion.div>
  );
}