import React from "react";
import { Tag, Monitor, Sofa, Wine, Lightbulb, Bot, Music, Camera, Shirt, Cpu, Gem, Mic } from "lucide-react";
import { INTEGRATION_METHODS } from "../data";

interface IntegrationsBuilderProps {
  openModalWithPreset: (preset: string) => void;
}

const iconMap: Record<string, any> = {
  Tag,
  Monitor,
  Armchair: Sofa,
  Wine,
  Lightbulb,
  Bot,
  Music,
  Camera,
  Shirt,
  Cpu,
  Gem,
  Mic
};

const IntegrationsBuilder = ({ openModalWithPreset }: IntegrationsBuilderProps) => {
  return (
    <section id="integrations-block" className="w-full py-24 sm:py-32 xl:py-40 px-6 sm:px-12 lg:px-20 xl:px-32 relative border-t border-zinc-900/50">
      <div className="w-full max-w-[2000px] mx-auto space-y-24">
        {/* Header Section */}
        <div className="space-y-10 max-w-5xl">
          <div className="space-y-4">
            <span className="text-[10px] sm:text-xs font-mono text-zinc-600 uppercase tracking-[0.4em] font-black block">
              // МЕТОДЫ ИНТЕГРАЦИИ БРЕНДОВ
            </span>
            <h2 className="text-[42px] sm:text-[80px] lg:text-[110px] font-display font-black leading-[0.85] tracking-tighter uppercase text-white">
              МАСШТАБИРУЙ <br />
              <span className="text-[#00FF41]">ПРИСУТСТВИЕ</span>
            </h2>
          </div>
          <p className="text-base sm:text-xl text-zinc-400 max-w-3xl leading-relaxed font-light border-l border-zinc-800 pl-8">
            Мы предлагаем более десяти способов органично интегрировать ваш бренд в атмосферу Digital Вписки, обеспечивая глубокое вовлечение и качественные контакты.
          </p>
        </div>

        {/* Integration Grid - Scrollable on mobile */}
        <div className="flex overflow-x-auto pb-8 -mx-6 px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-px lg:bg-zinc-900/50 lg:border lg:border-zinc-900/50 shadow-2xl hide-scrollbar">
          {INTEGRATION_METHODS.map((method) => {
            const Icon = iconMap[method.icon] || Tag;
            return (
              <div 
                key={method.title}
                className="group p-8 sm:p-10 bg-black hover:bg-zinc-950 transition-all duration-500 flex flex-col min-h-[300px] min-w-[280px] sm:min-w-[340px] lg:min-w-0 relative overflow-hidden border border-zinc-900/50 lg:border-none"
              >
                {/* Decorative element or subtle glow if needed, but the screenshot is quite clean */}
                
                <div className="space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="p-3 border border-zinc-800 text-white group-hover:border-[#00FF41] group-hover:text-[#00FF41] transition-all duration-500">
                      <Icon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    {method.tag && (
                      <div className={`px-2 py-0.5 text-[8px] font-mono border uppercase font-black tracking-widest ${
                        method.tag === 'networking' 
                          ? 'border-[#FF007F] text-[#FF007F]' 
                          : 'border-[#00FF41] text-[#00FF41]'
                      }`}>
                        {method.tag}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-mono font-black text-white uppercase leading-tight tracking-wider group-hover:text-[#00FF41] transition-colors duration-500">
                      {method.title}
                    </h4>
                    <p className="text-sm text-zinc-500 font-sans leading-relaxed group-hover:text-zinc-400 transition-colors duration-500">
                      {method.desc}
                    </p>
                  </div>
                </div>

                {/* Subtle hover reveal element if we wanted to match the feel, but simpler is better here */}
                <div className="mt-auto pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <button 
                    onClick={() => openModalWithPreset(`Запрос интеграции: ${method.title}`)}
                    className="text-[10px] font-mono text-[#00FF41] uppercase tracking-widest font-black flex items-center gap-2"
                  >
                    Запросить →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IntegrationsBuilder;
