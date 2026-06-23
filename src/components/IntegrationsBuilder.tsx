import React from "react";
import { Bot, Camera, Cpu, Gem, Lightbulb, Mic, Monitor, Music, Shirt, Sofa, Tag, Wine } from "lucide-react";

interface IntegrationsBuilderProps {
  openModalWithPreset: (preset: string) => void;
}

const INTEGRATION_METHODS = [
  { title: "Брендированные браслеты на входе", desc: "Первый контакт гостя с брендом", icon: "Tag", price: "50 000 ₽" },
  { title: "Логотип на всех экранах", desc: "Постоянное присутствие в поле зрения", icon: "Monitor", price: "100 000 ₽" },
  { title: "Кастомная lounge-зона", desc: "Комфорт и нетворкинг в лаундже бренда", icon: "Armchair", tag: "networking", price: "250 000 ₽" },
  { title: "Брендирование барной карты", desc: "Авторские коктейли от партнёра", icon: "Wine", price: "150 000 ₽" },
  { title: "Интерактивная световая инсталляция", desc: "Свет и визуальный вайб вечера", icon: "Lightbulb", price: "200 000 ₽" },
  { title: "AI-интегратор в кулуарах", desc: "Технологичное общение с брендом", icon: "Bot", tag: "networking", price: "300 000 ₽" },
  { title: "Интеграция в сценические номера", desc: "Появление в шоу-программе", icon: "Music", tag: "speaking", price: "400 000 ₽" },
  { title: "Backstage-репортажи", desc: "Контент с главными ЛПР вечера", icon: "Camera", tag: "speaking", price: "350 000 ₽" },
  { title: "Брендированный мерч", desc: "Кастомные аксессуары для всех гостей", icon: "Shirt", tag: "production", price: "180 000 ₽" },
  { title: "Digital-инсталляция", desc: "Интерактивная зона с вашим продуктом", icon: "Cpu", tag: "innovation", price: "250 000 ₽" },
  { title: "VIP-Lounge Service", desc: "Эксклюзивный сервис в зоне для спикеров", icon: "Gem", tag: "networking", price: "300 000 ₽" },
  { title: "Podcast Corner", desc: "Запись интервью с лидерами мнений", icon: "Mic", tag: "content", price: "150 000 ₽" },
];

const iconMap: Record<string, any> = { Tag, Monitor, Armchair: Sofa, Wine, Lightbulb, Bot, Music, Camera, Shirt, Cpu, Gem, Mic };

const IntegrationsBuilder = ({ openModalWithPreset }: IntegrationsBuilderProps) => {
  return (
    <section id="integrations-block" className="relative w-full border-t border-zinc-800/70 px-6 py-24 sm:px-12 sm:py-32 lg:px-20 xl:px-32 xl:py-40">
      <div className="mx-auto w-full max-w-[2000px] space-y-24">
        <div className="max-w-5xl space-y-10">
          <div className="space-y-4">
            <span className="block text-[10px] font-mono font-black uppercase tracking-[0.4em] text-zinc-500 sm:text-xs">// МЕТОДЫ ИНТЕГРАЦИИ БРЕНДОВ</span>
            <h2 className="font-display text-[34px] font-black uppercase leading-[0.85] tracking-tighter text-white sm:text-[64px] lg:text-[88px]">
              МАСШТАБИРУЙ <br />
              <span className="text-[#BEEB08]">ПРИСУТСТВИЕ</span>
            </h2>
          </div>
          <p className="max-w-3xl border-l border-zinc-700 pl-8 text-base font-light leading-relaxed text-zinc-300 sm:text-xl">
            Мы предлагаем более десяти способов органично встроить бренд в атмосферу Digital Вписки: от welcome-касания до сценического присутствия и контентного следа после события.
          </p>
        </div>

        <div className="hide-scrollbar -mx-6 flex overflow-x-auto px-6 pb-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-4 xl:grid-cols-4">
          {INTEGRATION_METHODS.map((method) => {
            const Icon = iconMap[method.icon] || Tag;

            return (
              <div key={method.title} className="group relative flex min-h-[300px] min-w-[280px] flex-col overflow-hidden border border-zinc-700 bg-black p-8 transition-all duration-500 hover:bg-zinc-950 sm:min-w-[340px] sm:p-10 lg:min-w-0">
                <div className="space-y-8">
                  <div className="flex items-start justify-between">
                    <div className="border border-zinc-700 p-3 text-white transition-all duration-500 group-hover:border-[#BEEB08] group-hover:text-[#BEEB08]">
                      <Icon className="h-6 w-6 stroke-[1.5]" />
                    </div>

                    {method.tag && (
                      <div className={`border px-2 py-0.5 text-[8px] font-mono font-black uppercase tracking-widest ${method.tag === "networking" ? "border-[#FF007F] text-[#FF007F]" : "border-[#BEEB08] text-[#BEEB08]"}`}>
                        {method.tag}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-mono font-black uppercase leading-tight tracking-wider text-white transition-colors duration-500 group-hover:text-[#BEEB08]">{method.title}</h4>
                    <p className="text-sm leading-relaxed text-zinc-400 transition-colors duration-500 group-hover:text-zinc-300">{method.desc}</p>
                  </div>
                </div>

                <div className="mt-auto pt-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <button onClick={() => openModalWithPreset(`Запрос интеграции: ${method.title}`)} className="flex items-center gap-2 text-[10px] font-mono font-black uppercase tracking-widest text-[#BEEB08]">
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
