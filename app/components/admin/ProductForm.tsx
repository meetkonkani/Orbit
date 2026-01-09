"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct, deleteImageFromUT, ActionResult } from "@/app/actions/admin";
import { UploadDropzone } from "@/app/lib/uploadthing";
import Image from "next/image";
import { X, Loader2, Plus, Box } from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
}

export default function ProductForm({ initialData }: { initialData?: Product | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deletingImage, setDeletingImage] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [images, setImages] = useState<string[]>(initialData?.images || []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (images.length === 0) {
      setError("ERR_ZERO_ASSETS: PLEASE UPLOAD AT LEAST ONE IMAGE.");
      setLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      price: formData.get("price") as string,
      stock: formData.get("stock") as string,
      description: formData.get("description") as string,
      images: images,
    };

    const result: ActionResult = initialData
      ? await updateProduct(initialData.id, data)
      : await createProduct(data);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/admin/products");
      router.refresh();
    }
  }

  const removeImage = async (index: number) => {
    const urlToRemove = images[index];
    setDeletingImage(urlToRemove);
    try {
      await deleteImageFromUT(urlToRemove);
      setImages(images.filter((_, i) => i !== index));
    } catch (err) {
      setError("FS_ERROR: FAILED TO REMOVE ASSET FROM SERVER.");
    } finally {
      setDeletingImage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 text-white bg-black p-10 md:p-16 border border-white/5 max-w-6xl mx-auto selection:bg-white selection:text-black">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-12">
        <div>
          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.5em] mb-4">// UNIT_SPECIFICATION</p>
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
            {initialData ? "Update." : "Create."}
          </h2>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.3em] mb-2 italic">Product_ID</p>
          <span className="text-2xl font-mono opacity-50">{initialData?.id.slice(-8) || "NEW_NODE"}</span>
        </div>
      </div>

      {error && (
        <div className="p-6 bg-red-950/20 text-red-500 border border-red-500/30 text-xs font-bold uppercase tracking-widest">
          {error}
        </div>
      )}

      {/* IMAGE GRID: SHARP & BRUTALIST */}
      <div className="space-y-6">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 italic underline decoration-white/20">01_Visual_Assets</label>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {images.map((url, index) => (
            <div key={url} className="relative aspect-[3/4] bg-zinc-900 border border-white/5 overflow-hidden group grayscale hover:grayscale-0 transition-all duration-700">
              <Image
                src={url}
                alt="Preview"
                fill
                unoptimized
                className={`object-cover ${deletingImage === url ? 'opacity-20' : 'opacity-80 group-hover:opacity-100'}`}
              />
              <button
                type="button"
                disabled={deletingImage === url}
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 p-3 bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"
              >
                {deletingImage === url ? <Loader2 size={14} className="animate-spin" /> : <X size={14} />}
              </button>
            </div>
          ))}
          
          {/* UPLOAD TRIGGER AS A GRID ITEM */}
          <div className="aspect-[3/4] border border-dashed border-white/10 flex flex-col items-center justify-center bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-crosshair">
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setImages((prev) => [...prev, ...res.map((f) => f.url)]);
              }}
              onUploadError={(err) => setError(err.message)}
              appearance={{
                container: "w-full h-full flex flex-col items-center justify-center border-none",
                button: "bg-white text-black font-black uppercase tracking-widest text-[10px] px-6 py-3 rounded-none hover:bg-zinc-300 transition-all",
                allowedContent: "hidden",
                label: "text-[10px] font-bold text-neutral-600 uppercase mb-4"
              }}
              content={{
                button({ isUploading }) {
                  return isUploading ? "SYNCING..." : "ADD_ASSET";
                },
                label: "MAX_FILE_SIZE: 4MB"
              }}
            />
          </div>
        </div>
      </div>

      {/* INPUT GRID */}
      <div className="space-y-12">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 italic underline decoration-white/20">02_Data_Metrics</label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {/* Title */}
          <div className="space-y-4 border-b border-white/10 pb-4 focus-within:border-white transition-colors">
            <label className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Title_Reference</label>
            <input 
              name="title" 
              defaultValue={initialData?.title} 
              required 
              placeholder="e.g. ORBIT_04_HOODIE"
              className="w-full bg-transparent outline-none text-2xl font-bold uppercase italic placeholder:text-neutral-800" 
            />
          </div>

          {/* Category */}
          <div className="space-y-4 border-b border-white/10 pb-4">
            <label className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Classification</label>
            <select 
              name="category" 
              defaultValue={initialData?.category || "hoodies"} 
              className="w-full bg-transparent outline-none cursor-pointer appearance-none text-2xl font-bold uppercase italic"
            >
              <option className="bg-black text-white" value="hoodies">Hoodies</option>
              <option className="bg-black text-white" value="t-shirts">T-Shirts</option>
              <option className="bg-black text-white" value="accessories">Accessories</option>
            </select>
          </div>

          {/* Price */}
          <div className="space-y-4 border-b border-white/10 pb-4 focus-within:border-white transition-colors">
            <label className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Valuation (INR)</label>
            <input 
              name="price" 
              type="number" 
              step="0.01" 
              defaultValue={initialData?.price || ""} 
              required 
              placeholder="000.00"
              className="w-full bg-transparent outline-none text-2xl font-bold italic placeholder:text-neutral-800" 
            />
          </div>

          {/* Stock */}
          <div className="space-y-4 border-b border-white/10 pb-4 focus-within:border-white transition-colors">
            <label className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Inventory_Volume</label>
            <input 
              name="stock" 
              type="number" 
              defaultValue={initialData?.stock} 
              required 
              placeholder="0"
              className="w-full bg-transparent outline-none text-2xl font-bold italic placeholder:text-neutral-800" 
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4 border-b border-white/10 pb-4 focus-within:border-white transition-colors">
          <label className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Technical_Description</label>
          <textarea 
            name="description" 
            defaultValue={initialData?.description} 
            rows={2} 
            placeholder="ENTER UNIT DATA..."
            className="w-full bg-transparent outline-none text-xl font-medium uppercase resize-none placeholder:text-neutral-800" 
          />
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="group relative w-full bg-white text-black py-8 transition-all hover:bg-neutral-200 active:scale-[0.99] disabled:opacity-50 mt-12 overflow-hidden"
      >
        <div className="flex items-center justify-center gap-4 relative z-10">
          {loading ? (
            <>
              <Loader2 className="animate-spin text-black" size={20} />
              <span className="font-black uppercase tracking-[0.4em] text-xs">Processing_Transmission</span>
            </>
          ) : (
            <span className="font-black uppercase tracking-[0.4em] text-xs">
              {initialData ? "Commit_System_Changes" : "Execute_Mainframe_Publish"}
            </span>
          )}
        </div>
      </button>
    </form>
  );
}