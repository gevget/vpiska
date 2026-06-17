import React from "react";
import { motion } from "motion/react";
import { EVENING_FORMAT } from "../data";
import { Clock, Zap, MapPin, UserCheck, Music } from "lucide-react";

const EveningProtocol = () => {
  return (
    <section id="protocol-block" className="w-full py-24 sm:py-32 bg-[#080808] border-y border-zinc-900 px-6 sm:px-12 lg:px-20 xl:px-32 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF007F]/10 to-transparent"></div>
      
      <div className="w-full max-w-[2000px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-2xl space-y-4">
             <span className="text-[10px] font-mono text-[#00FF41] uppercase tracking-[0.5em] font-black border-l-2 border-[#00FF41] pl-4">
               TIMELINE // PROTOCOL
             </span>
             <h2 className="text-4xl sm:text-6xl font-display font-black uppercase text-white tracking-tighter leading-none">
               ПРОТОКОЛ <span className="text-[#00FF41]">ВИН</span>ИЛА
             </h2>
             <p className="text-sm sm:text-base text-zinc-500 font-mono uppercase tracking-widest max-w-xl">
               Декомпозиция вечера: от первого коктейля до финального нетворкинга.
             </p>
          </div>
          <div className="hidden lg:block text-right">
             <div className="text-[60px] font-mono font-black text-white/5 leading-none tracking-tighter">00:00 — 04:00</div>
             <div className="text-xs font-mono text-zinc-800 uppercase tracking-widest mt-2">DURATIONAL IMPACT WINDOW</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {EVENING_FORMAT.map((phase, idx) => (
            <motion.div 
              key={phase.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 bg-black border border-zinc-900 hover:border-[#FF007F]/40 transition-all duration-500 relative"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                <span className="text-4xl font-mono font-black text-[#FF007F] leading-none">0{idx + 1}</span>
              </div>
              
              <div className="space-y-8 h-full flex flex-col">
                <div className="space-y-4">
                  <div className="h-1 w-8 bg-[#00FF41] group-hover:w-full transition-all duration-700"></div>
                  <h3 className="text-xl font-mono font-black uppercase text-white group-hover:text-[#FF007F] transition-colors">{phase.phase}</h3>
                  <p className={`text-zinc-400 font-sans leading-relaxed ${idx === 3 ? 'text-[13px]' : 'text-[14px]'}`}>{phase.details}</p>
                </div>

                <div className="mt-auto space-y-6 pt-6 border-t border-zinc-900">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                       <UserCheck className="w-3 h-3 text-[#00FF41]" />
                       <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">LPR BEHAVIOR:</span>
                    </div>
                    <p className="text-[12px] text-zinc-500 italic leading-relaxed">{phase.lprBehavior}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                       <Zap className="w-3 h-3 text-[#FF007F]" />
                       <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">PARTNER FOCUS:</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-relaxed uppercase tracking-tighter">{phase.integrationFocus}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-2">
                    <MapPin className="w-3 h-3 text-zinc-700" />
                    <span className="text-[9px] font-mono text-zinc-700 uppercase">{phase.locationInside}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EveningProtocol;
