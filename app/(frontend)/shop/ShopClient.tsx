"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";

const CATEGORIES = ["ALL", "HOODIES", "T-SHIRTS", "ACCESSORIES"];

export default function ShopClient({ initialProducts, initialCategory }: any) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = initialProducts.filter((p: any) => {
      const matchesCategory = 
        activeCategory === "ALL" || 
        p.category.toUpperCase() === activeCategory.toUpperCase();
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "low") {
      filtered = [...filtered].sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "high") {
      filtered = [...filtered].sort((a, b) => Number(b.price) - Number(a.price));
    }
    
    return filtered;
  }, [activeCategory, searchQuery, sortBy, initialProducts]); 

  return (
    <main className="min-h-screen bg-black text-white pt-32 px-6 md:px-12 pb-20">
      
      {/* 1. COMPACT HEADER (Better than the huge one) */}
      <div className="flex flex-col md:flex-row justify-between items-baseline border-b border-white/10 pb-6 mb-12">
        <h1 className="text-4xl font-black uppercase italic tracking-tighter">Shop_Archive</h1>
        
        <div className="flex gap-8 mt-4 md:mt-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all 
                ${activeCategory === cat ? "text-white" : "text-neutral-600 hover:text-neutral-400"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2. DENSE GRID (4 columns for more "action") */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredAndSortedProducts.map((product: any) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Link href={`/products/${product.id}`} className="group block relative">
                {/* Image Wrapper */}
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 mb-4 border border-white/5">
                  <img 
                    src={product.images?.[0]} 
                    alt={product.title} 
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                  />
                  {/* Subtle Tech-Tag Overlay */}
                  <div className="absolute top-4 right-4 font-mono text-[8px] text-white/20 uppercase tracking-widest">
                    ID_{product.id.slice(-4)}
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold uppercase tracking-widest">{product.title}</h3>
                    <p className="text-[9px] text-neutral-600 uppercase font-mono">{product.category}</p>
                  </div>
                  <p className="text-xs font-bold">₹{Number(product.price).toLocaleString("en-IN")}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
}