import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { name: "Событие", href: "#ecosystem" },
  { name: "Протокол", href: "#protocol-block" },
  { name: "Галерея", href: "#gallery" },
  { name: "Интеграции", href: "#integrations-block" },
  { name: "Команда", href: "#team" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          scrolled ? "bg-black/80 backdrop-blur-xl border-b border-zinc-900 py-4" : "bg-transparent py-8"
        }`}
      >
        <div className="max-w-[2000px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-32 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="text-xl font-display font-black tracking-tighter uppercase group-hover:opacity-80 transition-opacity">
              <span className="text-white">DIGITAL</span> <span className="text-[#00FF41]">ВПИСКА</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            <div className="flex items-center gap-3 pr-4 border-r border-zinc-900">
               <span className="text-[11px] font-mono text-zinc-600">TG:</span>
               <a 
                 href="https://t.me/gevget" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-[11px] font-mono font-black text-[#00FF41] hover:text-white transition-colors"
               >
                 @GEVGET
               </a>
            </div>
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-[11px] font-mono font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-[#00FF41] transition-colors"
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection("#contact-form")}
              className="px-6 py-2 bg-white text-black font-mono font-black text-[11px] uppercase tracking-widest hover:bg-[#00FF41] transition-all flex items-center gap-2 group"
            >
              УЧАСТВОВАТЬ <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden w-10 h-10 border border-zinc-800 flex items-center justify-center text-white"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-black flex flex-col p-8 sm:p-12 lg:hidden"
          >
            <div className="flex justify-between items-center mb-20">
               <span className="text-xl font-display font-black tracking-tighter uppercase text-white">
                 DIGITAL <span className="text-[#00FF41]">В</span>ПИСКА
               </span>
               <button 
                 onClick={() => setIsOpen(false)}
                 className="w-12 h-12 border border-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white"
               >
                 <X className="w-6 h-6" />
               </button>
            </div>

            <div className="space-y-8">
              {NAV_LINKS.map((link, idx) => (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-4xl sm:text-5xl font-display font-black uppercase text-left tracking-tighter text-zinc-800 hover:text-[#00FF41] transition-colors"
                >
                  {link.name}
                </motion.button>
              ))}
            </div>

            <div className="mt-auto pt-10 border-t border-zinc-900 flex flex-col gap-8">
               <button 
                 onClick={() => scrollToSection("#contact-form")}
                 className="w-full py-5 bg-[#00FF41] text-black font-mono font-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-3"
               >
                 СТАТЬ ПАРТНЕРОМ <ArrowRight className="w-4 h-4" />
               </button>
               <div className="flex gap-6 text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                 <span>TG: @digital_club</span>
                 <span>PH: +7 (995) 505-13-13</span>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
