import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, X } from "lucide-react";

import { REAL_GALLERY_PHOTOS } from "../data";
import { useEditorOverrides } from "../editor/useEditorOverrides";

interface AtmosphereGalleryProps {
  activeGalleryFilter: string;
  setActiveGalleryFilter: (filter: string) => void;
  lightboxPhoto: any;
  setLightboxPhoto: (photo: any) => void;
}

function GalleryCard({
  photo,
  index,
  onClick,
}: {
  key?: React.Key;
  photo: (typeof REAL_GALLERY_PHOTOS)[number];
  index: number;
  onClick: () => void;
}) {
  const card = useEditorOverrides(`gallery-card-${index + 1}`);
  const cardTitle = useEditorOverrides(`gallery-card-${index + 1}-title`, { text: photo.title });
  const cardDesc = useEditorOverrides(`gallery-card-${index + 1}-desc`, { text: photo.desc });

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      {...card.bind}
      style={card.style}
      className="group relative aspect-[4/3] cursor-pointer overflow-hidden bg-zinc-950 sm:aspect-square"
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-[0.5]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-90" />
      <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-6 transition-transform duration-500 group-hover:translate-y-0 sm:p-8">
        <span className="mb-2 block text-[10px] font-mono uppercase tracking-widest text-[#00FF41]">{photo.category}</span>
        <h3
          {...cardTitle.bind}
          style={cardTitle.style}
          className="font-display mb-2 text-lg font-bold uppercase leading-tight text-white sm:text-xl"
        >
          {cardTitle.text}
        </h3>
        <div className="mb-4 h-px w-0 bg-[#00FF41] opacity-50 transition-all duration-500 group-hover:w-full" />
        <p
          {...cardDesc.bind}
          style={cardDesc.style}
          className="line-clamp-2 text-[10px] text-zinc-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:text-xs"
        >
          {cardDesc.text}
        </p>
      </div>
      <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-zinc-600 bg-black/80 opacity-0 transition-opacity group-hover:opacity-100">
        <ExternalLink className="h-4 w-4 text-[#00FF41]" />
      </div>
    </motion.div>
  );
}

const AtmosphereGallery = ({
  activeGalleryFilter,
  setActiveGalleryFilter,
  lightboxPhoto,
  setLightboxPhoto,
}: AtmosphereGalleryProps) => {
  const section = useEditorOverrides("gallery-section");
  const eyebrow = useEditorOverrides("gallery-eyebrow", { text: "GALLERY // АТМОСФЕРА И ШОУ" });
  const title = useEditorOverrides("gallery-title", { text: "ГАЛЕРЕЯ ВПИСКИ" });
  const description = useEditorOverrides("gallery-description", {
    text: "Реальные кадры Digital Вписки: сцена, зал, выступления и живая энергия вечера без повторов и стоковых изображений.",
  });

  const normalizedFilter = activeGalleryFilter || "Все";
  const filteredGalleryPhotos =
    normalizedFilter === "Все"
      ? REAL_GALLERY_PHOTOS
      : REAL_GALLERY_PHOTOS.filter((photo) => photo.category === normalizedFilter);

  return (
    <section
      id="gallery"
      {...section.bind}
      style={section.style}
      className="relative w-full border-b border-zinc-800 bg-black/60 px-4 py-12 sm:px-12 sm:py-32 lg:px-20 xl:px-32 xl:py-40"
    >
      <div className="mx-auto w-full max-w-[2000px] space-y-12 sm:space-y-24">
        <div className="flex flex-col justify-between gap-8 sm:gap-12 lg:flex-row lg:items-end">
          <div className="space-y-4 sm:space-y-6">
            <span
              {...eyebrow.bind}
              style={eyebrow.style}
              className="inline-block border border-[#FF007F]/35 bg-[#FF007F]/15 px-4 py-1.5 text-sm font-mono font-extrabold uppercase tracking-widest text-[#FF007F]"
            >
              {eyebrow.text}
            </span>
            <h2
              {...title.bind}
              style={title.style}
              className="font-display text-[42px] font-black uppercase leading-none tracking-tight text-white sm:text-[60px]"
            >
              {title.text}
            </h2>
            <p
              {...description.bind}
              style={description.style}
              className="max-w-3xl text-sm font-light leading-relaxed text-zinc-300 sm:text-base lg:text-lg"
            >
              {description.text}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Все", "Выступления", "Нетворкинг"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveGalleryFilter(filter)}
                className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest transition-all sm:px-6 sm:py-3 sm:text-xs ${
                  normalizedFilter === filter
                    ? "bg-[#00FF41] font-black text-black"
                    : "bg-zinc-900 text-zinc-400 hover:text-white"
                }`}
                aria-label={`Фильтр галереи: ${filter}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden border border-zinc-700 bg-zinc-700 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGalleryPhotos.map((photo, index) => (
            <GalleryCard key={photo.title} photo={photo} index={index} onClick={() => setLightboxPhoto(photo)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxPhoto(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-12"
          >
            <button
              className="absolute right-6 top-6 text-white transition-colors hover:text-[#FF007F] sm:right-8 sm:top-8"
              aria-label="Закрыть галерею"
            >
              <X size={40} />
            </button>

            <div
              className="grid w-full max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-12"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video border border-zinc-700 bg-zinc-900 shadow-2xl lg:col-span-8">
                <img src={lightboxPhoto.src} alt={lightboxPhoto.alt} className="h-full w-full object-cover" />
              </div>

              <div className="space-y-6 lg:col-span-4">
                <span className="text-xs font-mono uppercase tracking-[0.4em] text-[#00FF41]">{lightboxPhoto.category}</span>
                <h3 className="font-display text-3xl font-black uppercase leading-none text-white sm:text-5xl">
                  {lightboxPhoto.title}
                </h3>
                <div className="h-1 w-20 bg-gradient-to-r from-[#00FF41] to-[#FF007F]" />
                <p className="text-lg leading-relaxed text-zinc-300">{lightboxPhoto.desc}</p>
                <div className="border-l-2 border-[#FF007F] bg-zinc-900/50 p-6">
                  <span className="mb-2 block text-xs font-mono uppercase text-zinc-500">Metrics // Эффект:</span>
                  <span className="text-base font-mono text-white">{lightboxPhoto.stats}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AtmosphereGallery;
