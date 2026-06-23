import React from "react";
import { motion } from "motion/react";
import { Clapperboard, Layers3, Megaphone, Radio, Send, Star } from "lucide-react";

import { ECOSYSTEM_STATISTICS } from "../data";
import { useEditorOverrides } from "../editor/useEditorOverrides";

const MEDIA_ITEMS = [
  {
    title: "Охваты",
    value: ECOSYSTEM_STATISTICS.totalSubscriptions,
    note: "совокупный медийный охват экосистемы",
    icon: Megaphone,
    accent: "text-[#BEEB08]",
  },
  {
    title: "Сообщества",
    value: ECOSYSTEM_STATISTICS.thematicCommunities,
    note: "тематических клубов внутри Digital Club",
    icon: Layers3,
    accent: "text-white",
  },
  {
    title: "Telegram",
    value: ECOSYSTEM_STATISTICS.mainClubMembers,
    note: "ядро главного Telegram-сообщества",
    icon: Send,
    accent: "text-[#FF007F]",
  },
  {
    title: "Контент",
    value: ECOSYSTEM_STATISTICS.monthlyPosts,
    note: "публикаций и анонсов в месяц",
    icon: Clapperboard,
    accent: "text-white",
  },
  {
    title: "Digital Club",
    value: "24/7",
    note: "площадка, через которую бренд живёт дольше вечера",
    icon: Star,
    accent: "text-[#BEEB08]",
  },
  {
    title: "Медийные возможности",
    value: "360°",
    note: "анонсы, Telegram, интеграции, контент и партнёрские касания",
    icon: Radio,
    accent: "text-[#FF007F]",
  },
];

function MediaCard({
  title,
  value,
  note,
  icon: Icon,
  accent,
  index,
}: {
  key?: React.Key;
  title: string;
  value: string;
  note: string;
  icon: React.ElementType;
  accent: string;
  index: number;
}) {
  const card = useEditorOverrides(`ecosystem-card-${index + 1}`);
  const cardTitle = useEditorOverrides(`ecosystem-card-${index + 1}-title`, { text: title });
  const cardValue = useEditorOverrides(`ecosystem-card-${index + 1}-value`, { text: value });
  const cardNote = useEditorOverrides(`ecosystem-card-${index + 1}-note`, { text: note });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      {...card.bind}
      style={card.style}
      className="group border border-zinc-900 bg-black p-7 transition-colors duration-300 hover:border-[#BEEB08]/30"
    >
      <div className="mb-10 flex items-start justify-between gap-4">
        <span {...cardTitle.bind} style={cardTitle.style} className="font-mono text-[10px] font-black uppercase tracking-[0.35em] text-zinc-600">
          {cardTitle.text}
        </span>
        <Icon className={`h-5 w-5 ${accent}`} />
      </div>
      <div {...cardValue.bind} style={cardValue.style} className={`text-5xl font-display font-black leading-none tracking-tight sm:text-6xl ${accent}`}>
        {cardValue.text}
      </div>
      <p {...cardNote.bind} style={cardNote.style} className="mt-4 max-w-[24ch] text-sm leading-relaxed text-zinc-500">
        {cardNote.text}
      </p>
    </motion.div>
  );
}

const EcosystemDashboard = () => {
  const section = useEditorOverrides("ecosystem-section");
  const eyebrow = useEditorOverrides("ecosystem-eyebrow", { text: "MEDIA ENGINE // DIGITAL CLUB" });
  const title = useEditorOverrides("ecosystem-title", { text: "МЕДИЙНЫЕ\nВОЗМОЖНОСТИ" });
  const description = useEditorOverrides("ecosystem-description", {
    text: "У партнёра есть не только вечер на площадке, но и охват до и после события.",
  });

  return (
    <section
      id="ecosystem"
      {...section.bind}
      style={section.style}
      className="w-full border-b border-zinc-900 bg-[#050505] px-6 py-24 sm:px-12 lg:px-20 xl:px-32 xl:py-32"
    >
      <div className="mx-auto w-full max-w-[2000px]">
        <div className="mb-14 flex max-w-4xl flex-col gap-6">
          <span {...eyebrow.bind} style={eyebrow.style} className="inline-block w-fit border border-[#BEEB08]/20 bg-[#BEEB08]/10 px-4 py-2 font-mono text-[10px] font-black uppercase tracking-[0.4em] text-[#BEEB08]">
            {eyebrow.text}
          </span>
          <h2 {...title.bind} style={title.style} className="whitespace-pre-line text-4xl font-display font-black uppercase leading-none tracking-tighter text-white sm:text-6xl lg:text-7xl">
            {title.text}
          </h2>
          <p {...description.bind} style={description.style} className="max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {description.text}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {MEDIA_ITEMS.map((item, index) => (
            <MediaCard key={item.title} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemDashboard;
