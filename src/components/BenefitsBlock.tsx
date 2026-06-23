import React from "react";
import { motion } from "motion/react";
import { Award, Camera, Heart, Share2, Target, Users } from "lucide-react";

import { useEditorOverrides } from "../editor/useEditorOverrides";

const ICONS = [Target, Users, Heart, Share2, Camera, Award];

const PARTNER_BENEFITS = [
  { id: 1, title: "Люди, которые решают", desc: "На площадке — руководители, маркетологи, продюсеры, основатели и команды." },
  { id: 2, title: "Продажи без холода", desc: "Люди приходят отдыхать, но знакомятся и обсуждают дела естественно." },
  { id: 3, title: "Можно пригласить клиентов", desc: "Приведите партнёров, команду или ключевых клиентов в сильный вечер." },
  { id: 4, title: "Бренд внутри события", desc: "Не просто логотип. Можно встроиться в механику, сцену, welcome-зону или контент." },
  { id: 5, title: "Эмоция вместо баннера", desc: "Гостей цепляют не рекламой, а атмосферой, музыкой и живым контактом." },
  { id: 6, title: "Новый B2B-формат", desc: "Это не конференция. Это вечер, после которого бренд проще вспомнить." },
];

function BenefitCard({ benefit, idx }: { benefit: (typeof PARTNER_BENEFITS)[number]; idx: number }) {
  const Icon = ICONS[idx % ICONS.length];
  const card = useEditorOverrides(`benefit-card-${benefit.id}`);
  const title = useEditorOverrides(`benefit-card-${benefit.id}-title`, { text: benefit.title });
  const description = useEditorOverrides(`benefit-card-${benefit.id}-desc`, { text: benefit.desc });

  return (
    <motion.div whileHover={{ scale: 1.02 }} {...card.bind} style={card.style} className="group h-full border border-zinc-700 bg-zinc-950 p-8 transition-all">
      <div className="mb-6 flex h-12 w-12 items-center justify-center border border-zinc-700 bg-black transition-colors group-hover:border-[#BEEB08]">
        <Icon className="h-5 w-5 text-zinc-400 group-hover:text-[#BEEB08]" />
      </div>
      <h3 {...title.bind} style={title.style} className="mb-2 text-lg font-mono font-black uppercase leading-tight text-white">
        {title.text}
      </h3>
      <p {...description.bind} style={description.style} className="text-xs leading-relaxed text-zinc-400">
        {description.text}
      </p>
    </motion.div>
  );
}

const BenefitsBlock = () => {
  const section = useEditorOverrides("benefits-section");
  const eyebrow = useEditorOverrides("benefits-eyebrow", { text: "VALUE PROPOSITION // 05" });
  const title = useEditorOverrides("benefits-title", { text: "ПОЧЕМУ БРЕНДАМ СЮДА" });
  const description = useEditorOverrides("benefits-description", {
    text: "Digital Вписка даёт партнёру не баннер на фоне сцены, а живое присутствие внутри вечера.",
  });
  const audienceCard = useEditorOverrides("benefits-audience-card");
  const audienceLabel = useEditorOverrides("benefits-audience-label", { text: "Закрытый вечер для digital-индустрии" });
  const communityCard = useEditorOverrides("benefits-community-card");
  const communityLabel = useEditorOverrides("benefits-community-label", { text: "Бренд встроен в сценарий вечера" });

  return (
    <section id="benefits-block" {...section.bind} style={section.style} className="relative w-full overflow-hidden bg-black px-6 py-24 sm:px-12 sm:py-32 lg:px-20 xl:px-32 xl:py-40">
      <div className="mx-auto grid w-full max-w-[2000px] grid-cols-1 gap-20 lg:grid-cols-2 lg:items-stretch">
        <div className="flex h-full flex-col justify-between gap-12">
          <div className="space-y-6">
            <span {...eyebrow.bind} style={eyebrow.style} className="block text-xs font-mono font-black uppercase tracking-[0.4em] text-zinc-500">
              {eyebrow.text}
            </span>
            <h2 {...title.bind} style={title.style} className="font-display text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white sm:text-6xl">
              {title.text}
            </h2>
            <p {...description.bind} style={description.style} className="max-w-xl text-lg leading-relaxed text-zinc-300">
              {description.text}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div {...audienceCard.bind} style={audienceCard.style} className="group flex min-h-[220px] flex-col justify-between border border-zinc-700 bg-zinc-950 p-8 transition-all duration-300 hover:border-[#BEEB08]/55 hover:bg-zinc-900 hover:shadow-[0_0_32px_rgba(190,235,8,0.12)]">
              <div className="text-2xl font-black uppercase text-white transition-all duration-300 group-hover:text-[#BEEB08] group-hover:[text-shadow:0_0_18px_rgba(190,235,8,0.45)]">Private</div>
              <div {...audienceLabel.bind} style={audienceLabel.style} className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 transition-colors duration-300 group-hover:text-zinc-200">
                {audienceLabel.text}
              </div>
            </div>

            <div {...communityCard.bind} style={communityCard.style} className="group flex min-h-[220px] flex-col justify-between border border-zinc-700 bg-zinc-950 p-8 transition-all duration-300 hover:border-[#FF007F]/55 hover:bg-zinc-900 hover:shadow-[0_0_32px_rgba(255,0,127,0.12)]">
              <div className="text-2xl font-black uppercase text-white transition-all duration-300 group-hover:text-[#FF007F] group-hover:[text-shadow:0_0_18px_rgba(255,0,127,0.45)]">Native</div>
              <div {...communityLabel.bind} style={communityLabel.style} className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 transition-colors duration-300 group-hover:text-zinc-200">
                {communityLabel.text}
              </div>
            </div>
          </div>
        </div>

        <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2">
          {PARTNER_BENEFITS.map((benefit, idx) => (
            <React.Fragment key={benefit.id}>
              <BenefitCard benefit={benefit} idx={idx} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsBlock;
