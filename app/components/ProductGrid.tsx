"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductModal, { Product } from "./ProductModal"; 

// 1. UPDATE DATA WITH CATEGORIES
const products: (Product & { category: string })[] = [
  {
    id: 1,
    title: "Cyberpunk Hoodie",
    category: "Hoodies", // <--- Added Category
    price: "$120",
    image: "https://images.unsplash.com/photo-1578681994506-b8f463450d11?q=80&w=1000&auto=format&fit=crop",
    description: "Heavyweight cotton blend with reinforced stitching. Features hidden pockets and water-resistant coating.",
  },
  {
    id: 2,
    title: "Obsidian Tee",
    category: "Tees",
    price: "$45",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
    description: "Oversized fit. 100% organic cotton. Pre-shrunk and garment dyed for a vintage look.",
  },
  {
    id: 3,
    title: "Cargo V2",
    category: "Pants",
    price: "$85",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop",
    description: "Utility trousers with 6 functional pockets. Adjustable ankle straps and magnetic closures.",
  },
  {
    id: 4,
    title: "Tactical Vest",
    category: "Gear",
    price: "$150",
    image: "https://images.unsplash.com/photo-1512106374988-c97f547f3317?q=80&w=1000&auto=format&fit=crop",
    description: "Modular vest system. Compatible with Orbit accessories. Breathable mesh back panel.",
  },
];

const categories = ["All", "Hoodies", "Tees", "Pants", "Gear"];

// ... ProductCard component stays exactly the same ...
// ... (Keep the ProductCard code you already have) ...
function ProductCard({ product, onClick }: { product: Product; onClick: () => void; }) {
  // ... Paste your existing ProductCard code here ...
  // (Or just keep it if you are editing the file)
  const [isHovered, setIsHovered] = useState(false);
  const colSpan = product.id === 1 || product.id === 4 ? "md:col-span-2" : "col-span-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative z-20 group overflow-hidden rounded-3xl border border-white/20 bg-neutral-900 ${colSpan} h-96 cursor-pointer`}
    >
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-70 group-hover:opacity-90" style={{ backgroundImage: `url(${product.image})` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col gap-1 z-30 pointer-events-none">
        <div className="flex justify-between items-end">
          <div>
             <h3 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">{product.title}</h3>
             <p className="text-neutral-300 font-medium">Limited Edition</p>
          </div>
          <span className="text-xl font-bold text-white bg-black/50 px-3 py-1 rounded-lg backdrop-blur-sm">{product.price}</span>
        </div>
        <motion.div animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }} className="overflow-hidden">
          <div className="pt-4 pointer-events-auto">
            <button className="w-full rounded-full bg-white py-3 text-sm font-bold text-black hover:bg-neutral-200 transition-colors">Quick View</button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState("All"); // <--- NEW STATE

  // Filter Logic
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section className="relative z-20 w-full py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-white">Latest Drops</h2>
          
          {/* CATEGORY TABS */}
          <div className="flex gap-2 mt-4 md:mt-0 overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all border
                  ${activeCategory === cat 
                    ? "bg-white text-black border-white" 
                    : "bg-transparent text-neutral-400 border-white/20 hover:border-white hover:text-white"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        {/* THE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[500px]">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((p) => (
               <ProductCard 
                 key={p.id} 
                 product={p} 
                 onClick={() => setSelectedProduct(p)} 
               />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State if filter yields no results */}
        {filteredProducts.length === 0 && (
          <div className="w-full h-64 flex items-center justify-center border border-dashed border-white/10 rounded-3xl">
            <p className="text-neutral-500 font-mono">NO ITEMS FOUND IN THIS SECTOR.</p>
          </div>
        )}

        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      </div>
    </section>
  );
}