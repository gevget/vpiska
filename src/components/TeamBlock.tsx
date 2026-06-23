import React from "react";

import { useEditorOverrides } from "../editor/useEditorOverrides";
import { withBase } from "../lib/asset";

const TEAM_MEMBERS = [
  {
    name: "Александр Кубанеишвили",
    role: "соорганизатор // Digital Club",
    bio: "Отвечает за партнёрскую программу, связи с digital-комьюнити и стратегию события.",
  },
  {
    name: "Вадим Акимов",
    role: "музыкальный директор // Digital Stage",
    bio: "Собирает музыкальную программу, артистов и сценическую часть вечера.",
  },
  {
    name: "Евгений Толченков",
    role: "концепт, сайт, дизайн и партнёрская упаковка",
    bio: "Отвечает за визуальную систему, оффер и партнёрскую механику события.",
  },
];

const TEAM_IMAGES = [withBase("/team-ku.png"), withBase("/team-aki.png"), withBase("/team-evg.png")];
const TEAM_CODES = ["Q", "AK", "Evg"];

function TeamCard({ member, index }: { key?: React.Key; member: (typeof TEAM_MEMBERS)[number]; index: number }) {
  const card = useEditorOverrides(`team-card-${index + 1}`);
  const name = useEditorOverrides(`team-card-${index + 1}-name`, { text: member.name });
  const role = useEditorOverrides(`team-card-${index + 1}-role`, { text: member.role });
  const bio = useEditorOverrides(`team-card-${index + 1}-bio`, { text: member.bio });

  return (
    <div
      {...card.bind}
      style={card.style}
      className="group flex flex-col border border-zinc-900 bg-[#0E0E11] p-10 transition-all duration-300 hover:border-[#BEEB08]/40 hover:shadow-[0_0_36px_rgba(190,235,8,0.08)]"
    >
      <div className="relative mb-8 aspect-square w-full overflow-hidden border border-zinc-800 bg-black">
        <img src={TEAM_IMAGES[index]} alt={member.name} loading="lazy" className="h-full w-full object-cover grayscale contrast-110 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 border border-white/15 bg-black/70 px-3 py-2 text-[10px] font-mono font-black uppercase tracking-[0.35em] text-[#BEEB08] backdrop-blur-sm">
          {TEAM_CODES[index]}
        </div>
      </div>
      <span className="mb-3 block text-[10px] font-mono font-black uppercase tracking-widest text-[#FF007F]">Организатор // 0{index + 1}</span>
      <h3
        {...name.bind}
        style={name.style}
        className="mb-2 font-display text-2xl font-black uppercase tracking-tight text-white transition-all duration-300 group-hover:text-[#BEEB08] group-hover:[text-shadow:0_0_20px_rgba(190,235,8,0.35)]"
      >
        {name.text}
      </h3>
      <p {...role.bind} style={role.style} className="mb-4 border-b border-zinc-900 pb-4 text-xs font-mono font-bold uppercase tracking-wide text-[#BEEB08]">
        {role.text}
      </p>
      <p {...bio.bind} style={bio.style} className="text-sm leading-relaxed text-zinc-500">
        {bio.text}
      </p>
    </div>
  );
}

const TeamBlock = () => {
  const section = useEditorOverrides("team-section");
  const eyebrow = useEditorOverrides("team-eyebrow", { text: "ОРГАНИЗАТОРЫ DIGITAL ВПИСКИ" });
  const title = useEditorOverrides("team-title", { text: "КОМАНДА ПРОЕКТА" });
  const description = useEditorOverrides("team-description", {
    text: "Команда, которая отвечает за вечер, партнёрства, сцену и атмосферу.",
  });

  return (
    <section className="w-full border-t border-zinc-900 bg-zinc-950 px-6 py-24 sm:px-12 lg:px-24" id="team" {...section.bind} style={section.style}>
      <div className="mx-auto w-full max-w-[2000px] space-y-16">
        <div className="space-y-4">
          <span {...eyebrow.bind} style={eyebrow.style} className="block text-xs font-mono font-black uppercase tracking-[0.4em] text-[#BEEB08]">
            {eyebrow.text}
          </span>
          <h2 {...title.bind} style={title.style} className="font-display text-3xl font-black uppercase tracking-tighter text-white sm:text-5xl">
            {title.text}
          </h2>
          <p {...description.bind} style={description.style} className="max-w-2xl text-base leading-relaxed text-zinc-400">
            {description.text}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {TEAM_MEMBERS.map((member, idx) => (
            <TeamCard key={member.name} member={member} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamBlock;
