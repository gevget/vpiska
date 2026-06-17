import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, ExternalLink, Type, Volume2, VolumeX } from "lucide-react";

// Data
import { GALLERY_PHOTOS } from "./data";

// Components
import StructuredData from "./components/StructuredData";
import { useEditorOverrides } from "./editor/useEditorOverrides";
import { withBase } from "./lib/asset";
const Typewriter = lazy(() => import("./components/Typewriter"));
const EcosystemDashboard = lazy(() => import("./components/EcosystemDashboard"));
const AtmosphereGallery = lazy(() => import("./components/AtmosphereGallery"));
const ComparisonBlock = lazy(() => import("./components/ComparisonBlock"));
const IntegrationsBuilder = lazy(() => import("./components/IntegrationsBuilder"));
const ContactForm = lazy(() => import("./components/ContactForm"));
const Header = lazy(() => import("./components/Header"));
const ModelStats = lazy(() => import("./components/ModelStats"));
const TeamBlock = lazy(() => import("./components/TeamBlock"));
const VibeBlock = lazy(() => import("./components/VibeBlock"));
const LeadModal = lazy(() => import("./components/LeadModal"));
const EveningProtocol = lazy(() => import("./components/EveningProtocol"));
const BenefitsBlock = lazy(() => import("./components/BenefitsBlock"));
const UseCases = lazy(() => import("./components/UseCases"));
const PartnerArsenal = lazy(() => import("./components/PartnerArsenal"));

const SectionFallback = () => (
  <div className="w-full h-64 bg-zinc-950/20 animate-pulse flex items-center justify-center border-y border-zinc-900">
    <div className="text-[10px] font-mono text-zinc-800 tracking-[0.5em] uppercase">Loading System Block...</div>
  </div>
);

