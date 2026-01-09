"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";

export default function HyperText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState(text);
  const [trigger, setTrigger] = useState(0); // Used to trigger animation on hover
  const iterations = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayText((current) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iterations.current) {
              return text[index];
            }
            return alphabets[Math.floor(Math.random() * 26)];
          })
          .join("")
      );

      if (iterations.current >= text.length) {
        clearInterval(interval);
      }

      iterations.current += 1 / 3; // Speed of decoding (lower = slower)
    }, 30);

    return () => clearInterval(interval);
  }, [trigger, text]);

  const scramble = () => {
    iterations.current = 0;
    setTrigger((prev) => prev + 1);
  };

  return (
    <motion.span
      className={`inline-block cursor-default ${className}`}
      onMouseEnter={scramble}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {displayText}
    </motion.span>
  );
}