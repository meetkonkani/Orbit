"use client";

import { motion } from "framer-motion";

const fieldReports = [
  { id: 1, src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800", loc: "NEO_TOKYO" },
  { id: 2, src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800", loc: "SECTOR_04" },
  { id: 3, src: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=800", loc: "BERLIN_UNIT" },
  { id: 4, src: "https://images.unsplash.com/photo-1529139513402-e209979821ed?q=80&w=800", loc: "VOID_STATION" },
  { id: 5, src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800", loc: "OSLO_HQ" },
  { id: 6, src: "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=800", loc: "REDACTED" },
];

export default function SocialGrid() {
  return (
    <section className="py-32 px-6 md:px-20 bg-black border-t border-white/10 relative overflow-hidden">
      
      {/* SECTION HEADER */}
      <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6 max-w-7xl mx-auto">
        <div>
          <span className="font-mono text-[10px] text-green-500 tracking-[0.5em] block mb-4 uppercase">/// SURVEILLANCE_FEED</span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">
            FIELD<br/>REPORTS<span className="text-neutral-700">.</span>
          </h2>
        </div>
        <p className="font-mono text-[10px] text-neutral-500 max-w-[200px] uppercase text-right leading-relaxed">
          Real-time imagery captured via encrypted orbital uplink. Verified V4 units in transit.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 max-w-full">
        {fieldReports.map((report, i) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="group relative aspect-[4/5] bg-neutral-900 overflow-hidden border border-white/5"
          >
            {/* The Image */}
            <img 
              src={report.src} 
              alt={`Report ${report.loc}`}
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110 opacity-60 group-hover:opacity-100"
            />

            {/* Terminal Overlay UI */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
              <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="w-2 h-2 border-t border-l border-green-500" />
                 <span className="font-mono text-[8px] text-green-500">LIVE_FEED</span>
              </div>
              
              <div className="bg-black/60 backdrop-blur-sm p-2 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                <p className="font-mono text-[9px] text-white tracking-widest uppercase">LOC: {report.loc}</p>
                <p className="font-mono text-[7px] text-neutral-500 mt-1 uppercase">POS: 55.7558° N</p>
              </div>
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1/2 w-full -translate-y-full group-hover:animate-scanline pointer-events-none opacity-20" />
          </motion.div>
        ))}
      </div>

      {/* DECORATIVE BACKGROUND TEXT */}
      <div className="absolute -bottom-10 -right-10 opacity-[0.03] select-none pointer-events-none text-[20vw] font-black uppercase text-white leading-none">
        ORBIT
      </div>
    </section>
  );
}