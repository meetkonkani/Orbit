"use client";
import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export default function Toast({ message, isVisible }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 20, x: "-50%" }}
          className="fixed bottom-10 left-1/2 z-[9999] bg-green-500 text-black px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.4)]"
        >
          <span className="mr-2">●</span> {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}