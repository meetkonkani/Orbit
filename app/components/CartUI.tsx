"use client";

import FloatingDock from "./FloatingDock";
import CartDrawer from "./CartDrawer";
import { useCart } from "../context/CartContext";

export default function CartUI() {
  const { isCartOpen, openCart, closeCart } = useCart();

  return (
    <>
      <FloatingDock onCartClick={openCart} />
      <CartDrawer open={isCartOpen} onClose={closeCart} />
    </>
  );
}
