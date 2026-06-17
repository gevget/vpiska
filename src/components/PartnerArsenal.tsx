import React from "react";
import { motion } from "motion/react";
import { PARTNER_ARSENAL } from "../data";
import { Monitor, Armchair, Wine, Briefcase, Camera } from "lucide-react";

const ICONS: Record<string, any> = {
  Monitor,
  Armchair,
  Wine,
  Briefcase,
  Camera,
};

const PartnerArsenal = () => {
  return (
    <section id="arsenal-block" className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-20 xl:px-32 bg-black relative overflow-hidden">
      <div className="w-full max-w-[2000px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-8">
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-[#FF007F] uppercase tracking-[0.5em] font-black">
              PARTNER ARSENAL
            </span>
            <h2 className="text-[32px] font-display font-black text-white uppercase tracking-tighter leading-none">
              ИНСТРУМЕНТАРИЙ <br />
              КАСАНИЯ
            </h2>
            <p className="text-sm text-zinc-500 font-sans leading-relaxed max-w-sm">
              Мы не просто вешаем логотип. Мы интегрируем ваш бренд в саму ДНК события через 5 ключевых векторов взаимодействия с аудиторией.
            </p>
          </div>
          <div className="space-y-4 pt-4 border-t border-zinc-900">
             {["VISUAL DOMINANCE", "DIRECT ENGAGEMENT", "MEMORABLE UTILITY", "DIGITAL ECHO"].map(item => (
               <div key={item} className="flex items-center gap-3">
                 <div className="w-1 h-1 bg-[#FF007F] rounded-full"></div>
                 <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{item}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {PARTNER_ARSENAL.map((item, idx) => {
            const Icon = ICONS[item.icon] || Monitor;
            return (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-8 bg-zinc-950 border border-zinc-900 hover:border-[#FF007F]/40 transition-all group ${idx === 4 ? "md:col-span-2" : ""}`}
              >
                <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center mb-6 group-hover:border-[#FF007F] transition-colors">
                  <Icon className="w-4 h-4 text-zinc-500 group-hover:text-[#FF007F]" />
                </div>
                <h3 className="text-sm font-mono font-black text-white uppercase tracking-widest mb-4">{item.title}</h3>
                <p className="text-[10px] sm:text-xs text-zinc-500 font-mono uppercase tracking-widest leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PartnerArsenal;
