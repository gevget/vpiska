import React from "react";

import { useEditorOverrides } from "../editor/useEditorOverrides";

interface ModelStatsProps {
  openModalWithPreset: (preset: string) => void;
}

const KPI_ITEMS = [
  { value: "450+", label: "ГОСТЕЙ НА ПРЕДЫДУЩЕЙ ВПИСКЕ" },
  { value: "1", label: "ГЕНЕРАЛЬНЫЙ ПАРТНЁР" },
  { value: "5–8", label: "ПАРТНЁРСКИХ СЛОТОВ" },
  { value: "12", label: "VIP-МЕСТ ДЛЯ ГЕНЕРАЛА" },
];

function StatCard({ value, label, index }: { key?: React.Key; value: string; label: string; index: number }) {
  const card = useEditorOverrides(`model-card-${index + 1}`);
  const cardValue = useEditorOverrides(`model-card-${index + 1}-value`, { text: value });
  const cardLabel = useEditorOverrides(`model-card-${index + 1}-label`, { text: label });

  return (
    <div
      {...card.bind}
      style={card.style}
      className="group bg-black px-6 py-8 transition-all duration-300 hover:bg-zinc-950 hover:shadow-[0_0_38px_rgba(255,0,127,0.12)] sm:px-8 sm:py-10"
    >
      <div
        {...cardValue.bind}
        style={cardValue.style}
        className="font-display text-6xl font-black leading-none tracking-[-0.05em] text-white transition-all duration-300 group-hover:text-[#FF007F] group-hover:[text-shadow:0_0_28px_rgba(255,0,127,0.4)] sm:text-7xl xl:text-8xl"
      >
        {cardValue.text}
      </div>
      <div
        {...cardLabel.bind}
        style={cardLabel.style}
        className="mt-4 max-w-[18ch] text-[11px] font-mono font-black uppercase tracking-[0.28em] text-zinc-500 transition-colors duration-300 group-hover:text-zinc-300"
      >
        {cardLabel.text}
      </div>
    </div>
  );
}

const ModelStats = ({ openModalWithPreset }: ModelStatsProps) => {
  const section = useEditorOverrides("model-section");
  const eyebrow = useEditorOverrides("model-eyebrow", { text: "BLOCK 04 // MODEL" });
  const titleLeft = useEditorOverrides("model-title-left", { text: "МОДЕЛЬ" });
  const titleRight = useEditorOverrides("model-title-right", { text: "ЦИФРЫ" });
  const button = useEditorOverrides("model-button", { text: "Обсудить слот" });

  return (
    <section id="model-stats" {...section.bind} style={section.style} className="w-full border-t border-zinc-900 bg-[#08080C] px-6 py-20 sm:px-12 lg:px-20 xl:px-32">
      <div className="mx-auto w-full max-w-[2000px]">
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl space-y-5">
            <span {...eyebrow.bind} style={eyebrow.style} className="inline-block border border-[#BEEB08]/20 bg-[#BEEB08]/10 px-4 py-2 text-[10px] font-mono font-black uppercase tracking-[0.35em] text-[#BEEB08]">
              {eyebrow.text}
            </span>
            <h2 className="font-display text-4xl font-black uppercase leading-none tracking-tighter text-white sm:text-6xl">
              <span {...titleLeft.bind} style={titleLeft.style}>{titleLeft.text}</span>{" "}
              <span className="text-[#FF007F]">&amp;</span>{" "}
              <span {...titleRight.bind} style={titleRight.style}>{titleRight.text}</span>
            </h2>
          </div>

          <button
            onClick={() => openModalWithPreset("Заявка на партнёрский слот")}
            {...button.bind}
            style={button.style}
            className="w-full border border-zinc-800 bg-black px-8 py-4 text-xs font-mono font-black uppercase tracking-[0.28em] text-white transition-all hover:border-[#BEEB08] hover:text-[#BEEB08] lg:w-auto"
          >
            {button.text}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-px border border-zinc-900 bg-zinc-900 md:grid-cols-2 xl:grid-cols-4">
          {KPI_ITEMS.map((item, index) => (
            <StatCard key={item.label} value={item.value} label={item.label} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModelStats;
