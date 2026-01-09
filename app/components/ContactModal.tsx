"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, FormEvent } from "react";

export default function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // States: 'idle' | 'loading' | 'success'
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate sending data to a server (2 second delay)
    setTimeout(() => {
      setStatus("success");
      // Reset after 3 seconds so they can submit again later if needed
      setTimeout(() => {
        onClose();
        setStatus("idle");
      }, 3000);
    }, 2000);
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
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md"
          />

          {/* MODAL WINDOW */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="pointer-events-auto w-full max-w-lg bg-[#0a0a0a] border border-white/10 p-8 md:p-12 relative overflow-hidden"
            >
              {/* DECORATIVE CORNERS */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white" />

              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-neutral-500 hover:text-white"
              >
                ✕
              </button>

              {/* LOGIC SWITCHER */}
              {status === "success" ? (
                // SUCCESS STATE
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-10"
                >
                  <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-wider">Signal Received</h2>
                  <p className="text-neutral-400 font-mono text-sm">WELCOME TO THE CULT.</p>
                </motion.div>
              ) : (
                // FORM STATE
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="text-center mb-4">
                    <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-wider">Join the Waitlist</h2>
                    <p className="text-neutral-400 text-sm">Get early access to Season 05 drops.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest mb-1 block">Codename</label>
                      <input 
                        required
                        type="text" 
                        placeholder="ENTER NAME"
                        className="w-full bg-neutral-900 border border-white/10 p-4 text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest mb-1 block">Frequency</label>
                      <input 
                        required
                        type="email" 
                        placeholder="ENTER EMAIL"
                        className="w-full bg-neutral-900 border border-white/10 p-4 text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  <button 
                    disabled={status === "loading"}
                    className="w-full bg-white text-black font-bold py-4 mt-2 hover:bg-neutral-200 transition-colors uppercase tracking-widest disabled:opacity-50 disabled:cursor-wait"
                  >
                    {status === "loading" ? "ENCRYPTING DATA..." : "INITIATE UPLOAD"}
                  </button>
                  
                  <p className="text-[10px] text-neutral-600 text-center font-mono">
                    BY JOINING, YOU AGREE TO OUR DATA RETENTION PROTOCOLS.
                  </p>
                </form>
              )}

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}