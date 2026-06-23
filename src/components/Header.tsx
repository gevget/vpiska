import React, { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { withBase } from "../lib/asset";

const NAV_LINKS = [
  { name: "Проект", href: "#hero" },
  { name: "Почему мы", href: "#benefits-block" },
  { name: "Формат", href: "#industry-rockstars" },
  { name: "Медиа", href: "#ecosystem" },
  { name: "Галерея", href: "#gallery" },
  { name: "Интеграции", href: "#integrations-block" },
  { name: "Команда", href: "#team" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.querySelector(link.href)).filter(Boolean) as Element[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target instanceof HTMLElement) {
          setActiveSection(`#${visible.target.id}`);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    setActiveSection(href);
    const element = document.querySelector(href);

    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <nav
        className={`fixed left-0 top-0 z-[100] w-full transition-all duration-500 ${
          scrolled ? "border-b border-zinc-800 bg-black/80 py-4 backdrop-blur-xl" : "bg-transparent py-8"
        }`}
      >
        <div className="mx-auto flex max-w-[2000px] items-center justify-between gap-6 px-6 sm:px-12 lg:px-20 xl:px-32">
          <div className="group flex cursor-pointer items-center" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img
              src={withBase("/logo-tolk-vpiska.png")}
              alt="Digital Вписка"
              className="h-12 w-auto transition-opacity group-hover:opacity-80"
            />
          </div>

          <div className="hidden items-center gap-10 lg:flex">
            <div className="flex items-center gap-3 border-r border-zinc-800 pr-4">
              <span className="text-[11px] font-mono text-zinc-500">TG:</span>
              <a
                href="https://t.me/gevget"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono font-black text-[#BEEB08] transition-colors hover:text-white"
              >
                @gevget
              </a>
            </div>

            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`text-[11px] font-mono font-black uppercase tracking-[0.2em] transition-colors ${
                  activeSection === link.href ? "text-[#BEEB08] neon-glow-green" : "text-zinc-400 hover:text-[#BEEB08]"
                }`}
              >
                {link.name}
              </button>
            ))}

            <button
              onClick={() => scrollToSection("#contact-form")}
              className="group flex items-center gap-2 bg-white px-6 py-2 text-[11px] font-mono font-black uppercase tracking-widest text-black transition-all hover:bg-[#BEEB08]"
            >
              Стать партнёром <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center border border-zinc-700 text-white lg:hidden"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] flex flex-col bg-black p-8 sm:p-12 lg:hidden"
          >
            <div className="mb-20 flex items-center justify-between gap-4">
              <img src={withBase("/logo-tolk-vpiska.png")} alt="Digital Вписка" className="h-12 w-auto" />
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-12 w-12 items-center justify-center border border-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-8">
              {NAV_LINKS.map((link, idx) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  onClick={() => scrollToSection(link.href)}
                  className={`block text-left text-4xl font-display font-black uppercase tracking-tighter transition-colors sm:text-5xl ${
                    activeSection === link.href ? "text-[#BEEB08]" : "text-zinc-700 hover:text-[#BEEB08]"
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-8 border-t border-zinc-800 pt-10">
              <button
                onClick={() => scrollToSection("#contact-form")}
                className="flex w-full items-center justify-center gap-3 bg-[#BEEB08] py-5 text-xs font-mono font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-white"
              >
                Стать партнёром <ArrowRight className="h-4 w-4" />
              </button>
              <div className="flex flex-wrap gap-6 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                <span>TG: @gevget</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
