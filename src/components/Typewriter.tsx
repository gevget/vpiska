import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
}

const Typewriter = ({ text, className, speed = 0.015 }: TypewriterProps) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let current = "";
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        current += text[i];
        setDisplayText(current);
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed * 1000);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.5, 1] }}
        className="inline-block w-[2px] h-3.5 ml-0.5 bg-current align-middle"
      />
    </span>
  );
};

export default Typewriter;
