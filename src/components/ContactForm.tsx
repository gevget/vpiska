import React, { useState } from "react";
import { Send, CheckCircle2, User, Mail, MessageSquare, MessageCircle } from "lucide-react";
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
    <section
      id="contact-form"
      {...section.bind}
      style={section.style}
      className="w-full py-24 sm:py-32 xl:py-40 px-6 sm:px-12 lg:px-20 xl:px-32 bg-black relative border-t border-zinc-900"
    >
      <div className="w-full max-w-[2000px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-12">
          <div className="space-y-6">
            <span {...eyebrow.bind} style={eyebrow.style} className="text-[10px] sm:text-xs font-mono text-zinc-600 uppercase tracking-[0.4em] font-black block">
              {eyebrow.text}
            </span>
            <h2 {...title.bind} style={title.style} className="text-[42px] sm:text-[72px] lg:text-[90px] font-display font-black leading-[0.85] tracking-tighter uppercase text-white">
              {title.text}
            </h2>
          </div>

          <div className="space-y-8 max-w-md">
            <p {...description.bind} style={description.style} className="text-zinc-400 font-light leading-relaxed">
              {description.text}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center group-hover:border-[#00FF41] transition-colors">
                  <MessageCircle className="w-4 h-4 text-zinc-500 group-hover:text-[#00FF41]" />
                </div>
                <a
                  href="https://t.me/gevget"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono text-zinc-300 hover:text-white transition-colors"
                >
                  @gevget
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          {isSubmitted ? (
            <div className="p-12 border border-[#00FF41] bg-[#00FF41]/5 flex flex-col items-center justify-center text-center space-y-6 aspect-square max-w-md mx-auto">
              <CheckCircle2 className="w-16 h-16 text-[#00FF41]" />
              <div className="space-y-2">
                <h3 className="text-xl font-mono font-black uppercase text-white">Заявка принята</h3>
                <p className="text-sm text-zinc-400">Мы свяжемся с вами в течение рабочего дня.</p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              {...formCard.bind}
              style={formCard.style}
              className="p-8 sm:p-12 bg-zinc-950 border border-zinc-900 space-y-8 shadow-2xl relative z-10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest block pl-1">Имя</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                    <input
                      required
                      type="text"
                      placeholder="Александр"
                      className="w-full bg-black border border-zinc-900 px-12 py-4 text-sm text-white placeholder:text-zinc-800 focus:outline-none focus:border-[#00FF41] transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest block pl-1">Телефон</label>
                  <div className="relative">
                    <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                    <input
                      required
                      type="tel"
                      placeholder="+7 (___) ___ __ __"
                      className="w-full bg-black border border-zinc-900 px-12 py-4 text-sm text-white placeholder:text-zinc-800 focus:outline-none focus:border-[#00FF41] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest block pl-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                  <input
                    required
                    type="email"
                    placeholder="partner@company.ru"
                    className="w-full bg-black border border-zinc-900 px-12 py-4 text-sm text-white placeholder:text-zinc-800 focus:outline-none focus:border-[#00FF41] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest block pl-1">Комментарий</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-5 w-4 h-4 text-zinc-700" />
                  <textarea
                    placeholder="Ваше сообщение..."
                    rows={4}
                    className="w-full bg-black border border-zinc-900 px-12 py-4 text-sm text-white placeholder:text-zinc-800 focus:outline-none focus:border-[#00FF41] transition-all resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                {...submitButton.bind}
                style={submitButton.style}
                className="w-full py-5 bg-[#00FF41] text-black font-mono font-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-3"
              >
                {submitButton.text} <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
