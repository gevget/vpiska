import React from "react";
import { motion } from "motion/react";
import { Users, UserCheck, Flame, Zap, TrendingUp, Cpu, Sparkles, FileText, ChevronRight } from "lucide-react";

import { useEditorOverrides } from "../editor/useEditorOverrides";

interface ComparisonBlockProps {
  selectedComparisonIndex: number;
  setSelectedComparisonIndex: (idx: number) => void;
  openModalWithPreset: (preset: string) => void;
}

const COMPARISON_ROWS = [
  {
    feature: "Контакт с аудиторией",
    conference: "Короткий контакт у стенда и разрозненные касания в течение дня.",
    vpiska: "Цельный вечер рядом с гостями, сценой и общим эмоциональным контекстом.",
  },
  {
    feature: "Идентификация",
    conference: "Формальные бейджи и быстрые знакомства без глубины.",
    vpiska: "Живое общение без барьеров, где людей запоминают по эмоции и роли в вечере.",
  },
  {
    feature: "Интеграция бренда",
    conference: "Бренд чаще остается логотипом в ряду других логотипов.",
    vpiska: "Бренд становится частью опыта: сцены, бара, welcome-зоны и общения.",
  },
  {
    feature: "Вовлечение гостей",
    conference: "Фокус дробится между докладами, стендами и параллельными активностями.",
    vpiska: "Гости дольше остаются в общем сюжете вечера и проживают его вместе.",
  },
  {
    feature: "Формат продаж",
    conference: "Прямой питч часто воспринимается как навязчивый.",
    vpiska: "Отношения строятся через доверие, атмосферу и органичный диалог.",
  },
  {
    feature: "Роль посетителя",
    conference: "Пассивный участник, который перемещается между точками внимания.",
    vpiska: "Гость находится внутри события и вовлечен в единый живой контекст.",
  },
  {
    feature: "Запоминаемость",
    conference: "Контент быстро смешивается с другими деловыми мероприятиями.",
    vpiska: "Эмоция, музыка и формат закрепляют бренд намного сильнее.",
  },
];

