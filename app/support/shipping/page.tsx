"use client";

import React from "react";

const SHIPPING_RATES = [
  { region: "Domestic (US)", method: "Standard", time: "3-5 Days", cost: "Free" },
  { region: "Domestic (US)", method: "Priority", time: "1-2 Days", cost: "$15.00" },
  { region: "International", method: "Global Stealth", time: "7-14 Days", cost: "$25.00" },
  { region: "International", method: "Express", time: "3-5 Days", cost: "$45.00" },
];

export default function ShippingPage() {
  return (
    <div className="space-y-12 font-sans">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-black uppercase tracking-tighter">Shipping_Protocol</h1>
        <p className="text-neutral-500 text-sm mt-2 font-mono">Logistics and deployment standards for Season 04.</p>
      </div>

      {/* DELIVERY TABLE */}
      <section className="space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">Transit_Estimates</h3>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-neutral-500 font-mono">
                <th className="py-4 font-medium">Region</th>
                <th className="py-4 font-medium">Method</th>
                <th className="py-4 font-medium">Time</th>
                <th className="py-4 font-medium text-right">Cost</th>
              </tr>
            </thead>
            <tbody className="text-sm font-mono uppercase tracking-tighter">
              {SHIPPING_RATES.map((rate, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-6 pr-4">{rate.region}</td>
                  <td className="py-6 pr-4 text-neutral-400">{rate.method}</td>
                  <td className="py-6 pr-4">{rate.time}</td>
                  <td className="py-6 text-right font-bold">{rate.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* IMPORTANT NOTES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-6">
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-white">Order_Processing</h4>
          <p className="text-xs leading-relaxed text-neutral-500">
            Units are processed within 48 hours of acquisition. You will receive a secure transmission containing your tracking ID once the package has cleared the departure sector.
          </p>
        </div>
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-white">Customs_Duties</h4>
          <p className="text-xs leading-relaxed text-neutral-500">
            International deployments may be subject to local import taxes. These fees are the responsibility of the agent (customer) and are not handled by ORBIT.
          </p>
        </div>
      </div>
    </div>
  );
}