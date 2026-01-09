"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import CustomCursor from "../../components/CustomCursor";
import { useCart } from "../../context/CartContext";
import Footer from "../../components/Footer";
import { Minus, Plus } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const router = useRouter();

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <main className="min-h-screen w-full bg-black text-white selection:bg-white selection:text-black pt-20 pb-10 px-6 md:px-20">
      <CustomCursor />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8 mb-10"
      >
        <div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-2">
            CART.
          </h1>
          <p className="text-neutral-500 font-mono">
            SESSION ID: 0X-9981 // ITEMS: {totalQty}
          </p>
        </div>

        <Link
          href="/"
          className="group flex items-center gap-2 text-sm font-mono text-neutral-400 hover:text-white transition-colors mt-4 md:mt-0"
        >
          ← RETURN TO BASE
        </Link>
      </motion.div>

      {/* EMPTY STATE */}
      {cart.length === 0 ? (
        <div className="py-32 text-center border border-dashed border-white/10 bg-white/5">
          <h2 className="text-2xl font-bold mb-4">VOID DETECTED</h2>
          <p className="text-neutral-500 font-mono mb-8">
            YOUR INVENTORY IS EMPTY.
          </p>
          <Link href="/">
            <button className="bg-white text-black px-6 py-3 font-bold uppercase hover:bg-neutral-200">
              Initiate Supply Run
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-16">
          {/* LEFT: ITEMS */}
          <div className="flex-1 space-y-6">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={`${item.id}-${item.size}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                  className="group flex flex-col md:flex-row gap-6 bg-white/5 p-6 border border-white/5 hover:border-white/20 transition-all"
                >
                  {/* IMAGE */}
                  <div className="h-40 w-full md:w-32 bg-black border border-white/10 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-2xl font-bold uppercase">
                          {item.title}
                        </h3>
                        <span className="font-mono text-xl">
                          ${item.price}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 font-mono mt-1">
                        ID: {item.id}
                      </p>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                      <div className="flex gap-6">
                        {/* SIZE */}
                        <div className="flex flex-col">
                          <span className="text-[10px] text-neutral-500 font-mono uppercase mb-1">
                            Size
                          </span>
                          <span className="h-8 w-12 flex items-center justify-center bg-black border border-white/20 text-xs font-mono">
                            {item.size}
                          </span>
                        </div>

                        {/* QTY */}
                        <div className="flex flex-col">
                          <span className="text-[10px] text-neutral-500 font-mono uppercase mb-1">
                            Qty
                          </span>
                          <div className="flex items-center gap-2 h-8 bg-black border border-white/20 px-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.size, -1)
                              }
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-mono w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.size, 1)
                              }
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          removeFromCart(item.id, item.size)
                        }
                        className="text-xs text-neutral-500 hover:text-red-500 hover:underline font-mono uppercase tracking-wider"
                      >
                        [REMOVE ITEM]
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* RIGHT: SUMMARY */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full lg:w-96 h-fit sticky top-10"
          >
            <div className="bg-[#050505] border border-white/10 p-8">
              <h2 className="text-xl font-bold uppercase font-mono mb-6 border-b border-white/10 pb-4">
                Order Summary
              </h2>

              <div className="space-y-4 mb-8 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Subtotal</span>
                  <span className="font-mono">${total}.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Shipping</span>
                  <span className="font-mono text-neutral-500">
                    CALCULATED NEXT
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Tax</span>
                  <span className="font-mono text-neutral-500">---</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold border-t border-white/10 pt-6 mb-8">
                <span>Total</span>
                <span className="font-mono">${total}.00</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-white text-black py-5 font-bold uppercase tracking-widest hover:bg-neutral-200 transition"
              >
                Proceed to Checkout →
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="mt-20">
      </div>
    </main>
  );
}
