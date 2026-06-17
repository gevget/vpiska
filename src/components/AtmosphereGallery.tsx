import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { GALLERY_PHOTOS } from "../data";
import { X, ExternalLink } from "lucide-react";

interface AtmosphereGalleryProps {
  activeGalleryFilter: string;
  setActiveGalleryFilter: (filter: string) => void;
  lightboxPhoto: any;
  setLightboxPhoto: (photo: any) => void;
}

const AtmosphereGallery = ({ 
  activeGalleryFilter, 
  setActiveGalleryFilter, 
  lightboxPhoto, 
  setLightboxPhoto 
}: AtmosphereGalleryProps) => {
  const filteredGalleryPhotos = activeGalleryFilter === "Все"
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter(p => p.category === activeGalleryFilter);

  return (
    <section id="gallery" className="w-full py-12 sm:py-32 xl:py-40 px-3 sm:px-12 lg:px-20 xl:px-32 border-b border-zinc-900 bg-black/60 relative">
      <div className="w-full max-w-[2000px] mx-auto space-y-12 sm:space-y-24">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-12">
          <div className="space-y-4 sm:space-y-6">
            <span className="inline-block text-sm font-mono py-1.5 px-4 bg-[#FF007F]/15 border border-[#FF007F]/35 text-[#FF007F] uppercase tracking-widest font-extrabold rounded-none">
              GALLERY // АТМОСФЕРА КУЛУАРОВ И ШОУ
            </span>
            <h2 className="text-[60px] font-display font-black leading-none tracking-tight uppercase">
              ГАЛЕ<span className="text-[#00FF41]">РЕЯ</span> ВПИСКИ
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-zinc-300 max-w-3xl leading-relaxed font-light">
              Digital Вписка — это эмоциональная среда. Мы создаем пространство, где нетворкинг переплетается с профессиональным музыкальным шоу. Посмотрите, как это было в прошлый раз.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {["Все", "Выступления", "Нетворкинг"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveGalleryFilter(filter)}
                className={`px-4 sm:px-6 py-2 sm:py-3 font-mono text-[10px] sm:text-xs uppercase tracking-widest transition-all ${
                  activeGalleryFilter === filter 
                  ? "bg-[#00FF41] text-black font-black" 
                  : "bg-zinc-900 text-zinc-500 hover:text-white"
                }`}
                aria-label={`Фильтр галереи: ${filter}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900 overflow-hidden">
          {filteredGalleryPhotos.map((photo, i) => (
            <motion.div
              layout
              key={photo.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setLightboxPhoto(photo)}
              className="group relative aspect-[4/3] sm:aspect-square bg-zinc-950 overflow-hidden cursor-pointer"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-[0.5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[10px] font-mono text-[#00FF41] uppercase tracking-widest block mb-2">{photo.category}</span>
                <h3 className="text-lg sm:text-xl font-display font-bold text-white uppercase leading-tight mb-2">{photo.title}</h3>
                <div className="h-px w-0 bg-[#00FF41] group-hover:w-full transition-all duration-500 mb-4 opacity-50"></div>
                <p className="text-[10px] sm:text-xs text-zinc-400 font-sans line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {photo.desc}
                </p>
              </div>
              <div className="absolute top-4 right-4 w-10 h-10 bg-black/80 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-4 h-4 text-[#00FF41]" />
              </div>
            </motion.div>
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
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 sm:p-12"
          >
            <button className="absolute top-8 right-8 text-white hover:text-[#FF007F] transition-colors" aria-label="Закрыть галерею">
              <X size={40} />
            </button>
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" onClick={e => e.stopPropagation()}>
              <div className="lg:col-span-8 aspect-video bg-zinc-900 border border-white/5 relative shadow-2xl">
                <img src={lightboxPhoto.src} alt={lightboxPhoto.alt} className="w-full h-full object-cover" />
              </div>
              <div className="lg:col-span-4 space-y-6">
                <span className="text-xs font-mono text-[#00FF41] uppercase tracking-[0.4em]">{lightboxPhoto.category}</span>
                <h3 className="text-3xl sm:text-5xl font-display font-black text-white leading-none uppercase">{lightboxPhoto.title}</h3>
                <div className="w-20 h-1 bg-gradient-to-r from-[#00FF41] to-[#FF007F]"></div>
                <p className="text-lg text-zinc-400 font-sans leading-relaxed">{lightboxPhoto.desc}</p>
                <div className="p-6 bg-zinc-900/50 border-l-2 border-[#FF007F]">
                  <span className="text-xs font-mono text-zinc-500 uppercase block mb-2">Metrics // Эффект:</span>
                  <span className="text-base text-white font-mono">{lightboxPhoto.stats}</span>
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
