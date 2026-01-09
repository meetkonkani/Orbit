import { prisma } from "@/app/lib/prisma";
import ProductForm from "@/app/components/admin/ProductForm";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Optional: Dynamic metadata for SEO/Admin clarity
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return { title: `Edit Product: ${id}` };
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // 1. Fetch data
  const product = await prisma.product.findUnique({ 
    where: { id } 
  });

  // 2. Handle 404
  if (!product) {
    notFound();
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <p className="text-sm text-gray-400 mb-2">Admin / Products / Edit</p>
        <h1 className="text-3xl font-bold italic tracking-tighter">EDIT PRODUCT</h1>
      </header>
      
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
        {/* Ensure ProductForm is a Client Component ('use client') */}
        <ProductForm initialData={JSON.parse(JSON.stringify(product))} />
      </div>
    </div>
  );
}