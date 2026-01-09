"use client";

export default function SocialProof() {
  return (
    <section className="py-16 bg-[#050505] border-y border-white/10">
      <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-8">
        {[
          ["15K+", "Happy Clients"],
          ["120+", "Cities Delivered"],
          ["4.9★", "Customer Rating"],
          ["100%", "Quality Check"],
        ].map(([value, label]) => (
          <div key={label}>
            <p className="text-3xl font-black">{value}</p>
            <p className="text-xs uppercase text-neutral-500 mt-2 tracking-widest">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
