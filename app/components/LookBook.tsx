"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Lookbook() {
  const [looks, setLooks] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/products?limit=5");
      const data = await res.json();
      setLooks(data);
    };
    load();
  }, []);

  if (!looks.length) return null;

  return (
    <section className="py-32 border-t border-white/10 bg-black">
      <div className="px-6 md:px-10 mb-12 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold uppercase text-white mb-2">
          Season 04 Lookbook
        </h2>
        <p className="text-neutral-400 font-mono text-sm">
          FIELD TEST DATA // TERRAFORMA
        </p>
      </div>

      <div className="flex overflow-x-auto gap-6 px-6 md:px-10 no-scrollbar">
        {looks.map((look, i) => (
          <motion.div
            key={look.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => router.push(`/products/${look.id}`)}
            className="relative flex-shrink-0 w-[320px] md:w-[450px] h-[520px] md:h-[680px] bg-neutral-900 border border-white/10 overflow-hidden cursor-pointer"
          >
            <img
              src={look.images[0]}
              className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
            />

            <div className="absolute bottom-0 left-0 p-6 bg-black/40 w-full">
              <p className="font-mono text-xs text-neutral-400">LOOK {i + 1}</p>
              <h3 className="text-xl text-white font-bold uppercase">
                {look.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
