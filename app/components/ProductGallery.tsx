"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex(i => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex(i => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative">
      <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden rounded-xl">
        <Image src={images[index]} fill alt="" className="object-cover" />
      </div>

      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 p-2 rounded-full">
        <ChevronLeft className="text-white" size={18} />
      </button>

      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 p-2 rounded-full">
        <ChevronRight className="text-white" size={18} />
      </button>
    </div>
  );
}
