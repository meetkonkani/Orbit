"use client";

import React from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("TRANSMISSION_SENT", {
      description: "Our agents will respond within 24 hours."
    });
  };

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-black uppercase tracking-tighter">Contact_Protocol</h1>
        <p className="text-neutral-500 text-sm mt-2 font-mono">Secure uplink for support and general inquiries.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 font-mono">Agent_Name</label>
            <input required type="text" placeholder="Your Name" className="w-full bg-neutral-900 border border-white/10 p-4 text-sm focus:outline-none focus:border-white transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 font-mono">Return_Uplink</label>
            <input required type="email" placeholder="Email Address" className="w-full bg-neutral-900 border border-white/10 p-4 text-sm focus:outline-none focus:border-white transition-colors" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 font-mono">Transmission_Subject</label>
          <select className="w-full bg-neutral-900 border border-white/10 p-4 text-sm focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer">
            <option>General Inquiry</option>
            <option>Order Support</option>
            <option>Press & Media</option>
            <option>Wholesale</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 font-mono">Message_Body</label>
          <textarea required rows={5} placeholder="Type your message here..." className="w-full bg-neutral-900 border border-white/10 p-4 text-sm focus:outline-none focus:border-white transition-colors resize-none" />
        </div>

        <button type="submit" className="w-full bg-white text-black py-4 font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-neutral-200 transition-all">
          Execute_Transmission
        </button>
      </form>
    </div>
  );
}