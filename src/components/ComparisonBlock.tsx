import React from "react";
import { motion } from "motion/react";
import { COMPARISON_TABLE } from "../data";
import { Users, UserCheck, Flame, Zap, TrendingUp, Cpu, Sparkles, FileText, ChevronRight } from "lucide-react";

interface ComparisonBlockProps {
  selectedComparisonIndex: number;
  setSelectedComparisonIndex: (idx: number) => void;
  openModalWithPreset: (preset: string) => void;
}

const getIcon = (feature: string) => {
  switch (feature) {
    case "Контакт с аудиторией": return <Users className="w-4 h-4" />;
    case "Идентификация": return <UserCheck className="w-4 h-4" />;
    case "Интеграция бренда": return <Flame className="w-4 h-4" />;
    case "Вовлечение гостей": return <Zap className="w-4 h-4" />;
    case "Формат продаж": return <TrendingUp className="w-4 h-4" />;
    case "Роль посетителя": return <Cpu className="w-4 h-4" />;
    case "Запоминаемость": return <Sparkles className="w-4 h-4" />;
    default: return <FileText className="w-4 h-4" />;
  }
};

const getVpiskaScore = (index: number) => {
  const scores = [94.2, 89.7, 96.4, 91.3, 97.5, 92.8, 99.1];
  return (scores[index] !== undefined ? scores[index] : 92.0).toFixed(1);
};

const getConferenceForgettingScore = (index: number) => {
  const scores = [78.4, 84.1, 89.2, 72.6, 85.3, 91.7, 95.4];
  return (scores[index] !== undefined ? scores[index] : 82.0).toFixed(1);
};

