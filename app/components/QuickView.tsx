"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function QuickView({ product, isOpen, onClose }: any) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#0a0a0a] border-l border-white/10 z-[101] p-10 overflow-y-auto"
          >
            <button onClick={onClose} className="text-neutral-500 hover:text-white font-mono mb-10 text-xs">/// CLOSE_DRAWER</button>
            <img src={product.image} className="w-full grayscale mb-8 border border-white/5" />
            <h2 className="text-3xl font-black uppercase mb-2">{product.title}</h2>
            <p className="text-green-500 font-mono text-sm mb-6">${product.price}.00</p>
            <p className="text-neutral-400 text-sm leading-relaxed mb-8">{product.description}</p>
            <button className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors">
              Direct Access Add
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}