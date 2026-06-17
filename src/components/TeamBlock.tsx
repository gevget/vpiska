import React from "react";
import { TEAM_MEMBERS } from "../data";

const TeamBlock = () => {
  return (
    <section className="w-full py-24 px-6 sm:px-12 lg:px-24 bg-zinc-950 border-t border-zinc-900" id="team">
      <div className="w-full max-w-[2000px] mx-auto space-y-16">
        <div className="space-y-4">
          <span className="text-[#00FF41] font-mono text-xs uppercase tracking-[0.4em] font-black block">
            ★ ОРГАНИЗАТОРЫ DIGITAL ВПИСКИ
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tighter">
            КОМАНДА ПРОЕКТА
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, idx) => (
            <div key={idx} className="p-10 bg-[#0E0E11] border border-zinc-900 hover:border-[#00FF41]/30 transition-all duration-300 flex flex-col">
              <div className="aspect-square w-full overflow-hidden border border-zinc-800 bg-black relative group mb-8">
                <img
                  src={
                    member.name.includes("Александр") 
                      ? "/images/team_alexander_ceo_1781202081739.jpg"
                      : member.name.includes("Вадим")
                      ? "/images/team_vadim_promoter_1781202096819.jpg"
                      : "/images/team_evgeny_designer_1781202110678.jpg"
                  }
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              </div>
              <span className="text-[10px] font-mono text-[#FF007F] uppercase tracking-widest block font-black mb-3">
                ОРГАНИЗАТОР // 0{idx + 1}
              </span>
              <h3 className="text-2xl font-display font-black text-white uppercase mb-2 tracking-tight">
                {member.name}
              </h3>
              <p className="text-xs font-mono text-[#00FF41] uppercase tracking-wide font-bold border-b border-zinc-900 pb-4 mb-4">
                {member.role}
              </p>
              <p className="text-sm text-zinc-500 font-sans leading-relaxed">
                {member.name.includes("Евгений") && "Основатель студии TOLK. Эксперт по крупномасштабным B2B-активациям и дизайну цифровых продуктов."}
                {member.name.includes("Александр") && "CEO сообщества Digital Club, координирует B2B-нетворкинг и работу со всеми тематическими клубами экосистемы."}
                {member.name.includes("Вадим") && "Главный промоутер, координатор музыкальных репетиций спикеров и ответственный за барные концепты вечера."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamBlock;