const ComparisonBlock = ({ 
  selectedComparisonIndex, 
  setSelectedComparisonIndex, 
  openModalWithPreset 
}: ComparisonBlockProps) => {
  return (
    <section id="compare-block" className="w-full py-12 sm:py-32 xl:py-40 px-3 sm:px-12 lg:px-20 xl:px-32 bg-zinc-950/40 border-b border-zinc-900 grid-bg relative">
      <div className="w-full max-w-[2000px] mx-auto space-y-16">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-zinc-900 pb-12">
          <div className="space-y-4 max-w-4xl">
            <span className="inline-block text-sm font-mono py-1.5 px-4 bg-[#00FF41]/15 border border-[#00FF41]/35 text-[#00FF41] uppercase tracking-widest font-extrabold rounded-none">
              BLOCK 02 // СРАВНИТЕЛЬНАЯ БИЛЛ-МАТРИЦА
            </span>
            <h2 className="text-[60px] font-display font-black leading-none tracking-tight uppercase">
              КОНФЕРЕНЦИЯ <span className="text-[#FF007F]">VS</span> ВПИСКА
            </h2>
            <p className="text-sm sm:text-lg lg:text-xl text-zinc-400 max-w-3xl leading-relaxed font-light">
              Индустриальные лидеры перегружены дежурным нетворкингом. Прямой B2B-контакт на конференции длится секунды. На «Вписке» бренд выступает в роли соратника на протяжении всего вечера.
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-black py-3.5 px-5 border border-zinc-900 font-mono text-sm">
            <Zap className="w-4 h-4 text-[#FF007F] animate-bounce" />
            <span className="text-zinc-300 uppercase font-semibold">РЕШЕНИЕ ДЛЯ ОПТИМИЗАЦИИ МАРКЕТИНГА ЛПР</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-stretch">
          <div className="lg:col-span-12 xl:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-sm font-mono text-zinc-400 uppercase tracking-widest block font-bold">
                ВЫБЕРИТЕ ПАРАМЕТР И ТЕСТИРУЙТЕ ЭФФЕКТ:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                {COMPARISON_TABLE.map((row, idx) => {
                  const isSelected = selectedComparisonIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedComparisonIndex(idx)}
                      className={`w-full text-left p-4 sm:p-5 border text-sm font-mono uppercase tracking-wider flex justify-between items-center transition-all cursor-pointer ${
                        isSelected 
                          ? "bg-[#FF007F]/10 border-[#FF007F] text-white font-bold" 
                          : "bg-black/80 border-zinc-900 text-zinc-450 hover:border-zinc-850 hover:text-white"
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span className="flex items-center gap-2 truncate pr-4">{getIcon(row.feature)} {row.feature}</span>
                      <ChevronRight className={`w-4 h-4 ${isSelected ? "text-[#FF007F]" : "text-zinc-700"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-black border border-zinc-900 space-y-5">
              <span className="text-sm font-mono text-zinc-400 uppercase tracking-wider block font-bold">ИМПУЛЬС КОНВЕРСИИ И ОХВАТА // ПОКАЗАТЕЛИ:</span>
              <div className="space-y-4 font-mono">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-300">ВНИМАНИЕ К БРЕНДУ (ВПИСКА):</span>
                    <span className="text-[#00FF41] font-black text-sm sm:text-base">{getVpiskaScore(selectedComparisonIndex)}%</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-2">
                    <motion.div 
                      className="bg-[#00FF41] h-2"
                      initial={{ width: 0 }}
                      animate={{ width: `${getVpiskaScore(selectedComparisonIndex)}%` }}
                      transition={{ duration: 0.5 }}
                    ></motion.div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-450">ЗАБЫВАЕМОСТЬ (КОНФЕРЕНЦИЯ):</span>
                    <span className="text-red-500 font-black text-sm sm:text-base">{getConferenceForgettingScore(selectedComparisonIndex)}%</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-2">
                    <motion.div 
                      className="bg-red-500 h-2"
                      initial={{ width: 0 }}
                      animate={{ width: `${getConferenceForgettingScore(selectedComparisonIndex)}%` }}
                      transition={{ duration: 0.5 }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-12 xl:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <div className="p-8 sm:p-10 bg-black/80 border-t-4 border-t-zinc-700 border-x border-b border-zinc-900 flex flex-col justify-between space-y-8 relative">
              <div className="absolute top-4 right-4 text-xs font-mono text-zinc-550 border border-zinc-800 px-2.5 py-1 uppercase font-bold">TRADITIONAL STAGE</div>
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-sm font-mono text-zinc-500 uppercase tracking-widest block font-bold">НИЗКОЕ УЧАСТИЕ</span>
                  <h3 className="text-xl sm:text-2xl font-display font-medium text-zinc-400 uppercase tracking-tight">КОНФЕРЕНЦИЯ</h3>
                </div>
                <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
                  ЛПР вечно торопятся между докладами, отвлекаются на рабочие мессенджеры, собирают десятки визиток у холодных стендов и забывают бренд уже на следующий день.
                </p>
                <div className="border-t border-zinc-900 pt-6 space-y-4">
                  <div className="flex items-start gap-2.5 text-sm">
                    <span className="text-red-500 font-bold mt-0.5">✕</span>
                    <div>
                      <span className="block text-white font-bold font-mono text-sm uppercase">КОРОТКИЙ КОНТАКТ</span>
                      <span className="block text-zinc-400 mt-0.5 leading-relaxed">Повышенное выгорание внимания, общение &ldquo;на ногах&rdquo;, барьер визитки.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-zinc-950 text-xs sm:text-sm font-mono text-zinc-500 border border-zinc-900 uppercase">КРИТИЧЕСКИЙ БАРЬЕР ВТОРИЧНОСТИ КЛИЕНТОВ</div>
            </div>

            <div className="p-8 sm:p-10 bg-[#07070a] border-t-4 border-t-[#00FF41] border-x border-b border-zinc-900 flex flex-col justify-between space-y-8 relative">
              <div className="absolute top-4 right-4 text-xs font-mono text-[#00FF41] bg-[#00FF41]/10 border border-[#00FF41]/20 px-2.5 py-1 uppercase tracking-widest font-bold">VPISKA PROTOCOL</div>
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-sm font-mono text-[#00FF41] uppercase tracking-widest block font-bold">ОРГАНИЧЕСКИЙ КАНАЛ СВЯЗЕЙ</span>
                  <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">DIGITAL ВПИСКА</h3>
                </div>
                <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed font-light">
                  Совместный запоминающийся вечер. Руководитель поет вместе с кавер-коллективом, партнер держит лонж-бар, ЛПР общаются в момент своей наивысшей психологической открытости.
                </p>
                <div className="border-t border-zinc-900/50 pt-6 space-y-4">
                  <div className="flex items-start gap-2.5 text-sm">
                    <span className="text-[#00FF41] font-bold mt-0.5">✓</span>
                    <div>
                      <span className="block text-white font-bold font-mono text-sm uppercase">3–4 ЧАСА ОДНОГО ВЕЧЕРА</span>
                      <span className="block text-zinc-350 mt-0.5 leading-relaxed">Встреча лидеров рынка на дружеской эмоциональной волне, разговоры за баром.</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => openModalWithPreset("Запрос B2B участия благодаря сравнению Конференции и Вписки")}
                className="w-full py-4 bg-[#00FF41] hover:bg-white text-black font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 text-center cursor-pointer"
                aria-label="Запросить участие во Вписке"
              >
                Стать частью этого вайба
              </button>
            </div>
          </div>
        </div>

        <div className="border border-zinc-900 overflow-x-auto w-full">
          <div className="min-w-[800px] divide-y divide-zinc-900">
            <div className="grid grid-cols-12 bg-black p-6 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#8E8E93] font-bold">
              <div className="col-span-4">КРИТЕРИЙ СРАВНЕНИЯ</div>
              <div className="col-span-4 pl-4">ОБЫЧНАЯ КОНФЕРЕНЦИЯ</div>
              <div className="col-span-4 pl-6 text-[#00FF41] font-black flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse"></span>
                <span>НА ВПИСКАХ</span>
              </div>
            </div>
            {COMPARISON_TABLE.map((row, idx2) => (
              <div key={idx2} className="grid grid-cols-12 p-8 text-sm sm:text-base font-mono text-zinc-300 hover:bg-zinc-900/10 transition-colors items-center">
                <div className="col-span-4 font-bold text-white uppercase text-[10px] sm:text-xs flex items-center gap-2 pr-4">
                  {getIcon(row.feature)} {row.feature}
                </div>
                <div className="col-span-4 text-zinc-400 pl-4 text-[10px] sm:text-xs leading-relaxed">{row.conference}</div>
                <div className="col-span-4 text-[#00FF41] font-bold pl-6 border-l border-zinc-800 text-sm leading-relaxed">{row.vpiska}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonBlock;
