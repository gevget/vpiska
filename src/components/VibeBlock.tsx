import React, { useRef } from "react";

import { VIBE_EVENT_PHOTOS } from "../data";

const VibeBlock = () => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  });

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = scrollerRef.current;
    if (!node) return;

    dragStateRef.current = {
      isDown: true,
      startX: event.clientX,
      scrollLeft: node.scrollLeft,
    };

    node.setPointerCapture(event.pointerId);
    node.style.cursor = "grabbing";
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = scrollerRef.current;
    const dragState = dragStateRef.current;

    if (!node || !dragState.isDown) return;

    const delta = event.clientX - dragState.startX;
    node.scrollLeft = dragState.scrollLeft - delta;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = scrollerRef.current;
    const dragState = dragStateRef.current;

    if (!node || !dragState.isDown) return;

    dragStateRef.current.isDown = false;
    node.releasePointerCapture(event.pointerId);
    node.style.cursor = "grab";
  };

  return (
    <div className="w-full overflow-hidden border-b border-zinc-800 bg-black py-16 lg:py-24">
      <div
        ref={scrollerRef}
        className="hide-scrollbar flex cursor-grab gap-6 overflow-x-auto px-4 sm:px-6 lg:px-8"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {VIBE_EVENT_PHOTOS.map((photo, index) => (
          <div
            key={`${photo.src}-${index}`}
            className="group relative aspect-[4/3] w-[360px] flex-shrink-0 overflow-hidden border border-zinc-700 transition-all duration-700 sm:w-[520px] lg:w-[760px]"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VibeBlock;
