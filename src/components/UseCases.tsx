import React from "react";
import { USE_CASES } from "../data";
import { CheckCircle2 } from "lucide-react";

const UseCases = () => {
  return (
    <section id="use-cases" className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-20 xl:px-32 bg-zinc-950 border-y border-zinc-900">
      <div className="w-full max-w-[2000px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 px-4">
           <div className="max-w-xl space-y-4">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest font-black block">USAGE SCENARIOS // HOW IT WORKS</span>
              <h2 className="text-4xl sm:text-5xl font-display font-black text-white uppercase tracking-tighter">
                КАК КОМПАНИИ ИСПОЛЬЗУЮТ <span className="text-[#00FF41]">DIGITAL ВПИСКУ</span>
              </h2>
           </div>
           <div className="text-right">
              <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.5em]">OPERATIONAL FRAMEWORK</span>
           </div>
        </div>

        <div className="flex overflow-x-auto pb-8 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 hide-scrollbar">
          {USE_CASES.map((uc, idx) => (
            <div 
              key={uc.title}
              className="min-w-[280px] sm:min-w-[320px] md:min-w-0 p-8 bg-black border border-zinc-900 hover:border-[#00FF41]/30 transition-all flex flex-col group"
            >
              <div className="text-[10px] font-mono text-zinc-700 mb-8 border-b border-zinc-900 pb-4 group-hover:text-[#00FF41] transition-colors">SCENARIO // 0{idx + 1}</div>
              <h3 className="text-xl font-mono font-black uppercase text-white mb-4 leading-tight min-h-[3rem]">{uc.title}</h3>
              <p className="text-sm text-zinc-500 font-sans leading-relaxed flex-grow">{uc.description}</p>
              <div className="mt-8 flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4 text-[#00FF41] opacity-20" />
                 <span className="text-[8px] font-mono text-zinc-800 uppercase tracking-widest">VERIFIED SUCCESS</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
