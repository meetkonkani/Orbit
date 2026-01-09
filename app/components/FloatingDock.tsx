"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function FloatingDock({
  onCartClick,
}: {
  onCartClick: () => void;
}) {
  const { cart } = useCart();

  // Total quantity across all items
  const totalQty = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const isEmpty = totalQty === 0;

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto">
      <motion.button
        aria-label="Open cart"
        whileHover={!isEmpty ? { scale: 1.08 } : undefined}
        whileTap={!isEmpty ? { scale: 0.95 } : undefined}
        animate={
          !isEmpty
            ? { boxShadow: "0 0 0 0 rgba(34,197,94,0.0)" }
            : undefined
        }
        onClick={!isEmpty ? onCartClick : undefined}
        disabled={isEmpty}
        className={`relative flex h-16 w-16 items-center justify-center rounded-full
          border bg-black/90 backdrop-blur-md text-white shadow-2xl
          transition-colors
          ${
            isEmpty
              ? "border-white/5 opacity-50 cursor-not-allowed"
              : "border-white/10 hover:border-white/40"
          }
        `}
      >
        {/* CART ICON */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>

        {/* BADGE */}
        <AnimatePresence>
          {totalQty > 0 && (
            <motion.span
              key={totalQty}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center
                         rounded-full bg-green-500 text-[10px] font-black text-black"
            >
              {totalQty}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
