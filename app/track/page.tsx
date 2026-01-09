"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Search, Package, Truck, CheckCircle } from "lucide-react";

export default function TrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [showStatus, setShowStatus] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />

      <section className="pt-48 pb-20 px-6 md:px-20">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12 italic"
          >
            Track_Shipment.
          </motion.h1>

          {/* INPUT SECTION */}
          <div className="border border-white/10 p-8 md:p-12 bg-neutral-900/20 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Order Reference</label>
                <input 
                  type="text" 
                  placeholder="e.g. #ORB-12345" 
                  className="w-full bg-black border border-white/10 p-4 outline-none focus:border-white transition-colors uppercase text-sm"
                  onChange={(e) => setOrderId(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@email.com" 
                  className="w-full bg-black border border-white/10 p-4 outline-none focus:border-white transition-colors uppercase text-sm"
                />
              </div>
            </div>
            <button 
              onClick={() => setShowStatus(true)}
              className="w-full bg-white text-black py-5 font-black uppercase tracking-[0.2em] text-xs hover:bg-neutral-200 transition-colors"
            >
              Locate Package
            </button>
          </div>

          {/* STATUS TRACKER (Appears after search) */}
          {showStatus && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-12 space-y-12"
            >
              <div className="flex justify-between items-center px-4">
                {[
                  { icon: <Package size={18} />, label: "Confirmed", active: true },
                  { icon: <Truck size={18} />, label: "In Transit", active: true },
                  { icon: <CheckCircle size={18} />, label: "Delivered", active: false },
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-4 relative">
                    <div className={`p-4 rounded-full border ${step.active ? "bg-white text-black border-white" : "border-white/10 text-neutral-600"}`}>
                      {step.icon}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${step.active ? "text-white" : "text-neutral-700"}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="bg-neutral-900/50 border border-white/5 p-6 rounded-sm">
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest mb-2">Latest Update</p>
                <p className="text-sm font-bold uppercase italic">Departed Sector 07 Sorting Facility — Tokyo, JP</p>
                <p className="text-[10px] text-neutral-600 mt-1">JAN 05, 2026 • 15:40 IST</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}