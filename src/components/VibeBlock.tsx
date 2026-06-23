import React, { useRef } from "react";

const VIBE_EVENT_PHOTOS = [
  { src: "/event-33.jpg", alt: "Финал номера с букетами и артистами на сцене" },
  { src: "/event-22.jpg", alt: "Дуэт на сцене с живой группой и залом" },
  { src: "/event-1212.jpg", alt: "Музыканты и гость на сцене в синем свете" },
  { src: "/vp-4.jpg", alt: "Гость снимает выступление на телефон" },
  { src: "/vp-6.jpg", alt: "Эмоциональный момент на сцене" },
  { src: "/vp-7.jpg", alt: "Концертный кадр с залом и артистами" },
  { src: "/vp-1.jpg", alt: "Энергия толпы на выступлении" },
];

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
    node.scrollLeft = dragState.scrollLeft - delta * 1.1;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = scrollerRef.current;
    if (!node || !dragStateRef.current.isDown) return;

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
            className="group relative aspect-[4/3] w-[82vw] max-w-[400px] flex-shrink-0 overflow-hidden border border-zinc-700 transition-all duration-700 sm:w-[580px] lg:w-[840px]"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent sm:from-black/35" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VibeBlock;
