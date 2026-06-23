import React from "react";
import { CheckCircle2 } from "lucide-react";

const USE_CASES = [
  { title: "Пригласить своих клиентов", description: "Провести вечер вместе в сильной неформальной атмосфере и усилить отношения через общий опыт." },
  { title: "Познакомиться с новыми лидами", description: "Использовать формат вечера для теплых знакомств, разговоров и продолжения контакта после события." },
  { title: "Забронировать столы", description: "Собрать за одним столом своих гостей, партнеров, клиентов или команду." },
  { title: "Вывести человека на сцену", description: "Сделать представителя компании частью музыкального шоу, а не очередного делового блока." },
  { title: "Презентовать новый продукт", description: "Встроить запуск или новость в живой вечерний сценарий и дать ей эмоциональный контекст." },
];

const UseCases = () => {
  return (
    <section id="use-cases" className="w-full border-y border-zinc-900 bg-zinc-950 px-6 py-24 sm:px-12 sm:py-32 lg:px-20 xl:px-32">
      <div className="mx-auto w-full max-w-[2000px]">
        <div className="mb-16 flex flex-col justify-between gap-8 px-4 md:flex-row md:items-end">
          <div className="max-w-xl space-y-4">
            <span className="block text-xs font-mono font-black uppercase tracking-widest text-zinc-500">USAGE SCENARIOS // HOW IT WORKS</span>
            <h2 className="font-display text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl">
              КАК КОМПАНИИ ИСПОЛЬЗУЮТ <span className="text-[#BEEB08]">DIGITAL ВПИСКУ</span>
            </h2>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-700">OPERATIONAL FRAMEWORK</span>
          </div>
        </div>

        <div className="hide-scrollbar -mx-6 flex gap-4 overflow-x-auto px-6 pb-8 md:mx-0 md:grid md:grid-cols-3 md:px-0 lg:grid-cols-5">
          {USE_CASES.map((uc, idx) => (
            <div
              key={uc.title}
              className="group flex min-w-[82vw] max-w-[320px] flex-col border border-zinc-900 bg-black p-8 transition-all hover:border-[#BEEB08]/30 sm:min-w-[320px] md:min-w-0 md:max-w-none"
            >
              <div className="mb-8 border-b border-zinc-900 pb-4 text-[10px] font-mono text-zinc-700 transition-colors group-hover:text-[#BEEB08]">
                SCENARIO // 0{idx + 1}
              </div>
              <h3 className="mb-4 min-h-[3rem] text-xl font-mono font-black uppercase leading-tight text-white">{uc.title}</h3>
              <p className="flex-grow text-sm leading-relaxed text-zinc-500">{uc.description}</p>
              <div className="mt-8 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#BEEB08] opacity-20" />
                <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-800">VERIFIED SUCCESS</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
