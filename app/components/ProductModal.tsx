"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Define the shape of a Product
export interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  description: string;
}

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product | null; // If null, modal is hidden
  onClose: () => void;
}) {
  const [size, setSize] = useState("M");

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* BACKDROP (Click to close) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md"
          />

          {/* MODAL CARD */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none p-4">
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="pointer-events-auto relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl flex flex-col md:flex-row"
            >
              
              {/* CLOSE BUTTON */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              {/* LEFT: IMAGE */}
              <div className="w-full md:w-1/2 h-64 md:h-auto bg-white/5 relative">
                 <img 
                   src={product.image} 
                   alt={product.title}
                   className="absolute inset-0 w-full h-full object-cover"
                 />
              </div>

              {/* RIGHT: DETAILS */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{product.title}</h2>
                  <p className="text-2xl text-neutral-400 font-light mb-6">{product.price}</p>
                  
                  <p className="text-neutral-500 mb-8 leading-relaxed">
                    {product.description}
                  </p>

                  {/* SIZE SELECTOR */}
                  <div className="mb-8">
                    <span className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Select Size</span>
                    <div className="flex gap-3 mt-3">
                      {["S", "M", "L", "XL"].map((s) => (
                        <button
                          key={s}
                          onClick={() => setSize(s)}
                          className={`w-12 h-12 rounded-lg border flex items-center justify-center text-sm font-bold transition-all
                            ${size === s 
                              ? "bg-white text-black border-white" 
                              : "border-white/20 text-white hover:border-white/60"
                            }
                          `}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ADD TO CART */}
                <button 
                  onClick={onClose}
                  className="w-full rounded-full bg-white py-4 font-bold text-black uppercase tracking-wide transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Add to Cart — {product.price}
                </button>
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}