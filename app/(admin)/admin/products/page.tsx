import { prisma } from "@/app/lib/prisma";
import { deleteProduct } from "@/app/actions/admin";
import Image from "next/image";
import Link from "next/link";

// 1. Define Filter Types
interface Props {
  searchParams: Promise<{
    category?: string;
    stock?: string;
    sort?: string;
  }>;
}

export default async function AdminProductsPage({ searchParams }: Props) {
  const params = await searchParams;

  // 2. Build Dynamic Prisma Query
  const where: any = {};
  if (params.category) where.category = params.category;
  
  // Stock Logic: 'low' = < 10, 'out' = 0
  if (params.stock === "low") where.stock = { gt: 0, lte: 10 };
  if (params.stock === "out") where.stock = 0;

  // Sort Logic
  const orderBy: any = {};
  if (params.sort === "price_asc") orderBy.price = "asc";
  else if (params.sort === "price_desc") orderBy.price = "desc";
  else if (params.sort === "stock_low") orderBy.stock = "asc";
  else orderBy.createdAt = "desc";

  const products = await prisma.product.findMany({
    where,
    orderBy,
  });

  const categories = ["T-Shirt", "Hoodie", "Accessories", "Art"]; // Ideally fetch these from a groupBy

  return (
    <div className="p-8 md:p-12 text-white min-h-screen bg-black font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 border-b border-white/10 pb-12">
        <div>
          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.5em] mb-4">// INVENTORY_MANAGEMENT</p>
          <h1 className="text-7xl font-black uppercase tracking-tighter italic leading-none">Products.</h1>
        </div>
        <Link href="/admin/products/new" className="bg-white text-black px-10 py-4 font-black uppercase tracking-widest text-xs hover:invert transition-all">
          + Add_New_Unit
        </Link>
      </div>

      {/* NOIR FILTER PROTOCOL BAR */}
      <div className="flex flex-wrap gap-4 mb-12 items-center text-[10px] font-black uppercase tracking-widest">
        <div className="flex items-center gap-4 bg-zinc-950 p-4 border border-white/5">
          <span className="text-neutral-600 italic">Filter_By:</span>
          
          {/* Category Filter */}
          <select 
            onChange={undefined} // In a real app, use a client-side wrapper or use router.push
            className="bg-transparent outline-none cursor-pointer border-b border-white/20 pb-1 focus:border-white"
            defaultValue={params.category || ""}
          >
            <option value="">All_Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          {/* Stock Filter */}
          <select className="bg-transparent outline-none cursor-pointer border-b border-white/20 pb-1">
            <option value="">All_Stock</option>
            <option value="low">Low_Inventory (&lt;10)</option>
            <option value="out">Depleted (0)</option>
          </select>

          {/* Sort Filter */}
          <select className="bg-transparent outline-none cursor-pointer border-b border-white/20 pb-1">
            <option value="">Latest_Manifest</option>
            <option value="price_asc">Price: Low-High</option>
            <option value="price_desc">Price: High-Low</option>
            <option value="stock_low">Stock: Critical</option>
          </select>
        </div>

        {/* ACTIVE_STATUS_BADGE */}
        <div className="ml-auto flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-neutral-500">{products.length} Units_Analyzed</span>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/10 border border-white/10">
        {products.map((product) => (
          <div key={product.id} className="bg-black p-6 group relative flex flex-col justify-between hover:bg-zinc-950 transition-colors">
            <div className="relative aspect-[3/4] bg-neutral-900 overflow-hidden mb-6 grayscale group-hover:grayscale-0 transition-all duration-700">
              {product.images?.[0] && (
                <Image src={product.images[0]} alt={product.title} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              )}
              
              {/* STATUS INDICATOR */}
              <div className={`absolute top-0 left-0 px-3 py-1 text-[8px] font-black uppercase tracking-[0.2em] 
                ${product.stock === 0 ? "bg-red-600 text-white" : product.stock < 10 ? "bg-orange-500 text-black" : "bg-white text-black"}`}>
                {product.stock === 0 ? "Depleted" : product.stock < 10 ? `Critical: ${product.stock}` : `Stock: ${product.stock}`}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="max-w-[70%]">
                  <p className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest mb-1 italic">{product.category}</p>
                  <h3 className="text-xl font-bold uppercase italic tracking-tighter truncate leading-none">{product.title}</h3>
                </div>
                <p className="text-xl font-black italic">₹{product.price.toLocaleString()}</p>
              </div>
              
              <div className="flex gap-4 border-t border-white/5 pt-4">
                <Link href={`/admin/products/${product.id}`} className="flex-1 text-center bg-white/5 hover:bg-white hover:text-black py-3 text-[9px] font-black uppercase tracking-widest transition-all">
                  Edit_Data
                </Link>
                <form className="flex-1" action={async () => { "use server"; await deleteProduct(product.id); }}>
                  <button className="w-full text-center border border-red-900/30 text-red-900 hover:bg-red-900 hover:text-white py-3 text-[9px] font-black uppercase tracking-widest transition-all">
                    Purge
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="py-60 text-center border border-dashed border-white/10">
          <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-[0.5em] italic">No_Matching_Units_Found</p>
          <Link href="/admin/products" className="text-[9px] text-white border-b border-white mt-4 inline-block">Reset_Manifest</Link>
        </div>
      )}
    </div>
  );
}