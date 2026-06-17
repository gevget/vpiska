import React from "react";
import { motion } from "motion/react";
import { PARTNER_BENEFITS } from "../data";
import { Target, Users, Heart, Share2, Camera, Award } from "lucide-react";
import { useEditorOverrides } from "../editor/useEditorOverrides";

const ICONS = [Target, Users, Heart, Share2, Camera, Award];

function BenefitCard({ benefit, idx }: { benefit: (typeof PARTNER_BENEFITS)[number]; idx: number }) {
  const Icon = ICONS[idx % ICONS.length];
  const card = useEditorOverrides(`benefit-card-${benefit.id}`);
  const title = useEditorOverrides(`benefit-card-${benefit.id}-title`, { text: benefit.title });
  const description = useEditorOverrides(`benefit-card-${benefit.id}-desc`, { text: benefit.desc });

  return (
    <motion.div whileHover={{ scale: 1.02 }} {...card.bind} style={card.style} className="p-8 bg-zinc-950 border border-zinc-900 group transition-all">
      <div className="w-12 h-12 bg-black border border-zinc-900 flex items-center justify-center mb-6 group-hover:border-[#00FF41] transition-colors">
        <Icon className="w-5 h-5 text-zinc-500 group-hover:text-[#00FF41]" />
      </div>
      <h3 {...title.bind} style={title.style} className="text-lg font-mono font-black uppercase text-white mb-2 leading-tight">
        {title.text}
      </h3>
      <p {...description.bind} style={description.style} className="text-xs text-zinc-500 font-sans leading-relaxed">
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
    text: "Digital Вписка — это не просто ивент, это инструмент формирования социального капитала в высших эшелонах digital-индустрии.",
  });
  const audienceCard = useEditorOverrides("benefits-audience-card");
  const audienceLabel = useEditorOverrides("benefits-audience-label", { text: "ЛПР ОФФЛАЙН" });
  const communityCard = useEditorOverrides("benefits-community-card");
  const communityLabel = useEditorOverrides("benefits-community-label", { text: "DIGITAL COMMUNITY" });

  return (
    <section
      id="benefits-block"
      {...section.bind}
      style={section.style}
      className="w-full py-24 sm:py-32 xl:py-40 px-6 sm:px-12 lg:px-20 xl:px-32 relative bg-black overflow-hidden"
    >
      <div className="w-full max-w-[2000px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-12">
          <div className="space-y-6">
            <span {...eyebrow.bind} style={eyebrow.style} className="text-xs font-mono text-zinc-500 uppercase tracking-[0.4em] block font-black">
              {eyebrow.text}
            </span>
            <h2 {...title.bind} style={title.style} className="text-4xl sm:text-6xl font-display font-black text-white uppercase tracking-tighter leading-[0.9]">
              {title.text}
            </h2>
            <p {...description.bind} style={description.style} className="text-lg text-zinc-400 font-sans leading-relaxed max-w-xl">
              {description.text}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div {...audienceCard.bind} style={audienceCard.style} className="p-8 bg-zinc-950 border border-zinc-900 space-y-4">
              <div className="text-3xl font-mono font-black text-white">450+</div>
              <div {...audienceLabel.bind} style={audienceLabel.style} className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                {audienceLabel.text}
              </div>
            </div>
            <div {...communityCard.bind} style={communityCard.style} className="p-8 bg-zinc-950 border border-zinc-900 space-y-4">
              <div className="text-3xl font-mono font-black text-white">7 700+</div>
              <div {...communityLabel.bind} style={communityLabel.style} className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                {communityLabel.text}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
