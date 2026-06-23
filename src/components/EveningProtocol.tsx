import React from "react";
import { motion } from "motion/react";

import { useEditorOverrides } from "../editor/useEditorOverrides";

const PROTOCOL_STEPS = [
  { title: "Welcome", detail: "Сбор гостей, первый контакт с площадкой, welcome-drink и мягкий вход в атмосферу вечера." },
  { title: "Концерт", detail: "Главный лайв-блок со сценой, живой группой, номерами гостей и плотным вниманием зала." },
  { title: "Нетворкинг", detail: "Пауза для разговоров, знакомств, коротких встреч, обсуждений и естественного продолжения контактов." },
  { title: "Afterparty", detail: "Финальная часть вечера с более свободным общением, музыкой и закреплением новых связей." },
];

function ProtocolCard({ step, index }: { key?: React.Key; step: (typeof PROTOCOL_STEPS)[number]; index: number }) {
  const card = useEditorOverrides(`protocol-card-${index + 1}`);
  const label = useEditorOverrides(`protocol-card-${index + 1}-label`, { text: step.title });
  const tooltip = useEditorOverrides(`protocol-card-${index + 1}-tooltip`, { text: step.detail });

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      {...card.bind}
      style={card.style}
      className="group relative flex min-h-[180px] flex-col justify-between border border-zinc-700 bg-black p-6 sm:min-h-[240px] sm:p-8"
    >
      <span className="text-[11px] font-mono font-black uppercase tracking-[0.35em] text-zinc-500">0{index + 1}</span>

      <div className="space-y-4">
        <div className="h-1 w-10 bg-[#FF007F]" />
        <div {...label.bind} style={label.style} className="font-display text-2xl font-black uppercase leading-[0.92] tracking-tight text-white sm:text-4xl">
          {label.text}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-4 bottom-4 translate-y-2 border border-zinc-600 bg-zinc-950/95 p-4 opacity-0 shadow-2xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="mb-2 text-[10px] font-mono font-black uppercase tracking-[0.3em] text-[#BEEB08]">Подробнее</div>
        <p {...tooltip.bind} style={tooltip.style} className="text-sm leading-relaxed text-zinc-200">
          {tooltip.text}
        </p>
      </div>
    </motion.div>
  );
}

const EveningProtocol = () => {
  const section = useEditorOverrides("protocol-section");
  const eyebrow = useEditorOverrides("protocol-eyebrow", { text: "TIMELINE // PROTOCOL" });
  const title = useEditorOverrides("protocol-title", { text: "ПРОТОКОЛ ВЕЧЕРА" });

  return (
    <section id="protocol-block" {...section.bind} style={section.style} className="w-full border-y border-zinc-800 bg-[#080808] px-6 py-20 sm:px-12 lg:px-20 xl:px-32">
      <div className="mx-auto flex min-h-[50vh] w-full max-w-[2000px] flex-col justify-center">
        <div className="mb-12 max-w-3xl space-y-4">
          <span {...eyebrow.bind} style={eyebrow.style} className="border-l-2 border-[#BEEB08] pl-4 text-[10px] font-mono font-black uppercase tracking-[0.5em] text-[#BEEB08]">
            {eyebrow.text}
          </span>
          <h2 {...title.bind} style={title.style} className="font-display text-4xl font-black uppercase leading-none tracking-tighter text-white sm:text-6xl">
            {title.text}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {PROTOCOL_STEPS.map((step, index) => (
            <ProtocolCard key={step.title} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EveningProtocol;
