import React from "react";
import { TEAM_MEMBERS } from "../data";
import { withBase } from "../lib/asset";
import { useEditorOverrides } from "../editor/useEditorOverrides";

const TEAM_IMAGES = [
  withBase("/team-ku.png"),
  withBase("/team-aki.png"),
  withBase("/team-evg.png"),
];

const TEAM_CODES = ["Q", "AK", "Evg"];

function TeamCard({
  member,
  index,
}: {
  key?: React.Key;
  member: (typeof TEAM_MEMBERS)[number];
  index: number;
}) {
  const card = useEditorOverrides(`team-card-${index + 1}`);
  const name = useEditorOverrides(`team-card-${index + 1}-name`, { text: member.name });
  const role = useEditorOverrides(`team-card-${index + 1}-role`, { text: member.role });
  const bioText =
    member.name.includes("Евгений")
      ? "Основатель студии TOLK. Отвечает за визуальную систему, цифровой опыт проекта и развитие сложных B2B-продуктов."
      : member.name.includes("Александр")
        ? "Курирует партнёрское направление проекта и отвечает за стратегию взаимодействия с брендами."
        : "Соавтор музыкальной концепции вечера и один из ключевых продюсеров сценического формата Digital Вписки.";
  const bio = useEditorOverrides(`team-card-${index + 1}-bio`, { text: bioText });

  return (
    <div {...card.bind} style={card.style} className="p-10 bg-[#0E0E11] border border-zinc-900 hover:border-[#00FF41]/30 transition-all duration-300 flex flex-col">
      <div className="aspect-square w-full overflow-hidden border border-zinc-800 bg-black relative group mb-8">
        <img
          src={TEAM_IMAGES[index]}
          alt={member.name}
          loading="lazy"
          className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute left-4 top-4 border border-white/15 bg-black/70 px-3 py-2 text-[10px] font-mono font-black uppercase tracking-[0.35em] text-[#00FF41] backdrop-blur-sm">
          {TEAM_CODES[index]}
        </div>
      </div>
      <span className="text-[10px] font-mono text-[#FF007F] uppercase tracking-widest block font-black mb-3">
        Организатор // 0{index + 1}
      </span>
      <h3 {...name.bind} style={name.style} className="text-2xl font-display font-black text-white uppercase mb-2 tracking-tight">
        {name.text}
      </h3>
      <p {...role.bind} style={role.style} className="text-xs font-mono text-[#00FF41] uppercase tracking-wide font-bold border-b border-zinc-900 pb-4 mb-4">
        {role.text}
      </p>
      <p {...bio.bind} style={bio.style} className="text-sm text-zinc-500 font-sans leading-relaxed">
        {bio.text}
      </p>
    </div>
  );
}

const TeamBlock = () => {
  const section = useEditorOverrides("team-section");
  const eyebrow = useEditorOverrides("team-eyebrow", { text: "★ ОРГАНИЗАТОРЫ DIGITAL ВПИСКИ" });
  const title = useEditorOverrides("team-title", { text: "КОМАНДА ПРОЕКТА" });

  return (
    <section
      className="w-full py-24 px-6 sm:px-12 lg:px-24 bg-zinc-950 border-t border-zinc-900"
      id="team"
      {...section.bind}
      style={section.style}
    >
      <div className="w-full max-w-[2000px] mx-auto space-y-16">
        <div className="space-y-4">
          <span {...eyebrow.bind} style={eyebrow.style} className="text-[#00FF41] font-mono text-xs uppercase tracking-[0.4em] font-black block">
            {eyebrow.text}
          </span>
          <h2 {...title.bind} style={title.style} className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tighter">
            {title.text}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, idx) => (
            <TeamCard key={idx} member={member} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamBlock;
