"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExitModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY < -10 && !localStorage.getItem("exit_modal_shown")) {
        setShow(true);
        localStorage.setItem("exit_modal_shown", "true");
      }
    };
    document.addEventListener("mouseleave", handleMouseOut);
    return () => document.removeEventListener("mouseleave", handleMouseOut);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-md p-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-neutral-900 border border-white/20 p-10 max-w-lg text-center relative"
          >
            <h2 className="text-4xl font-black uppercase mb-4">Wait! Agent.</h2>
            <p className="text-neutral-400 mb-8 font-mono text-sm">WE DETECTED AN EARLY DISCONNECT. USE CODE <span className="text-white font-bold">"ORBIT10"</span> FOR 10% OFF YOUR FIRST UPGRADE.</p>
            <button 
              onClick={() => setShow(false)}
              className="w-full bg-white text-black py-4 font-bold uppercase tracking-tighter hover:bg-neutral-200 transition-colors"
            >
              Continue Mission
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}