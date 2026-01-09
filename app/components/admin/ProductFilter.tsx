"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ProductFilter({ categories }: { categories: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Push the new URL to the browser
    router.push(`/admin/products?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-12 items-center text-[10px] font-black uppercase tracking-widest">
      <div className="flex flex-wrap items-center gap-6 bg-zinc-950 p-5 border border-white/5">
        <span className="text-neutral-600 italic">Filter_Protocol:</span>
        
        {/* Category Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-[8px] text-neutral-700">Category_Type</label>
          <select 
            onChange={(e) => updateFilter("category", e.target.value)}
            className="bg-transparent outline-none cursor-pointer border-b border-white/20 pb-1 focus:border-white text-white appearance-none pr-4"
            defaultValue={searchParams.get("category") || ""}
          >
            <option value="" className="bg-black">All_Units</option>
            {categories.map(cat => (
              <option key={cat} value={cat} className="bg-black">{cat}</option>
            ))}
          </select>
        </div>

        {/* Stock Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-[8px] text-neutral-700">Stock_Level</label>
          <select 
            onChange={(e) => updateFilter("stock", e.target.value)}
            className="bg-transparent outline-none cursor-pointer border-b border-white/20 pb-1 focus:border-white text-white appearance-none pr-4"
            defaultValue={searchParams.get("stock") || ""}
          >
            <option value="" className="bg-black">All_Levels</option>
            <option value="low" className="bg-black">Critical (&lt;10)</option>
            <option value="out" className="bg-black">Depleted (0)</option>
          </select>
        </div>

        {/* Sort Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-[8px] text-neutral-700">Sort_Order</label>
          <select 
            onChange={(e) => updateFilter("sort", e.target.value)}
            className="bg-transparent outline-none cursor-pointer border-b border-white/20 pb-1 focus:border-white text-white appearance-none pr-4"
            defaultValue={searchParams.get("sort") || ""}
          >
            <option value="" className="bg-black">Latest_Upload</option>
            <option value="price_asc" className="bg-black">Price: Low-High</option>
            <option value="price_desc" className="bg-black">Price: High-Low</option>
            <option value="stock_low" className="bg-black">Stock: Critical</option>
          </select>
        </div>

        {/* Reset Button */}
        <button 
          onClick={() => router.push('/admin/products')}
          className="text-neutral-500 hover:text-white transition-colors ml-4 border-l border-white/10 pl-6"
        >
          Reset_All
        </button>
      </div>
    </div>
  );
}