const getIcon = (feature: string) => {
  switch (feature) {
    case "Контакт с аудиторией":
      return <Users className="w-4 h-4" />;
    case "Идентификация":
      return <UserCheck className="w-4 h-4" />;
    case "Интеграция бренда":
      return <Flame className="w-4 h-4" />;
    case "Вовлечение гостей":
      return <Zap className="w-4 h-4" />;
    case "Формат продаж":
      return <TrendingUp className="w-4 h-4" />;
    case "Роль посетителя":
      return <Cpu className="w-4 h-4" />;
    case "Запоминаемость":
      return <Sparkles className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

const getVpiskaScore = (index: number) => {
  const scores = [94.2, 89.7, 96.4, 91.3, 97.5, 92.8, 99.1];
  return (scores[index] !== undefined ? scores[index] : 92).toFixed(1);
};

const getConferenceForgettingScore = (index: number) => {
  const scores = [78.4, 84.1, 89.2, 72.6, 85.3, 91.7, 95.4];
  return (scores[index] !== undefined ? scores[index] : 82).toFixed(1);
};

const ComparisonBlock = ({
  selectedComparisonIndex,
  setSelectedComparisonIndex,
  openModalWithPreset,
}: ComparisonBlockProps) => {
  const section = useEditorOverrides("compare-section");
  const eyebrow = useEditorOverrides("compare-eyebrow", { text: "BLOCK 02 // СРАВНЕНИЕ B2B-ФОРМАТОВ" });
  const title = useEditorOverrides("compare-title", { text: "КОНФЕРЕНЦИЯ VS ВПИСКА" });
  const description = useEditorOverrides("compare-description", {
    text: "Конференция дает фрагментированный контакт. Вписка дает один цельный вечер, где бренд встроен в общий опыт и дольше остается в поле внимания.",
  });
  const conferenceCard = useEditorOverrides("compare-conference-card");
  const conferenceText = useEditorOverrides("compare-conference-text", {
    text: "Контакт разбивается на короткие подходы, стенды и постоянное переключение внимания. Бренд конкурирует за несколько секунд фокуса.",
  });
  const vpiskaCard = useEditorOverrides("compare-vpiska-card");
  const vpiskaText = useEditorOverrides("compare-vpiska-text", {
    text: "Один вечер вместо набора разрозненных касаний. Сцена, бар и программа работают как единый опыт, в который бренд встроен органично.",
  });
  const cta = useEditorOverrides("compare-cta", { text: "Стать частью этого вайба" });

  return (
    <section
      id="compare-block"
      {...section.bind}
      style={section.style}
      className="grid-bg relative w-full border-b border-zinc-900 bg-zinc-950/40 px-3 py-12 sm:px-12 sm:py-32 lg:px-20 xl:px-32 xl:py-40"
    >
      <div className="mx-auto w-full max-w-[2000px] space-y-16">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-zinc-900 pb-12 lg:flex-row lg:items-end">
          <div className="max-w-4xl space-y-4">
            <span
              {...eyebrow.bind}
              style={eyebrow.style}
              className="inline-block border border-[#BEEB08]/35 bg-[#BEEB08]/15 px-4 py-1.5 text-sm font-mono font-extrabold uppercase tracking-widest text-[#BEEB08]"
            >
              {eyebrow.text}
            </span>
            <h2 {...title.bind} style={title.style} className="font-display text-[60px] font-black uppercase leading-none tracking-tight">
              {title.text}
            </h2>
            <p {...description.bind} style={description.style} className="max-w-3xl text-sm font-light leading-relaxed text-zinc-400 sm:text-lg lg:text-xl">
              {description.text}
            </p>
          </div>

          <div className="flex items-center gap-3 border border-zinc-900 bg-black px-5 py-3.5 text-sm font-mono">
            <Zap className="h-4 w-4 animate-bounce text-[#FF007F]" />
            <span className="font-semibold uppercase text-zinc-300">Решение для точного B2B-касания</span>
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-12 xl:grid-cols-12 xl:gap-16">
          <div className="flex flex-col justify-between space-y-6 xl:col-span-5">
            <div className="space-y-4">
              <span className="block text-sm font-mono font-bold uppercase tracking-widest text-zinc-400">
                Выберите параметр и сравните эффект:
              </span>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {COMPARISON_ROWS.map((row, idx) => {
                  const isSelected = selectedComparisonIndex === idx;
                  return (
                    <button
                      key={row.feature}
                      onClick={() => setSelectedComparisonIndex(idx)}
                      className={`flex w-full items-center justify-between border p-4 text-left text-sm font-mono uppercase tracking-wider transition-all sm:p-5 ${
                        isSelected
                          ? "border-[#FF007F] bg-[#FF007F]/10 font-bold text-white"
                          : "border-zinc-900 bg-black/80 text-zinc-400 hover:border-zinc-700 hover:text-white"
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span className="flex items-center gap-2 truncate pr-4">
                        {getIcon(row.feature)}
                        {row.feature}
                      </span>
                      <ChevronRight className={`h-4 w-4 ${isSelected ? "text-[#FF007F]" : "text-zinc-700"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-5 border border-zinc-900 bg-black p-6 sm:p-8">
              <span className="block text-sm font-mono font-bold uppercase tracking-wider text-zinc-400">
                Импульс конверсии и запоминаемости:
              </span>
              <div className="space-y-4 font-mono">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-300">Внимание к бренду на Вписке:</span>
                    <span className="text-sm font-black text-[#BEEB08] sm:text-base">{getVpiskaScore(selectedComparisonIndex)}%</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-900">
                    <motion.div
                      className="h-2 bg-[#BEEB08]"
                      initial={{ width: 0 }}
                      animate={{ width: `${getVpiskaScore(selectedComparisonIndex)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Быстрое забывание на конференции:</span>
                    <span className="text-sm font-black text-red-500 sm:text-base">{getConferenceForgettingScore(selectedComparisonIndex)}%</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-900">
                    <motion.div
                      className="h-2 bg-red-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${getConferenceForgettingScore(selectedComparisonIndex)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:col-span-7">
            <div
              {...conferenceCard.bind}
              style={conferenceCard.style}
              className="relative flex flex-col justify-between space-y-8 border border-zinc-900 border-t-4 border-t-zinc-700 bg-black/80 p-8 sm:p-10"
            >
              <div className="absolute top-4 right-4 border border-zinc-800 px-2.5 py-1 text-xs font-mono font-bold uppercase text-zinc-500">
                Traditional Stage
              </div>
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="block text-sm font-mono font-bold uppercase tracking-widest text-zinc-500">Низкое участие</span>
                  <h3 className="font-display text-xl font-medium uppercase tracking-tight text-zinc-400 sm:text-2xl">Конференция</h3>
                </div>
                <p {...conferenceText.bind} style={conferenceText.style} className="text-sm leading-relaxed text-zinc-400 sm:text-base">
                  {conferenceText.text}
                </p>
              </div>
              <div className="border border-zinc-900 bg-zinc-950 p-5 text-xs font-mono uppercase text-zinc-500 sm:text-sm">
                Сложнее пробить барьер вторичности и удержать внимание.
              </div>
            </div>

            <div
              {...vpiskaCard.bind}
              style={vpiskaCard.style}
              className="relative flex flex-col justify-between space-y-8 border border-zinc-900 border-t-4 border-t-[#BEEB08] bg-[#07070a] p-8 sm:p-10"
            >
              <div className="absolute top-4 right-4 border border-[#BEEB08]/20 bg-[#BEEB08]/10 px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-widest text-[#BEEB08]">
                Vpiska Protocol
              </div>
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="block text-sm font-mono font-bold uppercase tracking-widest text-[#BEEB08]">Органичный канал связей</span>
                  <h3 className="font-display text-xl font-black uppercase tracking-tight text-white sm:text-2xl">Digital Вписка</h3>
                </div>
                <p {...vpiskaText.bind} style={vpiskaText.style} className="text-sm font-light leading-relaxed text-zinc-300 sm:text-base">
                  {vpiskaText.text}
                </p>
              </div>
              <button
                onClick={() => openModalWithPreset("Запрос B2B-участия после сравнения конференции и Вписки")}
                {...cta.bind}
                style={cta.style}
                className="w-full cursor-pointer bg-[#BEEB08] py-4 text-center text-xs font-mono font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-white sm:text-sm"
                aria-label="Запросить участие во Вписке"
              >
                {cta.text}
              </button>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto border border-zinc-900">
          <div className="min-w-[800px] divide-y divide-zinc-900">
            <div className="grid grid-cols-12 bg-black p-6 text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E93] sm:text-xs">
              <div className="col-span-4">Критерий сравнения</div>
              <div className="col-span-4 pl-4">Обычная конференция</div>
              <div className="col-span-4 pl-6 flex items-center gap-1.5 font-black text-[#BEEB08]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#BEEB08] animate-pulse" />
                <span>На Вписке</span>
              </div>
            </div>
            {COMPARISON_ROWS.map((row) => (
              <div key={row.feature} className="grid grid-cols-12 items-center p-8 text-sm font-mono text-zinc-300 transition-colors hover:bg-zinc-900/10 sm:text-base">
                <div className="col-span-4 flex items-center gap-2 pr-4 text-[10px] font-bold uppercase text-white sm:text-xs">
                  {getIcon(row.feature)}
                  {row.feature}
                </div>
                <div className="col-span-4 pl-4 text-[10px] leading-relaxed text-zinc-400 sm:text-xs">{row.conference}</div>
                <div className="col-span-4 border-l border-zinc-800 pl-6 text-sm font-bold leading-relaxed text-[#BEEB08]">{row.vpiska}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonBlock;
