"use client";

import { motion, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function useNeuralDrift() {
  const drift = useMotionValue(0);
  useEffect(() => {
    animate(drift, [0, 1, -1, 0], { duration: 8, repeat: Infinity, ease: "easeInOut" });
  }, [drift]);
  return drift;
}

function UnitSection({ unit }: { unit: any }) {
  const router = useRouter();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start 70%", "end 30%"],
});

  const imgOpacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0]);
  const imgLeftX = useTransform(scrollYProgress, [0, 0.5, 1], ["-10%", "-80%", "-160%"]);
  const imgRightX = useTransform(scrollYProgress, [0, 0.5, 1], ["10%", "80%", "160%"]);
  const imgCenterScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.9]);

  const imgTilt = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10]);

  const drift = useNeuralDrift();
  const glitchX = useTransform(drift, v => `${v * 6}px`);
  const glitchY = useTransform(drift, v => `${v * -4}px`);

  return (
    <section ref={ref} className="h-[120vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden perspective-[1200px]">

       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

  <motion.div
    initial={false}
    style={{ x: imgLeftX, opacity: imgOpacity }}
    className="absolute w-[30vw] aspect-[3/4] z-10"
  >
    <img
      src={unit.images?.[1] || "/fallback.jpg"}
      className="w-full h-full object-cover grayscale brightness-50 border border-white/10"
    />
  </motion.div>

  <motion.div
    initial={false}
    style={{ x: imgRightX, opacity: imgOpacity }}
    className="absolute w-[30vw] aspect-[3/4] z-10"
  >
    <img
      src={unit.images?.[2] || "/fallback.jpg"}
      className="w-full h-full object-cover grayscale brightness-50 border border-white/10"
    />
  </motion.div>

  <motion.div
    initial={false}
    style={{ scale: imgCenterScale, opacity: imgOpacity }}
    className="absolute w-[44vw] aspect-[16/9] z-0"
  >
    <img
      src={unit.images?.[0] || "/fallback.jpg"}
      className="w-full h-full object-cover grayscale brightness-75 border border-white/20 shadow-[0_0_120px_rgba(0,0,0,1)]"
    />
  </motion.div>

</div>

      </div>
    </section>
  );
}


export default function TechnicalIndex() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/categories", { cache: "no-store" })
      .then(res => res.json())
      .then(setCategories);
  }, []);

  return <>{categories.map(c => <UnitSection key={c.slug} unit={c} />)}</>;
}
