"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import ParticleSphere from "../components/ParticleSphere";
import MagneticButton from "../components/MagneticButton";
import ContactModal from "../components/ContactModal";
import Preloader from "../components/Preloader";
import HyperText from "../components/HyperText";
import Lookbook from "../components/LookBook";
import Gallery from "../components/Gallery";
import TechnicalIndex from "../components/TechnicalIndex";
import BrandManifesto from "../components/BrandManifesto";

function SectionHeader({ title, subtitle, align = "left" }: { title: string; subtitle: string; align?: "left" | "right" }) {
  return (
    <div className={`px-6 md:px-20 mb-12 flex flex-col ${align === "right" ? "items-end text-right" : "items-start"}`}>
      <span className="font-mono text-[10px] text-green-500 tracking-[0.4em] uppercase mb-2">// {subtitle}</span>
      <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">{title}</h2>
    </div>
  );
}

export default function Homepage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="w-full min-h-screen bg-black relative selection:bg-white selection:text-black overflow-x-hidden">
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0">
        <ParticleSphere />
      </div>

      <div className="relative z-10">

    {/* HERO SECTION */}
<section className="h-screen flex flex-col items-center justify-center text-center px-6">
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    transition={{ duration: 1 }}
  >
    <p className="mb-6 text-[10px] font-mono tracking-[0.5em] text-neutral-500 uppercase">
      DROP SEASON_04
    </p>

    {/* REDUCED SIZE: Changed from text-[12vw] to md:text-8xl */}
    <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
      <HyperText text="Orbit." />
    </h1>

    <div onClick={() => router.push("/shop")} className="cursor-pointer inline-block">
      <MagneticButton>Access Drop</MagneticButton>
    </div>
  </motion.div>
</section>


        {/* GALLERY: THE TECHNICAL INDEX */}
        <section className="py-20 bg-[#050505]">
          <TechnicalIndex />
        </section>


      </div>
    </main>
  );
}