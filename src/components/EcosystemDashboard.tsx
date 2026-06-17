import React from "react";
import { motion } from "motion/react";
import { ECOSYSTEM_STATISTICS, PROFESSIONAL_COMMUNITIES, LIFESTYLE_COMMUNITIES } from "../data";
import { Users, BarChart, Target as TargetIcon, Zap, Palette, Search, Briefcase, FileText, Calendar, HelpCircle, Utensils, Heart, Plane, User, Wind, ChefHat, Gamepad, Coffee, Brush, Map, Wine, Theater, Music, BookOpen, Trophy, Grid, Activity, Dog, Baby, Thermometer, Smile, Mic, Dices, ShoppingBag, History } from "lucide-react";

export const IconResolver = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, React.ElementType> = {
    Users, BarChart, Target: TargetIcon, Zap, Palette, Search, Briefcase, FileText, Calendar,
    Utensils, Heart, Plane, User, Wind, ChefHat, Gamepad, Coffee, Brush, Map, Wine, Theater,
    Music, BookOpen, Trophy, Grid, Activity, Dog, Baby, Thermometer, Smile, Mic, Dices,
    ShoppingBag, History
  };
  const IconNode = icons[name] || HelpCircle;
  return <IconNode className={className} />;
};

const EcosystemDashboard = () => {
  return (
    <section className="w-full py-20 px-4 sm:px-12 lg:px-24 xl:px-48 border-b border-zinc-900 bg-[#050505] relative overflow-hidden" id="ecosystem">
      <div className="w-full max-w-[2000px] mx-auto z-10 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 mb-20 lg:mb-32">
          <div className="max-w-2xl text-center lg:text-left space-y-8">
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 bg-[#00FF41]/10 border border-[#00FF41]/20 rounded-full"
            >
              <span className="text-[10px] font-mono text-[#00FF41] uppercase tracking-[0.2em] font-black">
                Экосистема Digital Club
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-white uppercase leading-none tracking-tighter"
            >
              МЕДИЙНЫЙ <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF41] to-[#FF007F]">КАПИТАЛ</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-2xl text-zinc-400 font-sans leading-relaxed"
            >
              Digital Вписка — это не просто ивент, это точка сборки 35+ тематических сообществ с общей аудиторией 35 000+ профессионалов.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full lg:w-auto">
            <div className="space-y-4 sm:space-y-6">
              <div className="p-6 sm:p-8 bg-zinc-950 border border-zinc-900 flex flex-col justify-between h-40 sm:h-48 group hover:border-[#00FF41]/30 transition-colors">
                <span className="text-xs font-mono text-zinc-500 uppercase">Подписки</span>
                <span className="text-3xl sm:text-5xl font-mono text-white font-black">{ECOSYSTEM_STATISTICS.totalSubscriptions}</span>
              </div>
              <div className="p-6 sm:p-8 bg-black border border-zinc-900 flex flex-col justify-between h-40 sm:h-48 group hover:border-[#FF007F]/30 transition-colors">
                <span className="text-xs font-mono text-zinc-500 uppercase">Участники</span>
                <span className="text-3xl sm:text-5xl font-mono text-white font-black">{ECOSYSTEM_STATISTICS.uniqueParticipants}</span>
              </div>
            </div>
            <div className="space-y-4 sm:space-y-6 mt-8 sm:mt-12">
              <div className="p-6 sm:p-8 bg-black border border-zinc-900 flex flex-col justify-between h-40 sm:h-48 group hover:border-[#00FF41]/30 transition-colors">
                <span className="text-xs font-mono text-zinc-500 uppercase">Сообщества</span>
                <span className="text-3xl sm:text-5xl font-mono text-white font-black">{ECOSYSTEM_STATISTICS.thematicCommunities}</span>
              </div>
              <div className="p-6 sm:p-8 bg-zinc-950 border border-zinc-900 flex flex-col justify-between h-40 sm:h-48 group hover:border-[#FF007F]/30 transition-colors">
                <span className="text-xs font-mono text-zinc-500 uppercase">Ожидаем</span>
                <span className="text-3xl sm:text-5xl font-mono text-white font-black">{ECOSYSTEM_STATISTICS.expectedGuests}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-16">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-px flex-grow bg-zinc-900"></div>
              <h3 className="text-xs sm:text-sm font-mono text-zinc-500 uppercase tracking-[0.5em] font-black">Профессиональные сообщества (подписчики)</h3>
              <div className="h-px flex-grow bg-zinc-900"></div>
            </div>
            <div className="flex overflow-x-auto pb-6 -mx-4 px-4 lg:mx-0 lg:px-0 lg:flex-wrap lg:justify-center gap-3 sm:gap-4 hide-scrollbar">
              {PROFESSIONAL_COMMUNITIES.map((node, index) => (
                <div key={index} className="min-w-[240px] sm:min-w-[280px] lg:min-w-0 px-4 py-3 bg-zinc-950 border border-zinc-800 flex items-center gap-4 group hover:border-[#00FF41]/40 transition-all hover:bg-zinc-900/50">
                  <IconResolver name={node.icon} className="w-6 h-6 text-[#00FF41]/60 group-hover:text-[#00FF41] transition-colors" />
                  <span className="text-sm font-mono text-zinc-400 group-hover:text-white transition-colors uppercase tracking-widest font-medium whitespace-nowrap">{node.name}</span>
                  <div className="h-5 w-px bg-zinc-800 shrink-0"></div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-mono text-[#00FF41] tabular-nums font-black leading-none">{node.count.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-px flex-grow bg-zinc-900"></div>
              <h3 className="text-xs sm:text-sm font-mono text-zinc-500 uppercase tracking-[0.5em] font-black">Лайфстайл сообщества (подписчики)</h3>
              <div className="h-px flex-grow bg-zinc-900"></div>
            </div>
            <div className="flex overflow-x-auto pb-6 -mx-4 px-4 lg:mx-0 lg:px-0 lg:flex-wrap lg:justify-center gap-2 sm:gap-3 hide-scrollbar">
              {LIFESTYLE_COMMUNITIES.map((node, index) => (
                <div key={index} className="min-w-[200px] sm:min-w-[240px] lg:min-w-0 px-5 py-2.5 bg-black border border-zinc-900 flex items-center gap-3 group hover:border-[#FF007F]/30 transition-all hover:bg-zinc-900/30">
                  <IconResolver name={node.icon} className="w-5 h-5 text-[#FF007F]/40 group-hover:text-[#FF007F] transition-colors" />
                  <span className="text-xs sm:text-sm font-mono text-zinc-500 group-hover:text-white transition-colors whitespace-nowrap">{node.name}</span>
                  <span className="text-xs font-mono text-[#FF007F] tabular-nums font-black">+{node.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemDashboard;
