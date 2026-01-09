"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import CustomCursor from "./components/CustomCursor";

export default function NotFound() {
  return (
    <main className="h-screen w-full bg-black flex flex-col items-center justify-center text-white relative overflow-hidden selection:bg-white selection:text-black">
      
      {/* 1. FIX: WRAP CURSOR IN HIGH Z-INDEX CONTAINER */}
      <div className="fixed inset-0 z-[9999] pointer-events-none">
        <CustomCursor />
      </div>

      {/* Background Noise Texture (z-0) */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none z-0" 
        style={{ 
          backgroundImage: 'url("https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png")',
          backgroundRepeat: 'repeat'
        }}
      />

      {/* GLITCHY 404 TEXT (z-10) */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-[12rem] md:text-[20rem] font-black text-neutral-900 leading-none select-none relative"
        >
          404
          {/* Overlay Text for Depth */}
          <span className="absolute top-0 left-0 text-white/5 blur-sm">404</span>
        </motion.h1>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter text-white">
              SIGNAL LOST
            </h2>
            <p className="text-neutral-500 font-mono mb-8 max-w-md mx-auto px-4">
              The coordinates you entered do not exist in this sector. 
              Please return to base immediately.
            </p>

            <Link href="/">
              <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-all hover:scale-105 uppercase tracking-widest cursor-none">
                Return to Base
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* DECORATIVE CODE AT BOTTOM */}
      <div className="absolute bottom-10 left-10 font-mono text-xs text-neutral-600 z-10">
        <p>ERR_CODE: 0x404</p>
        <p>SYSTEM: ORBIT_CORE</p>
      </div>
    </main>
  );
}