export default function App() {
  const [selectedComparisonIndex, setSelectedComparisonIndex] = useState(0);
  const [activeGalleryFilter, setActiveGalleryFilter] = useState("Все");
  const [lightboxPhoto, setLightboxPhoto] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState("");
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Europe/Moscow",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      try {
        const formatter = new Intl.DateTimeFormat("ru-RU", options);
        setCurrentTime(formatter.format(now));
      } catch (err) {
        const hh = String(now.getHours()).padStart(2, "0");
        const mm = String(now.getMinutes()).padStart(2, "0");
        const ss = String(now.getSeconds()).padStart(2, "0");
        setCurrentTime(`${hh}:${mm}:${ss}`);
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Audio Engine
  useEffect(() => {
    let ctx: AudioContext | null = null;
    let oscillators: OscillatorNode[] = [];
    let filter: BiquadFilterNode | null = null;
    let mainGain: GainNode | null = null;
    let lfo: OscillatorNode | null = null;

    if (isAudioActive) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        ctx = new AudioContextClass();
        mainGain = ctx.createGain();
        mainGain.gain.setValueAtTime(0, ctx.currentTime);
        mainGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.2);
        filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450, ctx.currentTime);
        filter.Q.setValueAtTime(6, ctx.currentTime);
        lfo = ctx.createOscillator();
        lfo.type = "sine";
        lfo.frequency.setValueAtTime(0.12, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(200, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();
        const triadNotes = [110.0, 164.81, 220.0, 261.63, 329.63, 392.0];
        triadNotes.forEach((freq, idx) => {
          const osc = ctx!.createOscillator();
          const oscGain = ctx!.createGain();
          osc.type = idx % 2 === 0 ? "sawtooth" : "triangle";
          const detuneAmount = Math.sin(idx) * 0.4;
          osc.frequency.setValueAtTime(freq + detuneAmount, ctx!.currentTime);
          oscGain.gain.setValueAtTime(idx === 0 ? 0.25 : 0.08, ctx!.currentTime);
          osc.connect(oscGain);
          oscGain.connect(filter!);
          osc.start();
          oscillators.push(osc);
        });
        filter.connect(mainGain);
        mainGain.connect(ctx.destination);
      } catch (e) {
        console.warn("Web Audio API not supported", e);
      }
    }

    return () => {
      if (mainGain && ctx) {
        try {
          mainGain.gain.cancelScheduledValues(ctx.currentTime);
          mainGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
          setTimeout(() => {
            oscillators.forEach((osc) => {
              try {
                osc.stop();
              } catch (e) {}
            });
            if (lfo)
              try {
                lfo.stop();
              } catch (e) {}
            if (ctx && ctx.state !== "closed") ctx.close();
          }, 450);
        } catch (e) {
          console.error(e);
        }
      }
    };
  }, [isAudioActive]);

  const openModalWithPreset = (presetText: string) => {
    setModalContext(presetText);
    setIsModalOpen(true);
  };

  const heroSection = useEditorOverrides("hero-section");
  const heroBadge = useEditorOverrides("hero-badge", { text: "B2B PARTNERSHIP PORTAL // 2026" });
  const heroSubtitle = useEditorOverrides("hero-subtitle", {
    text: "by Digital Club // Главное музыкальное B2B-событие года — Digital Вписка. Осень 2026.",
  });
  const heroCta = useEditorOverrides("hero-cta", { text: "СТАТЬ ПАРТНЁРОМ →" });
  const heroStatus = useEditorOverrides("hero-status", { text: "1 СЛОТ ГЕНЕРАЛА ДОСТУПЕН" });
  const footerTitle = useEditorOverrides("footer-title", {
    text: "ГОТОВЫ ИНТЕГРИРОВАТЬ СВОЙ БРЕНД?",
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#FF007F] selection:text-[#050505] noise-overlay relative overflow-x-hidden scroll-smooth">
      <StructuredData />

      <Header />

      <main>
        {/* HERO */}
        <section
          id="hero"
          {...heroSection.bind}
          style={heroSection.style}
          className="w-full relative min-h-[85vh] flex items-center border-b border-zinc-900 overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <img
              src={withBase("/images/hero_vpiska_cyberpunk_1781210331272.jpg")}
              alt="Digital Вписка Atmosphere"
              className="w-full h-full object-cover opacity-25 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]"></div>
          </div>

          <div className="w-full max-w-[2000px] mx-auto px-6 sm:px-12 lg:px-24 relative z-10 py-20">
            <div className="max-w-4xl space-y-10">
              <div className="space-y-4">
                <span
                  {...heroBadge.bind}
                  style={heroBadge.style}
                  className="inline-block text-[10px] font-mono tracking-[0.5em] text-[#00FF41] uppercase bg-[#00FF41]/5 px-3 py-1.5 border border-[#00FF41]/20"
                >
                  {heroBadge.text}
                </span>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tighter text-white uppercase leading-[0.85]">
                  DIGITAL <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF007F] to-[#00FF41] neon-glow-pink">ВПИСКА</span>
                </h1>
                <p
                  {...heroSubtitle.bind}
                  style={heroSubtitle.style}
                  className="text-lg sm:text-xl font-mono text-zinc-400 uppercase tracking-[0.2em] max-w-2xl leading-relaxed"
                >
                  {heroSubtitle.text}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
                <button
                  onClick={() => openModalWithPreset("Прямое обращение из Hero-блока")}
                  {...heroCta.bind}
                  style={heroCta.style}
                  className="px-10 py-5 bg-[#FF007F] text-white font-mono font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 cursor-pointer text-center shadow-[0_0_40px_rgba(255,0,127,0.2)]"
                >
                  {heroCta.text}
                </button>
                <div className="flex items-center gap-4 p-4 bg-black/40 border border-zinc-800 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-full border border-[#00FF41]/20 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-ping"></span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-zinc-500 uppercase font-black tracking-widest">STATUS:</span>
                    <span
                      {...heroStatus.bind}
                      style={heroStatus.style}
                      className="text-xs font-mono text-[#00FF41] font-black uppercase tracking-widest"
                    >
                      {heroStatus.text}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INFINITE TAPE 1 */}
        <div className="w-full overflow-hidden border-b border-zinc-900 bg-black py-8">
          <motion.div className="flex whitespace-nowrap gap-6" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }}>
            {[...GALLERY_PHOTOS, ...GALLERY_PHOTOS].map((p, i) => (
              <div key={i} className="w-[350px] aspect-[16/9] flex-shrink-0 border border-zinc-900 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-700">
                <img src={p.src} alt={p.alt} loading="lazy" className="w-full h-full object-cover" />
              </div>
            ))}
          </motion.div>
        </div>

        <Suspense fallback={<SectionFallback />}>
          <BenefitsBlock />
          <EcosystemDashboard />
          <UseCases />
          <PartnerArsenal />
          <AtmosphereGallery
            activeGalleryFilter={activeGalleryFilter}
            setActiveGalleryFilter={setActiveGalleryFilter}
            lightboxPhoto={lightboxPhoto}
            setLightboxPhoto={setLightboxPhoto}
          />
          <ComparisonBlock
            selectedComparisonIndex={selectedComparisonIndex}
            setSelectedComparisonIndex={setSelectedComparisonIndex}
            openModalWithPreset={openModalWithPreset}
          />
          <EveningProtocol />
          <IntegrationsBuilder openModalWithPreset={openModalWithPreset} />
          <VibeBlock />
          <ModelStats openModalWithPreset={openModalWithPreset} />
          <TeamBlock />
          <ContactForm />
        </Suspense>
      </main>

      <footer className="py-20 px-6 sm:px-12 border-t border-zinc-900 bg-black text-center space-y-10">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2
            {...footerTitle.bind}
            style={footerTitle.style}
            className="text-2xl font-display font-black uppercase tracking-tight"
          >
            {footerTitle.text}
          </h2>
          <p className="text-sm font-mono text-zinc-500 uppercase tracking-widest">B2B Координация проекта: Вадим Акимов, Александр Козаченко, Евгений Гетман.</p>
        </div>
        <div className="flex justify-center gap-8">
          <a href="https://digitalclub.ru" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-zinc-700 hover:text-[#00FF41] transition-colors border border-zinc-900 px-4 py-2 uppercase font-black">Digital Club 2026</a>
          <a href="https://t.me/gevget" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-zinc-700 hover:text-[#FF007F] transition-colors border border-zinc-900 px-4 py-2 uppercase font-black">Contact Organizers</a>
        </div>
      </footer>

      <Suspense fallback={null}>
        <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} context={modalContext} />
      </Suspense>
    </div>
  );
}
