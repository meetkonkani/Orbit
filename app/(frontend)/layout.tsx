"use client";

import { ReactLenis } from 'lenis/react';
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CartUI from "@/app/components/CartUI";

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* SCANLINE/GRID OVERLAY - This stays fixed to give a technical look */}
      <div className="fixed inset-0 pointer-events-none z-[90] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      <Navbar />
      <CartUI />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}