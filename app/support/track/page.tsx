"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState<null | "processing" | "shipped">(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, we simulate a "shipped" status for any input
    if(orderId.length > 3) setStatus("shipped");
  };

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-black uppercase tracking-tighter">Track_Order</h1>
        <p className="text-neutral-500 text-sm mt-2">Enter your deployment ID to check status.</p>
      </div>

      {/* INPUT FORM */}
      <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
        <input 
          type="text"
          placeholder="ORD-XXXX-XXXX"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="bg-neutral-900 border border-white/10 px-6 py-4 rounded-none flex-grow focus:outline-none focus:border-green-500 transition-colors uppercase font-mono"
        />
        <button 
          type="submit"
          className="bg-white text-black font-bold px-10 py-4 uppercase text-xs tracking-widest hover:bg-neutral-200 transition-all"
        >
          Locate_Package
        </button>
      </form>

      {/* VISUAL TRACKING STATUS (Only shows after clicking button) */}
      {status && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 space-y-8"
        >
          <div className="flex justify-between items-center px-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">Current_Status</span>
              <span className="text-xl font-bold uppercase text-green-500">In Transit</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">Est_Arrival</span>
              <span className="text-xl font-bold uppercase underline underline-offset-4">April 12</span>
            </div>
          </div>

          {/* SIMPLE PROGRESS BAR */}
          <div className="relative h-2 bg-neutral-900 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "65%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            />
          </div>

          <div className="grid grid-cols-3 text-[10px] font-mono text-neutral-600 uppercase tracking-tighter">
            <span className="text-white">Processed</span>
            <span className="text-center text-white">In_Transit</span>
            <span className="text-right">Delivered</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}