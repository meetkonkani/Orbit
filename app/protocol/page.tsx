"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const protocols = [
  {
    id: "01",
    title: "Cleaning_Procedure",
    content: "Wash at 30°C maximum. Do not tumble dry. Use pH-neutral detergents to preserve the technical bonding of the carbon-polymers."
  },
  {
    id: "02",
    title: "Storage_Protocol",
    content: "Store in a cool, dry environment. Avoid prolonged exposure to direct UV light to prevent oxidation of the matte finish."
  },
  {
    id: "03",
    title: "Fit_Geometry",
    content: "Our silhouettes are engineered for an 'Architectural Oversize.' We recommend taking your standard size for the intended drape."
  }
];

export default function ProtocolPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />

      <section className="pt-48 pb-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-24"
          >
            <h1 className="text-7xl md:text-[12vw] font-black uppercase tracking-tighter italic leading-none mb-8">
              Protocols.
            </h1>
            <p className="max-w-md text-neutral-500 text-sm uppercase tracking-widest leading-relaxed">
              Guidelines for the maintenance and preservation of Orbit technical garments. Engineered to endure.
            </p>
          </motion.div>

          {/* GRID OF PROTOCOLS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {protocols.map((item) => (
              <div key={item.id} className="bg-black p-10 md:p-16 space-y-8 group hover:bg-neutral-900/50 transition-colors">
                <span className="text-[10px] font-bold text-neutral-700 uppercase tracking-[0.5em] block">
                  Step_{item.id}
                </span>
                <h2 className="text-3xl font-bold uppercase italic tracking-tighter">
                  {item.title}
                </h2>
                <p className="text-neutral-400 text-sm leading-relaxed font-light">
                  {item.content}
                </p>
              </div>
            ))}
          </div>

          {/* SIZE TABLE SECTION */}
          <div className="mt-40 border-t border-white/10 pt-20">
             <h2 className="text-4xl font-bold uppercase tracking-tighter mb-12 italic">Size_Matrix_v1.0</h2>
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="border-b border-white/20 text-[10px] uppercase tracking-widest text-neutral-500">
                     <th className="py-6">Metric</th>
                     <th className="py-6">S</th>
                     <th className="py-6">M</th>
                     <th className="py-6">L</th>
                     <th className="py-6">XL</th>
                   </tr>
                 </thead>
                 <tbody className="text-sm font-mono text-neutral-300">
                   <tr className="border-b border-white/5">
                     <td className="py-6 font-bold text-white uppercase italic">Chest (IN)</td>
                     <td className="py-6">44</td>
                     <td className="py-6">46</td>
                     <td className="py-6">48</td>
                     <td className="py-6">50</td>
                   </tr>
                   <tr className="border-b border-white/5">
                     <td className="py-6 font-bold text-white uppercase italic">Length (IN)</td>
                     <td className="py-6">26</td>
                     <td className="py-6">27</td>
                     <td className="py-6">28</td>
                     <td className="py-6">29</td>
                   </tr>
                 </tbody>
               </table>
             </div>
          </div>
        </div>
      </section>
    </main>
  );
}