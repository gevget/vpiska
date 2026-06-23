import React from "react";
import { motion } from "motion/react";
import { useEditorOverrides } from "../editor/useEditorOverrides";

const PROTOCOL_STEPS = ["Welcome", "Концерт", "Нетворкинг", "Afterparty"];

function ProtocolCard({ step, index }: { key?: React.Key; step: string; index: number }) {
  const card = useEditorOverrides(`protocol-card-${index + 1}`);
  const label = useEditorOverrides(`protocol-card-${index + 1}-label`, { text: step });

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      {...card.bind}
      style={card.style}
      className="flex min-h-[160px] flex-col justify-between border border-zinc-900 bg-black p-6 sm:min-h-[220px] sm:p-8"
    >
      <span className="font-mono text-[11px] font-black uppercase tracking-[0.35em] text-zinc-600">
        0{index + 1}
      </span>
      <div className="space-y-4">
        <div className="h-1 w-10 bg-[#FF007F]" />
        <div {...label.bind} style={label.style} className="text-2xl font-display font-black uppercase leading-[0.92] tracking-tight text-white sm:text-4xl">
          {label.text}
        </div>
      </div>
    </motion.div>
  );
}

const EveningProtocol = () => {
  const section = useEditorOverrides("protocol-section");
  const eyebrow = useEditorOverrides("protocol-eyebrow", { text: "TIMELINE // PROTOCOL" });
  const title = useEditorOverrides("protocol-title", { text: "ПРОТОКОЛ ВИНИЛА" });

  return (
    <section
      id="protocol-block"
      {...section.bind}
      style={section.style}
      className="w-full border-y border-zinc-900 bg-[#080808] px-6 py-20 sm:px-12 lg:px-20 xl:px-32"
    >
      <div className="mx-auto flex min-h-[50vh] w-full max-w-[2000px] flex-col justify-center">
        <div className="mb-12 max-w-3xl space-y-4">
          <span {...eyebrow.bind} style={eyebrow.style} className="border-l-2 border-[#00FF41] pl-4 font-mono text-[10px] font-black uppercase tracking-[0.5em] text-[#00FF41]">
            {eyebrow.text}
          </span>
          <h2 {...title.bind} style={title.style} className="text-4xl font-display font-black uppercase leading-none tracking-tighter text-white sm:text-6xl">
            {title.text}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {PROTOCOL_STEPS.map((step, index) => (
            <ProtocolCard key={step} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EveningProtocol;
