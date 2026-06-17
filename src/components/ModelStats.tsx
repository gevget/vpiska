import React from "react";
import { motion } from "motion/react";
import { PROVEN_STATS } from "../data";
import { ExternalLink } from "lucide-react";

interface ModelStatsProps {
  openModalWithPreset: (preset: string) => void;
}

const ModelStats = ({ openModalWithPreset }: ModelStatsProps) => {
  return (
    <section id="model-stats" className="w-full py-20 sm:py-32 bg-[#08080C] border-t border-zinc-900 relative">
      <div className="w-full max-w-[2000px] mx-auto px-6 sm:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 border-b border-zinc-900 pb-16">
          <div className="space-y-6 max-w-4xl">
            <span className="inline-block text-xs font-mono py-1 px-3 bg-[#00FF41]/10 border border-[#00FF41]/20 text-[#00FF41] uppercase tracking-widest font-bold">
              BLOCK 04 // ПОТЕНЦИАЛ ОХВАТА И КВОТЫ УЧАСТИЯ
            </span>
            <h2 className="text-4xl sm:text-6xl font-display font-black text-white uppercase leading-none tracking-tighter">
              МОДЕЛЬ & <span className="text-[#FF007F]">ЦИФРЫ</span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-3xl font-sans leading-relaxed">
              Цифры проверены практикой. Наша модель гарантирует отсутствие баннерного шума — строго ограниченное число партнеров при максимальной концентрации целевой аудитории.
            </p>
          </div>
          <div className="bg-black border border-zinc-900 p-6 text-zinc-500 font-mono text-sm">
            <div className="text-xs uppercase text-zinc-600 mb-2 font-bold">ПРОЕКТИРУЕМАЯ КВОТА:</div>
            <span className="text-white font-black text-xl uppercase">ТОЛЬКО 5-8 СЛОТОВ</span>
          </div>
        </div>

        {/* Categories scroll on mobile */}
        <div className="flex overflow-x-auto pb-8 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 gap-8 mt-16 hide-scrollbar">
          <div className="min-w-[300px] sm:min-w-[340px] md:min-w-0 bg-black border-2 border-[#00FF41] p-10 flex flex-col justify-between space-y-10 relative group">
            <div className="absolute top-4 right-4 bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/30 text-[10px] font-mono font-bold py-1 px-3 uppercase tracking-widest">1 СЛОТ СВОБОДЕН</div>
            <div className="space-y-8">
              <span className="text-xs font-mono text-zinc-500 block uppercase tracking-widest">ПРЕМИАЛЬНЫЙ ТИТУЛ</span>
              <h3 className="text-3xl font-display font-black text-white uppercase leading-tight">ГЕНЕРАЛЬНЫЙ ПАРТНЁР</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-sans">Полная монополия бренда. Все узлы: сцена, экраны, lounge-зоны и пиар-сеть Digital Club.</p>
              <div className="border-t border-zinc-900 pt-8 space-y-4">
                <span className="block font-mono text-xs text-[#00FF41] uppercase tracking-widest font-black">ПРИВИЛЕГИИ:</span>
                <ul className="text-sm font-mono text-zinc-400 space-y-2">
                  <li>— Сцена + Кавер-программа</li>
                  <li>— Монопольное брендирование</li>
                  <li>— 12 VIP-мест за столами</li>
                </ul>
              </div>
            </div>
            <button onClick={() => openModalWithPreset("Заявка на Генеральное партнерство")} className="w-full py-4 bg-[#00FF41] text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,65,0.1)]" aria-label="Обсудить генеральное партнерство">Обсудить монополию</button>
          </div>

          <div className="min-w-[300px] sm:min-w-[340px] md:min-w-0 bg-[#0A0A0E] border border-zinc-900 p-10 flex flex-col justify-between space-y-10 group">
            <div className="space-y-8">
              <span className="text-xs font-mono text-zinc-500 block uppercase tracking-widest">НИШЕВОЕ ЛИДЕРСТВО</span>
              <h3 className="text-3xl font-display font-black text-white uppercase leading-tight">CATEGORY PARTNER</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-sans">Закрепление отраслевого доминирования. Исключает присутствие Ваших конкурентов на площадке.</p>
              <div className="border-t border-zinc-900 pt-8 space-y-4">
                <span className="block font-mono text-xs text-zinc-600 uppercase tracking-widest font-black">ФУНКЦИИ В КВОТЕ:</span>
                <ul className="text-sm font-mono text-zinc-500 space-y-2">
                  <li>— Выбор из 9 категорий</li>
                  <li>— Брендинг категории</li>
                  <li>— Выделенная lounge-зона</li>
                </ul>
              </div>
            </div>
            <button onClick={() => openModalWithPreset("Заявка на Категорийное Партнёрство")} className="w-full py-4 bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all" aria-label="Выбрать категорию партнерства">Выбрать категорию</button>
          </div>

          <div className="min-w-[300px] sm:min-w-[340px] md:min-w-0 bg-black border border-zinc-900 p-10 flex flex-col justify-between space-y-10 group">
            <div className="space-y-8">
              <span className="text-xs font-mono text-zinc-500 block uppercase tracking-widest">МЕДИА-ПОКРЫТИЕ</span>
              <h3 className="text-3xl font-display font-black text-white uppercase leading-tight">ИНФО-ПАРТНЕР</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-sans">Широкое медийное освещение. Анонсы, логотипы и интервью с основателем компании в ресурсах Digital Club.</p>
              <div className="border-t border-zinc-900 pt-8 space-y-4">
                <span className="block font-mono text-xs text-zinc-600 uppercase tracking-widest font-black">ОРИЕНТИРЫ КАСАНИЯ:</span>
                <ul className="text-sm font-mono text-zinc-500 space-y-2">
                  <li>— Посты в соцсетях DC</li>
                  <li>— Логотип на всех носителях</li>
                  <li>— Интервью с основателем</li>
                </ul>
              </div>
            </div>
            <button onClick={() => openModalWithPreset("Заявка на Спец-Формат")} className="w-full py-4 border border-zinc-800 text-zinc-500 hover:border-white hover:text-white font-mono font-bold text-xs uppercase tracking-widest transition-all" aria-label="Предложить свой формат партнерства">Предложить концепт</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-20">
          <div className="lg:col-span-5 bg-[#0b0b0e] border border-zinc-900 p-10 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#00FF41] uppercase font-black block">ПОДТВЕРЖДЁННАЯ ПРАКТИКА</span>
              <h3 className="text-xl font-display font-black text-white uppercase tracking-tight">ПРЕДЫДУЩИЙ ОПЫТ</h3>
            </div>
            <div className="space-y-4 font-mono text-sm">
              <div className="flex justify-between border-b border-zinc-900 pb-3">
                <span className="text-zinc-600 uppercase">ГОСТИ 1-Й ВПИСКИ</span>
                <span className="text-white font-bold">{PROVEN_STATS.past.guests}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-3">
                <span className="text-zinc-600 uppercase">МАРКЕТИНГОВЫЙ СРОК</span>
                <span className="text-[#FF007F] font-bold">{PROVEN_STATS.past.promo}</span>
              </div>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed font-sans">
              Первая Вписка доказала востребованность формата: 450+ гостей собраны всего за 1 месяц продвижения в легендарном клубе &laquo;16 Тонн&raquo;.
            </p>
            <div className="pt-2">
              <a href="https://digitalclub.ru" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[#00FF41] hover:underline flex items-center gap-2 font-black">
                DIGITALCLUB.RU <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 bg-black border border-[#00FF41]/30 p-10 space-y-10">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#FF007F] uppercase tracking-widest font-black block">ПИАР-КАМПАНИЯ 2026</span>
              <h3 className="text-3xl font-display font-black text-white uppercase leading-none">РЕСУРСЫ ПРОДВИЖЕНИЯ</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROVEN_STATS.boost.map((str, idx) => (
                <div key={idx} className="p-4 bg-zinc-900/20 border border-zinc-800 text-[14px] font-mono text-zinc-400 flex items-start gap-3 group hover:border-[#FF007F]/40 transition-colors">
                  <span className="text-[#FF007F] font-black group-hover:animate-pulse">▲</span>
                  <span>{str}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelStats;
