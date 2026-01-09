"use client";

import { useState } from "react";

export default function SizeGuide() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="text-xs underline">
        Size Guide
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-neutral-900 p-8 rounded-xl w-[320px] text-xs">
            <h3 className="text-lg mb-4 font-bold">SIZE GUIDE</h3>
            <table className="w-full text-neutral-300">
              <tr><td>S</td><td>36"</td></tr>
              <tr><td>M</td><td>38"</td></tr>
              <tr><td>L</td><td>40"</td></tr>
              <tr><td>XL</td><td>42"</td></tr>
            </table>
            <button onClick={() => setOpen(false)} className="mt-6 w-full bg-white text-black py-2">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
