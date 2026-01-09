"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import Image from "next/image";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { clearCart } = useCart();
  const clearedRef = useRef(false);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // 1. Clear cart once
    if (!clearedRef.current) {
      clearCart();
      clearedRef.current = true;
    }

    // 2. Fetch some products for "You might also like"
    // In production, you'd fetch based on the category of the items bought
    const fetchRecs = async () => {
      try {
        const res = await fetch("/api/products?limit=3");
        const data = await res.json();
        setRecommendations(data.slice(0, 3));
      } catch (err) {
        console.error("Failed to load recommendations");
      }
    };
    fetchRecs();
  }, [clearCart]);

  return (
    <main className="min-h-screen bg-white text-black flex flex-col items-center p-12 lg:p-24">
      {/* 1. CONFIRMATION SECTION */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-8"
      >
        <Check className="text-white" size={32} />
      </motion.div>

      <div className="max-w-2xl w-full text-center mb-24">
        <h1 className="text-5xl lg:text-7xl font-black italic uppercase leading-none mb-6">Confirmed.</h1>
        <p className="text-neutral-500 text-xs lg:text-sm uppercase tracking-[0.2em] mb-8">
          Order ID: <span className="font-mono font-bold text-black">#{orderId?.slice(-8).toUpperCase()}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/account/orders">
            <button className="px-8 py-4 border border-black text-black text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
              Track Order
            </button>
          </Link>
          <Link href="/shop">
            <button className="px-8 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all">
              Back to Store
            </button>
          </Link>
        </div>
      </div>

      {/* 2. RECOMMENDATIONS SECTION */}
      {recommendations.length > 0 && (
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl border-t border-neutral-100 pt-16"
        >
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-2xl font-black italic uppercase">Complete the set</h2>
              <p className="text-[10px] text-neutral-400 uppercase tracking-widest">Recommended based on your purchase</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendations.map((product: any) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <div className="aspect-[3/4] relative bg-neutral-100 overflow-hidden mb-4">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xs font-bold uppercase mb-1">{product.title}</h3>
                <p className="text-xs text-neutral-500 font-mono">₹{product.price.toLocaleString("en-IN")}</p>
              </Link>
            ))}
          </div>
        </motion.section>
      )}

      {/* FOOTER */}
      <footer className="mt-32 text-center">
        <p className="text-[9px] text-neutral-300 uppercase tracking-[0.4em]">&copy; 3DX PARTICLES 2026 // LOGISTICS GRID ACTIVE</p>
      </footer>
    </main>
  );
}