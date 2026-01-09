"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { Minus, Plus } from "lucide-react";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-[90]"
          />

          {/* DRAWER */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[100] h-full w-full max-w-md bg-[#050505] border-l border-white/10 p-6 flex flex-col"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h2 className="text-sm uppercase tracking-widest font-mono">
                Cart
              </h2>
              <button
                onClick={onClose}
                className="text-xs text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto py-6 space-y-6">
              {cart.length === 0 ? (
                <p className="text-sm text-neutral-500 font-mono">
                  Cart is empty.
                </p>
              ) : (
                cart.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex gap-4"
                  >
                    {/* IMAGE */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-20 object-cover border border-white/10"
                    />

                    {/* INFO */}
                    <div className="flex-1 space-y-2">
                      <p className="text-sm font-medium uppercase">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-neutral-400 font-mono">
                        Size {item.size}
                      </p>

                      {/* QTY CONTROLS */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, -1)
                          }
                          className="h-6 w-6 flex items-center justify-center border border-white/20 hover:border-white transition"
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
                          className="h-6 w-6 flex items-center justify-center border border-white/20 hover:border-white transition"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* PRICE + REMOVE */}
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-sm font-mono">
                          ${item.price}
                        </span>
                        <button
                          onClick={() =>
                            removeFromCart(item.id, item.size)
                          }
                          className="text-[10px] uppercase text-neutral-500 hover:text-red-500 transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* FOOTER */}
            <div className="border-t border-white/10 pt-6 space-y-4">
              <div className="flex justify-between text-sm font-mono">
                <span>Total</span>
                <span>${total}.00</span>
              </div>

              <Link
                href="/cart"
                onClick={onClose}
                className="block w-full bg-white text-black text-center py-4 font-bold uppercase tracking-widest hover:bg-neutral-200 transition"
              >
                View Full Cart
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
