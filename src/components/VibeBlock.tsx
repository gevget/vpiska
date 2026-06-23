import React from "react";
import { motion } from "motion/react";
import { VIBE_EVENT_PHOTOS } from "../data";

const VibeBlock = () => {
  return (
    <div className="w-full overflow-hidden border-b border-zinc-900 bg-black py-16 lg:py-24">
      <div className="relative flex overflow-x-hidden">
        <motion.div
          className="flex whitespace-nowrap gap-6 px-4"
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          {[...VIBE_EVENT_PHOTOS, ...VIBE_EVENT_PHOTOS, ...VIBE_EVENT_PHOTOS, ...VIBE_EVENT_PHOTOS].map((photo, i) => (
            <div
              key={`vibe-${i}`}
              className="w-[320px] sm:w-[450px] lg:w-[600px] aspect-[16/10] flex-shrink-0 border border-zinc-900 grayscale hover:grayscale-0 transition-all duration-1000 relative group overflow-hidden"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end p-8">
                <div className="font-mono text-xs text-[#00FF41] tracking-[0.3em] uppercase bg-black/90 px-4 py-2 border border-[#00FF41]/40 font-black">
                  {photo.category} // ATMOSPHERE
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default VibeBlock;
