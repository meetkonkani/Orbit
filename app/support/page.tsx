"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    id: "01",
    question: "How do I care for my technical garments?",
    answer: "Most units should be washed cold and hang-dried. Specialized membranes like our Season 04 shell require tech-wash to maintain water repellency."
  },
  {
    id: "02",
    question: "Do you ship to my sector?",
    answer: "We offer worldwide deployment. Standard shipping is free for all domestic orders. International rates are calculated at checkout."
  },
  {
    id: "03",
    question: "What is the 'Archive' section?",
    answer: "The Archive contains legacy units from previous seasons. These are limited in quantity and are usually not restocked once depleted."
  },
  {
    id: "04",
    question: "Is my data secure?",
    answer: "All transmissions are encrypted. We do not store payment information on our primary servers."
  }
];

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>("01");

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-green-500">Terminal_FAQ</h1>
        <p className="text-neutral-500 text-sm mt-2 font-mono">System knowledge base and operational guidance.</p>
      </div>

      {/* ACCORDION LIST */}
      <div className="space-y-4">
        {FAQS.map((faq) => (
          <div key={faq.id} className="border border-white/5 bg-white/[0.01]">
            <button 
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              className="w-full flex items-center justify-between p-6 text-left group"
            >
              <div className="flex items-center gap-6">
                <span className="font-mono text-[10px] text-neutral-600">{faq.id}</span>
                <span className="text-sm font-bold uppercase tracking-tight group-hover:text-green-500 transition-colors">
                  {faq.question}
                </span>
              </div>
              <span className={`text-xl font-mono transition-transform duration-300 ${openId === faq.id ? "rotate-45 text-green-500" : "text-neutral-700"}`}>
                +
              </span>
            </button>

            <AnimatePresence>
              {openId === faq.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-16 pb-8 text-xs leading-relaxed text-neutral-400 font-mono">
                    <span className="text-green-500 mr-2"></span>
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* FOOTNOTE */}
      <div className="pt-10 flex items-center gap-4">
        <div className="h-[1px] bg-white/10 grow" />
        <p className="text-[10px] font-mono text-neutral-600 uppercase">
          End_Of_Directory
        </p>
        <div className="h-[1px] bg-white/10 grow" />
      </div>
    </div>
  );
}