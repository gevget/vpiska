import React from "react";
import { motion } from "motion/react";
import { Award, Camera, Heart, Share2, Target, Users } from "lucide-react";

import { PARTNER_BENEFITS } from "../data";
import { useEditorOverrides } from "../editor/useEditorOverrides";

const ICONS = [Target, Users, Heart, Share2, Camera, Award];

function BenefitCard({ benefit, idx }: { benefit: (typeof PARTNER_BENEFITS)[number]; idx: number }) {
  const Icon = ICONS[idx % ICONS.length];
  const card = useEditorOverrides(`benefit-card-${benefit.id}`);
  const title = useEditorOverrides(`benefit-card-${benefit.id}-title`, { text: benefit.title });
  const description = useEditorOverrides(`benefit-card-${benefit.id}-desc`, { text: benefit.desc });

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      {...card.bind}
      style={card.style}
      className="group h-full border border-zinc-700 bg-zinc-950 p-8 transition-all"
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center border border-zinc-700 bg-black transition-colors group-hover:border-[#00FF41]">
        <Icon className="h-5 w-5 text-zinc-400 group-hover:text-[#00FF41]" />
      </div>
      <h3
        {...title.bind}
        style={title.style}
        className="mb-2 text-lg font-mono font-black uppercase leading-tight text-white"
      >
        {title.text}
      </h3>
      <p
        {...description.bind}
        style={description.style}
        className="text-xs leading-relaxed text-zinc-400"
      >
        {description.text}
      </p>
    </motion.div>
  );
}

const BenefitsBlock = () => {
  const section = useEditorOverrides("benefits-section");
  const eyebrow = useEditorOverrides("benefits-eyebrow", { text: "VALUE PROPOSITION // 05" });
  const title = useEditorOverrides("benefits-title", { text: "ПОЧЕМУ ПАРТНЁРАМ ВЫГОДНО БЫТЬ С НАМИ" });
  const description = useEditorOverrides("benefits-description", {
    text: "Digital Вписка даёт партнёру не фоновое присутствие, а живое внимание внутри общего опыта вечера.",
  });
  const audienceCard = useEditorOverrides("benefits-audience-card");
  const audienceLabel = useEditorOverrides("benefits-audience-label", { text: "ЗАКРЫТЫЙ B2B-ФОРМАТ" });
  const communityCard = useEditorOverrides("benefits-community-card");
  const communityLabel = useEditorOverrides("benefits-community-label", { text: "ОРГАНИЧНАЯ ИНТЕГРАЦИЯ" });

  return (
    <section
      id="benefits-block"
      {...section.bind}
      style={section.style}
      className="relative w-full overflow-hidden bg-black px-6 py-24 sm:px-12 sm:py-32 lg:px-20 xl:px-32 xl:py-40"
    >
      <div className="mx-auto grid w-full max-w-[2000px] grid-cols-1 gap-20 lg:grid-cols-2 lg:items-stretch">
        <div className="flex h-full flex-col justify-between gap-12">
          <div className="space-y-6">
            <span
              {...eyebrow.bind}
              style={eyebrow.style}
              className="block text-xs font-mono font-black uppercase tracking-[0.4em] text-zinc-500"
            >
              {eyebrow.text}
            </span>
            <h2
              {...title.bind}
              style={title.style}
              className="font-display text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white sm:text-6xl"
            >
              {title.text}
            </h2>
            <p
              {...description.bind}
              style={description.style}
              className="max-w-xl text-lg leading-relaxed text-zinc-300"
            >
              {description.text}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div
              {...audienceCard.bind}
              style={audienceCard.style}
              className="flex min-h-[220px] flex-col justify-between border border-zinc-700 bg-zinc-950 p-8"
            >
              <div className="text-2xl font-black uppercase text-white">Private</div>
              <div
                {...audienceLabel.bind}
                style={audienceLabel.style}
                className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400"
              >
                {audienceLabel.text}
              </div>
            </div>

            <div
              {...communityCard.bind}
              style={communityCard.style}
              className="flex min-h-[220px] flex-col justify-between border border-zinc-700 bg-zinc-950 p-8"
            >
              <div className="text-2xl font-black uppercase text-white">Native</div>
              <div
                {...communityLabel.bind}
                style={communityLabel.style}
                className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400"
              >
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
