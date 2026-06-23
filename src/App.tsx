import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

import { HERO_EVENT_PHOTO } from "./data";
import StructuredData from "./components/StructuredData";
import { useEditorOverrides } from "./editor/useEditorOverrides";
import { withBase } from "./lib/asset";

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
const IndustryRockstars = lazy(() => import("./components/IndustryRockstars"));
const UseCases = lazy(() => import("./components/UseCases"));
const PartnerArsenal = lazy(() => import("./components/PartnerArsenal"));

const SectionFallback = () => (
  <div className="flex h-64 w-full items-center justify-center border-y border-zinc-800 bg-zinc-950/20 animate-pulse">
    <div className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-700">Loading System Block...</div>
  </div>
);

const TOP_EVENT_PHOTOS = [
  { src: withBase("/event-11.jpg"), alt: "Гости и музыканты в центре зала" },
  { src: withBase("/event-12.jpg"), alt: "Выступление на сцене перед залом" },
  { src: withBase("/event-311.jpg"), alt: "Широкий кадр концерта и аудитории" },
  { src: withBase("/vp-2.jpg"), alt: "Саксофон и толпа вокруг артистов" },
  { src: withBase("/vp-3.jpg"), alt: "Участники проекта на сцене" },
];

export default function App() {
  const [selectedComparisonIndex, setSelectedComparisonIndex] = useState(0);
  const [activeGalleryFilter, setActiveGalleryFilter] = useState("Все");
  const [lightboxPhoto, setLightboxPhoto] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState("");
  const [isAudioActive] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [isTopDragging, setIsTopDragging] = useState(false);
  const topScrollerRef = useRef<HTMLDivElement | null>(null);
  const topDragStateRef = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  });

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
      } catch {
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
          osc.frequency.setValueAtTime(freq + Math.sin(idx) * 0.4, ctx!.currentTime);
          oscGain.gain.setValueAtTime(idx === 0 ? 0.25 : 0.08, ctx!.currentTime);
          osc.connect(oscGain);
          oscGain.connect(filter!);
          osc.start();
          oscillators.push(osc);
        });

        filter.connect(mainGain);
        mainGain.connect(ctx.destination);
      } catch (error) {
        console.warn("Web Audio API not supported", error);
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
              } catch {}
            });

            if (lfo) {
              try {
                lfo.stop();
              } catch {}
            }

            if (ctx && ctx.state !== "closed") {
              ctx.close();
            }
          }, 450);
        } catch (error) {
          console.error(error);
        }
      }
    };
  }, [isAudioActive]);

  const openModalWithPreset = (presetText: string) => {
    setModalContext(presetText);
    setIsModalOpen(true);
  };

  const handleTopPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = topScrollerRef.current;
    if (!node) return;

    event.preventDefault();

    topDragStateRef.current = {
      isDown: true,
      startX: event.clientX,
      scrollLeft: node.scrollLeft,
    };

    setIsTopDragging(true);
    node.setPointerCapture(event.pointerId);
    node.style.cursor = "grabbing";
  };

  const handleTopPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = topScrollerRef.current;
    const dragState = topDragStateRef.current;
    if (!node || !dragState.isDown) return;

    const delta = event.clientX - dragState.startX;
    node.scrollLeft = dragState.scrollLeft - delta * 1.15;
  };

  const handleTopPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = topScrollerRef.current;
    if (!node || !topDragStateRef.current.isDown) return;

    topDragStateRef.current.isDown = false;
    setIsTopDragging(false);
    node.releasePointerCapture(event.pointerId);
    node.style.cursor = "grab";
  };

  const heroSection = useEditorOverrides("hero-section");
  const heroBadge = useEditorOverrides("hero-badge", { text: "29 ОКТЯБРЯ // МОСКВА" });
  const heroSubtitle = useEditorOverrides("hero-subtitle", {
    text: "B2B-вечер, где digital-индустрия выходит на сцену. Концерт, нетворкинг и партнёрские интеграции в одном событии.",
  });
  const heroCta = useEditorOverrides("hero-cta", { text: "Стать партнёром" });
  const heroStatus = useEditorOverrides("hero-status", { text: "Обсудить слот" });

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] font-sans text-white selection:bg-[#FF007F] selection:text-[#050505] noise-overlay scroll-smooth">
      <StructuredData />
      <Header />

      <main>
        <section
          id="hero"
          {...heroSection.bind}
          style={heroSection.style}
          className="relative flex min-h-[85vh] w-full items-center overflow-hidden border-b border-zinc-800"
        >
          <div className="absolute inset-0 z-0">
            <img src={HERO_EVENT_PHOTO} alt="Digital Вписка Atmosphere" className="h-full w-full scale-105 object-cover opacity-55 sm:opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/15 to-[#050505] sm:via-black/25" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[2000px] px-6 py-20 sm:px-12 lg:px-24">
            <div className="max-w-4xl space-y-10">
              <div className="space-y-4">
                <span
                  {...heroBadge.bind}
                  style={heroBadge.style}
                  className="inline-block max-w-full border border-[#BEEB08]/25 bg-[#BEEB08]/5 px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.28em] text-[#BEEB08] sm:text-[10px] sm:tracking-[0.5em]"
                >
                  {heroBadge.text}
                </span>
                <h1 className="font-display text-4xl font-black uppercase leading-[0.88] tracking-tighter text-white sm:text-7xl lg:text-8xl">
                  DIGITAL <br />
                  <span className="bg-gradient-to-r from-[#FF007F] to-[#BEEB08] bg-clip-text text-transparent neon-glow-pink">ВПИСКА</span>
                </h1>
                <p
                  {...heroSubtitle.bind}
                  style={heroSubtitle.style}
                  className="max-w-2xl text-base font-mono uppercase leading-relaxed tracking-[0.12em] text-zinc-200 sm:text-xl sm:tracking-[0.2em]"
                >
                  {heroSubtitle.text}
                </p>
              </div>

              <div className="flex flex-col gap-6 sm:flex-row sm:items-stretch">
                <button
                  onClick={() => openModalWithPreset("Прямое обращение из Hero-блока")}
                  {...heroCta.bind}
                  style={heroCta.style}
                  className="flex min-h-[76px] items-center justify-center bg-[#FF007F] px-10 py-5 text-center text-xs font-black uppercase tracking-[0.3em] text-white shadow-[0_0_40px_rgba(255,0,127,0.2)] transition-all duration-500 hover:bg-white hover:text-black"
                >
                  {heroCta.text}
                </button>

                <div className="flex min-h-[76px] items-center gap-4 border border-zinc-600 bg-black/50 px-5 py-4 backdrop-blur-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#BEEB08]/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#BEEB08] animate-ping" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-500">АКТУАЛЬНО:</span>
                    <span
                      {...heroStatus.bind}
                      style={heroStatus.style}
                      className="text-xs font-mono font-black uppercase tracking-widest text-[#BEEB08]"
                    >
                      {heroStatus.text}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-500">Moscow time // {currentTime}</div>
            </div>
          </div>
        </section>

        <div className="w-full overflow-hidden border-b border-zinc-800 bg-black py-10 sm:py-12 lg:py-16">
          <div
            ref={topScrollerRef}
            className="hide-scrollbar flex cursor-grab gap-6 overflow-x-auto px-4 select-none sm:px-6 lg:px-8"
            onPointerDown={handleTopPointerDown}
            onPointerMove={handleTopPointerMove}
            onPointerUp={handleTopPointerUp}
            onPointerLeave={handleTopPointerUp}
            onPointerCancel={handleTopPointerUp}
          >
            <motion.div
              className="flex gap-6 whitespace-nowrap"
              animate={isTopDragging ? { x: 0 } : { x: ["0%", "-50%"] }}
              transition={isTopDragging ? { duration: 0 } : { duration: 82, repeat: Infinity, ease: "linear" }}
            >
              {[...TOP_EVENT_PHOTOS, ...TOP_EVENT_PHOTOS, ...TOP_EVENT_PHOTOS].map((photo, index) => (
                <div
                  key={index}
                  className="aspect-[4/3] w-[82vw] max-w-[400px] flex-shrink-0 overflow-hidden border border-zinc-700 grayscale opacity-55 transition-all duration-700 hover:grayscale-0 hover:opacity-100 sm:w-[580px] lg:w-[840px]"
                >
                  <img src={photo.src} alt={photo.alt} loading="lazy" className="h-full w-full object-cover" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <Suspense fallback={<SectionFallback />}>
          <BenefitsBlock />
          <IndustryRockstars />
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

      <footer className="space-y-10 border-t border-zinc-800 bg-black px-6 py-20 text-center sm:px-12">
        <div className="mx-auto max-w-2xl space-y-6">
          <p className="text-sm font-mono uppercase tracking-widest text-zinc-500">
            Проект делают: Вадим Акимов, Александр Кубанеишвили и Евгений Толченков.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          <a
            href="https://t.me/gevget"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-zinc-700 px-4 py-2 text-[10px] font-mono font-black text-zinc-300 transition-colors hover:text-[#BEEB08]"
          >
            Telegram: @gevget
          </a>
        </div>

        <div className="text-[11px] font-mono text-zinc-500">
          Сделано с{" "}
          <a
            href="https://tolk-usite.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-200 transition-colors hover:text-[#BEEB08]"
          >
            Толком
          </a>
        </div>
      </footer>

      <Suspense fallback={null}>
        <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} context={modalContext} />
      </Suspense>
    </div>
  );
}

