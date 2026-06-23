import React from "react";
import { motion } from "motion/react";
import { Armchair, Briefcase, Camera, Monitor, Wine } from "lucide-react";

const PARTNER_ARSENAL = [
  { title: "Визуальное доминирование", desc: "Логотипы, экраны, навигация и фирменные поверхности, которые держат бренд в поле внимания весь вечер.", icon: Monitor },
  { title: "Прямой контакт", desc: "Точки касания, в которых гости взаимодействуют с брендом без ощущения рекламного шума.", icon: Briefcase },
  { title: "Лаунж и сервис", desc: "Комфортные зоны для общения, встреч, коротких переговоров и приватных знакомств.", icon: Armchair },
  { title: "Авторский барный опыт", desc: "Коктейли, барные сценарии и фирменные элементы, которые делают бренд частью атмосферы.", icon: Wine },
  { title: "Контентный след", desc: "Фото, репортажи и медийные материалы, которые продолжают работать после события.", icon: Camera },
];

const PartnerArsenal = () => {
  return (
    <section id="arsenal-block" className="relative w-full overflow-hidden bg-black px-6 py-24 sm:px-12 sm:py-32 lg:px-20 xl:px-32">
      <div className="mx-auto grid w-full max-w-[2000px] grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-4">
          <div className="space-y-4">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-[#FF007F]">PARTNER ARSENAL</span>
            <h2 className="font-display text-[32px] font-black uppercase leading-none tracking-tighter text-white">
              ИНСТРУМЕНТАРИЙ <br />
              КАСАНИЯ
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-500">
              Мы не просто размещаем логотип. Мы встраиваем бренд в саму ДНК события через ключевые сценарии взаимодействия с аудиторией.
            </p>
          </div>
          <div className="space-y-4 border-t border-zinc-900 pt-4">
            {["VISUAL DOMINANCE", "DIRECT ENGAGEMENT", "MEMORABLE UTILITY", "DIGITAL ECHO"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="h-1 w-1 rounded-full bg-[#FF007F]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-8">
          {PARTNER_ARSENAL.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group border border-zinc-900 bg-zinc-950 p-8 transition-all hover:border-[#FF007F]/40 ${idx === 4 ? "md:col-span-2" : ""}`}
              >
                <div className="mb-6 flex h-10 w-10 items-center justify-center border border-zinc-800 transition-colors group-hover:border-[#FF007F]">
                  <Icon className="h-4 w-4 text-zinc-500 group-hover:text-[#FF007F]" />
                </div>
                <h3 className="mb-4 text-sm font-mono font-black uppercase tracking-widest text-white">{item.title}</h3>
                <p className="text-[10px] font-mono uppercase tracking-widest leading-relaxed text-zinc-500 sm:text-xs">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PartnerArsenal;
