import React, { useState } from "react";
import { CheckCircle2, Mail, MessageCircle, MessageSquare, Send, User } from "lucide-react";

import { useEditorOverrides } from "../editor/useEditorOverrides";

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const section = useEditorOverrides("contact-section");
  const eyebrow = useEditorOverrides("contact-eyebrow", { text: "// СТАТЬ ЧАСТЬЮ СОБЫТИЯ" });
  const title = useEditorOverrides("contact-title", { text: "ОСТАВЬТЕ ЗАЯВКУ" });
  const description = useEditorOverrides("contact-description", {
    text: "Обсудим формат вашего участия, подберём индивидуальный пакет интеграций или ответим на любые вопросы по мероприятию.",
  });
  const formCard = useEditorOverrides("contact-form-card");
  const submitButton = useEditorOverrides("contact-submit-button", { text: "Отправить запрос" });

  return (
    <section id="contact-form" {...section.bind} style={section.style} className="relative w-full border-t border-zinc-800 bg-black px-6 py-24 sm:px-12 sm:py-32 lg:px-20 xl:px-32 xl:py-40">
      <div className="mx-auto grid w-full max-w-[2000px] grid-cols-1 items-center gap-20 lg:grid-cols-2">
        <div className="space-y-12">
          <div className="space-y-6">
            <span {...eyebrow.bind} style={eyebrow.style} className="block text-[10px] font-mono font-black uppercase tracking-[0.4em] text-zinc-500 sm:text-xs">
              {eyebrow.text}
            </span>
            <h2 {...title.bind} style={title.style} className="font-display text-[42px] font-black uppercase leading-[0.85] tracking-tighter text-white sm:text-[72px] lg:text-[90px]">
              {title.text}
            </h2>
          </div>

          <div className="max-w-md space-y-8">
            <p {...description.bind} style={description.style} className="leading-relaxed text-zinc-300">
              {description.text}
            </p>

            <div className="space-y-4">
              <div className="group flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center border border-zinc-700 transition-colors group-hover:border-[#BEEB08]">
                  <MessageCircle className="h-4 w-4 text-zinc-300 group-hover:text-[#BEEB08]" />
                </div>
                <a href="https://t.me/gevget" target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-zinc-100 transition-colors hover:text-[#BEEB08]">
                  @gevget
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          {isSubmitted ? (
            <div className="mx-auto flex aspect-square max-w-md flex-col items-center justify-center space-y-6 border border-[#BEEB08] bg-[#BEEB08]/5 p-12 text-center">
              <CheckCircle2 className="h-16 w-16 text-[#BEEB08]" />
              <div className="space-y-2">
                <h3 className="text-xl font-mono font-black uppercase text-white">Заявка принята</h3>
                <p className="text-sm text-zinc-300">Мы свяжемся с вами в течение рабочего дня.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} {...formCard.bind} style={formCard.style} className="relative z-10 space-y-8 border border-zinc-700 bg-zinc-900/80 p-8 shadow-2xl shadow-black/40 sm:p-12">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="block pl-1 text-[10px] font-mono font-black uppercase tracking-widest text-zinc-300">Имя</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                    <input required type="text" placeholder="Александр" className="w-full border border-zinc-600 bg-black px-12 py-4 text-sm text-white placeholder:text-zinc-500 transition-all focus:border-[#BEEB08] focus:outline-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block pl-1 text-[10px] font-mono font-black uppercase tracking-widest text-zinc-300">Телефон</label>
                  <div className="relative">
                    <MessageCircle className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                    <input required type="tel" placeholder="+7 (___) ___ __ __" className="w-full border border-zinc-600 bg-black px-12 py-4 text-sm text-white placeholder:text-zinc-500 transition-all focus:border-[#BEEB08] focus:outline-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block pl-1 text-[10px] font-mono font-black uppercase tracking-widest text-zinc-300">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input required type="email" placeholder="partner@company.ru" className="w-full border border-zinc-600 bg-black px-12 py-4 text-sm text-white placeholder:text-zinc-500 transition-all focus:border-[#BEEB08] focus:outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block pl-1 text-[10px] font-mono font-black uppercase tracking-widest text-zinc-300">Комментарий</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-5 h-4 w-4 text-zinc-400" />
                  <textarea placeholder="Ваше сообщение..." rows={4} className="w-full resize-none border border-zinc-600 bg-black px-12 py-4 text-sm text-white placeholder:text-zinc-500 transition-all focus:border-[#BEEB08] focus:outline-none" />
                </div>
              </div>

              <button type="submit" {...submitButton.bind} style={submitButton.style} className="flex w-full items-center justify-center gap-3 bg-[#BEEB08] py-5 text-xs font-mono font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-white">
                {submitButton.text} <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
