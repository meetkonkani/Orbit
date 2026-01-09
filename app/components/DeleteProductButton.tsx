"use client";

import { deleteProduct } from "@/app/actions/admin";
import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";

export default function DeleteProductButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setIsDeleting(true);
    await deleteProduct(id);
    setIsDeleting(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-xs text-red-400 bg-red-400/10 px-3 py-1.5 rounded-md hover:bg-red-400/20 transition disabled:opacity-50"
    >
      {isDeleting ? <Loader2 className="animate-spin w-3 h-3" /> : "Delete"}
    </button>
  );
}