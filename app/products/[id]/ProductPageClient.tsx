"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useCart } from "@/app/context/CartContext";
import { 
  ArrowLeft, Share2, ShieldCheck, Truck, RotateCcw, 
  X, Maximize2, Ruler, MapPin, Loader2, CheckCircle2, Flame, Eye, Info
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProductPageClient({ product, relatedProducts }: any) {
  const router = useRouter();
  const { addToCart } = useCart();

  // --- UI STATES ---
  const [size, setSize] = useState("M");
  const [activeImg, setActiveImg] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("desc");

  // --- DYNAMIC DATA ---
  const [viewingCount, setViewingCount] = useState(12);
  const stockCount = product.stock ?? 0;
  const isLowStock = stockCount > 0 && stockCount <= 10;

  useEffect(() => {
    // Simulated live viewer count
    const interval = setInterval(() => {
      setViewingCount(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const images = Array.isArray(product.images) && product.images.length > 0 
    ? product.images : ["/fallback.jpg"];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      
      {/* 1. NOIR STOCK LOCKDOWN (The "Feature Load" Scarcity) */}
      <AnimatePresence>
        {stockCount === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 text-center"
          >
            <div className="max-w-md border border-white/10 p-12 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-pulse" />
               <p className="text-[10px] font-bold text-red-500 uppercase tracking-[0.5em] mb-6">// ARCHIVE_STATUS</p>
               <h2 className="text-5xl font-black italic uppercase mb-4">Unit_Sold_Out.</h2>
               <p className="text-xs text-neutral-500 uppercase tracking-widest leading-relaxed mb-8">
                 This acquisition window is closed. Sign up for the next drop notification.
               </p>
               <button onClick={() => router.back()} className="text-[10px] font-bold uppercase border-b border-white pb-2 hover:text-neutral-400">Return_to_Shop</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isZoomed && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-black/95 flex items-center justify-center cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
          >
            <X className="absolute top-10 right-10 text-white/40" size={32} />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative w-[90vw] h-[90vh]">
              <Image src={images[activeImg]} alt="Zoomed" fill className="object-contain" quality={100} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* LEFT: IMAGE GALLERY */}
        <div className="w-full lg:w-3/5 bg-[#0a0a0a] relative lg:sticky lg:top-0 lg:h-screen flex items-center justify-center border-r border-white/5">
          <button onClick={() => router.back()} className="absolute top-8 left-8 z-30 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
            <ArrowLeft size={14} /> Back
          </button>

          <div className="relative w-full h-[60vh] lg:h-[80vh] cursor-zoom-in group" onClick={() => setIsZoomed(true)}>
            <Image src={images[activeImg]} alt={product.title} fill priority className="object-contain p-12 transition-transform duration-1000 group-hover:scale-110" />
          </div>

          <div className="absolute bottom-10 flex gap-2 z-20">
            {images.map((img: string, idx: number) => (
              <button key={idx} onClick={() => setActiveImg(idx)} className={`w-12 h-16 border transition-all ${activeImg === idx ? "border-white" : "border-white/10 opacity-40"}`}>
                <Image src={img} alt="thumb" width={48} height={64} className="object-cover h-full w-full grayscale hover:grayscale-0" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: DATA & ACTIONS */}
        <div className="w-full lg:w-2/5 p-8 lg:p-20 overflow-y-auto">
          <div className="flex items-center gap-3 text-[10px] font-bold text-neutral-600 uppercase tracking-[0.4em] mb-8">
            <Eye size={12} className="animate-pulse text-red-500" />
            {viewingCount} Users Inspecting This Unit
          </div>

          <h1 className="text-7xl font-black italic uppercase leading-none mb-4 tracking-tighter">{product.title}</h1>
          <p className="text-3xl font-light mb-12 italic tracking-tight">₹{product.price.toLocaleString("en-IN")}</p>

          {isLowStock && (
            <div className="mb-10 flex items-center gap-3 bg-red-950/20 border border-red-500/20 p-4">
              <Flame size={16} className="text-red-500" />
              <span className="text-[10px] font-black uppercase text-red-500 tracking-[0.2em]">Inventory_Critical: {stockCount} Remaining</span>
            </div>
          )}

          {/* SIZE CONTROL */}
          <div className="mb-12">
            <div className="flex justify-between mb-4 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
              <span>Configuration / Size</span>
              <button onClick={() => setIsSizeGuideOpen(true)} className="text-white border-b border-white/20">Manual_Chart</button>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {["S", "M", "L", "XL"].map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`py-4 text-xs font-black transition-all border ${size === s ? "bg-white text-black border-white" : "border-white/5 text-neutral-600 hover:border-white/20"}`}>{s}</button>
              ))}
            </div>
          </div>

          <button
            onClick={() => { addToCart({...product, size, image: images[activeImg]}); toast.success("MANIFEST_UPDATED: UNIT_ADDED"); }}
            className="w-full py-8 bg-white text-black font-black uppercase tracking-[0.3em] hover:invert transition-all mb-16 active:scale-95"
          >
            Add_To_Bag
          </button>

          {/* TECHNICAL SPEC ACCORDION */}
          <div className="border-t border-white/10 space-y-8 py-10">
            <div className="group cursor-pointer">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Info size={14}/> Specification_Data</span>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed uppercase tracking-widest font-mono">
                {product.description || "Technical data pending for this model. High-grade industrial fabric construction."}
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 pt-6">
               <div className="flex items-center gap-4 text-neutral-500 italic">
                 <Truck size={18} />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Global_Logistics_Enabled</span>
               </div>
               <div className="flex items-center gap-4 text-neutral-500 italic">
                 <ShieldCheck size={18} />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Authenticity_Verified_04</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}