import ProductForm from "@/app/components/admin/ProductForm";
import Link from "next/link";

export default function NewProductPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link 
          href="/admin/products" 
          className="text-neutral-400 hover:text-white text-sm transition"
        >
          ← Back to Inventory
        </Link>
        <h1 className="text-3xl font-bold mt-4">Create New Product</h1>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
        <ProductForm />
      </div>
    </div>
  );
}