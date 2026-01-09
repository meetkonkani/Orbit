"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ReturnsPage() {
  const steps = [
    { title: "Initiate", desc: "Contact our support protocol within 14 days of delivery." },
    { title: "Condition", desc: "Items must be unworn with all original tags and packaging intact." },
    { title: "Shipment", desc: "Securely pack the unit and ship to our designated return sector." },
    { title: "Refund", desc: "Credit will be issued to your original payment method within 7 days." }
  ];

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-black uppercase tracking-tighter">Returns_&_Exchanges</h1>
        <p className="text-neutral-500 text-sm mt-2 font-mono">Policy for unit replacement and acquisition reversal.</p>
      </div>

      {/* POLICY TEXT */}
      <div className="prose prose-invert max-w-none">
        <p className="text-sm leading-relaxed text-neutral-400">
          We stand by the quality of our gear. If a unit does not meet your operational requirements, we offer a 14-day return window. Please note that limited edition "Archive" drops are final sale.
        </p>
      </div>

      {/* STEP BY STEP */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, i) => (
          <div key={i} className="p-6 border border-white/5 bg-white/[0.02] space-y-2">
            <span className="text-[10px] font-mono text-green-500 uppercase tracking-[0.2em]">Step_0{i + 1}</span>
            <h3 className="font-bold uppercase text-sm">{step.title}</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="p-8 bg-neutral-900 border-l-2 border-white text-xs font-mono leading-relaxed">
        <span className="block font-bold mb-2">NOTE:</span>
        Exchanges are subject to inventory availability. If your size is out of stock, a digital credit will be issued.
      </div>
    </div>
  );
}