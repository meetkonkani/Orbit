"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Mock Data for Search
const searchableItems = [
  { id: 1, title: "NIGHT OPS // V1", type: "Jacket" },
  { id: 2, title: "URBAN DRIFTER", type: "Pants" },
  { id: 3, title: "CARBON CORE VEST", type: "Vest" },
  { id: 4, title: "NEO TOKYO RUNNER", type: "Activewear" },
  { id: 5, title: "SYSTEM SHOCK PARKA", type: "Outerwear" },
  { id: 6, title: "CYBERPUNK HOODIE", type: "Hoodie" },
  { id: 7, title: "OBSIDIAN TEE", type: "T-Shirt" },
];

export default function SearchCommand({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  // Filter items based on query
  const results = searchableItems.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.type.toLowerCase().includes(query.toLowerCase())
  );

  // Handle Keyboard Shortcut (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Handle Navigation
  const handleSelect = (id: number) => {
    onClose();
    router.push("/products/${id}")  
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
          />

          {/* SEARCH WINDOW */}
          <div className="fixed inset-0 z-[70] flex items-start justify-center pt-20 px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="w-full max-w-2xl bg-[#0a0a0a] border border-white/20 pointer-events-auto shadow-2xl overflow-hidden"
            >
              {/* INPUT HEADER */}
              <div className="flex items-center border-b border-white/10 px-6 py-4">
                <span className="text-neutral-500 mr-4 font-mono">{">"}</span>
                <input
                  autoFocus
                  type="text"
                  placeholder="SEARCH DATABASE..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-white font-mono text-lg focus:outline-none placeholder-neutral-700 uppercase"
                />
                <button 
                    onClick={onClose}
                    className="text-xs font-mono text-neutral-500 border border-neutral-800 px-2 py-1 rounded"
                >
                    ESC
                </button>
              </div>

              {/* RESULTS LIST */}
              <div className="max-h-[60vh] overflow-y-auto">
                {results.length === 0 ? (
                  <div className="p-8 text-center text-neutral-600 font-mono text-sm">
                    NO MATCHING RECORDS FOUND IN SECTOR 7.
                  </div>
                ) : (
                  <div className="p-2">
                    {results.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item.id)}
                        className="w-full text-left flex justify-between items-center p-4 hover:bg-white hover:text-black transition-colors group"
                      >
                        <span className="font-bold tracking-wider uppercase">
                          {item.title}
                        </span>
                        <span className="text-xs font-mono text-neutral-500 group-hover:text-neutral-400">
                          TYPE: {item.type.toUpperCase()}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* FOOTER */}
              <div className="bg-neutral-900/50 p-2 text-center border-t border-white/5">
                <p className="text-[10px] text-neutral-600 font-mono">
                  ORBIT SYSTEM SEARCH v1.0 // ACCESS GRANTED
                </p>
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}