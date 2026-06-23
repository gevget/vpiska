import React from "react";
import { Mic2 } from "lucide-react";
import { motion } from "motion/react";

import { useEditorOverrides } from "../editor/useEditorOverrides";

const LINEUP_ROLES = [
  "CEO агентства",
  "Head of Marketing",
  "Founder IT-компании",
  "Креативный директор",
  "Product Lead",
  "Основатель студии",
];

const STATS = [
  { value: "20", label: "ПЕСЕН" },
  { value: "20", label: "ГОСТЕЙ ИЗ ИНДУСТРИИ" },
  { value: "1", label: "ЖИВАЯ ГРУППА" },
  { value: "1", label: "СЦЕНА" },
];

const PARAGRAPHS = [
  "Digital Вписка — концерт-шоу, где на сцену выходят люди из digital-индустрии.",
  "Маркетологи, предприниматели, дизайнеры, руководители и основатели компаний.",
  "Каждую песню исполняет представитель рынка вместе с группой.",
  "Они не читают доклады.",
  "Они поют.",
];

function RockstarsParagraph({ text, index }: { key?: React.Key; text: string; index: number }) {
  const paragraphOverride = useEditorOverrides(`industry-rockstars-paragraph-${index + 1}`, { text });

  return (
    <p
      {...paragraphOverride.bind}
      style={paragraphOverride.style}
      className={
        index >= 3
          ? "text-2xl font-black uppercase tracking-[0.14em] text-white sm:text-3xl"
          : "text-base leading-relaxed text-zinc-300 sm:text-lg"
      }
    >
      {paragraphOverride.text}
    </p>
  );
}

function RockstarsStat({ value, label, index }: { key?: React.Key; value: string; label: string; index: number }) {
  const statValue = useEditorOverrides(`industry-rockstars-stat-${index + 1}-value`, { text: value });
  const statLabel = useEditorOverrides(`industry-rockstars-stat-${index + 1}-label`, { text: label });

  return (
    <div className="bg-black px-5 py-6 sm:px-7 sm:py-8">
      <div
        {...statValue.bind}
        style={statValue.style}
        className="text-4xl font-display font-black leading-none tracking-tight text-[#00FF41] sm:text-5xl"
      >
        {statValue.text}
      </div>
      <div
        {...statLabel.bind}
        style={statLabel.style}
        className="mt-3 max-w-[14ch] text-[10px] font-mono font-black uppercase tracking-[0.3em] text-zinc-500"
      >
        {statLabel.text}
      </div>
    </div>
  );
}

function LineupCard({ role, index }: { key?: React.Key; role: string; index: number }) {
  const card = useEditorOverrides(`industry-rockstars-card-${index + 1}`);
  const roleOverride = useEditorOverrides(`industry-rockstars-card-${index + 1}-role`, { text: role });
  const slotOverride = useEditorOverrides(`industry-rockstars-card-${index + 1}-slot`, {
    text: `LINEUP SLOT 0${index + 1}`,
  });

  return (
    <motion.div
      whileHover={{ y: -4 }}
      {...card.bind}
      style={card.style}
      className="group relative overflow-hidden border border-zinc-700 bg-[linear-gradient(180deg,#111114_0%,#090909_100%)] p-6 transition-colors duration-300 hover:border-[#00FF41]/50"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#FF007F] via-[#00FF41] to-transparent opacity-70" />
      <div className="mb-8 flex items-center justify-between gap-4">
        <span
          {...slotOverride.bind}
          style={slotOverride.style}
          className="text-[10px] font-mono font-black uppercase tracking-[0.35em] text-zinc-500"
        >
          {slotOverride.text}
        </span>
        <Mic2 className="h-5 w-5 text-[#FF007F] transition-colors duration-300 group-hover:text-[#00FF41]" />
      </div>
      <div
        {...roleOverride.bind}
        style={roleOverride.style}
        className="font-display max-w-[12ch] whitespace-pre-line text-3xl font-black uppercase leading-[0.9] tracking-tight text-white"
      >
        {roleOverride.text}
      </div>
    </motion.div>
  );
}

const IndustryRockstars = () => {
  const section = useEditorOverrides("industry-rockstars-section");
  const eyebrow = useEditorOverrides("industry-rockstars-eyebrow", { text: "LIVE LINEUP // PEOPLE ON STAGE" });
  const title = useEditorOverrides("industry-rockstars-title", {
    text: "ЛЮДИ ИНДУСТРИИ\nСТАНОВЯТСЯ\nРОК-ЗВЁЗДАМИ",
  });
  const signature = useEditorOverrides("industry-rockstars-signature", {
    text: "Проект создаётся совместно с экс-амбассадором Digital-квартирников Вадимом Акимовым.",
  });

  return (
    <section
      id="industry-rockstars"
      {...section.bind}
      style={section.style}
      className="w-full border-b border-zinc-800 bg-[#050505] px-6 py-24 sm:px-12 lg:px-20 xl:px-32 xl:py-36"
    >
      <div className="mx-auto grid w-full max-w-[2000px] grid-cols-1 gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 xl:gap-20">
        <div className="space-y-10">
          <div className="space-y-6">
            <span
              {...eyebrow.bind}
              style={eyebrow.style}
              className="inline-block border border-[#FF007F]/25 bg-[#FF007F]/10 px-4 py-2 text-[10px] font-mono font-black uppercase tracking-[0.4em] text-[#FF007F]"
            >
              {eyebrow.text}
            </span>
            <h2
              {...title.bind}
              style={title.style}
              className="font-display max-w-[10ch] whitespace-pre-line text-5xl font-black uppercase leading-[0.84] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
            >
              {title.text}
            </h2>
          </div>

          <div className="max-w-2xl space-y-4">
            {PARAGRAPHS.map((paragraph, index) => (
              <RockstarsParagraph key={index} text={paragraph} index={index} />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-px border border-zinc-700 bg-zinc-700 md:grid-cols-4">
            {STATS.map((item, index) => (
              <RockstarsStat key={item.label} value={item.value} label={item.label} index={index} />
            ))}
          </div>

          <p
            {...signature.bind}
            style={signature.style}
            className="max-w-2xl border-l-2 border-[#00FF41] pl-5 text-sm leading-relaxed text-zinc-400 sm:text-base"
          >
            {signature.text}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {LINEUP_ROLES.map((role, index) => (
            <LineupCard key={role} role={role} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryRockstars;
